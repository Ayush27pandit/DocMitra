import express from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const authMiddleware= (req: express.Request, res: express.Response, next: express.NextFunction) =>{
   
    try {
        const authHeader= req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer")){
            return res.status(401).json({
                message:"Invalid token"
            })
        }
        const token = authHeader.split(" ")[1];
        const decode = jwt.verify(token, process.env.JWT_KEY as string);
        
        req.userId = (decode as JwtPayload).userId;
        
        next();

    } catch (error) {
        return res.status(401).json({
            message:"Unauthorized"
        })  
    }
   
}

module.exports = {
  authMiddleware,
};