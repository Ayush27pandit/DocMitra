import express, { Request, Response } from "express";
import { generateDocument } from "../controllers/documentController";

const router= express.Router();

router.post('/generate',generateDocument);

export default router;