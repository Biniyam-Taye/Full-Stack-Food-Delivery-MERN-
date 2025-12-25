import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.error("MONGODB_URI is not defined in environment variables. DB connection skipped.");
      return;
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
  }
};
