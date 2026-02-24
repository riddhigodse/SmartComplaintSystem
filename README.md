# Smart Complaint & Issue Tracking System

A digital platform to raise, track, and resolve complaints transparently and efficiently. Built with React frontend and Flask backend.

## 🚀 Features

### User Features
- User registration and login with JWT authentication
- Create complaints with title, category, description, and image upload
- View all personal complaints with status tracking
- Real-time updates and remarks from admin
- Delete own complaints
- Secure logout functionality

### Admin Features
- Admin login with role-based access control
- View all complaints from all users
- Update complaint status (Pending, In Progress, Resolved, Closed)
- Add remarks/updates to complaints
- Track complaint history with timestamps

### Security Features
- JWT token-based authentication
- Password hashing with werkzeug
- Role-based access control (User/Admin)
- Protected API routes
- CORS enabled for cross-origin requests

## 🛠️ Tech Stack

### Frontend
- React 19.2.4
- React Router DOM 7.13.0
- Axios 1.13.5
- CSS-in-JS styling

### Backend
- Flask 3.0.3
- Flask-JWT-Extended 4.7.1
- Flask-SQLAlchemy 3.1.1
- Flask-CORS 6.0.2
- PostgreSQL database
- Werkzeug security

## 📋 Prerequisites

- Python 3.8+
- Node.js 14+
- PostgreSQL database
- npm or yarn

## 🔧 Installation

### Backend Setup

1. Navigate to Backend directory:
```bash
cd Backend
```

2. Create virtual environment:
```bash
python -m venv venv
```

3. Activate virtual environment:
```bash
# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Configure database in `config.py`:
```python
SQLALCHEMY_DATABASE_URI = "postgresql://username:password@localhost:5432/smart_complaint"
```

6. Initialize database:
```bash
flask db upgrade
```

7. Create admin user:
```bash
python create_admin.py
```

8. Run backend server:
```bash
python app.py
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure API URL in `.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start development server:
```bash
npm start
```

Frontend will run on `http://localhost:3000`

## 👤 Default Credentials

After running `create_admin.py`, use these credentials:

**Admin Login:**
- Email: `admin@example.com`
- Password: `admin123`

**Test User Login:**
- Email: `user@example.com`
- Password: `user123`

## 📁 Project Structure

```
SmartComplaintSystem/
├── Backend/
│   ├── models/
│   │   ├── user.py          # User model
│   │   ├── complaint.py     # Complaint model
│   │   └── update.py        # Update/Remark model
│   ├── routes/
│   │   ├── auth_routes.py   # Authentication endpoints
│   │   └── complaint_routes.py  # Complaint CRUD endpoints
│   ├── migrations/          # Database migrations
│   ├── uploads/             # Uploaded images
│   ├── app.py              # Flask application
│   ├── config.py           # Configuration
│   ├── extensions.py       # Flask extensions
│   └── requirements.txt    # Python dependencies
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── HomePage.js
    │   │   ├── UserLogin.js
    │   │   ├── AdminLogin.js
    │   │   ├── CreateComplaint.js
    │   │   └── ComplaintList.js
    │   ├── admin/
    │   │   └── AdminDashboard.js
    │   ├── services/
    │   │   └── api.js       # Axios configuration
    │   ├── UserDashboard.js
    │   └── App.js
    └── package.json
```

## 🔌 API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - User/Admin login
- `GET /api/protected` - Test JWT authentication

### Complaints
- `POST /api/complaints` - Create complaint (User)
- `GET /api/user/complaints` - Get user's complaints
- `GET /api/complaints` - Get all complaints (Admin)
- `PUT /api/complaints/:id/status` - Update status (Admin)
- `PUT /api/complaints/:id/remark` - Add remark (Admin)
- `DELETE /api/complaints/:id` - Delete complaint (User)

## 🎨 Categories

- Internet
- Water
- Electricity
- Technical
- Billing
- Service

## 📊 Complaint Status

- Pending (default)
- In Progress
- Resolved
- Closed

## 🔒 Security Notes

- All passwords are hashed using werkzeug's `generate_password_hash`
- JWT tokens expire after 15 minutes (configurable)
- Protected routes require valid JWT token
- Users can only delete their own complaints
- Admin role is assigned manually (not through registration)

## 🐛 Troubleshooting

### Backend Issues

**Database connection error:**
```bash
# Check PostgreSQL is running
# Verify database credentials in config.py
```

**Module not found:**
```bash
pip install -r requirements.txt
```

### Frontend Issues

**API connection error:**
```bash
# Verify backend is running on port 5000
# Check REACT_APP_API_URL in .env
# Clear cache: rm -rf node_modules/.cache
```

**Login not working:**
```bash
# Check browser console for errors
# Verify JWT token in localStorage
# Ensure backend /api/login endpoint is accessible
```

## 📝 Development

### Adding New Features

1. **Backend**: Add routes in `routes/` directory
2. **Frontend**: Add components in `src/components/`
3. **Database**: Create models in `models/` and run migrations

### Database Migrations

```bash
# Create migration
flask db migrate -m "Description"

# Apply migration
flask db upgrade
```

## 🚀 Deployment

### Backend (Render/Heroku)
1. Set environment variables
2. Configure production database
3. Update CORS settings
4. Deploy using Git

### Frontend (Netlify/Vercel)
1. Build production: `npm run build`
2. Set REACT_APP_API_URL to production backend
3. Deploy build folder

## 📄 License

This project is for educational purposes.

## 👥 Contributors

- Developer: [Your Name]

## 📞 Support

For issues and questions, please create an issue in the repository.

---

**Made with ❤️ using React and Flask**
