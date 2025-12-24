# 🚀 Vercel Deployment Guide - Troubleshooting "Page Not Found"

## Current Issue
Your backend is deployed but showing "Page Not Found" error.

## ✅ Step-by-Step Fix

### 1. **Verify Vercel Project Settings**

Go to your Vercel dashboard for the backend project:

#### A. Root Directory Setting
- Click on **Settings** → **General**
- Set **Root Directory** to: `backend`
- Click **Save**

#### B. Build & Development Settings
- **Framework Preset**: Other
- **Build Command**: (leave empty)
- **Output Directory**: (leave empty)
- **Install Command**: `npm install`

### 2. **Configure Environment Variables**

Go to **Settings** → **Environment Variables** and add:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=https://your-frontend.vercel.app
ADMIN_URL=https://your-admin.vercel.app
NODE_ENV=production
PORT=4000
```

**Important:** Make sure to select **Production**, **Preview**, and **Development** for each variable.

### 3. **Redeploy the Backend**

After updating settings:
1. Go to **Deployments** tab
2. Click on the latest deployment
3. Click the **⋯** (three dots) menu
4. Select **Redeploy**
5. Check **Use existing Build Cache** (optional)
6. Click **Redeploy**

### 4. **Test Your Deployment**

Once deployed, test these endpoints:

```bash
# Test root endpoint
https://your-backend.vercel.app/

# Should return: "API working"

# Test API endpoints
https://your-backend.vercel.app/api/food
https://your-backend.vercel.app/api/user
```

## 🔍 Common Issues & Solutions

### Issue 1: "Page Not Found" on Root URL
**Cause:** Root directory not set correctly
**Fix:** Set Root Directory to `backend` in Vercel settings

### Issue 2: "Internal Server Error"
**Cause:** Missing environment variables
**Fix:** Add all required environment variables in Vercel dashboard

### Issue 3: "Cannot connect to MongoDB"
**Cause:** MongoDB connection string not configured or incorrect
**Fix:** 
- Verify `MONGODB_URI` in Vercel environment variables
- Ensure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Check MongoDB Atlas → Network Access → Add IP Address → Allow Access from Anywhere

### Issue 4: CORS Errors
**Cause:** Frontend/Admin URLs not whitelisted
**Fix:** Ensure `FRONTEND_URL` and `ADMIN_URL` are correctly set in environment variables

### Issue 5: "Function Invocation Timeout"
**Cause:** Database connection taking too long
**Fix:** 
- Use MongoDB Atlas (not local MongoDB)
- Optimize database queries
- Add connection pooling

## 📝 Deployment Checklist

- [ ] Root Directory set to `backend`
- [ ] All environment variables added
- [ ] MongoDB Atlas IP whitelist includes 0.0.0.0/0
- [ ] Cloudinary credentials are correct
- [ ] Frontend and Admin URLs are correct
- [ ] Project redeployed after changes
- [ ] Root endpoint (/) returns "API working"
- [ ] API endpoints are accessible

## 🛠️ Alternative: Deploy from Backend Directory

If you're deploying the entire monorepo and want to deploy backend separately:

### Option A: Deploy Backend Only (Recommended)
1. Create a new Vercel project
2. Import your GitHub repository
3. Set Root Directory to `backend`
4. Add environment variables
5. Deploy

### Option B: Use Vercel CLI
```bash
cd backend
vercel --prod
```

## 🔗 Update Frontend & Admin

After backend is deployed successfully, update your frontend and admin:

### Frontend `.env`:
```
VITE_BACKEND_URL=https://your-backend.vercel.app
```

### Admin `.env`:
```
VITE_BACKEND_URL=https://your-backend.vercel.app
```

Then redeploy both frontend and admin.

## 📞 Still Having Issues?

Check Vercel deployment logs:
1. Go to your project in Vercel
2. Click on the latest deployment
3. Click on **View Function Logs**
4. Look for error messages

Common log errors:
- `Module not found`: Missing dependencies
- `Connection timeout`: Database connection issues
- `Environment variable undefined`: Missing env vars
