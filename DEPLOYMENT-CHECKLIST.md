# Quick Deployment Checklist ✅

## Before You Start
- [ ] GitHub repository is up to date
- [ ] Have MongoDB Atlas connection string
- [ ] Have Cloudinary credentials  
- [ ] Have Stripe API keys
- [ ] Have JWT secret key
- [ ] Created Vercel account

## Deployment Order

### 1️⃣ Backend First
```
Root Directory: backend
Framework: Other
Build Command: (empty)
Output Directory: (empty)
```

**Environment Variables:**
```
MONGODB_URI=
JWT_SECRET=
STRIPE_SECRET_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NODE_ENV=production
```

**After Deploy:** Copy backend URL → `https://your-backend.vercel.app`

---

### 2️⃣ Frontend Second
```
Root Directory: frontend
Framework: Vite
Build Command: npm run build
Output Directory: dist
```

**Environment Variables:**
```
VITE_BACKEND_URL=https://your-backend.vercel.app
```

**After Deploy:** Copy frontend URL → `https://your-frontend.vercel.app`

---

### 3️⃣ Admin Third
```
Root Directory: admin
Framework: Vite
Build Command: npm run build
Output Directory: dist
```

**Environment Variables:**
```
VITE_BACKEND_URL=https://your-backend.vercel.app
```

**After Deploy:** Copy admin URL → `https://your-admin.vercel.app`

---

### 4️⃣ Update Backend CORS

Go back to backend project → Settings → Environment Variables

**Add:**
```
FRONTEND_URL=https://your-frontend.vercel.app
ADMIN_URL=https://your-admin.vercel.app
```

**Then:** Redeploy backend (Deployments → ... → Redeploy)

---

## Testing

- [ ] Backend health: `https://your-backend.vercel.app/health`
- [ ] Frontend loads and shows menu
- [ ] Admin panel login works
- [ ] Can add items to cart
- [ ] Payment flow works

---

## MongoDB Atlas Setup

1. Go to MongoDB Atlas → Network Access
2. Click "Add IP Address"
3. Select "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

This is required for Vercel serverless functions!

---

## Common Issues

**CORS Error?**
→ Check FRONTEND_URL and ADMIN_URL in backend env vars

**Build Failed?**
→ Check build logs, verify package.json

**Database Connection Failed?**
→ Verify MongoDB URI and whitelist IPs

**Images Not Uploading?**
→ Check Cloudinary credentials

---

## Your URLs

After deployment, save these:

```
Backend:  https://_____________________.vercel.app
Frontend: https://_____________________.vercel.app
Admin:    https://_____________________.vercel.app
```

---

📖 **Full Guide:** See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions
