from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, JSON, Text, Boolean
from sqlalchemy.orm import relationship
from app.db.base import Base
from datetime import datetime, timezone


def _utcnow():
    return datetime.now(timezone.utc)


class VerticalTemplate(Base):
    __tablename__ = "vertical_templates"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)
    assistant_name = Column(String, default="Asistente")
    system_prompt_base = Column(Text, nullable=False)
    required_fields_schema = Column(JSON, default={})

    tenants = relationship("Tenant", back_populates="template")


class Tenant(Base):
    __tablename__ = "tenants"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    phone_number_id = Column(String, unique=True)

    template_id = Column(Integer, ForeignKey("vertical_templates.id"))
    template = relationship("VerticalTemplate", back_populates="tenants")

    business_config = Column(JSON, default={})

    leads = relationship("Lead", back_populates="tenant")
    subscription = relationship("Subscription", back_populates="tenant", uselist=False)


class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)
    whatsapp_id = Column(String, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))

    status = Column(String, default="NEW")
    extracted_data = Column(JSON, default={})
    created_at = Column(DateTime, default=_utcnow)

    tenant = relationship("Tenant", back_populates="leads")
    conversations = relationship("Conversation", back_populates="lead")


class Conversation(Base):
    __tablename__ = "conversations"

    id = Column(Integer, primary_key=True, index=True)
    lead_id = Column(Integer, ForeignKey("leads.id"))

    role = Column(String)
    content = Column(Text)
    timestamp = Column(DateTime, default=_utcnow)

    lead = relationship("Lead", back_populates="conversations")


class Subscription(Base):
    __tablename__ = "subscriptions"

    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"), unique=True)
    plan = Column(String, nullable=False)  # "essential" | "pro"
    status = Column(String, default="pending")  # pending | active | expired | cancelled
    mp_payment_id = Column(String, nullable=True)
    mp_preference_id = Column(String, nullable=True)
    current_period_start = Column(DateTime, nullable=True)
    current_period_end = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=_utcnow)
    updated_at = Column(DateTime, default=_utcnow)

    tenant = relationship("Tenant", back_populates="subscription")


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=True)
    facebook_id = Column(String, unique=True, nullable=True, index=True)
    google_id = Column(String, unique=True, nullable=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"), nullable=False)
    is_admin = Column(Boolean, default=False, nullable=False, server_default="false")
    created_at = Column(DateTime, default=_utcnow)

    tenant = relationship("Tenant")
