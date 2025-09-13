"use client";

import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Printer, FileText } from "lucide-react";
import html2canvas from "html2canvas";
import type { ContractData } from "./Contract-page";

interface ContractPreviewProps {
  contractData: ContractData;
}

export function ContractPreview({ contractData }: ContractPreviewProps) {
  const contractRef = useRef<HTMLDivElement>(null);
  const [pageBreaks, setPageBreaks] = useState<number[]>([]);

  useEffect(() => {
    const detectPageBreaks = () => {
      if (contractRef.current) {
        const A4_HEIGHT = 1123; // A4 height at 96dpi
        const MARGIN = 96; // 1 inch margin
        const USABLE_HEIGHT = A4_HEIGHT - MARGIN * 2;

        const elements =
          contractRef.current.querySelectorAll(".contract-section");
        let currentHeight = 0;
        const breaks: number[] = [];

        elements.forEach((element, index) => {
          const elementHeight = element.getBoundingClientRect().height;

          if (
            currentHeight + elementHeight > USABLE_HEIGHT &&
            currentHeight > 0
          ) {
            breaks.push(index);
            currentHeight = elementHeight;
          } else {
            currentHeight += elementHeight;
          }
        });

        setPageBreaks(breaks);
      }
    };

    // Detect page breaks after content loads
    const timer = setTimeout(detectPageBreaks, 100);
    return () => clearTimeout(timer);
  }, [contractData]);

  const downloadAsPNG = async () => {
    if (contractRef.current) {
      const canvas = await html2canvas(contractRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
      });

      const link = document.createElement("a");
      link.download = `employment-contract-${contractData.employeeName
        .replace(/\s+/g, "-")
        .toLowerCase()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const downloadAsPDF = async () => {
    try {
      const response = await fetch("/api/generate-contract-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contractData),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `employment-contract-${contractData.employeeName
          .replace(/\s+/g, "-")
          .toLowerCase()}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
      } else {
        console.error("Failed to generate PDF");
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const printContract = () => {
    if (contractRef.current) {
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Employment Contract - ${contractData.employeeName}</title>
              <style>
                body { font-family: ${contractData.font}, sans-serif; margin: 0; padding: 20px; line-height: 1.6; }
                @media print { 
                  body { margin: 0; } 
                  .page-break { page-break-before: always; }
                  .page-break-indicator { display: none; }
                }
                .legal-section { margin-bottom: 24px; }
                .legal-subsection { margin-left: 20px; margin-bottom: 12px; }
                .signature-line { border-bottom: 1px solid #000; height: 40px; margin-bottom: 8px; }
              </style>
            </head>
            <body>
              ${contractRef.current.innerHTML}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  const formatCurrency = (amount: number) => {
    const symbols = { USD: "$", EUR: "€", GBP: "£", CAD: "C$" };
    return `${
      symbols[contractData.currency as keyof typeof symbols] || "$"
    }${amount.toLocaleString()}`;
  };

  // const formatDate = (dateString: string) => {
  //   if (!dateString) return "_______________";
  //   return new Date(dateString).toLocaleDateString("en-US", {
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //   });
  // };

  const getCurrentDate = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleDateString("en-US", { month: "long" });
    const year = today.getFullYear();
    return { day, month, year };
  };

  const { day, month, year } = getCurrentDate();

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
        <h3 className="font-semibold text-gray-900">Contract Preview</h3>
        <div className="flex gap-2">
          <Button onClick={downloadAsPNG} size="sm" variant="outline">
            <Download className="w-4 h-4 mr-2" />
            PNG
          </Button>
          <Button onClick={downloadAsPDF} size="sm" variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            PDF
          </Button>
          <Button onClick={printContract} size="sm" variant="outline">
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div
          ref={contractRef}
          className="bg-white shadow-sm border mx-auto"
          style={{
            fontFamily: contractData.font,
            color: contractData.theme.text,
            width: "794px", // Fixed A4 width at 96dpi for accurate partitioning
            minHeight: "1123px", // A4 height at 96dpi
            fontSize: "11px",
            lineHeight: "1.4",
          }}
        >
          <div className="p-12">
            <div className="contract-section text-center mb-8">
              <h1
                className="text-2xl font-bold mb-4"
                style={{ color: contractData.theme.primary }}
              >
                EMPLOYMENT AGREEMENT
              </h1>
              <p className="text-justify mb-6 leading-relaxed">
                This agreement lays down the terms of employment, agreed upon by
                the employer and employee. Whether stated explicitly in the
                agreement or not, both the employee and the employer have the
                duty of mutual confidence and trust, and to make only lawful and
                reasonable demands on each other.
              </p>
              <div className="border-t border-b border-gray-400 py-2 mb-6">
                <div className="h-px bg-gray-400"></div>
              </div>
              <p className="text-justify mb-4">
                This <strong>EMPLOYMENT AGREEMENT</strong> (Hereinafter, the
                "Agreement") is entered into on this <strong>{day}</strong> day
                of <strong>{month}</strong>, <strong>{year}</strong>,
              </p>
              <p className="text-center font-bold mb-4">BY AND BETWEEN</p>
            </div>

            {/* Company Details */}
            <div className="contract-section mb-6">
              <p className="text-justify mb-4">
                <strong>{contractData.companyName}</strong>, a{" "}
                {contractData.companyType} incorporated under the{" "}
                {contractData.incorporationAct}, having its registered office at{" "}
                {contractData.registeredOffice} (hereinafter referred to as the
                "Company" or "Employer", which expression shall, unless
                repugnant to the meaning or context hereof, be deemed to include
                all permitted successors and assigns),
              </p>
              <p className="text-center font-bold mb-4">AND</p>
              <p className="text-justify mb-6">
                <strong>{contractData.employeeName}</strong> son/daughter/wife
                of {contractData.employeeRelation} aged{" "}
                {contractData.employeeAge} years and residing at{" "}
                {contractData.employeeAddress}, {contractData.employeeCity},{" "}
                {contractData.employeeState} {contractData.employeeZip}{" "}
                (hereinafter referred to as the "Employee", which expression
                shall, unless repugnant to the meaning or context hereof, be
                deemed to include all permitted successors and assigns).
              </p>
              <p className="text-justify mb-4">
                <strong>WHEREAS</strong>, the parties hereto desire to enter
                into this Agreement to define and set forth the terms and
                conditions of the employment of the Employee by the Company;
              </p>
              <p className="text-justify mb-6">
                <strong>NOW, THEREFORE</strong>, in consideration of the mutual
                covenants and agreements set forth below, it is hereby
                covenanted and agreed by the Company and the Employee as
                follows:
              </p>
            </div>

            {pageBreaks.includes(1) && (
              <div className="page-break-indicator border-t-2 border-dashed border-gray-400 my-8 relative">
                <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white px-2 text-sm text-gray-500">
                  Page Break
                </span>
              </div>
            )}

            {/* Section 1: Interpretation */}
            <div className="contract-section legal-section">
              <h2
                className="text-lg font-bold mb-4"
                style={{ color: contractData.theme.primary }}
              >
                1. Interpretation
              </h2>
              <p className="mb-3">
                In this agreement the following terms shall have the following
                meanings:
              </p>
              <div className="legal-subsection">
                <p className="mb-3">
                  <strong>a) "Confidential Information"</strong> any trade
                  secret or other information which is confidential or
                  commercially sensitive and which is not in the public domain
                  (other than through the wrongful disclosure by the Employee)
                  and which belongs to any Group Company (whether stored or
                  recorded in documentary or electronic form) and which (without
                  limitation) relates to the business methods, management
                  systems, marketing plans, strategic plans, finances, new or
                  maturing business opportunities, marketing activities,
                  processes, inventions, designs or similar of any Group
                  Company, or to which any Group Company owes a duty of
                  confidentiality to any third party and including in particular
                  software code, client information, and proprietary
                  methodologies;
                </p>
                <p className="mb-3">
                  <strong>b) "The Employment"</strong> the employment of the
                  Employee by the Company in accordance with the terms of this
                  agreement;
                </p>
                <p className="mb-3">
                  <strong>c) "Group Company"</strong> the Company, any company
                  of which it is a Subsidiary (being a holding company of the
                  Company) and any Subsidiaries of the Company or any holding
                  company, from time to time;
                </p>
                <p className="mb-3">
                  <strong>d) "Subsidiary"</strong> a company as defined in
                  section 1159 of the Companies Act 2006;
                </p>
                <p className="mb-3">
                  <strong>e) "Termination Date"</strong> the date on which the
                  Employment ceases.
                </p>
              </div>
            </div>

            {pageBreaks.includes(2) && (
              <div className="page-break-indicator border-t-2 border-dashed border-gray-400 my-8 relative">
                <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white px-2 text-sm text-gray-500">
                  Page Break
                </span>
              </div>
            )}

            {/* Section 2: Position */}
            <div className="contract-section legal-section">
              <h2
                className="text-lg font-bold mb-4"
                style={{ color: contractData.theme.primary }}
              >
                2. Position
              </h2>
              <div className="legal-subsection">
                <p className="mb-3">
                  <strong>a.</strong> Upon execution of this Agreement, the
                  employee would be posted as the{" "}
                  <strong>{contractData.jobTitle}</strong> of the Company.
                </p>
                <p className="mb-3">
                  <strong>b.</strong> During the term period of this Agreement,
                  the Company may change the employee's above mentioned post (or
                  position) or location based on the Company's production,
                  operation or working requirements or according to the
                  employee's working capacities and performance, including but
                  not limited to adjustments made to the employee's job
                  description or workplace, promotion, work transfer at the same
                  level, and demotion, etc., or adjustments made to the
                  employee's responsibilities without any change to employee's
                  post (or position).
                </p>
              </div>
            </div>

            {/* Section 3: Term and Probation Period */}
            <div className="contract-section legal-section">
              <h2
                className="text-lg font-bold mb-4"
                style={{ color: contractData.theme.primary }}
              >
                3. Term and Probation Period
              </h2>
              <div className="legal-subsection">
                <p className="mb-3">
                  <strong>a.</strong> It is understood and agreed that the first{" "}
                  <strong>{contractData.probationPeriod}</strong> (
                  {contractData.probationPeriod}) days of employment shall
                  constitute a probationary period ("Probationary Period")
                  during which period the Employer may, in its absolute
                  discretion, terminate the Employee's employment, without
                  assigning any reasons and without notice or cause.
                </p>
                <p className="mb-3">
                  <strong>b.</strong> After the end of the Probationary Period,
                  the Employer may decide to confirm the Employment of the
                  Employee, in its sole discretion.
                </p>
                <p className="mb-3">
                  <strong>c.</strong> After the end of the Probationary Period,
                  this Agreement may be terminated in accordance with Clause 12
                  of this Agreement.
                </p>
              </div>
            </div>

            {pageBreaks.includes(3) && (
              <div className="page-break-indicator border-t-2 border-dashed border-gray-400 my-8 relative">
                <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white px-2 text-sm text-gray-500">
                  Page Break
                </span>
              </div>
            )}

            {/* Section 4: Performance of Duties */}
            <div className="contract-section legal-section">
              <h2
                className="text-lg font-bold mb-4"
                style={{ color: contractData.theme.primary }}
              >
                4. Performance of Duties
              </h2>
              <div className="legal-subsection">
                <p className="mb-3">
                  <strong>a.</strong> The Employee agrees that during the
                  Employment Period, he/she shall devote his/her full business
                  time to the business affairs of the Company and shall perform
                  the duties assigned to him/her faithfully and efficiently, and
                  shall endeavor, to the best of his/her abilities to achieve
                  the goals and adhere to the parameters set by the Company.
                </p>
                <p className="mb-3">
                  <strong>b.</strong> The Employee shall be responsible for:{" "}
                  {contractData.department} operations, {contractData.jobTitle}{" "}
                  duties, and all tasks assigned by management in accordance
                  with company policies and procedures.
                </p>
              </div>
            </div>

            {/* Section 5: Compensation */}
            <div className="contract-section legal-section">
              <h2
                className="text-lg font-bold mb-4"
                style={{ color: contractData.theme.primary }}
              >
                5. Compensation
              </h2>
              <p className="mb-3">
                Subject to the following provisions of this Agreement, during
                the Employment Period, the Employee shall be compensated for his
                services as follows:
              </p>
              <div className="legal-subsection">
                <p className="mb-3">
                  <strong>a.</strong> The Employee shall receive an{" "}
                  {contractData.salaryType} salary, payable in{" "}
                  {contractData.payFrequency} or more frequent installments, as
                  per the convenience of the Employer, an amount of{" "}
                  <strong>{formatCurrency(contractData.salary)}</strong> per{" "}
                  {contractData.salaryType}, subject to such increases from time
                  to time, as determined by the Employer. Such payments shall be
                  subject to such normal statutory deductions by the Employer.
                </p>
                <p className="mb-3">
                  <strong>b.</strong> During the term of this Agreement, the
                  Employee's salary shall be paid by means of bank transfer,
                  cheque, or any other method convenient to the Employer, and
                  consented to by the Employee.
                </p>
                <p className="mb-3">
                  <strong>c.</strong> All reasonable expenses arising out of
                  employment shall be reimbursed assuming that the same have
                  been authorized prior to being incurred and with the provision
                  of appropriate receipts.
                </p>
              </div>
            </div>

            {pageBreaks.includes(4) && (
              <div className="page-break-indicator border-t-2 border-dashed border-gray-400 my-8 relative">
                <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white px-2 text-sm text-gray-500">
                  Page Break
                </span>
              </div>
            )}

            {/* Section 6: Obligations of the Employee */}
            <div className="contract-section legal-section">
              <h2
                className="text-lg font-bold mb-4"
                style={{ color: contractData.theme.primary }}
              >
                6. Obligations of the Employee
              </h2>
              <div className="legal-subsection">
                <p className="mb-3">
                  <strong>a.</strong> Upon execution of agreement, the Employee
                  shall not engage in any sort of theft, fraud,
                  misrepresentation or any other illegal act neither in the
                  employment space nor outside the premise of employment. If
                  he/she shall do so, the Company shall not be liable for such
                  an act done at his own risk.
                </p>
                <p className="mb-3">
                  <strong>b.</strong> The Employee further promises to never
                  engage in any theft of the Employer's property or attempt to
                  defraud the Employer in any manner.
                </p>
                <p className="mb-3">
                  <strong>c.</strong> The Employee shall always ensure that
                  his/her conduct is in accordance with all the rules,
                  regulations and policies of the Company as notified from time
                  to time.
                </p>
                <p className="mb-3">
                  <strong>d.</strong> The Employee shall not take up part-time
                  or full-time employment or consultation with any other party
                  or be involved in any other business during the term of
                  his/her employment with the Company.
                </p>
                <p className="mb-3">
                  <strong>e.</strong> The Employee shall always ensure that
                  his/her conduct is in accordance with all the rules,
                  regulations and policies of the Company as notified from time
                  to time, including but not limited to Leave Policy and Sexual
                  Harassment Policy.
                </p>
                <p className="mb-3">
                  <strong>f.</strong> The Employer hereby prohibits the Employee
                  from engaging in any sexual harassment and the Employee
                  promises to refrain from any form of sexual harassment during
                  the course of employment in and around the premise of
                  employment. If the Employee violates this term in the
                  agreement, he shall be fully responsible for his/her actions
                  and the Employer shall not be held responsible for any illegal
                  acts committed at the discretion of the Employee.
                </p>
              </div>
            </div>

            {/* Section 7: Leave Policy */}
            <div className="contract-section legal-section">
              <h2
                className="text-lg font-bold mb-4"
                style={{ color: contractData.theme.primary }}
              >
                7. Leave Policy
              </h2>
              <div className="legal-subsection">
                <p className="mb-3">
                  <strong>a.</strong> The Employee is entitled to{" "}
                  <strong>{contractData.casualLeave}</strong> (
                  {contractData.casualLeave}) days of paid casual leaves in a
                  year and <strong>{contractData.sickLeave}</strong> (
                  {contractData.sickLeave}) days of sick leave. In addition, the
                  Employee will be entitled to{" "}
                  <strong>{contractData.publicHolidays}</strong> (
                  {contractData.publicHolidays}) public holidays mentioned under
                  the Leave Policy of the Employer.
                </p>
                <p className="mb-3">
                  <strong>b.</strong> The Employee may not carry forward or
                  encash any holiday to the next holiday year.
                </p>
                <p className="mb-3">
                  <strong>c.</strong> In the event that the Employee is absent
                  from work due to sickness or injury, he/she will follow the
                  Leave Policy and inform the designated person as soon as
                  possible and will provide regular updates as to his/her
                  recovery and as far as practicable will inform the designated
                  person of the Employer of his/her expected date of return to
                  work.
                </p>
                <p className="mb-3">
                  <strong>d.</strong> If the Employee is absent from work due to
                  sickness or injury for more than three consecutive days he/she
                  must submit to the Employee a self-certification form. If such
                  absence lasts for more than seven consecutive days the
                  Employee must obtain a medical certificate from his/her doctor
                  and submit it to the employer.
                </p>
                <p className="mb-3">
                  <strong>e.</strong> For any period of absence due to sickness
                  or injury the Employee will be paid statutory sick pay only,
                  provided that he satisfies the relevant requirements. The
                  Employee's qualifying days for statutory sick pay purposes are
                  Monday to Friday.
                </p>
              </div>
            </div>

            {pageBreaks.includes(5) && (
              <div className="page-break-indicator border-t-2 border-dashed border-gray-400 my-8 relative">
                <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white px-2 text-sm text-gray-500">
                  Page Break
                </span>
              </div>
            )}

            {/* Continue with remaining sections... */}
            {contractData.intellectualProperty && (
              <div className="contract-section legal-section">
                <h2
                  className="text-lg font-bold mb-4"
                  style={{ color: contractData.theme.primary }}
                >
                  8. Assignment
                </h2>
                <div className="legal-subsection">
                  <p className="mb-3">
                    <strong>a.</strong> The Employee acknowledges that any work
                    including without limitation inventions, designs, ideas,
                    concepts, drawings, working notes, artistic works that the
                    Employee may individually or jointly conceive or develop
                    during the term of Employment are "works made for hire" and
                    to the fullest extent permitted by law, Employee shall
                    assign, and does hereby assign, to the Employer all of
                    Employee's right, title and interest in and to all
                    Intellectual Property improved, developed, discovered or
                    written in such works.
                  </p>
                  <p className="mb-3">
                    <strong>b.</strong> Employee shall, upon request of the
                    Employer, execute, acknowledge, deliver and file any and all
                    documents necessary or useful to vest in the Employer all of
                    Employee's right, title and interest in and to all such
                    matters.
                  </p>
                </div>
              </div>
            )}

            {contractData.nonCompeteClause && (
              <div className="contract-section legal-section">
                <h2
                  className="text-lg font-bold mb-4"
                  style={{ color: contractData.theme.primary }}
                >
                  9. Competing Businesses
                </h2>
                <p className="mb-3">
                  During the Term of this Agreement and for a period of{" "}
                  {contractData.nonCompetePeriod} (
                  {contractData.nonCompetePeriod}) year(s) after the termination
                  of this Agreement, the Employee agrees not to engage in any
                  employment, consulting, or other activity involving{" "}
                  {contractData.competingBusiness} that competes with the
                  business, proposed business or business interests of the
                  Employer, without the Employer's prior written consent.
                </p>
              </div>
            )}

            {contractData.confidentialityClause && (
              <div className="contract-section legal-section">
                <h2
                  className="text-lg font-bold mb-4"
                  style={{ color: contractData.theme.primary }}
                >
                  10. Confidentiality
                </h2>
                <div className="legal-subsection">
                  <p className="mb-3">
                    <strong>a.</strong> The Employee acknowledges that, in the
                    course of performing and fulfilling his duties hereunder, he
                    may have access to and be entrusted with confidential
                    information concerning the present and contemplated
                    financial status and activities of the Employer, the
                    disclosure of any of which confidential information to the
                    competitors of the Employer would be highly detrimental to
                    the interests of the Employer.
                  </p>
                  <p className="mb-3">
                    <strong>b.</strong> The Employee further acknowledges and
                    agrees that the right to maintain the confidentiality of
                    trade secrets, source code, website information, business
                    plans or client information or other confidential or
                    proprietary information, for the purpose of enabling the
                    other party such information constitutes a proprietary right
                    which the Employer is entitled to protect.
                  </p>
                  <p className="mb-3">
                    <strong>c.</strong> Accordingly, the Employee covenants and
                    agrees with the Employer that he will not, under any
                    circumstance during the continuance of this agreement,
                    disclose any such confidential information to any person,
                    firm or corporation, nor shall he use the same, except as
                    required in the normal course of his engagement hereunder,
                    and even after the termination of employment, he shall not
                    disclose or make use of the same or cause any of
                    confidential information to be disclosed in any manner.
                  </p>
                  <p className="mb-3">
                    <strong>d.</strong> The Employer owns any intellectual
                    property created by the Employee during the course of the
                    employment, or in relation to a certain field, and he shall
                    thereon have all the necessary rights to retain it. After
                    termination of employment, Employee shall not impose any
                    rights on the intellectual property created. Any source
                    code, software or other intellectual property developed,
                    including but not limited to website design or functionality
                    that was created by the employee, during the course of
                    employment under this Agreement, shall belong to the
                    Employer.
                  </p>
                </div>
              </div>
            )}

            {pageBreaks.includes(6) && (
              <div className="page-break-indicator border-t-2 border-dashed border-gray-400 my-8 relative">
                <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white px-2 text-sm text-gray-500">
                  Page Break
                </span>
              </div>
            )}

            {/* Additional Terms */}
            {contractData.additionalTerms && (
              <div className="contract-section legal-section">
                <h2
                  className="text-lg font-bold mb-4"
                  style={{ color: contractData.theme.primary }}
                >
                  Additional Terms
                </h2>
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {contractData.additionalTerms}
                </div>
              </div>
            )}

            {/* Governing Law */}
            <div className="contract-section legal-section">
              <h2
                className="text-lg font-bold mb-4"
                style={{ color: contractData.theme.primary }}
              >
                21. Applicable Law and Jurisdiction
              </h2>
              <p className="mb-3">
                This Agreement shall be governed by and construed in accordance
                with the laws of {contractData.governingLaw}. Each party hereby
                irrevocably submits to the exclusive jurisdiction of the courts
                of {contractData.jurisdiction}, for the adjudication of any
                dispute hereunder or in connection herewith.
              </p>
            </div>

            {/* Signatures */}
            <div
              className="contract-section mt-12 pt-8 border-t"
              style={{ borderColor: contractData.theme.secondary }}
            >
              <p className="text-center font-bold mb-8">
                IN WITNESS WHEREOF, the Employee has hereunto set his hand, and
                the Company has caused these presents to be executed in its name
                and on its behalf, all as of the day and year first above
                written.
              </p>

              <div className="grid grid-cols-2 gap-12 mt-8">
                <div>
                  <div className="signature-line mb-2"></div>
                  <p className="font-medium">(Employee)</p>
                  <p className="text-sm">Name: {contractData.employeeName}</p>
                </div>
                <div>
                  <div className="signature-line mb-2"></div>
                  <p className="font-medium">(The Employer)</p>
                  <p className="text-sm">Represented By:</p>
                  <p className="text-sm">Designation: ___________________</p>
                </div>
              </div>
            </div>

            {/* Footer with page number */}
            <div
              className="mt-8 text-center text-xs"
              style={{ color: contractData.theme.secondary }}
            >
              <p>
                This contract is governed by the laws of{" "}
                {contractData.governingLaw}
              </p>
              <p className="mt-1">
                Generated on {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
