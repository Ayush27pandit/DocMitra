import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoURL = process.env.MONGO_URL as string;

export const connectDB = async () => {
  if (!mongoURL) {
    console.error(" Mongo URL not found in environment variables");
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoURL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error(" MongoDB connection failed:", error);
    process.exit(1);
  }
};
