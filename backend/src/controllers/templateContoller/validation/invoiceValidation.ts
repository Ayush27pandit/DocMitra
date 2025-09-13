// src/validations/invoiceValidation.ts
import { z } from "zod";

export const invoiceItemSchema = z.object({
  id: z.string().uuid().optional(), // frontend may generate, backend can overwrite
  description: z.string().min(1, "Item description is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  unit: z.string().optional(),
  rate: z.number().nonnegative(),
  amount: z.number().nonnegative(),
});

export const invoiceSchema = z.object({
  companyName: z.string().min(1),
  companyAddress: z.string().min(1),
  companyCity: z.string().min(1),
  companyPhone: z.string().optional(),
  companyEmail: z.string().email(),
  companyWebsite: z.string().url().optional(),

  businessRegistration: z.string().optional(),
  taxId: z.string().optional(),
  vatNumber: z.string().optional(),

  invoiceNumber: z.string().min(1),
  issueDate: z.coerce.date(),
  dueDate: z.coerce.date(),
  poNumber: z.string().optional(),

  customerName: z.string().min(1),
  customerAddress: z.string().optional(),
  customerCity: z.string().optional(),
  customerPhone: z.string().optional(),
  customerEmail: z.string().email().optional(),

  currency: z.enum(["USD", "EUR", "GBP", "CAD", "AUD"]),

  items: z.array(invoiceItemSchema).nonempty("At least one item is required"),

  subtotal: z.number().nonnegative(),
  discount: z.number().nonnegative().default(0),
  taxRate: z.number().min(0),
  tax: z.number().nonnegative(),
  total: z.number().nonnegative(),

  bankName: z.string().optional(),
  accountNumber: z.string().optional(),
  routingNumber: z.string().optional(),
  swiftCode: z.string().optional(),

  terms: z.string().optional(),
  notes: z.string().optional(),

  theme: z.object({
    primaryColor: z.string(),
    textColor: z.string(),
    backgroundColor: z.string(),
    accentColor: z.string(),
  }),

  fonts: z.object({
    heading: z.string(),
    body: z.string(),
  }),
});

export type InvoiceInput = z.infer<typeof invoiceSchema>;
