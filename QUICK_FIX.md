# 🚨 QUICK FIX - Page Not Found Error

## Immediate Actions Required

### 1️⃣ Go to Vercel Dashboard
Visit: https://vercel.com/dashboard

### 2️⃣ Select Your Backend Project
Click on your backend deployment project

### 3️⃣ Fix Root Directory
- Go to **Settings** → **General**
- Find **Root Directory**
- Enter: `backend`
- Click **Save**

### 4️⃣ Add Environment Variables
Go to **Settings** → **Environment Variables**

Add these (replace with your actual values):

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your_secret_key_here
STRIPE_SECRET_KEY=sk_test_xxxxx
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=https://your-frontend.vercel.app
ADMIN_URL=https://your-admin.vercel.app
NODE_ENV=production
```

**Important:** Select all three environments (Production, Preview, Development) for each variable!

### 5️⃣ Redeploy
- Go to **Deployments** tab
- Click latest deployment
- Click **⋯** (three dots)
- Select **Redeploy**
- Click **Redeploy** button

### 6️⃣ Test Your Backend
After deployment completes, visit:

```
https://your-backend-url.vercel.app/
```

You should see: **"API working"**

Also test:
```
https://your-backend-url.vercel.app/health
```

You should see a JSON response with status "OK"

---

## ✅ Success Checklist

- [ ] Root Directory = `backend`
- [ ] All 9 environment variables added
- [ ] Project redeployed
- [ ] Root URL shows "API working"
- [ ] /health endpoint shows "OK" status
- [ ] All env vars show "configured" in health check

---

## 🆘 Still Not Working?

### Check Deployment Logs
1. Go to your deployment in Vercel
2. Click **View Function Logs**
3. Look for errors

### Common Errors:

**"Module not found"**
→ Missing dependencies, redeploy with fresh install

**"Cannot connect to database"**
→ Check MONGODB_URI and MongoDB Atlas IP whitelist

**"Environment variable undefined"**
→ Verify all env vars are added and saved

**"CORS error"**
→ Update FRONTEND_URL and ADMIN_URL

---

## 📞 Need More Help?

Check the full guide: `DEPLOYMENT_GUIDE.md`

Or share:
1. Your Vercel deployment URL
2. Screenshot of the error
3. Function logs from Vercel
