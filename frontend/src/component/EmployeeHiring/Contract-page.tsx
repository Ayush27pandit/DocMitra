"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { ContractForm } from "./Contract-form";
import { ContractPreview } from "./EmployeePreview";

export interface ContractData {
  // Company Information
  companyName: string;
  companyAddress: string;
  companyCity: string;
  companyState: string;
  companyZip: string;
  companyPhone: string;
  companyEmail: string;
  companyType: string;
  incorporationAct: string;
  registeredOffice: string;

  // Employee Information
  employeeName: string;
  employeeAddress: string;
  employeeCity: string;
  employeeState: string;
  employeeZip: string;
  employeePhone: string;
  employeeEmail: string;
  employeeSSN: string;
  employeeRelation: string;
  employeeAge: number;
  dateOfBirth: string;

  // Position Details
  jobTitle: string;
  department: string;
  startDate: string;
  employmentType: "full-time" | "part-time" | "contract" | "temporary";
  workLocation: "on-site" | "remote" | "hybrid";

  // Compensation
  salary: number;
  salaryType: "annual" | "monthly" | "hourly";
  currency: string;
  payFrequency: "weekly" | "bi-weekly" | "monthly" | "quarterly";

  // Benefits
  healthInsurance: boolean;
  dentalInsurance: boolean;
  visionInsurance: boolean;
  retirement401k: boolean;
  paidTimeOff: number;
  sickLeave: number;

  // Work Schedule
  workHours: number;
  workDays: string[];

  // Contract Terms
  probationPeriod: number;
  noticePeriod: number;
  confidentialityClause: boolean;
  nonCompeteClause: boolean;
  nonCompeteDuration: number;
  casualLeave: number;
  publicHolidays: number;
  nonCompetePeriod: number;
  restrictivePeriod: number;
  competingBusiness: string;
  governingLaw: string;
  jurisdiction: string;
  intellectualProperty: boolean;
  indemnification: boolean;

  // Additional Terms
  additionalTerms: string;

  // Customization
  theme: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  font: string;
}

export default function ContractPage() {
  const [contractData, setContractData] = useState<ContractData>({
    // Company Information
    companyName: "Acme Corporation",
    companyAddress: "123 Business Ave",
    companyCity: "New York",
    companyState: "NY",
    companyZip: "10001",
    companyPhone: "(555) 123-4567",
    companyEmail: "hr@acmecorp.com",
    companyType: "Private Limited Company",
    incorporationAct: "Companies Act, 1956",
    registeredOffice:
      "123 Business Avenue, Suite 100, New York, NY 10001, United States",

    // Employee Information
    employeeName: "John Doe",
    employeeAddress: "456 Main St",
    employeeCity: "New York",
    employeeState: "NY",
    employeeZip: "10002",
    employeePhone: "(555) 987-6543",
    employeeEmail: "john.doe@email.com",
    employeeSSN: "XXX-XX-1234",
    employeeRelation: "Robert Doe",
    employeeAge: 28,
    dateOfBirth: "1995-06-15",

    // Position Details
    jobTitle: "Software Engineer",
    department: "Engineering",
    startDate: "2024-01-15",
    employmentType: "full-time",
    workLocation: "hybrid",

    // Compensation
    salary: 85000,
    salaryType: "annual",
    currency: "USD",
    payFrequency: "bi-weekly",

    // Benefits
    healthInsurance: true,
    dentalInsurance: true,
    visionInsurance: false,
    retirement401k: true,
    paidTimeOff: 20,
    sickLeave: 10,

    // Work Schedule
    workHours: 40,
    workDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],

    // Contract Terms
    probationPeriod: 90,
    noticePeriod: 1,
    confidentialityClause: true,
    nonCompeteClause: true,
    nonCompeteDuration: 12,
    casualLeave: 12,
    publicHolidays: 10,
    nonCompetePeriod: 1,
    restrictivePeriod: 3,
    competingBusiness:
      "Software development, technology consulting, or any business that directly competes with the Company's core services",
    governingLaw: "India",
    jurisdiction: "India",
    intellectualProperty: true,
    indemnification: true,

    // Additional Terms
    additionalTerms: "",

    // Customization
    theme: {
      primary: "#2563eb",
      secondary: "#64748b",
      accent: "#0ea5e9",
      background: "#ffffff",
      text: "#1e293b",
    },
    font: "Inter",
  });

  useEffect(() => {
    const savedData = localStorage.getItem("contract-draft");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setContractData(parsedData);
      } catch (error) {
        console.error("Failed to load saved contract data:", error);
      }
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem("contract-draft", JSON.stringify(contractData));
    }, 1000); // Debounce saves by 1 second

    return () => clearTimeout(timeoutId);
  }, [contractData]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Employment Contract Generator
            </h1>
            <p className="text-gray-600 mt-2">
              Create professional employment contracts with live preview and
              auto-save
            </p>
          </div>
          <Link to="/">
            <Button
              variant="outline"
              className="flex items-center gap-2 bg-transparent"
            >
              🧾 Invoice Generator
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
          <div className=" bg-white rounded-lg shadow-sm border overflow-auto">
            <ContractForm
              contractData={contractData}
              setContractData={setContractData}
            />
          </div>

          <div className=" lg:block bg-white rounded-lg shadow-sm border">
            <ContractPreview contractData={contractData} />
          </div>
        </div>
      </div>
    </div>
  );
}
