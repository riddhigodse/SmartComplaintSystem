from flask import Blueprint, request, jsonify
from models.user import User
from models import db
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

user_bp = Blueprint("user_bp", __name__)

# ===============================
# REGISTER
# ===============================
@user_bp.route("/register", methods=["POST"])
def register():
    data = request.json

    # Check if user already exists
    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"message": "User already exists ❌"}), 400

    # Create new user
    user = User(
        name=data["name"],
        email=data["email"],
        password=data["password"],
        role=data.get("role", "user")
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User registered successfully ✅"}), 201


# ===============================
# LOGIN (WITH JWT TOKEN)
# ===============================
@user_bp.route("/login", methods=["POST"])
def login():
    data = request.json

    # Check user credentials
    user = User.query.filter_by(
        email=data["email"],
        password=data["password"]
    ).first()

    if not user:
        return jsonify({"message": "Invalid credentials ❌"}), 401

    # 🔐 Create JWT Token
    access_token = create_access_token(identity=user.id)

    return jsonify({
        "message": "Login successful ✅",
        "access_token": access_token,
        "user": {
            "id": user.id,
            "name": user.name,
            "role": user.role
        }
    }), 200


# ===============================
# PROTECTED ROUTE (TEST)
# ===============================
@user_bp.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()

    return jsonify({
        "message": "You are authorized ✅",
        "logged_in_user_id": current_user_id
    }), 200
