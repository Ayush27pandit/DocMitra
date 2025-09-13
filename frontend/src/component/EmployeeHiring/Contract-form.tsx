"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { contractSchema } from "@/lib/contract-validation";
import { z } from "zod";
import type { ContractData } from "./Contract-page";

interface ContractFormProps {
  contractData: ContractData;
  setContractData: (data: ContractData) => void;
}

export function ContractForm({
  contractData,
  setContractData,
}: ContractFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (
    field: string,
    value: ContractData[keyof ContractData]
  ) => {
    try {
      const fieldSchema =
        contractSchema.shape[field as keyof typeof contractSchema.shape];
      if (fieldSchema) {
        fieldSchema.parse(value);
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [field]: error.errors[0].message }));
      }
    }
  };

  const updateField = (
    field: keyof ContractData,
    value: ContractData[keyof ContractData]
  ) => {
    setContractData({ ...contractData, [field]: value });
    validateField(field as string, value);
  };

  const updateTheme = (colorKey: string, value: string) => {
    setContractData({
      ...contractData,
      theme: { ...contractData.theme, [colorKey]: value },
    });
  };

  const workDayOptions = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="p-6">
      <Tabs defaultValue="company" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="employee">Employee</TabsTrigger>
          <TabsTrigger value="position">Position</TabsTrigger>
          <TabsTrigger value="compensation">Pay</TabsTrigger>
          <TabsTrigger value="terms">Terms</TabsTrigger>
          <TabsTrigger value="style">Style</TabsTrigger>
        </TabsList>

        <TabsContent value="company" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  value={contractData.companyName}
                  onChange={(e) => updateField("companyName", e.target.value)}
                  className={errors.companyName ? "border-red-500" : ""}
                  maxLength={100}
                />
                {errors.companyName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.companyName}
                  </p>
                )}
                <p className="text-gray-500 text-xs mt-1">
                  {contractData.companyName.length}/100
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyAddress">Address *</Label>
                  <Input
                    id="companyAddress"
                    value={contractData.companyAddress}
                    onChange={(e) =>
                      updateField("companyAddress", e.target.value)
                    }
                    className={errors.companyAddress ? "border-red-500" : ""}
                    maxLength={100}
                  />
                  {errors.companyAddress && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.companyAddress}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="companyCity">City *</Label>
                  <Input
                    id="companyCity"
                    value={contractData.companyCity}
                    onChange={(e) => updateField("companyCity", e.target.value)}
                    className={errors.companyCity ? "border-red-500" : ""}
                    maxLength={50}
                  />
                  {errors.companyCity && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.companyCity}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyState">State *</Label>
                  <Input
                    id="companyState"
                    value={contractData.companyState}
                    onChange={(e) =>
                      updateField("companyState", e.target.value)
                    }
                    className={errors.companyState ? "border-red-500" : ""}
                    maxLength={20}
                  />
                  {errors.companyState && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.companyState}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="companyZip">ZIP Code *</Label>
                  <Input
                    id="companyZip"
                    value={contractData.companyZip}
                    onChange={(e) => updateField("companyZip", e.target.value)}
                    className={errors.companyZip ? "border-red-500" : ""}
                    maxLength={10}
                  />
                  {errors.companyZip && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.companyZip}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyPhone">Phone *</Label>
                  <Input
                    id="companyPhone"
                    value={contractData.companyPhone}
                    onChange={(e) =>
                      updateField("companyPhone", e.target.value)
                    }
                    className={errors.companyPhone ? "border-red-500" : ""}
                    placeholder="(555) 123-4567"
                  />
                  {errors.companyPhone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.companyPhone}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="companyEmail">Email *</Label>
                  <Input
                    id="companyEmail"
                    type="email"
                    value={contractData.companyEmail}
                    onChange={(e) =>
                      updateField("companyEmail", e.target.value)
                    }
                    className={errors.companyEmail ? "border-red-500" : ""}
                  />
                  {errors.companyEmail && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.companyEmail}
                    </p>
                  )}
                </div>
              </div>

              {/* Adding new fields for comprehensive employment agreement */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyType">Company Type *</Label>
                  <Input
                    id="companyType"
                    value={contractData.companyType || ""}
                    onChange={(e) => updateField("companyType", e.target.value)}
                    placeholder="e.g., Private Limited Company"
                    maxLength={100}
                  />
                </div>
                <div>
                  <Label htmlFor="incorporationAct">Incorporation Act *</Label>
                  <Input
                    id="incorporationAct"
                    value={contractData.incorporationAct || ""}
                    onChange={(e) =>
                      updateField("incorporationAct", e.target.value)
                    }
                    placeholder="e.g., Companies Act, 1956"
                    maxLength={100}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="registeredOffice">
                  Registered Office Address *
                </Label>
                <Textarea
                  id="registeredOffice"
                  value={contractData.registeredOffice || ""}
                  onChange={(e) =>
                    updateField("registeredOffice", e.target.value)
                  }
                  placeholder="Complete registered office address"
                  maxLength={300}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="employee" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Employee Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="employeeName">Full Name *</Label>
                <Input
                  id="employeeName"
                  value={contractData.employeeName}
                  onChange={(e) => updateField("employeeName", e.target.value)}
                  className={errors.employeeName ? "border-red-500" : ""}
                  maxLength={100}
                />
                {errors.employeeName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.employeeName}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="employeeAddress">Address *</Label>
                  <Input
                    id="employeeAddress"
                    value={contractData.employeeAddress}
                    onChange={(e) =>
                      updateField("employeeAddress", e.target.value)
                    }
                    className={errors.employeeAddress ? "border-red-500" : ""}
                    maxLength={100}
                  />
                  {errors.employeeAddress && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.employeeAddress}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="employeeCity">City *</Label>
                  <Input
                    id="employeeCity"
                    value={contractData.employeeCity}
                    onChange={(e) =>
                      updateField("employeeCity", e.target.value)
                    }
                    className={errors.employeeCity ? "border-red-500" : ""}
                    maxLength={50}
                  />
                  {errors.employeeCity && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.employeeCity}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="employeeState">State *</Label>
                  <Input
                    id="employeeState"
                    value={contractData.employeeState}
                    onChange={(e) =>
                      updateField("employeeState", e.target.value)
                    }
                    className={errors.employeeState ? "border-red-500" : ""}
                    maxLength={20}
                  />
                  {errors.employeeState && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.employeeState}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="employeeZip">ZIP Code *</Label>
                  <Input
                    id="employeeZip"
                    value={contractData.employeeZip}
                    onChange={(e) => updateField("employeeZip", e.target.value)}
                    className={errors.employeeZip ? "border-red-500" : ""}
                    maxLength={10}
                  />
                  {errors.employeeZip && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.employeeZip}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="employeeSSN">SSN *</Label>
                  <Input
                    id="employeeSSN"
                    value={contractData.employeeSSN}
                    onChange={(e) => updateField("employeeSSN", e.target.value)}
                    className={errors.employeeSSN ? "border-red-500" : ""}
                    placeholder="XXX-XX-1234"
                  />
                  {errors.employeeSSN && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.employeeSSN}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="employeePhone">Phone *</Label>
                  <Input
                    id="employeePhone"
                    value={contractData.employeePhone}
                    onChange={(e) =>
                      updateField("employeePhone", e.target.value)
                    }
                    className={errors.employeePhone ? "border-red-500" : ""}
                    placeholder="(555) 987-6543"
                  />
                  {errors.employeePhone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.employeePhone}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="employeeEmail">Email *</Label>
                  <Input
                    id="employeeEmail"
                    type="email"
                    value={contractData.employeeEmail}
                    onChange={(e) =>
                      updateField("employeeEmail", e.target.value)
                    }
                    className={errors.employeeEmail ? "border-red-500" : ""}
                  />
                  {errors.employeeEmail && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.employeeEmail}
                    </p>
                  )}
                </div>
              </div>

              {/* Adding employee relationship details */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="employeeRelation">
                    Son/Daughter/Wife of *
                  </Label>
                  <Input
                    id="employeeRelation"
                    value={contractData.employeeRelation || ""}
                    onChange={(e) =>
                      updateField("employeeRelation", e.target.value)
                    }
                    placeholder="Father's/Husband's name"
                    maxLength={100}
                  />
                </div>
                <div>
                  <Label htmlFor="employeeAge">Age *</Label>
                  <Input
                    id="employeeAge"
                    type="number"
                    value={contractData.employeeAge || ""}
                    onChange={(e) =>
                      updateField(
                        "employeeAge",
                        Number.parseInt(e.target.value) || 0
                      )
                    }
                    min="18"
                    max="100"
                  />
                </div>
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={contractData.dateOfBirth || ""}
                    onChange={(e) => updateField("dateOfBirth", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="position" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Position Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="jobTitle">Job Title *</Label>
                  <Input
                    id="jobTitle"
                    value={contractData.jobTitle}
                    onChange={(e) => updateField("jobTitle", e.target.value)}
                    className={errors.jobTitle ? "border-red-500" : ""}
                    maxLength={100}
                  />
                  {errors.jobTitle && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.jobTitle}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="department">Department *</Label>
                  <Input
                    id="department"
                    value={contractData.department}
                    onChange={(e) => updateField("department", e.target.value)}
                    className={errors.department ? "border-red-500" : ""}
                    maxLength={50}
                  />
                  {errors.department && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.department}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={contractData.startDate}
                    onChange={(e) => updateField("startDate", e.target.value)}
                    className={errors.startDate ? "border-red-500" : ""}
                  />
                  {errors.startDate && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.startDate}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="employmentType">Employment Type *</Label>
                  <Select
                    value={contractData.employmentType}
                    onValueChange={(value) =>
                      updateField("employmentType", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="temporary">Temporary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="workLocation">Work Location *</Label>
                  <Select
                    value={contractData.workLocation}
                    onValueChange={(value) =>
                      updateField("workLocation", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="on-site">On-site</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="workHours">Weekly Hours *</Label>
                  <Input
                    id="workHours"
                    type="number"
                    value={contractData.workHours}
                    onChange={(e) =>
                      updateField(
                        "workHours",
                        Number.parseInt(e.target.value) || 0
                      )
                    }
                    className={errors.workHours ? "border-red-500" : ""}
                    min="1"
                    max="80"
                  />
                  {errors.workHours && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.workHours}
                    </p>
                  )}
                </div>
                <div>
                  <Label>Work Days *</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {workDayOptions.map((day) => (
                      <div key={day} className="flex items-center space-x-2">
                        <Checkbox
                          id={day}
                          checked={contractData.workDays.includes(day)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              updateField("workDays", [
                                ...contractData.workDays,
                                day,
                              ]);
                            } else {
                              updateField(
                                "workDays",
                                contractData.workDays.filter(
                                  (d: string) => d !== day
                                )
                              );
                            }
                          }}
                        />
                        <Label htmlFor={day} className="text-sm">
                          {day.slice(0, 3)}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compensation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compensation & Benefits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="salary">Salary Amount *</Label>
                  <Input
                    id="salary"
                    type="number"
                    value={contractData.salary}
                    onChange={(e) =>
                      updateField(
                        "salary",
                        Number.parseFloat(e.target.value) || 0
                      )
                    }
                    className={errors.salary ? "border-red-500" : ""}
                    min="0"
                  />
                  {errors.salary && (
                    <p className="text-red-500 text-sm mt-1">{errors.salary}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="salaryType">Salary Type *</Label>
                  <Select
                    value={contractData.salaryType}
                    onValueChange={(value) => updateField("salaryType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="annual">Annual</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="currency">Currency *</Label>
                  <Select
                    value={contractData.currency}
                    onValueChange={(value) => updateField("currency", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="CAD">CAD (C$)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="payFrequency">Pay Frequency *</Label>
                <Select
                  value={contractData.payFrequency}
                  onValueChange={(value) => updateField("payFrequency", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Benefits</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="healthInsurance"
                      checked={contractData.healthInsurance}
                      onCheckedChange={(checked) =>
                        updateField("healthInsurance", checked)
                      }
                    />
                    <Label htmlFor="healthInsurance">Health Insurance</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="dentalInsurance"
                      checked={contractData.dentalInsurance}
                      onCheckedChange={(checked) =>
                        updateField("dentalInsurance", checked)
                      }
                    />
                    <Label htmlFor="dentalInsurance">Dental Insurance</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="visionInsurance"
                      checked={contractData.visionInsurance}
                      onCheckedChange={(checked) =>
                        updateField("visionInsurance", checked)
                      }
                    />
                    <Label htmlFor="visionInsurance">Vision Insurance</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="retirement401k"
                      checked={contractData.retirement401k}
                      onCheckedChange={(checked) =>
                        updateField("retirement401k", checked)
                      }
                    />
                    <Label htmlFor="retirement401k">401(k) Plan</Label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="paidTimeOff">Paid Time Off (days/year)</Label>
                  <Input
                    id="paidTimeOff"
                    type="number"
                    value={contractData.paidTimeOff}
                    onChange={(e) =>
                      updateField(
                        "paidTimeOff",
                        Number.parseInt(e.target.value) || 0
                      )
                    }
                    min="0"
                    max="365"
                  />
                </div>
                <div>
                  <Label htmlFor="sickLeave">Sick Leave (days/year)</Label>
                  <Input
                    id="sickLeave"
                    type="number"
                    value={contractData.sickLeave}
                    onChange={(e) =>
                      updateField(
                        "sickLeave",
                        Number.parseInt(e.target.value) || 0
                      )
                    }
                    min="0"
                    max="365"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="terms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contract Terms & Legal Clauses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="probationPeriod">
                    Probation Period (days) *
                  </Label>
                  <Input
                    id="probationPeriod"
                    type="number"
                    value={contractData.probationPeriod}
                    onChange={(e) =>
                      updateField(
                        "probationPeriod",
                        Number.parseInt(e.target.value) || 90
                      )
                    }
                    min="0"
                    max="365"
                  />
                </div>
                <div>
                  <Label htmlFor="noticePeriod">Notice Period (months) *</Label>
                  <Input
                    id="noticePeriod"
                    type="number"
                    value={contractData.noticePeriod}
                    onChange={(e) =>
                      updateField(
                        "noticePeriod",
                        Number.parseInt(e.target.value) || 1
                      )
                    }
                    min="0"
                    max="12"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="casualLeave">
                    Casual Leave (days/year) *
                  </Label>
                  <Input
                    id="casualLeave"
                    type="number"
                    value={contractData.casualLeave || 12}
                    onChange={(e) =>
                      updateField(
                        "casualLeave",
                        Number.parseInt(e.target.value) || 12
                      )
                    }
                    min="0"
                    max="50"
                  />
                </div>
                <div>
                  <Label htmlFor="publicHolidays">
                    Public Holidays (days/year) *
                  </Label>
                  <Input
                    id="publicHolidays"
                    type="number"
                    value={contractData.publicHolidays || 10}
                    onChange={(e) =>
                      updateField(
                        "publicHolidays",
                        Number.parseInt(e.target.value) || 10
                      )
                    }
                    min="0"
                    max="30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nonCompetePeriod">
                    Non-Compete Period (years)
                  </Label>
                  <Input
                    id="nonCompetePeriod"
                    type="number"
                    value={contractData.nonCompetePeriod || 1}
                    onChange={(e) =>
                      updateField(
                        "nonCompetePeriod",
                        Number.parseInt(e.target.value) || 1
                      )
                    }
                    min="0"
                    max="5"
                  />
                </div>
                <div>
                  <Label htmlFor="restrictivePeriod">
                    Restrictive Covenant (years)
                  </Label>
                  <Input
                    id="restrictivePeriod"
                    type="number"
                    value={contractData.restrictivePeriod || 3}
                    onChange={(e) =>
                      updateField(
                        "restrictivePeriod",
                        Number.parseInt(e.target.value) || 3
                      )
                    }
                    min="0"
                    max="10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="competingBusiness">
                  Competing Business Description
                </Label>
                <Textarea
                  id="competingBusiness"
                  value={contractData.competingBusiness || ""}
                  onChange={(e) =>
                    updateField("competingBusiness", e.target.value)
                  }
                  placeholder="Describe the type of competing business activities prohibited"
                  maxLength={500}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="governingLaw">
                    Governing Law (State/Country) *
                  </Label>
                  <Input
                    id="governingLaw"
                    value={contractData.governingLaw || ""}
                    onChange={(e) =>
                      updateField("governingLaw", e.target.value)
                    }
                    placeholder="e.g., New York, USA"
                    maxLength={100}
                  />
                </div>
                <div>
                  <Label htmlFor="jurisdiction">Jurisdiction (Courts) *</Label>
                  <Input
                    id="jurisdiction"
                    value={contractData.jurisdiction || ""}
                    onChange={(e) =>
                      updateField("jurisdiction", e.target.value)
                    }
                    placeholder="e.g., New York, NY"
                    maxLength={100}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="confidentialityClause"
                    checked={contractData.confidentialityClause}
                    onCheckedChange={(checked) =>
                      updateField("confidentialityClause", checked)
                    }
                  />
                  <Label htmlFor="confidentialityClause">
                    Confidentiality Agreement
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="nonCompeteClause"
                    checked={contractData.nonCompeteClause}
                    onCheckedChange={(checked) =>
                      updateField("nonCompeteClause", checked)
                    }
                  />
                  <Label htmlFor="nonCompeteClause">
                    Non-Compete Agreement
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="intellectualProperty"
                    checked={contractData.intellectualProperty || false}
                    onCheckedChange={(checked) =>
                      updateField("intellectualProperty", checked)
                    }
                  />
                  <Label htmlFor="intellectualProperty">
                    Intellectual Property Assignment
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="indemnification"
                    checked={contractData.indemnification || false}
                    onCheckedChange={(checked) =>
                      updateField("indemnification", checked)
                    }
                  />
                  <Label htmlFor="indemnification">
                    Indemnification Clause
                  </Label>
                </div>
              </div>

              <div>
                <Label htmlFor="additionalTerms">
                  Additional Terms & Conditions
                </Label>
                <Textarea
                  id="additionalTerms"
                  value={contractData.additionalTerms}
                  onChange={(e) =>
                    updateField("additionalTerms", e.target.value)
                  }
                  className={errors.additionalTerms ? "border-red-500" : ""}
                  rows={6}
                  maxLength={2000}
                  placeholder="Enter any additional terms, conditions, or special agreements..."
                />
                {errors.additionalTerms && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.additionalTerms}
                  </p>
                )}
                <p className="text-gray-500 text-xs mt-1">
                  {contractData.additionalTerms.length}/2000
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="style" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="font">Font Family</Label>
                <Select
                  value={contractData.font}
                  onValueChange={(value) => updateField("font", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Inter">Inter (Modern)</SelectItem>
                    <SelectItem value="Times New Roman">
                      Times New Roman (Classic)
                    </SelectItem>
                    <SelectItem value="Arial">Arial (Clean)</SelectItem>
                    <SelectItem value="Georgia">Georgia (Elegant)</SelectItem>
                    <SelectItem value="Helvetica">
                      Helvetica (Professional)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Color Theme</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="primary">Primary Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="primary"
                        type="color"
                        value={contractData.theme.primary}
                        onChange={(e) => updateTheme("primary", e.target.value)}
                        className="w-16 h-10"
                      />
                      <Input
                        value={contractData.theme.primary}
                        onChange={(e) => updateTheme("primary", e.target.value)}
                        placeholder="#2563eb"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="secondary">Secondary Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="secondary"
                        type="color"
                        value={contractData.theme.secondary}
                        onChange={(e) =>
                          updateTheme("secondary", e.target.value)
                        }
                        className="w-16 h-10"
                      />
                      <Input
                        value={contractData.theme.secondary}
                        onChange={(e) =>
                          updateTheme("secondary", e.target.value)
                        }
                        placeholder="#64748b"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="accent">Accent Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="accent"
                        type="color"
                        value={contractData.theme.accent}
                        onChange={(e) => updateTheme("accent", e.target.value)}
                        className="w-16 h-10"
                      />
                      <Input
                        value={contractData.theme.accent}
                        onChange={(e) => updateTheme("accent", e.target.value)}
                        placeholder="#0ea5e9"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="text">Text Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="text"
                        type="color"
                        value={contractData.theme.text}
                        onChange={(e) => updateTheme("text", e.target.value)}
                        className="w-16 h-10"
                      />
                      <Input
                        value={contractData.theme.text}
                        onChange={(e) => updateTheme("text", e.target.value)}
                        placeholder="#1e293b"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
