import { Request, Response } from "express";

const signupUserAuth = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  res.status(200).json({ message: "signup successfull", username, password });
};

export default signupUserAuth;
