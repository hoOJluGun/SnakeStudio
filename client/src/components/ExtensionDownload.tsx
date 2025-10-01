import { Download, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

export default function ExtensionDownload() {
  const [isOpen, setIsOpen] = useState(false);

  const handleDownload = () => {
    console.log("Downloading Codex Free extension...");
    alert("Download started! Codex Free v1.0.0");
  };

  return (
    <Card className="p-4 hover-elevate">
      <div className="flex items-start gap-3">
        <Package className="h-10 w-10 text-primary" />
        <div className="flex-1">
          <h3 className="font-semibold text-lg">Codex Free Extension</h3>
          <p className="text-sm text-muted-foreground mb-3">
            v1.0.0 • 2.5 MB • VSCode Extension
          </p>
          
          <Button onClick={handleDownload} className="w-full mb-2" data-testid="button-download-extension">
            <Download className="h-4 w-4 mr-2" />
            Download Extension
          </Button>

          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full" data-testid="button-toggle-instructions">
                {isOpen ? "Hide" : "Show"} Installation Instructions
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3 p-3 bg-muted rounded-md">
              <ol className="text-sm space-y-2 list-decimal list-inside">
                <li>Download the extension file (.vsix)</li>
                <li>Open VSCode</li>
                <li>Go to Extensions (Ctrl+Shift+X)</li>
                <li>Click "..." menu → "Install from VSIX"</li>
                <li>Select the downloaded file</li>
                <li>Reload VSCode when prompted</li>
              </ol>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </Card>
  );
}
