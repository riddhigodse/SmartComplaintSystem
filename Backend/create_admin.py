from app import create_app
from extensions import db
from models.user import User
from werkzeug.security import generate_password_hash

app = create_app()

with app.app_context():
    # Check if admin already exists
    admin = User.query.filter_by(email="admin@example.com").first()
    
    if admin:
        print("Admin already exists!")
    else:
        # Create admin user
        admin = User(
            name="Admin",
            email="admin@example.com",
            password=generate_password_hash("admin123"),
            role="admin"
        )
        db.session.add(admin)
        db.session.commit()
        print("✅ Admin created successfully!")
        print("Email: admin@example.com")
        print("Password: admin123")
    
    # Create a test user
    user = User.query.filter_by(email="user@example.com").first()
    
    if user:
        print("Test user already exists!")
    else:
        user = User(
            name="Test User",
            email="user@example.com",
            password=generate_password_hash("user123"),
            role="user"
        )
        db.session.add(user)
        db.session.commit()
        print("✅ Test user created successfully!")
        print("Email: user@example.com")
        print("Password: user123")
