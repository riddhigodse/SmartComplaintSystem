import os

class Config:
    # Get database URL from environment
    database_url = os.environ.get("DATABASE_URL")

    # Local fallback if not provided
    if not database_url:
        database_url = "postgresql://postgres:root@localhost:5432/smart_complaint"

    # Fix Render old postgres:// issue
    if database_url.startswith("postgres://"):
        database_url = database_url.replace("postgres://", "postgresql://", 1)

    SQLALCHEMY_DATABASE_URI = database_url
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Security Keys
    SECRET_KEY = os.environ.get("SECRET_KEY") or "super-secret-key"
    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY") or "this_is_a_very_secure_super_long_jwt_secret_key_12345"