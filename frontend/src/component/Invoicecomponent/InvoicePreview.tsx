"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Download, FileImage } from "lucide-react";
import html2canvas from "html2canvas";
import type { InvoiceData } from "../Dashboard/InvoiceGen";
import axios from "axios";

interface InvoicePreviewProps {
  data: InvoiceData;
}

export function InvoicePreview({ data }: InvoicePreviewProps) {
  const invoiceRef = useRef<HTMLDivElement>(null);

  const getCurrencySymbol = (currency: string) => {
    switch (currency) {
      case "EUR":
        return "€";
      case "GBP":
        return "£";
      case "CAD":
        return "C$";
      case "AUD":
        return "A$";
      default:
        return "$";
    }
  };

  const saveToDB = async () => {
    if (!invoiceRef.current) return;

    try {
      //send Invoice data to backend
      if (!data) return;
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/invoiceGenerate`,
        data
      );
      if (res.status === 200) {
        console.log("invoice saved to db", res.data);
      } else {
        console.log("invoice not saved to db", res.data);
      }
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  const downloadAsPDF = async () => {
    if (!invoiceRef.current) return;

    try {
      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
      });

      // Create a new window for printing
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Invoice ${data.invoiceNumber}</title>
              <style>
                body { margin: 0; padding: 20px; }
                img { max-width: 100%; height: auto; }
                @media print {
                  body { margin: 0; padding: 0; }
                  img { width: 100%; height: auto; }
                }
              </style>
            </head>
            <body>
              <img src="${canvas.toDataURL()}" alt="Invoice" />
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
          printWindow.print();
        }, 250);
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button onClick={saveToDB} size="sm" variant="outline">
          <FileImage className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
        <Button onClick={downloadAsPDF} size="sm" variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Print/PDF
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden bg-white">
        <div
          ref={invoiceRef}
          className="p-8 bg-white text-black min-h-[800px]"
          style={{
            fontFamily: `${data.fonts.body}, system-ui, sans-serif`,
            color: data.theme.textColor,
            backgroundColor: data.theme.backgroundColor,
          }}
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1
                className="text-3xl font-bold mb-2"
                style={{
                  color: data.theme.primaryColor,
                  fontFamily: `${data.fonts.heading}, system-ui, sans-serif`,
                }}
              >
                {data.companyName}
              </h1>
              <div className="text-gray-600 space-y-1 text-sm">
                <p>{data.companyAddress}</p>
                <p>{data.companyCity}</p>
                {data.companyPhone && <p>{data.companyPhone}</p>}
                <p>{data.companyEmail}</p>
                {data.companyWebsite && <p>{data.companyWebsite}</p>}
              </div>

              {(data.businessRegistration || data.taxId || data.vatNumber) && (
                <div className="mt-4 text-xs text-gray-500 space-y-1">
                  {data.businessRegistration && (
                    <p>Reg: {data.businessRegistration}</p>
                  )}
                  {data.taxId && <p>Tax ID: {data.taxId}</p>}
                  {data.vatNumber && <p>VAT: {data.vatNumber}</p>}
                </div>
              )}
            </div>
            <div className="text-right">
              <h2
                className="text-4xl font-bold mb-4"
                style={{
                  color: data.theme.textColor,
                  fontFamily: `${data.fonts.heading}, system-ui, sans-serif`,
                }}
              >
                INVOICE
              </h2>
              <div
                className="p-4 rounded-lg"
                style={{ backgroundColor: `${data.theme.primaryColor}15` }}
              >
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Invoice #:</span>
                    <span>{data.invoiceNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Date:</span>
                    <span>{new Date(data.issueDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Due Date:</span>
                    <span>{new Date(data.dueDate).toLocaleDateString()}</span>
                  </div>
                  {data.poNumber && (
                    <div className="flex justify-between">
                      <span className="font-medium">PO #:</span>
                      <span>{data.poNumber}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bill To */}
          <div className="mb-8">
            <h3
              className="text-lg font-semibold mb-3"
              style={{
                color: data.theme.textColor,
                fontFamily: `${data.fonts.heading}, system-ui, sans-serif`,
              }}
            >
              BILL TO:
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold text-gray-800">{data.customerName}</p>
              {data.customerAddress && (
                <p className="text-gray-600">{data.customerAddress}</p>
              )}
              {data.customerCity && (
                <p className="text-gray-600">{data.customerCity}</p>
              )}
              {data.customerPhone && (
                <p className="text-gray-600 text-sm mt-2">
                  {data.customerPhone}
                </p>
              )}
              {data.customerEmail && (
                <p className="text-gray-600 text-sm">{data.customerEmail}</p>
              )}
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-8">
            <table className="w-full">
              <thead>
                <tr
                  style={{
                    backgroundColor: data.theme.primaryColor,
                    color: "white",
                  }}
                >
                  <th className="text-left p-3 font-semibold">DESCRIPTION</th>
                  <th className="text-center p-3 font-semibold w-16">QTY</th>
                  <th className="text-center p-3 font-semibold w-16">UNIT</th>
                  <th className="text-right p-3 font-semibold w-24">RATE</th>
                  <th className="text-right p-3 font-semibold w-24">AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {data.items.map((item, index) => (
                  <tr
                    key={item.id}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="p-3 border-b border-gray-200">
                      {item.description}
                    </td>
                    <td className="p-3 text-center border-b border-gray-200">
                      {item.quantity}
                    </td>
                    <td className="p-3 text-center border-b border-gray-200 text-sm text-gray-600">
                      {item.unit}
                    </td>
                    <td className="p-3 text-right border-b border-gray-200">
                      {getCurrencySymbol(data.currency)}
                      {item.rate.toFixed(2)}
                    </td>
                    <td className="p-3 text-right border-b border-gray-200 font-semibold">
                      {getCurrencySymbol(data.currency)}
                      {item.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end mb-8">
            <div className="w-80">
              <div className="space-y-2">
                <div className="flex justify-between py-2">
                  <span>Subtotal:</span>
                  <span>
                    {getCurrencySymbol(data.currency)}
                    {data.subtotal.toFixed(2)}
                  </span>
                </div>
                {data.discount > 0 && (
                  <div className="flex justify-between py-2">
                    <span>Discount:</span>
                    <span>
                      -{getCurrencySymbol(data.currency)}
                      {data.discount.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between py-2">
                  <span>Tax ({data.taxRate}%):</span>
                  <span>
                    {getCurrencySymbol(data.currency)}
                    {data.tax.toFixed(2)}
                  </span>
                </div>
                <div
                  className="flex justify-between py-3 border-t-2 font-bold text-lg"
                  style={{ borderColor: data.theme.primaryColor }}
                >
                  <span>TOTAL:</span>
                  <span style={{ color: data.theme.primaryColor }}>
                    {getCurrencySymbol(data.currency)}
                    {data.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          {(data.bankName || data.accountNumber) && (
            <div className="mb-8">
              <h4
                className="font-semibold mb-3"
                style={{
                  color: data.theme.textColor,
                  fontFamily: `${data.fonts.heading}, system-ui, sans-serif`,
                }}
              >
                PAYMENT INFORMATION
              </h4>
              <div
                className="p-4 rounded-lg text-sm"
                style={{ backgroundColor: `${data.theme.accentColor}10` }}
              >
                {data.bankName && (
                  <p>
                    <span className="font-medium">Bank:</span> {data.bankName}
                  </p>
                )}
                {data.accountNumber && (
                  <p>
                    <span className="font-medium">Account:</span>{" "}
                    {data.accountNumber}
                  </p>
                )}
                {data.routingNumber && (
                  <p>
                    <span className="font-medium">Routing:</span>{" "}
                    {data.routingNumber}
                  </p>
                )}
                {data.swiftCode && (
                  <p>
                    <span className="font-medium">SWIFT:</span> {data.swiftCode}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.terms && (
              <div>
                <h4
                  className="font-semibold mb-2"
                  style={{
                    color: data.theme.textColor,
                    fontFamily: `${data.fonts.heading}, system-ui, sans-serif`,
                  }}
                >
                  TERMS & CONDITIONS
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {data.terms}
                </p>
              </div>
            )}
            {data.notes && (
              <div>
                <h4
                  className="font-semibold mb-2"
                  style={{
                    color: data.theme.textColor,
                    fontFamily: `${data.fonts.heading}, system-ui, sans-serif`,
                  }}
                >
                  NOTES
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {data.notes}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
