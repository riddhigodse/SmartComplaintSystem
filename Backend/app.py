from flask import Flask, send_from_directory
from flask_cors import CORS
from config import Config
from extensions import db
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate

def create_app():
    app = Flask(__name__)

    # Load configuration
    app.config.from_object(Config)

    # Initialize Extensions
    # Enable CORS only for your frontend origin
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
    
    db.init_app(app)
    JWTManager(app)
    Migrate(app, db)

    # Import models AFTER db initialization
    with app.app_context():
        from models.user import User
        from models.complaint import Complaint
        from models.update import Update

    # Register Blueprints with /api prefix
    from routes.auth_routes import auth_bp
    from routes.complaint_routes import complaint_bp

    app.register_blueprint(auth_bp, url_prefix="/api")
    app.register_blueprint(complaint_bp, url_prefix="/api")

    # Serve uploaded images
    @app.route("/uploads/<path:filename>")
    def uploaded_file(filename):
        return send_from_directory("uploads", filename)

    # Home route
    @app.route("/")
    def home():
        return {"message": "Smart Complaint Backend is running 🚀"}

    return app


# Create app instance
app = create_app()

if __name__ == "__main__":
    # Run backend on all interfaces at port 5000
    app.run(debug=True, host="0.0.0.0", port=5000)