import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import zod from 'zod';
import { User } from '../models';

import dotenv from 'dotenv';
dotenv.config();

const signupSchema = zod.object({
    username: zod.string().min(3).max(20),
    email: zod.string().email(),
    password: zod.string().min(6).max(20),
})
const loginSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6).max(20),
})

export const signup =async (req: express.Request, res: express.Response):Promise<any> => {
    const { username, email, password } = req.body;
    const { success, error } = await signupSchema.safeParseAsync({ username, email, password });
    if (!success) {
        return res.status(400).json({ error: error.errors[0].message, message: "Signup Validation error" });
    }
    const existingUser= await User.findOne({email:req.body.email})
    if(existingUser){
        return res.status(400).json({
            message:`${username} already exist`
        })
    }

    const hashPassword= await bcrypt.hash(password,10);

    const user= await User.create({
        username:username,
        email:email,
        password:hashPassword
    })

    const userId= user._id;

    //jwt
    const token= jwt.sign({
        userId,
    },process.env.JWT_KEY as string)
    
    return res.status(200).json({
        message:"Signup successfull",
        token,
    })   
}

export const login = async (req: express.Request, res: express.Response):Promise<any> => {

    const{email, password}= req.body;
    const {success, error}= await loginSchema.safeParseAsync({email,password});
    if(!success){
        return res.status(400).json({
            message:"Invalid login Inputs"
        })
    }

    const user= await User.findOne({email});

    if(!user){
        return res.status(404).json({
            message:"User don't exist . Please SignUp first "
        })
    }

    if(await bcrypt.compare(req.body.password,user.password)){
        const token=jwt.sign({
            userId:user._id
        },process.env.JWT_KEY as string)

        return res.status(200).json({
        message:"Login succesfull",
        token,
        })
    }
    else{
        return res.status(404).json({
            message:"Incorrect password"
        })
    }    
}