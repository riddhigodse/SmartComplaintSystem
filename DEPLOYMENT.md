# Deployment Guide - Smart Complaint System

## 🚀 Quick Deployment Steps

### Part 1: Deploy Backend on Render

#### 1. Prepare Repository
```bash
# Make sure all changes are committed
git add .
git commit -m "Prepare for deployment"
git push origin main
```

#### 2. Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub account
3. Authorize Render to access your repository

#### 3. Deploy PostgreSQL Database
1. Click "New +" → "PostgreSQL"
2. Name: `smart-complaint-db`
3. Database: `smart_complaint`
4. User: `smart_complaint_user`
5. Region: Choose closest to you
6. Plan: **Free**
7. Click "Create Database"
8. **Save the Internal Database URL** (you'll need this)
postgresql:smart_complaint_user:p5ru3dOpQMsYhhYyLlol8FHNJbwHzag9@dpg-d6f11dngi27c73cqvqug-a/smart_complaint
postgresql://smart_complaint_user:p5ru3dOpQMsYhhYyLlol8FHNJbwHzag9@dpg-d6f11dngi27c73cqvqug-a/smart_complaint
#### 4. Deploy Backend Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Select the repository
4. Configure:
   - **Name**: `smart-complaint-backend`
   - **Region**: Same as database
   - **Branch**: `main`
   - **Root Directory**: `Backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Plan**: **Free**

5. Add Environment Variables:
   - `DATABASE_URL`: Paste the Internal Database URL from step 3
   - `SECRET_KEY`: Generate random string (e.g., `openssl rand -hex 32`)
   - `JWT_SECRET_KEY`: Generate another random string
   - `PYTHON_VERSION`: `3.12.0`

6. Click "Create Web Service"
7. Wait for deployment (5-10 minutes)
8. **Copy your backend URL**: `https://smart-complaint-backend.onrender.com`
   Available at your primary URL https://smart-complaint-backend.onrender.com  

#### 5. Initialize Database
1. Go to Render Dashboard → Your Web Service
2. Click "Shell" tab
3. Run these commands:
```bash
flask db upgrade
python create_admin.py
```

#### 6. Test Backend
Visit: `https://your-backend-url.onrender.com/`

You should see: `{"message": "Smart Complaint Backend is running 🚀"}`

---

### Part 2: Deploy Frontend on Netlify

#### 1. Update Frontend API URL
Edit `frontend/.env.production`:
```env
REACT_APP_API_URL=https://your-backend-url.onrender.com/api
```

Replace `your-backend-url` with your actual Render backend URL.

#### 2. Update Backend CORS
Edit `Backend/app.py` and add your Netlify URL to CORS origins (after deployment).

#### 3. Commit Changes
```bash
git add .
git commit -m "Update production API URL"
git push origin main
```

#### 4. Create Netlify Account
1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub account
3. Authorize Netlify

#### 5. Deploy Frontend
1. Click "Add new site" → "Import an existing project"
2. Choose "GitHub"
3. Select your repository
4. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/build`
   - **Branch**: `main`

5. Add Environment Variable:
   - Key: `REACT_APP_API_URL`
   - Value: `https://your-backend-url.onrender.com/api`

6. Click "Deploy site"
7. Wait for deployment (3-5 minutes)
8. **Copy your frontend URL**: `https://your-app-name.netlify.app`

#### 6. Update Backend CORS (Important!)
Go back to Render → Backend → Environment Variables

Update CORS in `Backend/app.py` to include your Netlify URL:
```python
CORS(app, resources={
    r"/api/*": {
        "origins": [
            "http://localhost:3000",
            "https://your-app-name.netlify.app"
        ]
    }
})
```

Commit and push changes - Render will auto-redeploy.

---

## 🎉 Your App is Live!

**Frontend**: `https://your-app-name.netlify.app`
**Backend**: `https://your-backend-url.onrender.com`

### Default Login Credentials
- **Admin**: admin@example.com / admin123
- **User**: user@example.com / user123

---

## 🔧 Post-Deployment

### Custom Domain (Optional)
**Netlify:**
1. Go to Site settings → Domain management
2. Add custom domain
3. Update DNS records

**Render:**
1. Go to Settings → Custom Domain
2. Add your domain
3. Update DNS records

### Environment Variables
Update these in Render/Netlify dashboards:
- Never commit `.env` files with real credentials
- Use strong SECRET_KEY and JWT_SECRET_KEY in production

### Database Backups
Render Free tier includes automatic backups, but consider:
- Upgrading to paid plan for better backups
- Manual exports periodically

---

## 🐛 Troubleshooting

### Backend Issues

**"Application failed to start"**
- Check Render logs
- Verify all environment variables are set
- Ensure `requirements.txt` is correct

**Database connection error**
- Verify DATABASE_URL is correct
- Check database is running
- Run migrations: `flask db upgrade`

**CORS errors**
- Add frontend URL to CORS origins
- Redeploy backend after changes

### Frontend Issues

**"Failed to fetch"**
- Verify REACT_APP_API_URL is correct
- Check backend is running
- Test backend URL directly

**Build failed**
- Check Node version (should be 18+)
- Clear cache and rebuild
- Check for missing dependencies

**404 on refresh**
- Verify `netlify.toml` redirects are configured
- Check publish directory is correct

---

## 📊 Monitoring

### Render
- View logs in real-time
- Monitor resource usage
- Set up alerts

### Netlify
- View deploy logs
- Monitor bandwidth
- Analytics dashboard

---

## 💰 Free Tier Limits

### Render Free Tier
- 750 hours/month
- Spins down after 15 min inactivity
- First request after sleep takes ~30 seconds
- 100GB bandwidth/month

### Netlify Free Tier
- 100GB bandwidth/month
- 300 build minutes/month
- Unlimited sites

**Note**: Free tier services may sleep when inactive. First request might be slow.

---

## 🚀 Upgrade Options

When you need more:
- **Render**: $7/month for always-on service
- **Netlify**: $19/month for Pro features
- **Database**: Upgrade for more storage/connections

---

## 📝 Maintenance

### Regular Updates
```bash
# Update dependencies
pip install --upgrade -r requirements.txt
npm update

# Run security audit
npm audit fix
```

### Database Migrations
```bash
# Create migration
flask db migrate -m "Description"

# Apply on Render
# Go to Shell tab and run:
flask db upgrade
```

---

## ✅ Deployment Checklist

- [ ] Backend deployed on Render
- [ ] Database created and initialized
- [ ] Admin user created
- [ ] Backend URL copied
- [ ] Frontend .env.production updated
- [ ] Frontend deployed on Netlify
- [ ] CORS configured with Netlify URL
- [ ] Both services tested
- [ ] Login working
- [ ] Complaint creation working
- [ ] Image upload working
- [ ] Admin dashboard working

---

**Need Help?** Check logs first, then refer to troubleshooting section.

**Good Luck! 🎉**
