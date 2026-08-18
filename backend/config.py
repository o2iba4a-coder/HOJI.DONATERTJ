import os

APP_ENV = os.getenv("APP_ENV", "development")

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "sqlite:///./hoji_donater.db"
)

PAYMENT_API_KEY = os.getenv("PAYMENT_API_KEY", "")

TOPUP_API_KEY = os.getenv("TOPUP_API_KEY", "")

TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "")
