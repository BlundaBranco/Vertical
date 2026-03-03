from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.db_models import User, Tenant, VerticalTemplate
from app.services.auth_service import verify_password, hash_password, create_token, get_current_user

router = APIRouter(prefix="/auth", tags=["auth"])


class LoginRequest(BaseModel):
    email: str
    password: str


class RegisterRequest(BaseModel):
    email: str
    password: str


@router.post("/login")
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()
    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Credenciales incorrectas")
    token = create_token(user.id, user.tenant_id)
    return {"access_token": token, "token_type": "bearer"}


@router.post("/register")
def register(payload: RegisterRequest, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == payload.email).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email ya registrado")

    template = db.query(VerticalTemplate).filter(VerticalTemplate.name == "real_estate_v1").first()

    tenant = Tenant(
        phone_number_id=None,
        template_id=template.id if template else None,
        business_config={}
    )
    db.add(tenant)
    db.flush()

    user = User(
        email=payload.email,
        password_hash=hash_password(payload.password),
        tenant_id=tenant.id
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_token(user.id, user.tenant_id)
    return {"access_token": token, "token_type": "bearer"}


@router.get("/me")
def me(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "email": current_user.email,
        "tenant_id": current_user.tenant_id
    }
