import express from "express";
import cors from "cors";
import usersRoute from "./routes/usersRoute";
import templateRouter from "./routes/templateRoute";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/users", usersRoute);
app.use("/api/v1/templates", templateRouter);

export default app;
