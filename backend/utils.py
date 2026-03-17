import logging
from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    database_url: str = "sqlite:///./data/fttp_cost.db"
    model_path: str = "models/cost_model.pkl"
    anomaly_model_path: str = "models/anomaly_model.pkl"
    log_level: str = "INFO"

    # LLM settings (set at runtime via env vars / .env)
    groq_api_key: str | None = None
    groq_model: str = "llama-3.1-8b-instant"

    hf_api_token: str | None = None
    hf_model: str = "mistralai/Mistral-7B-Instruct-v0.3"


@lru_cache
def get_settings() -> Settings:
    return Settings()


def configure_logging(log_level: str) -> None:
    logging.basicConfig(
        level=getattr(logging, log_level.upper(), logging.INFO),
        format="%(asctime)s %(levelname)s %(name)s - %(message)s",
    )

