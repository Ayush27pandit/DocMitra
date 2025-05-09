import { useEffect, useState } from "react";

const History = () => {
  interface DocumentHistory {
    template: string;
    date: string;
    formData: Record<string, string | number | boolean>;
  }

  const [history, setHistory] = useState<DocumentHistory[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("doc_history") || "[]");
    setHistory(stored.reverse());
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Document History</h2>
      {history.length === 0 && <p>No documents yet.</p>}
      {history.map((doc, idx) => (
        <div key={idx} className="mb-4 p-2 border rounded">
          <p><strong>Type:</strong> {doc.template}</p>
          <p><strong>Date:</strong> {new Date(doc.date).toLocaleString()}</p>
          <pre className="text-sm">{JSON.stringify(doc.formData, null, 2)}</pre>
        </div>
      ))}
    </div>
  );
};

export default History;
