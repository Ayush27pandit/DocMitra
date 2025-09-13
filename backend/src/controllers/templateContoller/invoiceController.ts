import { Request, Response } from "express";
import { Invoice } from "../../models/users/templates/invoice/invoiceSchema";
import { invoiceSchema } from "./validation/invoiceValidation";

export const invoiceController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const parsedata = invoiceSchema.safeParse(req.body);
    if (!parsedata.success) {
      res.status(400).json({
        message: "Invalid invoice data",
        errors: parsedata.error.format(),
      });
      return;
    }

    await Invoice.create(parsedata.data);

    res.status(201).json({ message: "invoice created to db" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
