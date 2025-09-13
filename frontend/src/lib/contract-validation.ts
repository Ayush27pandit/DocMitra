import { z } from "zod";

export const contractSchema = z.object({
  // Company Information
  companyName: z
    .string()
    .min(1, "Company name is required")
    .max(100, "Company name too long"),
  companyAddress: z
    .string()
    .min(1, "Company address is required")
    .max(100, "Address too long"),
  companyCity: z
    .string()
    .min(1, "City is required")
    .max(50, "City name too long"),
  companyState: z
    .string()
    .min(1, "State is required")
    .max(20, "State name too long"),
  companyZip: z
    .string()
    .min(1, "ZIP code is required")
    .max(10, "ZIP code too long"),
  companyPhone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[\d\s\-$$$$+]+$/, "Invalid phone format"),
  companyEmail: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format"),

  // Employee Information
  employeeName: z
    .string()
    .min(1, "Employee name is required")
    .max(100, "Name too long"),
  employeeAddress: z
    .string()
    .min(1, "Employee address is required")
    .max(100, "Address too long"),
  employeeCity: z
    .string()
    .min(1, "City is required")
    .max(50, "City name too long"),
  employeeState: z
    .string()
    .min(1, "State is required")
    .max(20, "State name too long"),
  employeeZip: z
    .string()
    .min(1, "ZIP code is required")
    .max(10, "ZIP code too long"),
  employeePhone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[\d\s\-$$$$+]+$/, "Invalid phone format"),
  employeeEmail: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format"),
  employeeSSN: z
    .string()
    .min(1, "SSN is required")
    .regex(/^[\dX-]+$/, "Invalid SSN format"),

  // Position Details
  jobTitle: z
    .string()
    .min(1, "Job title is required")
    .max(100, "Job title too long"),
  department: z
    .string()
    .min(1, "Department is required")
    .max(50, "Department name too long"),
  startDate: z.string().min(1, "Start date is required"),
  employmentType: z.enum(["full-time", "part-time", "contract", "temporary"]),
  workLocation: z.enum(["on-site", "remote", "hybrid"]),

  // Compensation
  salary: z
    .number()
    .min(0, "Salary must be positive")
    .max(10000000, "Salary too high"),
  salaryType: z.enum(["annual", "monthly", "hourly"]),
  currency: z.string().min(1, "Currency is required"),
  payFrequency: z.enum(["weekly", "bi-weekly", "monthly", "quarterly"]),

  // Benefits
  healthInsurance: z.boolean(),
  dentalInsurance: z.boolean(),
  visionInsurance: z.boolean(),
  retirement401k: z.boolean(),
  paidTimeOff: z
    .number()
    .min(0, "PTO cannot be negative")
    .max(365, "PTO too high"),
  sickLeave: z
    .number()
    .min(0, "Sick leave cannot be negative")
    .max(365, "Sick leave too high"),

  // Work Schedule
  workHours: z
    .number()
    .min(1, "Work hours must be at least 1")
    .max(80, "Work hours too high"),
  workDays: z.array(z.string()).min(1, "At least one work day required"),

  // Contract Terms
  probationPeriod: z
    .number()
    .min(0, "Probation period cannot be negative")
    .max(365, "Probation period too long"),
  noticePeriod: z
    .number()
    .min(0, "Notice period cannot be negative")
    .max(365, "Notice period too long"),
  confidentialityClause: z.boolean(),
  nonCompeteClause: z.boolean(),
  nonCompeteDuration: z
    .number()
    .min(0, "Duration cannot be negative")
    .max(60, "Duration too long"),

  // Additional Terms
  additionalTerms: z.string().max(2000, "Additional terms too long"),

  // Customization
  theme: z.object({
    primary: z.string(),
    secondary: z.string(),
    accent: z.string(),
    background: z.string(),
    text: z.string(),
  }),
  font: z.string(),
});

export type ContractFormData = z.infer<typeof contractSchema>;
