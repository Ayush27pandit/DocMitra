import { Request, Response } from "express";

export const loginUserAuth = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, password } = req.body;
  res.status(200).json({ message: "login successfull", username, password });
};
