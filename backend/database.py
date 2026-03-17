from __future__ import annotations

from datetime import datetime
from pathlib import Path
from typing import Generator

from sqlalchemy import DateTime, Float, Integer, create_engine
from sqlalchemy.orm import DeclarativeBase, Mapped, Session, mapped_column, sessionmaker

from .utils import get_settings


class Base(DeclarativeBase):
    pass


class CostRequest(Base):
    __tablename__ = "cost_requests"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)

    fiber_length: Mapped[float] = mapped_column(Float, nullable=False)
    premises_count: Mapped[int] = mapped_column(Integer, nullable=False)
    equipment_cost: Mapped[float] = mapped_column(Float, nullable=False)
    labour_cost: Mapped[float] = mapped_column(Float, nullable=False)
    civil_cost: Mapped[float] = mapped_column(Float, nullable=False)
    total_cost: Mapped[float] = mapped_column(Float, nullable=False)

    created_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, default=datetime.utcnow)


def _create_engine():
    settings = get_settings()
    # Ensure the folder for sqlite file exists (e.g. ./data/fttp_cost.db)
    if settings.database_url.startswith("sqlite"):
        Path("data").mkdir(parents=True, exist_ok=True)

    connect_args = {}
    if settings.database_url.startswith("sqlite"):
        connect_args = {"check_same_thread": False}
    return create_engine(settings.database_url, connect_args=connect_args)


engine = _create_engine()
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)


def init_db() -> None:
    Base.metadata.create_all(bind=engine)


def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def save_request(
    db: Session,
    *,
    fiber_length: float,
    premises_count: int,
    equipment_cost: float,
    labour_cost: float,
    civil_cost: float,
    total_cost: float,
) -> CostRequest:
    obj = CostRequest(
        fiber_length=float(fiber_length),
        premises_count=int(premises_count),
        equipment_cost=float(equipment_cost),
        labour_cost=float(labour_cost),
        civil_cost=float(civil_cost),
        total_cost=float(total_cost),
    )
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

