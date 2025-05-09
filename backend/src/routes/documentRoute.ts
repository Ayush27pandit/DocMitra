import express, { Request, Response } from "express";
import { renderDocument } from "../controllers/documentController";
import { generateDocument } from "../controllers/documentController";

const router= express.Router();

router.post('/generate',generateDocument);
router.post('/render',renderDocument)

export default router;