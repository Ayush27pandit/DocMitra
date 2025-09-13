import mongoose from "mongoose";

export const connectDb = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("connected to db");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
