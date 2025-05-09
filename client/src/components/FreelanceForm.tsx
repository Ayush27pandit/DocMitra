import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface FreelanceFormData {
  clientName: string;
  freelancerName: string;
  services: string;
  timeline: string;
  paymentAmount: string;
  date: string;
}

const FreelanceForm = () => {
  const { register, handleSubmit } = useForm<FreelanceFormData>();
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);

  const handlePreview = async (data: FreelanceFormData) => {
    const response = await axios.post("http://localhost:5000/api/v1/document/render", {
      formData: data,
      templateName: "freelanceAgreement",
    });
    setPreviewHtml(response.data);

    const history = JSON.parse(localStorage.getItem("doc_history") || "[]");
    history.push({ template: "freelanceAgreement", date: new Date().toDateString(), formData: data });
    localStorage.setItem("doc_history", JSON.stringify(history));
  };

  const handleDownload = async (data: FreelanceFormData) => {
    const response = await axios.post(
      "http://localhost:5000/api/v1/document/generate",
      { formData: data, templateName: "freelanceAgreement" },
      { responseType: "blob" }
    );
    const url = URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "freelance_agreement.pdf");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-semibold mb-4 text-center">Freelance Agreement Generator</h2>

      <form onSubmit={handleSubmit(handlePreview)} className="space-y-4">
        <input
          {...register("clientName")}
          placeholder="Client Name"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
        <input
          {...register("freelancerName")}
          placeholder="Freelancer Name"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
        <input
          {...register("services")}
          placeholder="Services"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
        <input
          {...register("timeline")}
          placeholder="Timeline"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
        <input
          {...register("paymentAmount")}
          placeholder="Payment Amount"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
        <input
          {...register("date")}
          placeholder="Date (e.g., 2025-05-07)"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />

        <div className="flex space-x-4 justify-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Preview
          </button>
          <button
            type="button"
            onClick={handleSubmit(handleDownload)}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
          >
            Download PDF
          </button>
        </div>
      </form>

      {previewHtml && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50">
          <h3 className="text-lg font-semibold mb-2">Preview:</h3>
          <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
        </div>
      )}
    </div>
  );
};

export default FreelanceForm;
