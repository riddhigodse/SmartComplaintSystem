# 🚀 Quick Deployment Checklist

## Before You Start
- [ ] Git repository created and pushed to GitHub
- [ ] All code committed and pushed
- [ ] Tested locally (backend + frontend working)

## Backend Deployment (Render)
1. [ ] Create Render account at render.com
2. [ ] Create PostgreSQL database
3. [ ] Copy Internal Database URL
4. [ ] Create Web Service
5. [ ] Set environment variables:
   - [ ] DATABASE_URL
   - [ ] SECRET_KEY
   - [ ] JWT_SECRET_KEY
6. [ ] Wait for deployment
7. [ ] Run in Shell: `flask db upgrade`
8. [ ] Run in Shell: `python create_admin.py`
9. [ ] Test: Visit `https://your-backend.onrender.com/`
10. [ ] Copy backend URL

## Frontend Deployment (Netlify)
1. [ ] Update `frontend/.env.production` with backend URL
2. [ ] Commit and push changes
3. [ ] Create Netlify account at netlify.com
4. [ ] Import project from GitHub
5. [ ] Set base directory: `frontend`
6. [ ] Set build command: `npm run build`
7. [ ] Set publish directory: `frontend/build`
8. [ ] Add environment variable: REACT_APP_API_URL
9. [ ] Deploy site
10. [ ] Copy frontend URL

## Final Steps
1. [ ] Update Backend CORS with Netlify URL
2. [ ] Commit and push (auto-redeploys)
3. [ ] Test login on live site
4. [ ] Test complaint creation
5. [ ] Test admin dashboard
6. [ ] Test image upload

## URLs to Save
- Backend: `https://__________________.onrender.com`
- Frontend: `https://__________________.netlify.app`
- Database: `postgresql://________________`

## Login Credentials
- Admin: admin@example.com / admin123
- User: user@example.com / user123

## Common Issues
- **CORS Error**: Add Netlify URL to backend CORS
- **API Not Found**: Check REACT_APP_API_URL
- **Slow First Load**: Render free tier sleeps (normal)
- **Build Failed**: Check logs in dashboard

---
**Total Time**: ~30-45 minutes
**Cost**: $0 (Free tier)
