import { z } from "zod";

export const invoiceSchema = z.object({
  // Company Information
  companyName: z
    .string()
    .min(1, "Company name is required")
    .max(100, "Company name must be less than 100 characters"),
  companyAddress: z
    .string()
    .min(1, "Company address is required")
    .max(200, "Address must be less than 200 characters"),
  companyCity: z
    .string()
    .min(1, "City is required")
    .max(100, "City must be less than 100 characters"),
  companyEmail: z
    .string()
    .email("Invalid email format")
    .max(100, "Email must be less than 100 characters"),
  companyPhone: z
    .string()
    .max(20, "Phone number must be less than 20 characters")
    .optional(),
  companyWebsite: z
    .string()
    .url("Invalid website URL")
    .max(100, "Website URL must be less than 100 characters")
    .optional()
    .or(z.literal("")),

  // Business Registration
  businessRegistration: z
    .string()
    .max(50, "Registration number must be less than 50 characters")
    .optional(),
  taxId: z
    .string()
    .max(30, "Tax ID must be less than 30 characters")
    .optional(),
  vatNumber: z
    .string()
    .max(30, "VAT number must be less than 30 characters")
    .optional(),

  // Customer Information
  customerName: z
    .string()
    .min(1, "Customer name is required")
    .max(100, "Customer name must be less than 100 characters"),
  customerAddress: z
    .string()
    .max(200, "Address must be less than 200 characters")
    .optional(),
  customerCity: z
    .string()
    .max(100, "City must be less than 100 characters")
    .optional(),
  customerEmail: z
    .string()
    .email("Invalid email format")
    .max(100, "Email must be less than 100 characters")
    .optional()
    .or(z.literal("")),
  customerPhone: z
    .string()
    .max(20, "Phone number must be less than 20 characters")
    .optional(),

  // Invoice Details
  invoiceNumber: z
    .string()
    .min(1, "Invoice number is required")
    .max(50, "Invoice number must be less than 50 characters"),
  poNumber: z
    .string()
    .max(50, "PO number must be less than 50 characters")
    .optional(),
  issueDate: z
    .string()
    .min(1, "Issue date is required")
    .refine((date) => !isNaN(Date.parse(date)), "Invalid date format"),
  dueDate: z
    .string()
    .min(1, "Due date is required")
    .refine((date) => !isNaN(Date.parse(date)), "Invalid date format"),
  currency: z.enum(["USD", "EUR", "GBP", "CAD", "AUD"]),

  // Items
  items: z
    .array(
      z.object({
        id: z.string(),
        description: z
          .string()
          .min(1, "Item description is required")
          .max(200, "Description must be less than 200 characters"),
        quantity: z
          .number()
          .min(0.01, "Quantity must be greater than 0")
          .max(999999, "Quantity is too large"),
        unit: z.string().min(1, "Unit is required"),
        rate: z
          .number()
          .min(0, "Rate cannot be negative")
          .max(999999, "Rate is too large"),
        amount: z.number(),
      })
    )
    .min(1, "At least one item is required"),

  // Financials
  subtotal: z.number().min(0),
  discount: z
    .number()
    .min(0, "Discount cannot be negative")
    .max(999999, "Discount is too large"),
  taxRate: z
    .number()
    .min(0, "Tax rate cannot be negative")
    .max(100, "Tax rate cannot exceed 100%"),
  tax: z.number().min(0),
  total: z.number().min(0),

  // Bank Details
  bankName: z
    .string()
    .max(100, "Bank name must be less than 100 characters")
    .optional(),
  accountNumber: z
    .string()
    .max(30, "Account number must be less than 30 characters")
    .optional(),
  routingNumber: z
    .string()
    .max(20, "Routing number must be less than 20 characters")
    .optional(),
  swiftCode: z
    .string()
    .max(15, "SWIFT code must be less than 15 characters")
    .optional(),

  // Extra
  terms: z
    .string()
    .max(1000, "Terms must be less than 1000 characters")
    .optional(),
  notes: z
    .string()
    .max(500, "Notes must be less than 500 characters")
    .optional(),

  // Theme + Fonts
  theme: z.object({
    primaryColor: z.string(),
    secondaryColor: z.string(),
    accentColor: z.string(),
  }),
  fonts: z.object({
    heading: z.string(),
    body: z.string(),
  }),
});

export type InvoiceFormData = z.infer<typeof invoiceSchema>;

// Strongly typed return shape
export type FieldValidationResult = {
  isValid: boolean;
  error: string | null;
};

export const validateField = <T extends keyof InvoiceFormData>(
  field: T,
  value: InvoiceFormData[T]
): FieldValidationResult => {
  try {
    const fieldSchema = invoiceSchema.shape[field];
    fieldSchema.parse(value);
    return { isValid: true, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        isValid: false,
        error: error.errors[0]?.message ?? "Invalid value",
      };
    }
    return { isValid: false, error: "Validation error" };
  }
};

// Strongly typed invoice validation
export const validateInvoiceData = (
  data: unknown
): {
  isValid: boolean;
  errors: Partial<Record<keyof InvoiceFormData, string>>;
} => {
  try {
    invoiceSchema.parse(data);
    return { isValid: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Partial<Record<keyof InvoiceFormData, string>> = {};
      error.errors.forEach((err) => {
        if (err.path.length > 0) {
          const path = err.path.join(".") as keyof InvoiceFormData;
          errors[path] = err.message;
        }
      });
      return { isValid: false, errors };
    }
    return { isValid: false, errors: {} };
  }
};
