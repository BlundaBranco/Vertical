import os
import requests as http_requests
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.db_models import User, Tenant, VerticalTemplate
from app.services.auth_service import verify_password, hash_password, create_token, get_current_user

router = APIRouter(prefix="/auth", tags=["auth"])

FACEBOOK_APP_ID = os.getenv("FACEBOOK_APP_ID")
FACEBOOK_APP_SECRET = os.getenv("FACEBOOK_APP_SECRET")
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")


class LoginRequest(BaseModel):
    email: str
    password: str


class RegisterRequest(BaseModel):
    email: str
    password: str


class FacebookLoginRequest(BaseModel):
    access_token: str


class GoogleLoginRequest(BaseModel):
    credential: str


def _create_tenant_and_user(db: Session, email: str, facebook_id: str = None, google_id: str = None, password_hash: str = None) -> User:
    template = db.query(VerticalTemplate).filter(VerticalTemplate.name == "real_estate_v1").first()
    tenant = Tenant(phone_number_id=None, template_id=template.id if template else None, business_config={})
    db.add(tenant)
    db.flush()
    user = User(
        email=email,
        password_hash=password_hash,
        facebook_id=facebook_id,
        google_id=google_id,
        tenant_id=tenant.id
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@router.post("/login")
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()
    if not user or not user.password_hash or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Credenciales incorrectas")
    tenant = db.query(Tenant).filter(Tenant.id == user.tenant_id).first()
    needs_onboarding = not (tenant and tenant.business_config and tenant.business_config.get("agent_name"))
    token = create_token(user.id, user.tenant_id, user.is_admin)
    return {"access_token": token, "token_type": "bearer", "needs_onboarding": needs_onboarding}


@router.post("/register")
def register(payload: RegisterRequest, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == payload.email).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email ya registrado")
    user = _create_tenant_and_user(db, payload.email, password_hash=hash_password(payload.password))
    token = create_token(user.id, user.tenant_id, user.is_admin)
    return {"access_token": token, "token_type": "bearer"}


@router.post("/facebook")
def facebook_login(payload: FacebookLoginRequest, db: Session = Depends(get_db)):
    if not FACEBOOK_APP_ID or not FACEBOOK_APP_SECRET:
        raise HTTPException(status_code=500, detail="Facebook Login no configurado")

    # Verificar token con Facebook
    app_token = f"{FACEBOOK_APP_ID}|{FACEBOOK_APP_SECRET}"
    try:
        debug_res = http_requests.get(
            "https://graph.facebook.com/debug_token",
            params={"input_token": payload.access_token, "access_token": app_token},
            timeout=8
        ).json()
    except Exception:
        raise HTTPException(status_code=503, detail="No se pudo verificar el token con Facebook")

    fb_data = debug_res.get("data", {})
    if not fb_data.get("is_valid"):
        raise HTTPException(status_code=401, detail="Token de Facebook inválido")
    if str(fb_data.get("app_id")) != FACEBOOK_APP_ID:
        raise HTTPException(status_code=401, detail="Token no pertenece a esta app")

    # Obtener datos del usuario
    try:
        user_info = http_requests.get(
            "https://graph.facebook.com/me",
            params={"fields": "id,name,email", "access_token": payload.access_token},
            timeout=8
        ).json()
    except Exception:
        raise HTTPException(status_code=503, detail="No se pudo obtener información de Facebook")

    fb_id = user_info.get("id")
    email = user_info.get("email")

    if not fb_id:
        raise HTTPException(status_code=400, detail="No se pudo obtener información de Facebook")

    is_new = False

    # Buscar usuario por facebook_id
    user = db.query(User).filter(User.facebook_id == fb_id).first()

    # Si no existe, buscar por email y vincular
    if not user and email:
        user = db.query(User).filter(User.email == email).first()
        if user:
            user.facebook_id = fb_id
            db.commit()

    # Si no existe en absoluto, crear nuevo
    if not user:
        fallback_email = email or f"fb_{fb_id}@facebook.com"
        user = _create_tenant_and_user(db, fallback_email, facebook_id=fb_id)
        is_new = True

    token = create_token(user.id, user.tenant_id, user.is_admin)
    return {"access_token": token, "token_type": "bearer", "is_new": is_new}


@router.post("/google")
def google_login(payload: GoogleLoginRequest, db: Session = Depends(get_db)):
    if not GOOGLE_CLIENT_ID:
        raise HTTPException(status_code=500, detail="Google Login no configurado")

    try:
        verify_res = http_requests.get(
            "https://oauth2.googleapis.com/tokeninfo",
            params={"id_token": payload.credential},
            timeout=8
        ).json()
    except Exception:
        raise HTTPException(status_code=503, detail="No se pudo verificar el token con Google")

    if "error_description" in verify_res or "error" in verify_res:
        raise HTTPException(status_code=401, detail="Token de Google inválido")
    if verify_res.get("aud") != GOOGLE_CLIENT_ID:
        raise HTTPException(status_code=401, detail="Token no pertenece a esta app")

    google_id = verify_res.get("sub")
    email = verify_res.get("email")

    if not google_id:
        raise HTTPException(status_code=400, detail="No se pudo obtener información de Google")

    is_new = False
    user = db.query(User).filter(User.google_id == google_id).first()

    if not user and email:
        user = db.query(User).filter(User.email == email).first()
        if user:
            user.google_id = google_id
            db.commit()

    if not user:
        fallback_email = email or f"google_{google_id}@googleauth.com"
        user = _create_tenant_and_user(db, fallback_email, google_id=google_id)
        is_new = True

    token = create_token(user.id, user.tenant_id, user.is_admin)
    return {"access_token": token, "token_type": "bearer", "is_new": is_new}


class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str


@router.post("/change-password")
def change_password(payload: ChangePasswordRequest, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if not current_user.password_hash:
        raise HTTPException(status_code=400, detail="Tu cuenta usa login social. No podés cambiar la contraseña desde acá.")
    if not verify_password(payload.current_password, current_user.password_hash):
        raise HTTPException(status_code=401, detail="La contraseña actual es incorrecta.")
    if len(payload.new_password) < 8:
        raise HTTPException(status_code=400, detail="La nueva contraseña debe tener al menos 8 caracteres.")
    current_user.password_hash = hash_password(payload.new_password)
    db.commit()
    return {"status": "success"}


@router.get("/me")
def me(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "email": current_user.email,
        "tenant_id": current_user.tenant_id,
        "is_admin": current_user.is_admin,
    }
