# config.py

import os


class Config:
    SQLALCHEMY_DATABASE_URI = "postgresql://postgres:root@localhost:5432/smart_complaint"
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    SECRET_KEY = "super-secret-key"

    JWT_SECRET_KEY = "this_is_a_very_secure_super_long_jwt_secret_key_12345"
