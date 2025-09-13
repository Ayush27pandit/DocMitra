"use client";

import { useState } from "react";
import { Link } from "react-router-dom";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InvoiceForm } from "../Invoicecomponent/InvoiceForm";
import { InvoicePreview } from "../Invoicecomponent/InvoicePreview";

export interface InvoiceData {
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
  issueDate: string;
  dueDate: string;
  poNumber: string;

  // Items with customizable units
  items: Array<{
    id: string;
    description: string;
    quantity: number;
    unit: string;
    rate: number;
    amount: number;
  }>;

  // Totals
  subtotal: number;
  discount: number;
  taxRate: number;
  tax: number;
  total: number;
  currency: string;

  // Additional Info
  terms: string;
  notes: string;

  // Customization Options
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
}

const defaultInvoiceData: InvoiceData = {
  companyName: "Your Company Name",
  companyAddress: "123 Business Street",
  companyCity: "City, State 12345",
  companyPhone: "(555) 123-4567",
  companyEmail: "hello@company.com",
  companyWebsite: "www.company.com",

  bankName: "First National Bank",
  accountNumber: "1234567890",
  routingNumber: "021000021",
  swiftCode: "FNBKUS33",

  businessRegistration: "REG123456789",
  taxId: "TAX987654321",
  vatNumber: "VAT123456789",

  customerName: "Customer Name",
  customerAddress: "456 Customer Ave",
  customerCity: "City, State 67890",
  customerPhone: "(555) 987-6543",
  customerEmail: "customer@email.com",

  invoiceNumber: "INV-001",
  issueDate: new Date().toISOString().split("T")[0],
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0],
  poNumber: "",

  items: [
    {
      id: "1",
      description: "Web Design Services",
      quantity: 1,
      unit: "project",
      rate: 1500,
      amount: 1500,
    },
    {
      id: "2",
      description: "Development Hours",
      quantity: 20,
      unit: "hours",
      rate: 75,
      amount: 1500,
    },
  ],

  subtotal: 3000,
  discount: 0,
  taxRate: 8.5,
  tax: 255,
  total: 3255,
  currency: "USD",

  terms:
    "Payment is due within 30 days of invoice date. Late payments may incur additional charges.",
  notes: "Thank you for your business! We appreciate your prompt payment.",

  theme: {
    primaryColor: "#2563eb",
    secondaryColor: "#64748b",
    accentColor: "#0ea5e9",
    textColor: "#1e293b",
    backgroundColor: "#ffffff",
  },
  fonts: {
    heading: "Inter",
    body: "Inter",
  },
};

export default function InvoiceGenerator() {
  const [invoiceData, setInvoiceData] =
    useState<InvoiceData>(defaultInvoiceData);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Professional Invoice Generator
            </h1>
            <p className="text-gray-600 mt-2">
              Create comprehensive invoices with customizable themes and live
              preview
            </p>
          </div>
          <Link to="/contract">
            <Button
              variant="outline"
              className="flex items-center gap-2 bg-transparent"
            >
              📄 Contract Generator
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Form Section - Takes more space */}
          <div className="xl:col-span-2 ">
            <Card className="p-8">
              <h2 className="text-2xl font-semibold mb-6">
                Invoice Configuration
              </h2>
              <InvoiceForm data={invoiceData} onChange={setInvoiceData} />
            </Card>
          </div>

          {/* Preview Section */}
          <div className="xl:col-span-2">
            <Card className="p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
              <InvoicePreview data={invoiceData} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
