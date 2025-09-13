import dotenv from "dotenv";
import app from "./app";
import { connectDb } from "./config/db";
dotenv.config();

const PORT = process.env.PORT || 5000;

connectDb();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
