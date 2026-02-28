from models.update import Update
import os
import uuid
from flask import Blueprint, request, jsonify, send_from_directory
from extensions import db
from models.complaint import Complaint
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename

complaint_bp = Blueprint('complaint_bp', __name__)

# Upload folder setup
UPLOAD_FOLDER = os.path.join(os.getcwd(), "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ---------------------------
# Create Complaint (User)
# ---------------------------
@complaint_bp.route("/complaints", methods=["POST"])
@jwt_required()
def create_complaint():
    user_id = int(get_jwt_identity())

    title = request.form.get("title")
    category = request.form.get("category")
    description = request.form.get("description")
    image = request.files.get("image")

    if not title or not description:
        return jsonify({"message": "Title and description are required"}), 400

    image_url = None

    if image:
        # Generate unique filename (VERY IMPORTANT FIX)
        original_filename = secure_filename(image.filename)
        unique_filename = f"{uuid.uuid4().hex}_{original_filename}"
        image_path = os.path.join(UPLOAD_FOLDER, unique_filename)
        image.save(image_path)

        # Store only filename (clean DB structure)
        image_url = unique_filename

    complaint = Complaint(
        title=title,
        category=category,
        description=description,
        image_url=image_url,
        user_id=user_id
    )

    db.session.add(complaint)
    db.session.commit()

    return jsonify({
        "message": "Complaint created successfully",
        "complaint_id": complaint.id
    }), 201


# ---------------------------
# GET Complaints for Logged-in User
# ---------------------------
@complaint_bp.route("/user/complaints", methods=["GET"])
@jwt_required()
def get_user_complaints():
    current_user_id = int(get_jwt_identity())

    complaints = Complaint.query.filter_by(user_id=current_user_id).all()

    result = []
    for c in complaints:
        updates = Update.query.filter_by(complaint_id=c.id).all()

        result.append({
            "id": c.id,
            "title": c.title,
            "category": c.category,
            "description": c.description,
            "status": c.status,
            "image_url": f"{request.host_url}uploads/{c.image_url}" if c.image_url else None,
            "created_at": c.created_at,
            "updates": [
                {
                    "id": u.id,
                    "remark": u.remark,
                    "updated_by": u.updated_by,
                    "created_at": u.created_at
                } for u in updates
            ]
        })

    return jsonify(result), 200


# ---------------------------
# GET All Complaints (Admin)
# ---------------------------
@complaint_bp.route("/complaints", methods=["GET"])
@jwt_required()
def get_all_complaints_admin():
    complaints = Complaint.query.all()

    result = []
    for c in complaints:
        updates = Update.query.filter_by(complaint_id=c.id).all()

        result.append({
            "id": c.id,
            "title": c.title,
            "category": c.category,
            "description": c.description,
            "status": c.status,
            "image_url": f"{request.host_url}uploads/{c.image_url}" if c.image_url else None,
            "created_at": c.created_at,
            "user_id": c.user_id,
            "updates": [
                {
                    "id": u.id,
                    "remark": u.remark,
                    "updated_by": u.updated_by,
                    "created_at": u.created_at
                } for u in updates
            ]
        })

    return jsonify(result), 200


# ---------------------------
# Add Remark
# ---------------------------
@complaint_bp.route("/complaints/<int:complaint_id>/remark", methods=["PUT"])
@jwt_required()
def add_remark(complaint_id):
    data = request.get_json()
    remark_text = data.get("remark")

    if not remark_text:
        return jsonify({"message": "Remark cannot be empty"}), 400

    update = Update(
        complaint_id=complaint_id,
        remark=remark_text,
        updated_by=int(get_jwt_identity())
    )

    db.session.add(update)
    db.session.commit()

    return jsonify({"message": "Remark added successfully"}), 200


# ---------------------------
# Update Status
# ---------------------------
@complaint_bp.route("/complaints/<int:complaint_id>/status", methods=["PUT"])
@jwt_required()
def update_status(complaint_id):
    data = request.get_json()
    status = data.get("status")

    if not status:
        return jsonify({"message": "Status cannot be empty"}), 400

    complaint = Complaint.query.get_or_404(complaint_id)
    complaint.status = status
    db.session.commit()

    return jsonify({"message": "Status updated successfully"}), 200


# ---------------------------
# DELETE Complaint
# ---------------------------
@complaint_bp.route("/complaints/<int:complaint_id>", methods=["DELETE"])
@jwt_required()
def delete_complaint(complaint_id):
    current_user_id = int(get_jwt_identity())

    complaint = Complaint.query.get_or_404(complaint_id)

    if complaint.user_id != current_user_id:
        return jsonify({"message": "Not authorized"}), 403

    # Delete image file from folder (CLEANUP FIX)
    if complaint.image_url:
        image_path = os.path.join(UPLOAD_FOLDER, complaint.image_url)
        if os.path.exists(image_path):
            os.remove(image_path)

    db.session.delete(complaint)
    db.session.commit()

    return jsonify({"message": "Complaint deleted successfully"}), 200