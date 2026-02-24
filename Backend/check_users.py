from app import create_app
from extensions import db
from models.user import User
from werkzeug.security import check_password_hash

app = create_app()

with app.app_context():
    print("\n=== All Users in Database ===")
    users = User.query.all()
    
    if not users:
        print("❌ No users found in database!")
    else:
        for user in users:
            print(f"\nID: {user.id}")
            print(f"Name: {user.name}")
            print(f"Email: {user.email}")
            print(f"Role: {user.role}")
            print(f"Password Hash: {user.password[:50]}...")
    
    print("\n=== Testing Password Verification ===")
    
    # Test admin login
    admin = User.query.filter_by(email="admin@example.com").first()
    if admin:
        is_valid = check_password_hash(admin.password, "admin123")
        print(f"Admin password 'admin123' valid: {is_valid}")
    
    # Test user login
    user = User.query.filter_by(email="user@example.com").first()
    if user:
        is_valid = check_password_hash(user.password, "user123")
        print(f"User password 'user123' valid: {is_valid}")
