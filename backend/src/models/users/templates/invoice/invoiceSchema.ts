import mongoose, { Schema, Document } from "mongoose";

export interface IInvoice extends Document {
  // Company Info
  companyName: string;
  companyAddress: string;
  companyCity: string;
  companyPhone: string;
  companyEmail: string;
  companyWebsite: string;

  // Sender Account Details
  bankName: string;
  accountNumber: string;
  routingNumber: string;
  swiftCode: string;

  // Business Details
  businessRegistration: string;
  taxId: string;
  vatNumber: string;

  // Customer Info
  customerName: string;
  customerAddress: string;
  customerCity: string;
  customerPhone: string;
  customerEmail: string;

  // Invoice Details
  invoiceNumber: string;
  issueDate: Date;
  dueDate: Date;
  poNumber?: string;

  // Items
  items: {
    id: string;
    description: string;
    quantity: number;
    unit: string;
    rate: number;
    amount: number;
  }[];

  // Totals
  subtotal: number;
  discount: number;
  taxRate: number;
  tax: number;
  total: number;
  currency: string;

  // Additional Info
  terms?: string;
  notes?: string;

  // Customization
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    textColor: string;
    backgroundColor: string;
  };
  fonts: {
    heading: string;
    body: string;
  };

  createdBy?: mongoose.Types.ObjectId; // user link
}

const InvoiceSchema = new Schema<IInvoice>(
  {
    // Company Info
    companyName: { type: String, required: true },
    companyAddress: { type: String, required: true },
    companyCity: { type: String, required: true },
    companyPhone: String,
    companyEmail: String,
    companyWebsite: String,

    // Sender Account Details
    bankName: String,
    accountNumber: String,
    routingNumber: String,
    swiftCode: String,

    // Business Details
    businessRegistration: String,
    taxId: String,
    vatNumber: String,

    // Customer Info
    customerName: { type: String, required: true },
    customerAddress: String,
    customerCity: String,
    customerPhone: String,
    customerEmail: String,

    // Invoice Details
    invoiceNumber: { type: String, required: true, unique: true },
    issueDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    poNumber: String,

    // Items
    items: [
      {
        id: { type: String, required: true },
        description: { type: String, required: true },
        quantity: { type: Number, required: true },
        unit: { type: String, required: true },
        rate: { type: Number, required: true },
        amount: { type: Number, required: true },
      },
    ],

    // Totals
    subtotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    taxRate: { type: Number, default: 0 },
    tax: { type: Number, required: true },
    total: { type: Number, required: true },
    currency: { type: String, default: "USD" },

    // Additional Info
    terms: String,
    notes: String,

    // Customization
    theme: {
      primaryColor: String,
      secondaryColor: String,
      accentColor: String,
      textColor: String,
      backgroundColor: String,
    },
    fonts: {
      heading: String,
      body: String,
    },

    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// Indexes for fast lookup

InvoiceSchema.index({ customerName: 1, issueDate: -1 });

export const Invoice = mongoose.model<IInvoice>("Invoice", InvoiceSchema);
