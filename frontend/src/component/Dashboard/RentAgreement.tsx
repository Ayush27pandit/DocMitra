import * as React from "react";
import { Plus, Trash2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { pdf } from "@react-pdf/renderer";
// import { RentAgreementPreview } from "./RentAgreementPreview"; // optional

interface Clause {
  id: string;
  title: string;
  content: string;
}

export const RentAgreementGen = () => {
  const [clauses, setClauses] = React.useState<Clause[]>([
    {
      id: "1",
      title: "Term of Lease",
      content:
        "This agreement is valid from 1st July 2025 for a period of 11 months.",
    },
    {
      id: "2",
      title: "Rent Amount",
      content:
        "The monthly rent will be ₹15,000 payable on or before the 5th of each month.",
    },
    {
      id: "3",
      title: "Security Deposit",
      content:
        "A refundable security deposit of ₹45,000 is to be paid before move-in.",
    },
    {
      id: "4",
      title: "Utilities",
      content:
        "Tenant shall be responsible for electricity, water, and internet bills.",
    },
    {
      id: "5",
      title: "Termination Clause",
      content:
        "Either party may terminate the agreement with one month's written notice.",
    },
  ]);

  const addClause = () => {
    setClauses((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        title: "New Clause",
        content: "",
      },
    ]);
  };

  const updateClause = (id: string, field: keyof Clause, value: string) => {
    setClauses((prev) =>
      prev.map((clause) =>
        clause.id === id ? { ...clause, [field]: value } : clause
      )
    );
  };

  const removeClause = (id: string) => {
    setClauses((prev) => prev.filter((clause) => clause.id !== id));
  };

  const handleDownload = async () => {
    const blob = await pdf(<RentAgreementPreview clauses={clauses} />).toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Rent-Agreement.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Rent Agreement Generator</h2>
          <p className="text-muted-foreground">
            Add and edit clauses for a custom rent agreement.
          </p>
        </div>
        <Button onClick={handleDownload}>
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Clauses</CardTitle>
              <Button onClick={addClause} size="sm">
                <Plus className="mr-1 h-4 w-4" />
                Add Clause
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {clauses.map((clause, index) => (
                <div
                  key={clause.id}
                  className="border p-4 rounded-lg space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Clause {index + 1}</span>
                    {clauses.length > 1 && (
                      <Button
                        onClick={() => removeClause(clause.id)}
                        size="sm"
                        variant="ghost"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={clause.title}
                      onChange={(e) =>
                        updateClause(clause.id, "title", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Content</Label>
                    <Textarea
                      value={clause.content}
                      onChange={(e) =>
                        updateClause(clause.id, "content", e.target.value)
                      }
                      rows={3}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:sticky lg:top-4">
          <Card className="h-screen md:h-3/5">
            {/* Optional preview */}
            <RentAgreementPreview clauses={clauses} />
          </Card>
        </div>
      </div>
    </div>
  );
};
