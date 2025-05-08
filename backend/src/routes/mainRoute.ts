import { Request, Response } from "express";

const express = require("express");
const mainRoute = express.Router();

// Import sub-routers
const userRouter = require("./user");
const courseRouter = require("./course");
const adminRouter = require("./admin");

// Use the routers
mainRoute.use("/user", userRouter);
mainRoute.use("/courses", courseRouter);
mainRoute.use("/admin", adminRouter);

// Default route for API versioning check
mainRoute.get("/", (req:Request, res:Response) => {
  res.json({ message: "Welcome to API v1" });
});

// Handle 404 for unknown routes
mainRoute.use((req:Request, res:Response) => {
  res.status(404).json({ error: "Route not found" });
});

module.exports = mainRoute;