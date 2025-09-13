"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, Plus, Palette, Type, AlertCircle } from "lucide-react";
import { validateField, validateInvoiceData } from "@/lib/validation";
import { useState, useEffect } from "react";
import type { InvoiceData } from "../Dashboard/InvoiceGen";

interface InvoiceFormProps {
  data: InvoiceData;
  onChange: (data: InvoiceData) => void;
}

interface ValidationErrors {
  [key: string]: string;
}

const quantityUnits = [
  "hours",
  "pieces",
  "items",
  "units",
  "kg",
  "tons",
  "lbs",
  "meters",
  "feet",
  "liters",
  "gallons",
  "boxes",
  "packages",
  "services",
  "projects",
  "days",
  "weeks",
  "months",
  "sessions",
  "licenses",
  "subscriptions",
];

const colorThemes = [
  {
    name: "Professional Blue",
    primary: "#2563eb",
    secondary: "#64748b",
    accent: "#0ea5e9",
  },
  {
    name: "Corporate Gray",
    primary: "#374151",
    secondary: "#6b7280",
    accent: "#9ca3af",
  },
  {
    name: "Modern Green",
    primary: "#059669",
    secondary: "#6b7280",
    accent: "#10b981",
  },
  {
    name: "Elegant Purple",
    primary: "#7c3aed",
    secondary: "#64748b",
    accent: "#8b5cf6",
  },
  {
    name: "Warm Orange",
    primary: "#ea580c",
    secondary: "#64748b",
    accent: "#fb923c",
  },
  {
    name: "Classic Black",
    primary: "#1f2937",
    secondary: "#4b5563",
    accent: "#6b7280",
  },
];

const fontOptions = [
  "Inter",
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Poppins",
  "Source Sans Pro",
  "Nunito",
];

export function InvoiceForm({ data, onChange }: InvoiceFormProps) {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());

  useEffect(() => {
    const validation = validateInvoiceData(data);
    if (!validation.isValid) {
      setErrors(validation.errors);
    } else {
      setErrors({});
    }
  }, [data]);

  const updateField = (
    field: keyof InvoiceData,
    value: InvoiceData[keyof InvoiceData]
  ) => {
    // Mark field as touched
    setTouched((prev) => new Set(prev).add(field));

    // Validate field
    const validation = validateField(field, value);
    if (!validation.isValid && validation.error) {
      setErrors((prev) => ({ ...prev, [field as string]: validation.error! }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    onChange({ ...data, [field]: value });
  };

  const updateItem = (index: number, field: string, value: string | number) => {
    const fieldKey = `items.${index}.${field}`;
    setTouched((prev) => new Set(prev).add(fieldKey));

    // Validate item field
    if (
      field === "description" &&
      typeof value === "string" &&
      value.length > 200
    ) {
      setErrors((prev) => ({
        ...prev,
        [fieldKey]: "Description must be less than 200 characters",
      }));
      return;
    }
    if (
      (field === "quantity" || field === "rate") &&
      (typeof value !== "number" || isNaN(value) || value < 0)
    ) {
      setErrors((prev) => ({
        ...prev,
        [fieldKey]:
          field === "quantity"
            ? "Quantity must be greater than 0"
            : "Rate cannot be negative",
      }));
      return;
    }

    // Clear error if validation passes
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[fieldKey];
      return newErrors;
    });

    const newItems = [...data.items];
    newItems[index] = { ...newItems[index], [field]: value };

    // Recalculate amount for this item
    if (field === "quantity" || field === "rate") {
      newItems[index].amount = newItems[index].quantity * newItems[index].rate;
    }

    // Recalculate totals
    const subtotal = newItems.reduce((sum, item) => sum + item.amount, 0);
    const tax = (subtotal - data.discount) * (data.taxRate / 100);
    const total = subtotal - data.discount + tax;

    onChange({
      ...data,
      items: newItems,
      subtotal,
      tax,
      total,
    });
  };

  const addItem = () => {
    if (data.items.length >= 50) {
      setErrors((prev) => ({ ...prev, items: "Maximum 50 items allowed" }));
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      description: "New Item",
      quantity: 1,
      unit: "items",
      rate: 0,
      amount: 0,
    };
    onChange({ ...data, items: [...data.items, newItem] });
  };

  const removeItem = (index: number) => {
    const newItems = data.items.filter((_, i) => i !== index);
    const subtotal = newItems.reduce((sum, item) => sum + item.amount, 0);
    const tax = (subtotal - data.discount) * (data.taxRate / 100);
    const total = subtotal - data.discount + tax;

    onChange({
      ...data,
      items: newItems,
      subtotal,
      tax,
      total,
    });
  };

  const updateDiscount = (discount: number) => {
    const tax = (data.subtotal - discount) * (data.taxRate / 100);
    const total = data.subtotal - discount + tax;
    onChange({ ...data, discount, tax, total });
  };

  const updateTaxRate = (taxRate: number) => {
    const tax = (data.subtotal - data.discount) * (taxRate / 100);
    const total = data.subtotal - data.discount + tax;
    onChange({ ...data, taxRate, tax, total });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateTheme = (theme: any) => {
    onChange({ ...data, theme: { ...data.theme, ...theme } });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateFonts = (fonts: any) => {
    onChange({ ...data, fonts: { ...data.fonts, ...fonts } });
  };

  const ErrorMessage = ({ field }: { field: string }) => {
    const error = errors[field];
    const isFieldTouched = touched.has(field);

    if (!error || !isFieldTouched) return null;

    return (
      <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
        <AlertCircle className="w-4 h-4" />
        <span>{error}</span>
      </div>
    );
  };

  return (
    <Tabs defaultValue="basic" className="w-full h-full">
      <TabsList className="grid w-full grid-cols-4 mb-6">
        <TabsTrigger value="basic">Basic Info</TabsTrigger>
        <TabsTrigger value="items">Items & Pricing</TabsTrigger>
        <TabsTrigger value="payment">Payment Details</TabsTrigger>
        <TabsTrigger value="design">Design & Theme</TabsTrigger>
      </TabsList>

      <div className="max-h-full overflow-y-auto space-y-6">
        <TabsContent value="basic" className="space-y-6">
          {/* Company Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <div className="w-2 h-6 bg-blue-500 rounded"></div>
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    value={data.companyName}
                    onChange={(e) => updateField("companyName", e.target.value)}
                    onBlur={() =>
                      setTouched((prev) => new Set(prev).add("companyName"))
                    }
                    className={`mt-1 ${
                      errors.companyName ? "border-red-500" : ""
                    }`}
                    maxLength={100}
                  />
                  <ErrorMessage field="companyName" />
                </div>
                <div>
                  <Label htmlFor="companyWebsite">Website</Label>
                  <Input
                    id="companyWebsite"
                    value={data.companyWebsite}
                    onChange={(e) =>
                      updateField("companyWebsite", e.target.value)
                    }
                    onBlur={() =>
                      setTouched((prev) => new Set(prev).add("companyWebsite"))
                    }
                    className={`mt-1 ${
                      errors.companyWebsite ? "border-red-500" : ""
                    }`}
                    maxLength={100}
                    placeholder="https://example.com"
                  />
                  <ErrorMessage field="companyWebsite" />
                </div>
              </div>
              <div>
                <Label htmlFor="companyAddress">Street Address *</Label>
                <Input
                  id="companyAddress"
                  value={data.companyAddress}
                  onChange={(e) =>
                    updateField("companyAddress", e.target.value)
                  }
                  onBlur={() =>
                    setTouched((prev) => new Set(prev).add("companyAddress"))
                  }
                  className={`mt-1 ${
                    errors.companyAddress ? "border-red-500" : ""
                  }`}
                  maxLength={200}
                />
                <ErrorMessage field="companyAddress" />
              </div>
              <div>
                <Label htmlFor="companyCity">City, State, ZIP *</Label>
                <Input
                  id="companyCity"
                  value={data.companyCity}
                  onChange={(e) => updateField("companyCity", e.target.value)}
                  onBlur={() =>
                    setTouched((prev) => new Set(prev).add("companyCity"))
                  }
                  className={`mt-1 ${
                    errors.companyCity ? "border-red-500" : ""
                  }`}
                  maxLength={100}
                />
                <ErrorMessage field="companyCity" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyPhone">Phone Number</Label>
                  <Input
                    id="companyPhone"
                    value={data.companyPhone}
                    onChange={(e) =>
                      updateField("companyPhone", e.target.value)
                    }
                    onBlur={() =>
                      setTouched((prev) => new Set(prev).add("companyPhone"))
                    }
                    className={`mt-1 ${
                      errors.companyPhone ? "border-red-500" : ""
                    }`}
                    maxLength={20}
                  />
                  <ErrorMessage field="companyPhone" />
                </div>
                <div>
                  <Label htmlFor="companyEmail">Email Address *</Label>
                  <Input
                    id="companyEmail"
                    type="email"
                    value={data.companyEmail}
                    onChange={(e) =>
                      updateField("companyEmail", e.target.value)
                    }
                    onBlur={() =>
                      setTouched((prev) => new Set(prev).add("companyEmail"))
                    }
                    className={`mt-1 ${
                      errors.companyEmail ? "border-red-500" : ""
                    }`}
                    maxLength={100}
                  />
                  <ErrorMessage field="companyEmail" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Registration Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <div className="w-2 h-6 bg-green-500 rounded"></div>
                Business Registration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="businessRegistration">
                    Registration Number
                  </Label>
                  <Input
                    id="businessRegistration"
                    value={data.businessRegistration}
                    onChange={(e) =>
                      updateField("businessRegistration", e.target.value)
                    }
                    onBlur={() =>
                      setTouched((prev) =>
                        new Set(prev).add("businessRegistration")
                      )
                    }
                    className={`mt-1 ${
                      errors.businessRegistration ? "border-red-500" : ""
                    }`}
                    maxLength={50}
                  />
                  <ErrorMessage field="businessRegistration" />
                </div>
                <div>
                  <Label htmlFor="taxId">Tax ID</Label>
                  <Input
                    id="taxId"
                    value={data.taxId}
                    onChange={(e) => updateField("taxId", e.target.value)}
                    onBlur={() =>
                      setTouched((prev) => new Set(prev).add("taxId"))
                    }
                    className={`mt-1 ${errors.taxId ? "border-red-500" : ""}`}
                    maxLength={30}
                  />
                  <ErrorMessage field="taxId" />
                </div>
                <div>
                  <Label htmlFor="vatNumber">VAT Number</Label>
                  <Input
                    id="vatNumber"
                    value={data.vatNumber}
                    onChange={(e) => updateField("vatNumber", e.target.value)}
                    onBlur={() =>
                      setTouched((prev) => new Set(prev).add("vatNumber"))
                    }
                    className={`mt-1 ${
                      errors.vatNumber ? "border-red-500" : ""
                    }`}
                    maxLength={30}
                  />
                  <ErrorMessage field="vatNumber" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <div className="w-2 h-6 bg-purple-500 rounded"></div>
                Bill To
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="customerName">Customer Name *</Label>
                <Input
                  id="customerName"
                  value={data.customerName}
                  onChange={(e) => updateField("customerName", e.target.value)}
                  onBlur={() =>
                    setTouched((prev) => new Set(prev).add("customerName"))
                  }
                  className={`mt-1 ${
                    errors.customerName ? "border-red-500" : ""
                  }`}
                  maxLength={100}
                />
                <ErrorMessage field="customerName" />
              </div>
              <div>
                <Label htmlFor="customerAddress">Street Address</Label>
                <Input
                  id="customerAddress"
                  value={data.customerAddress}
                  onChange={(e) =>
                    updateField("customerAddress", e.target.value)
                  }
                  onBlur={() =>
                    setTouched((prev) => new Set(prev).add("customerAddress"))
                  }
                  className={`mt-1 ${
                    errors.customerAddress ? "border-red-500" : ""
                  }`}
                  maxLength={200}
                />
                <ErrorMessage field="customerAddress" />
              </div>
              <div>
                <Label htmlFor="customerCity">City, State, ZIP</Label>
                <Input
                  id="customerCity"
                  value={data.customerCity}
                  onChange={(e) => updateField("customerCity", e.target.value)}
                  onBlur={() =>
                    setTouched((prev) => new Set(prev).add("customerCity"))
                  }
                  className={`mt-1 ${
                    errors.customerCity ? "border-red-500" : ""
                  }`}
                  maxLength={100}
                />
                <ErrorMessage field="customerCity" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customerPhone">Phone Number</Label>
                  <Input
                    id="customerPhone"
                    value={data.customerPhone}
                    onChange={(e) =>
                      updateField("customerPhone", e.target.value)
                    }
                    onBlur={() =>
                      setTouched((prev) => new Set(prev).add("customerPhone"))
                    }
                    className={`mt-1 ${
                      errors.customerPhone ? "border-red-500" : ""
                    }`}
                    maxLength={20}
                  />
                  <ErrorMessage field="customerPhone" />
                </div>
                <div>
                  <Label htmlFor="customerEmail">Email Address</Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    value={data.customerEmail}
                    onChange={(e) =>
                      updateField("customerEmail", e.target.value)
                    }
                    onBlur={() =>
                      setTouched((prev) => new Set(prev).add("customerEmail"))
                    }
                    className={`mt-1 ${
                      errors.customerEmail ? "border-red-500" : ""
                    }`}
                    maxLength={100}
                  />
                  <ErrorMessage field="customerEmail" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Invoice Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <div className="w-2 h-6 bg-orange-500 rounded"></div>
                Invoice Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="invoiceNumber">Invoice Number *</Label>
                  <Input
                    id="invoiceNumber"
                    value={data.invoiceNumber}
                    onChange={(e) =>
                      updateField("invoiceNumber", e.target.value)
                    }
                    onBlur={() =>
                      setTouched((prev) => new Set(prev).add("invoiceNumber"))
                    }
                    className={`mt-1 ${
                      errors.invoiceNumber ? "border-red-500" : ""
                    }`}
                    maxLength={50}
                  />
                  <ErrorMessage field="invoiceNumber" />
                </div>
                <div>
                  <Label htmlFor="poNumber">PO Number</Label>
                  <Input
                    id="poNumber"
                    value={data.poNumber}
                    onChange={(e) => updateField("poNumber", e.target.value)}
                    onBlur={() =>
                      setTouched((prev) => new Set(prev).add("poNumber"))
                    }
                    className={`mt-1 ${
                      errors.poNumber ? "border-red-500" : ""
                    }`}
                    maxLength={50}
                  />
                  <ErrorMessage field="poNumber" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="issueDate">Issue Date *</Label>
                  <Input
                    id="issueDate"
                    type="date"
                    value={data.issueDate}
                    onChange={(e) => updateField("issueDate", e.target.value)}
                    onBlur={() =>
                      setTouched((prev) => new Set(prev).add("issueDate"))
                    }
                    className={`mt-1 ${
                      errors.issueDate ? "border-red-500" : ""
                    }`}
                  />
                  <ErrorMessage field="issueDate" />
                </div>
                <div>
                  <Label htmlFor="dueDate">Due Date *</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={data.dueDate}
                    onChange={(e) => updateField("dueDate", e.target.value)}
                    onBlur={() =>
                      setTouched((prev) => new Set(prev).add("dueDate"))
                    }
                    className={`mt-1 ${errors.dueDate ? "border-red-500" : ""}`}
                  />
                  <ErrorMessage field="dueDate" />
                </div>
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={data.currency}
                    onValueChange={(value) => updateField("currency", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="CAD">CAD (C$)</SelectItem>
                      <SelectItem value="AUD">AUD (A$)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="items" className="space-y-6">
          {/* Items */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-6 bg-blue-500 rounded"></div>
                  Items & Services
                </div>
                <Button
                  onClick={addItem}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {errors.items && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.items}</span>
                </div>
              )}

              {data.items.map((item, index) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-3 items-end p-4 border rounded-lg bg-gray-50"
                >
                  <div className="col-span-12 md:col-span-4">
                    <Label className="text-sm font-medium">Description</Label>
                    <Input
                      value={item.description}
                      onChange={(e) =>
                        updateItem(index, "description", e.target.value)
                      }
                      onBlur={() =>
                        setTouched((prev) =>
                          new Set(prev).add(`items.${index}.description`)
                        )
                      }
                      className={`mt-1 ${
                        errors[`items.${index}.description`]
                          ? "border-red-500"
                          : ""
                      }`}
                      maxLength={200}
                    />
                    <ErrorMessage field={`items.${index}.description`} />
                  </div>
                  <div className="col-span-6 md:col-span-2">
                    <Label className="text-sm font-medium">Quantity</Label>
                    <Input
                      type="number"
                      step="0.01"
                      min="0.01"
                      max="999999"
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(
                          index,
                          "quantity",
                          Number.parseFloat(e.target.value) || 0
                        )
                      }
                      onBlur={() =>
                        setTouched((prev) =>
                          new Set(prev).add(`items.${index}.quantity`)
                        )
                      }
                      className={`mt-1 ${
                        errors[`items.${index}.quantity`]
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                    <ErrorMessage field={`items.${index}.quantity`} />
                  </div>
                  <div className="col-span-6 md:col-span-2">
                    <Label className="text-sm font-medium">Unit</Label>
                    <Select
                      value={item.unit}
                      onValueChange={(value) =>
                        updateItem(index, "unit", value)
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {quantityUnits.map((unit) => (
                          <SelectItem key={unit} value={unit}>
                            {unit}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-6 md:col-span-2">
                    <Label className="text-sm font-medium">Rate</Label>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      max="999999"
                      value={item.rate}
                      onChange={(e) =>
                        updateItem(
                          index,
                          "rate",
                          Number.parseFloat(e.target.value) || 0
                        )
                      }
                      onBlur={() =>
                        setTouched((prev) =>
                          new Set(prev).add(`items.${index}.rate`)
                        )
                      }
                      className={`mt-1 ${
                        errors[`items.${index}.rate`] ? "border-red-500" : ""
                      }`}
                    />
                    <ErrorMessage field={`items.${index}.rate`} />
                  </div>
                  <div className="col-span-5 md:col-span-1">
                    <Label className="text-sm font-medium">Amount</Label>
                    <Input
                      value={`${item.amount.toFixed(2)}`}
                      disabled
                      className="mt-1 bg-gray-100"
                    />
                  </div>
                  <div className="col-span-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeItem(index)}
                      className="w-full mt-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Totals */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <div className="w-2 h-6 bg-green-500 rounded"></div>
                Calculations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="discount">Discount Amount</Label>
                  <Input
                    id="discount"
                    type="number"
                    step="0.01"
                    min="0"
                    max="999999"
                    value={data.discount}
                    onChange={(e) =>
                      updateDiscount(Number.parseFloat(e.target.value) || 0)
                    }
                    onBlur={() =>
                      setTouched((prev) => new Set(prev).add("discount"))
                    }
                    className={`mt-1 ${
                      errors.discount ? "border-red-500" : ""
                    }`}
                  />
                  <ErrorMessage field="discount" />
                </div>
                <div>
                  <Label htmlFor="taxRate">Tax Rate (%)</Label>
                  <Input
                    id="taxRate"
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    value={data.taxRate}
                    onChange={(e) =>
                      updateTaxRate(Number.parseFloat(e.target.value) || 0)
                    }
                    onBlur={() =>
                      setTouched((prev) => new Set(prev).add("taxRate"))
                    }
                    className={`mt-1 ${errors.taxRate ? "border-red-500" : ""}`}
                  />
                  <ErrorMessage field="taxRate" />
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span className="font-medium">
                    {data.currency === "USD"
                      ? "$"
                      : data.currency === "EUR"
                      ? "€"
                      : "£"}
                    {data.subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Discount:</span>
                  <span className="font-medium text-red-600">
                    -
                    {data.currency === "USD"
                      ? "$"
                      : data.currency === "EUR"
                      ? "€"
                      : "£"}
                    {data.discount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax ({data.taxRate}%):</span>
                  <span className="font-medium">
                    {data.currency === "USD"
                      ? "$"
                      : data.currency === "EUR"
                      ? "€"
                      : "£"}
                    {data.tax.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>Total:</span>
                  <span>
                    {data.currency === "USD"
                      ? "$"
                      : data.currency === "EUR"
                      ? "€"
                      : "£"}
                    {data.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <div className="w-2 h-6 bg-purple-500 rounded"></div>
                Additional Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="terms">Terms & Conditions</Label>
                <Textarea
                  id="terms"
                  value={data.terms}
                  onChange={(e) => updateField("terms", e.target.value)}
                  onBlur={() =>
                    setTouched((prev) => new Set(prev).add("terms"))
                  }
                  rows={4}
                  className={`mt-1 ${errors.terms ? "border-red-500" : ""}`}
                  placeholder="Enter payment terms, late fees, return policy, etc."
                  maxLength={1000}
                />
                <div className="flex justify-between items-center mt-1">
                  <ErrorMessage field="terms" />
                  <span className="text-xs text-gray-500">
                    {data.terms?.length || 0}/1000
                  </span>
                </div>
              </div>
              <div>
                <Label htmlFor="notes">Notes & Instructions</Label>
                <Textarea
                  id="notes"
                  value={data.notes}
                  onChange={(e) => updateField("notes", e.target.value)}
                  onBlur={() =>
                    setTouched((prev) => new Set(prev).add("notes"))
                  }
                  rows={3}
                  className={`mt-1 ${errors.notes ? "border-red-500" : ""}`}
                  placeholder="Thank you message, special instructions, etc."
                  maxLength={500}
                />
                <div className="flex justify-between items-center mt-1">
                  <ErrorMessage field="notes" />
                  <span className="text-xs text-gray-500">
                    {data.notes?.length || 0}/500
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-6">
          {/* Bank Account Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <div className="w-2 h-6 bg-green-500 rounded"></div>
                Bank Account Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="bankName">Bank Name</Label>
                <Input
                  id="bankName"
                  value={data.bankName}
                  onChange={(e) => updateField("bankName", e.target.value)}
                  onBlur={() =>
                    setTouched((prev) => new Set(prev).add("bankName"))
                  }
                  className={`mt-1 ${errors.bankName ? "border-red-500" : ""}`}
                  placeholder="First National Bank"
                  maxLength={100}
                />
                <ErrorMessage field="bankName" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    value={data.accountNumber}
                    onChange={(e) =>
                      updateField("accountNumber", e.target.value)
                    }
                    onBlur={() =>
                      setTouched((prev) => new Set(prev).add("accountNumber"))
                    }
                    className={`mt-1 ${
                      errors.accountNumber ? "border-red-500" : ""
                    }`}
                    placeholder="1234567890"
                    maxLength={30}
                  />
                  <ErrorMessage field="accountNumber" />
                </div>
                <div>
                  <Label htmlFor="routingNumber">Routing Number</Label>
                  <Input
                    id="routingNumber"
                    value={data.routingNumber}
                    onChange={(e) =>
                      updateField("routingNumber", e.target.value)
                    }
                    onBlur={() =>
                      setTouched((prev) => new Set(prev).add("routingNumber"))
                    }
                    className={`mt-1 ${
                      errors.routingNumber ? "border-red-500" : ""
                    }`}
                    placeholder="021000021"
                    maxLength={20}
                  />
                  <ErrorMessage field="routingNumber" />
                </div>
              </div>
              <div>
                <Label htmlFor="swiftCode">SWIFT/BIC Code</Label>
                <Input
                  id="swiftCode"
                  value={data.swiftCode}
                  onChange={(e) => updateField("swiftCode", e.target.value)}
                  onBlur={() =>
                    setTouched((prev) => new Set(prev).add("swiftCode"))
                  }
                  className={`mt-1 ${errors.swiftCode ? "border-red-500" : ""}`}
                  placeholder="FNBKUS33"
                  maxLength={15}
                />
                <ErrorMessage field="swiftCode" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="design" className="space-y-6">
          {/* Color Theme */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Color Theme
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {colorThemes.map((theme) => (
                  <div
                    key={theme.name}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      data.theme.primaryColor === theme.primary
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() =>
                      updateTheme({
                        primaryColor: theme.primary,
                        secondaryColor: theme.secondary,
                        accentColor: theme.accent,
                      })
                    }
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: theme.primary }}
                      ></div>
                      <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: theme.secondary }}
                      ></div>
                      <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: theme.accent }}
                      ></div>
                    </div>
                    <p className="text-sm font-medium">{theme.name}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                <div>
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <Input
                    id="primaryColor"
                    type="color"
                    value={data.theme.primaryColor}
                    onChange={(e) =>
                      updateTheme({ primaryColor: e.target.value })
                    }
                    className="mt-1 h-10"
                  />
                </div>
                <div>
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <Input
                    id="secondaryColor"
                    type="color"
                    value={data.theme.secondaryColor}
                    onChange={(e) =>
                      updateTheme({ secondaryColor: e.target.value })
                    }
                    className="mt-1 h-10"
                  />
                </div>
                <div>
                  <Label htmlFor="accentColor">Accent Color</Label>
                  <Input
                    id="accentColor"
                    type="color"
                    value={data.theme.accentColor}
                    onChange={(e) =>
                      updateTheme({ accentColor: e.target.value })
                    }
                    className="mt-1 h-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Typography */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Type className="w-5 h-5" />
                Typography
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="headingFont">Heading Font</Label>
                  <Select
                    value={data.fonts.heading}
                    onValueChange={(value) => updateFonts({ heading: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fontOptions.map((font) => (
                        <SelectItem key={font} value={font}>
                          {font}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="bodyFont">Body Font</Label>
                  <Select
                    value={data.fonts.body}
                    onValueChange={(value) => updateFonts({ body: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fontOptions.map((font) => (
                        <SelectItem key={font} value={font}>
                          {font}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </div>
    </Tabs>
  );
}
