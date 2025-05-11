import express from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

export const authMiddleware= (req: express.Request, res: express.Response, next: express.NextFunction):void =>{
   
    try {
        const authHeader= req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")){
             res.status(401).json({
                message:"Invalid token"
            })
            return
        }
        const token = authHeader.split(" ")[1];
        const decode = jwt.verify(token, process.env.JWT_KEY as string) as JwtPayload;
        
        req.userId = decode.userId;
        
        next();

    } catch (error) {
        res.status(401).json({
            message:"Unauthorized"
        })  
        return;
    }
   
}

