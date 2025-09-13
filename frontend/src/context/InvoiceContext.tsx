import { atom } from "recoil";
export interface InvoiceItems {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  companyName: string;
  companyAddress: string;
  companyEmail: string;
  companyPhone: string;
  clientName: string;
  clientAddress: string;
  clientEmail: string;
  items: InvoiceItems[];
  notes: string;
  taxRate: number;
}

const defaultInvoiceData: InvoiceData = {
  invoiceNumber: "INV-001",
  date: new Date().toISOString().split("T")[0],
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0],
  companyName: "",
  companyAddress: "",
  companyEmail: "",
  companyPhone: "",
  clientName: "",
  clientAddress: "",
  clientEmail: "",
  items: [],
  notes: "",
  taxRate: 0,
};

export const invoiceAtom = atom<InvoiceData>({
  key: "invoiceAtom",
  default:
    JSON.parse(localStorage.getItem("invoice-data") || "") ||
    defaultInvoiceData,
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newValue) => {
        localStorage.setItem("invoice-data", JSON.stringify(newValue));
      });
    },
  ],
});
