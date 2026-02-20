# models/complaint.py

from extensions import db
from datetime import datetime

class Complaint(db.Model):
    __tablename__ = "complaints"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(100))
    status = db.Column(db.String(50), default="Pending")

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    # Old image field
    image = db.Column(db.String(300), nullable=True)

    # New image_url field for uploaded images
    image_url = db.Column(db.Text, nullable=True)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    updates = db.relationship(
        "Update",
        backref="complaint",
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<Complaint {self.id} - {self.title}>"
