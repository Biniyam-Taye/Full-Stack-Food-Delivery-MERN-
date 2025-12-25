# Vercel Deployment Guide

This guide will help you deploy your Full-Stack Food Delivery application to Vercel's free tier.

## 📋 Prerequisites

Before deploying, make sure you have:
- A [Vercel account](https://vercel.com/signup) (free)
- Your MongoDB Atlas connection string
- Cloudinary credentials
- Stripe API keys
- JWT secret key

## 🚀 Deployment Steps

### 1. Deploy Backend API

1. **Push your code to GitHub** (already done ✅)

2. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**

3. **Click "Add New Project"**

4. **Import your GitHub repository**
   - Select: `Full-Stack-Food-Delivery-MERN-`

5. **Configure the Backend Project**
   - **Framework Preset**: Other
   - **Root Directory**: `backend`
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave empty)
   - **Install Command**: `npm install`

6. **Add Environment Variables**
   Click "Environment Variables" and add the following:
   
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   NODE_ENV=production
   ```

7. **Click "Deploy"**

8. **Copy your backend URL** (e.g., `https://your-backend.vercel.app`)

### 2. Deploy Frontend (Customer App)

1. **Go back to Vercel Dashboard**

2. **Click "Add New Project"** again

3. **Import the same GitHub repository**

4. **Configure the Frontend Project**
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Add Environment Variables**
   ```
   VITE_BACKEND_URL=https://your-backend.vercel.app
   ```
   (Replace with your actual backend URL from step 1.8)

6. **Click "Deploy"**

7. **Copy your frontend URL** (e.g., `https://your-frontend.vercel.app`)

### 3. Deploy Admin Panel

1. **Go back to Vercel Dashboard**

2. **Click "Add New Project"** again

3. **Import the same GitHub repository**

4. **Configure the Admin Project**
   - **Framework Preset**: Vite
   - **Root Directory**: `admin`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Add Environment Variables**
   ```
   VITE_BACKEND_URL=https://your-backend.vercel.app
   ```
   (Use the same backend URL from step 1.8)

6. **Click "Deploy"**

### 4. Update Backend CORS Settings

After deploying frontend and admin, you need to update the backend environment variables:

1. **Go to your backend project in Vercel**
2. **Click "Settings" → "Environment Variables"**
3. **Add these two new variables:**
   ```
   FRONTEND_URL=https://your-frontend.vercel.app
   ADMIN_URL=https://your-admin.vercel.app
   ```
4. **Redeploy the backend** (Go to Deployments → Click the three dots → Redeploy)

## ✅ Verification

After deployment, verify everything works:

1. **Backend Health Check**
   - Visit: `https://your-backend.vercel.app/health`
   - Should return JSON with status "OK"

2. **Frontend**
   - Visit: `https://your-frontend.vercel.app`
   - Browse menu, add items to cart
   - Test user registration/login

3. **Admin Panel**
   - Visit: `https://your-admin.vercel.app`
   - Login with admin credentials
   - Test adding/editing food items

## 🔧 Troubleshooting

### Issue: CORS Errors
**Solution**: Make sure `FRONTEND_URL` and `ADMIN_URL` are set in backend environment variables

### Issue: Images not uploading
**Solution**: Verify Cloudinary credentials in backend environment variables

### Issue: Payment not working
**Solution**: Check Stripe secret key in backend environment variables

### Issue: Database connection failed
**Solution**: 
- Verify MongoDB URI is correct
- Make sure your MongoDB Atlas allows connections from anywhere (0.0.0.0/0) for Vercel

### Issue: Build fails
**Solution**: 
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node version compatibility

## 📝 Important Notes

1. **Free Tier Limitations**:
   - Serverless functions have a 10-second execution limit
   - 100GB bandwidth per month
   - Automatic sleep after inactivity (cold starts)

2. **Environment Variables**:
   - Never commit `.env` files to GitHub
   - Always use Vercel's environment variable settings
   - Variables starting with `VITE_` are exposed to the browser

3. **MongoDB Atlas**:
   - Use MongoDB Atlas (free tier available)
   - Whitelist all IPs (0.0.0.0/0) for Vercel serverless functions

4. **Custom Domains** (Optional):
   - You can add custom domains in Vercel project settings
   - Free SSL certificates included

## 🎉 Success!

Your food delivery app is now live on Vercel! Share your URLs:
- **Customer App**: `https://your-frontend.vercel.app`
- **Admin Panel**: `https://your-admin.vercel.app`
- **API**: `https://your-backend.vercel.app`

## 🔄 Continuous Deployment

Vercel automatically redeploys when you push to GitHub:
1. Make changes locally
2. Commit and push to GitHub
3. Vercel automatically builds and deploys
4. Check deployment status in Vercel dashboard

---

Need help? Check [Vercel Documentation](https://vercel.com/docs) or open an issue on GitHub.
