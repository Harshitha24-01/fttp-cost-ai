from __future__ import annotations

import os
from datetime import datetime, timedelta, timezone
from typing import Any, Literal

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel, Field
from sqlalchemy import select
from sqlalchemy.orm import Session

from .database import Base, SessionLocal


ROLE_ADMIN = "Admin"
ROLE_PLANNER = "Planner"
ROLE_ANALYST = "Analyst"
ROLE_USER = "User"

AllowedRole = Literal["Admin", "Planner", "Analyst", "User"]
ALLOWED_ROLES: set[str] = {ROLE_ADMIN, ROLE_PLANNER, ROLE_ANALYST, ROLE_USER}

JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "dev-change-me")  # override in prod
ACCESS_TOKEN_EXPIRE_SECONDS = int(os.getenv("JWT_EXPIRE_SECONDS", "3600"))

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
bearer_scheme = HTTPBearer(auto_error=False)

router = APIRouter(tags=["auth"])


# SQLAlchemy model for auth users
from sqlalchemy.orm import Mapped, mapped_column  # noqa: E402
from sqlalchemy import Integer, String
from sqlalchemy import DateTime


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    username: Mapped[str] = mapped_column(String, nullable=False, unique=True, index=True)
    password: Mapped[str] = mapped_column(String, nullable=False)
    role: Mapped[str] = mapped_column(String, nullable=False, default=ROLE_USER)
    created_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, default=datetime.utcnow)


class RegisterRequest(BaseModel):
    username: str = Field(..., min_length=3)
    password: str = Field(..., min_length=6)
    role: AllowedRole = ROLE_USER


class LoginRequest(BaseModel):
    username: str
    password: str


class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str


def _get_db() -> Session:
    # Local DB session for auth routes (keeps auth.py self-contained).
    return SessionLocal()


def _hash_password(password: str) -> str:
    return pwd_context.hash(password)


def _verify_password(password: str, hashed_password: str) -> bool:
    return pwd_context.verify(password, hashed_password)


def _create_access_token(*, username: str, role: str) -> str:
    now = datetime.now(timezone.utc)
    exp = now + timedelta(seconds=ACCESS_TOKEN_EXPIRE_SECONDS)
    to_encode: dict[str, Any] = {
        "sub": username,
        "role": role,
        "iat": int(now.timestamp()),
        "exp": int(exp.timestamp()),
    }
    return jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)


def _get_user_by_username(db: Session, username: str) -> User | None:
    stmt = select(User).where(User.username == username)
    return db.execute(stmt).scalars().first()


def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
) -> dict[str, Any]:
    if not credentials:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing authorization token")

    token = credentials.credentials
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
        username = str(payload.get("sub") or "")
        role = str(payload.get("role") or "")
        if not username or role not in ALLOWED_ROLES:
            raise HTTPException(status_code=401, detail="Invalid token payload")
        return {"username": username, "role": role}
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token")


def require_roles(roles: set[str]):
    def _dep(user: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
        if user["role"] not in roles:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not enough permissions")
        return user

    return _dep


@router.post("/register", response_model=AuthResponse)
def register(payload: RegisterRequest) -> AuthResponse:
    db = _get_db()
    try:
        existing = _get_user_by_username(db, payload.username)
        if existing:
            raise HTTPException(status_code=400, detail="Username already exists")

        user = User(
            username=payload.username,
            password=_hash_password(payload.password),
            role=payload.role,
        )
        db.add(user)
        db.commit()
        db.refresh(user)

        token = _create_access_token(username=user.username, role=user.role)
        return AuthResponse(access_token=token, role=user.role)
    finally:
        db.close()


@router.post("/login", response_model=AuthResponse)
def login(payload: LoginRequest) -> AuthResponse:
    db = _get_db()
    try:
        user = _get_user_by_username(db, payload.username)
        if not user or not _verify_password(payload.password, user.password):
            raise HTTPException(status_code=401, detail="Invalid username or password")

        token = _create_access_token(username=user.username, role=user.role)
        return AuthResponse(access_token=token, role=user.role)
    finally:
        db.close()

