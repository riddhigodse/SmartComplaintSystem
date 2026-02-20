from extensions import db

class Update(db.Model):
    __tablename__ = "updates"

    id = db.Column(db.Integer, primary_key=True)

    complaint_id = db.Column(
        db.Integer,
        db.ForeignKey("complaints.id"),
        nullable=False
    )

    # Admin remark / update message
    remark = db.Column(db.Text, nullable=False)

    # Admin user id who added update
    updated_by = db.Column(db.Integer, nullable=False)

    created_at = db.Column(
        db.DateTime,
        server_default=db.func.now()
    )

    def __repr__(self):
        return f"<Update {self.id} for Complaint {self.complaint_id}>"
