import express from "express";
import { invoiceController } from "../controllers/templateContoller/invoiceController";

const templateRouter = express.Router();

templateRouter.post("/invoice", invoiceController);
export default templateRouter;
