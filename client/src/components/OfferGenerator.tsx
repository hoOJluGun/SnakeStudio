import { useState } from "react";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export default function OfferGenerator() {
  const [company, setCompany] = useState("");
  const [service, setService] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [generatedOffer, setGeneratedOffer] = useState("");

  const generateOffer = () => {
    const offer = `
BUSINESS PROPOSAL

To: ${company || "[Company Name]"}
From: ClineGo Development Team
Date: ${new Date().toLocaleDateString()}

Subject: ${service || "[Service Description]"}

Dear Team,

We are pleased to present our proposal for ${service || "[service]"}.

SERVICE DETAILS:
${description || "[Detailed description of the service]"}

PRICING:
${price ? `$${price}` : "[Price]"}

We look forward to working with you and are confident that our solution will meet your needs.

Best regards,
ClineGo Team
    `;
    setGeneratedOffer(offer);
  };

  const downloadOffer = () => {
    const blob = new Blob([generatedOffer], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `offer-${company || "proposal"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 space-y-4 h-full overflow-y-auto">
      <Card className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="h-6 w-6 text-primary" />
          <h3 className="text-lg font-semibold">Business Offer Generator</h3>
        </div>

        <div className="space-y-3">
          <div>
            <Label htmlFor="company">Company Name</Label>
            <Input
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Enter company name"
              data-testid="input-company"
            />
          </div>

          <div>
            <Label htmlFor="service">Service/Product</Label>
            <Input
              id="service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              placeholder="Enter service or product"
              data-testid="input-service"
            />
          </div>

          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              type="number"
              data-testid="input-price"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your service in detail"
              rows={4}
              data-testid="textarea-description"
            />
          </div>

          <Button onClick={generateOffer} className="w-full" data-testid="button-generate-offer">
            Generate Offer
          </Button>
        </div>
      </Card>

      {generatedOffer && (
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold">Generated Offer</h4>
            <Button
              size="sm"
              variant="outline"
              onClick={downloadOffer}
              data-testid="button-download-offer"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
          <pre className="bg-muted p-3 rounded-md text-sm whitespace-pre-wrap font-mono" data-testid="text-offer">
            {generatedOffer}
          </pre>
        </Card>
      )}
    </div>
  );
}
