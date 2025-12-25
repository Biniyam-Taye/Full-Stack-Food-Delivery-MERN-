# Full-Stack-Food-Delivery-MERN

A modern, full-stack food delivery application built with the MERN stack (MongoDB, Express.js, React, Node.js).

## 🚀 Features

- **Customer Frontend**: Browse menu, add items to cart, place orders, track order status
- **Admin Dashboard**: Manage food items, categories, orders, and view analytics
- **Backend API**: RESTful API with JWT authentication, Stripe payment integration
- **Image Management**: Cloudinary integration for image uploads
- **Responsive Design**: Mobile-friendly UI with modern aesthetics

## 🛠️ Tech Stack

### Frontend
- React.js with Vite
- React Router for navigation
- Context API for state management
- Axios for API calls
- Modern CSS with responsive design

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT for authentication
- Stripe for payment processing
- Cloudinary for image storage
- Multer for file uploads

### Admin Panel
- Separate React application
- Order management system
- Food item CRUD operations
- Category management

## 📦 Project Structure

```
food-del/
├── frontend/          # Customer-facing React application
├── admin/            # Admin dashboard React application
└── backend/          # Node.js/Express API server
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Cloudinary account
- Stripe account

### Environment Variables

Create `.env` files in the backend directory:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

### Running the Application

1. **Backend Server**
```bash
cd backend
npm install
npm run server
```

2. **Frontend Application**
```bash
cd frontend
npm install
npm run dev
```

3. **Admin Dashboard**
```bash
cd admin
npm install
npm run dev
```

## 🎨 Features Implemented

- ✅ User authentication & authorization
- ✅ Browse food items by category
- ✅ Shopping cart functionality
- ✅ Stripe payment integration
- ✅ Order tracking
- ✅ Admin dashboard for order management
- ✅ Food item management (CRUD)
- ✅ Category management
- ✅ Image upload with Cloudinary
- ✅ Responsive design
- ✅ HD images from Unsplash

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Biniyam Taye**

## 🙏 Acknowledgments

- Images from Unsplash
- Icons and UI inspiration from modern food delivery apps
