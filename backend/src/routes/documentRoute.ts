import express, { Request, Response } from "express";
import { renderDocument } from "../controllers/documentController";
import { generateDocument } from "../controllers/documentController";
import { authMiddleware } from "../middleware/authmiddleware";

const router= express.Router();

router.post('/generate',authMiddleware,generateDocument);
router.post('/render',authMiddleware,renderDocument)

export default router;