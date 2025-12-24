import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    // Optimize for serverless
    mongoose.set('strictQuery', false);
    
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log("DB connected successfully");
  } catch (error) {
    console.error("DB connection error:", error.message);
    // Don't throw in serverless - let the function continue
    // The error will be caught by individual route handlers
  }
};
