# Food Delivery Professional Suite

This project is a full-stack food delivery application featuring a customer frontend, an admin dashboard, and a robust Node.js backend.

## 🚀 Deployment (Vercel)

### 1. Backend
- **Root Directory:** `backend`
- **Environment Variables:**
  - `MONGODB_URI`: Your MongoDB Atlas connection string.
  - `JWT_SECRET`: A secure random string.
  - `STRIPE_SECRET_KEY`: Your Stripe secret key.
  - `CLOUDINARY_CLOUD_NAME`: From Cloudinary Dashboard.
  - `CLOUDINARY_API_KEY`: From Cloudinary Dashboard.
  - `CLOUDINARY_API_SECRET`: From Cloudinary Dashboard.
  - `FRONTEND_URL`: URL of your deployed frontend.
  - `ADMIN_URL`: URL of your deployed admin panel.

### 2. Frontend (Customer App)
- **Root Directory:** `frontend`
- **Environment Variables:**
  - `VITE_BACKEND_URL`: URL of your deployed backend.

### 3. Admin Panel
- **Root Directory:** `admin`
- **Environment Variables:**
  - `VITE_BACKEND_URL`: URL of your deployed backend.

## 🛠️ Local Development

1. **Backend:**
   ```bash
   cd backend
   npm install
   npm run server
   ```

2. **Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Admin:**
   ```bash
   cd admin
   npm install
   npm run dev
   ```

## ✨ Features
- **Cloudinary Integration**: Fully persistent image storage (Vercel-friendly).
- **Responsive Design**: Optimized for both desktop and mobile users.
- **Secure Authentication**: JWT-based login for users.
- **Order Management**: Real-time status updates and Stripe payment integration.
