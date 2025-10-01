import { useState } from "react";
import Editor from "@monaco-editor/react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TabFile {
  id: string;
  name: string;
  language: string;
  content: string;
}

interface CodeEditorProps {
  onCodeChange?: (code: string) => void;
}

export default function CodeEditor({ onCodeChange }: CodeEditorProps) {
  const [tabs, setTabs] = useState<TabFile[]>([
    {
      id: "1",
      name: "app.tsx",
      language: "typescript",
      content: `import React from 'react';\n\nfunction App() {\n  return (\n    <div className="app">\n      <h1>Welcome to ClineGo IDE</h1>\n    </div>\n  );\n}\n\nexport default App;`,
    },
  ]);
  const [activeTab, setActiveTab] = useState("1");

  const activeFile = tabs.find((t) => t.id === activeTab);

  const handleEditorChange = (value: string | undefined) => {
    if (value && onCodeChange) {
      onCodeChange(value);
    }
  };

  const closeTab = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newTabs = tabs.filter((t) => t.id !== id);
    setTabs(newTabs);
    if (activeTab === id && newTabs.length > 0) {
      setActiveTab(newTabs[0].id);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center h-9 bg-card border-b border-card-border">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`flex items-center gap-2 px-3 h-full border-r border-card-border cursor-pointer hover-elevate ${
              activeTab === tab.id ? "bg-background" : ""
            }`}
            onClick={() => setActiveTab(tab.id)}
            data-testid={`tab-${tab.name}`}
          >
            <span className="text-xs font-mono">{tab.name}</span>
            {tabs.length > 1 && (
              <Button
                size="icon"
                variant="ghost"
                className="h-4 w-4 p-0 hover:bg-destructive/20"
                onClick={(e) => closeTab(tab.id, e)}
                data-testid={`button-close-tab-${tab.name}`}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        ))}
      </div>

      <div className="flex-1" data-testid="code-editor">
        {activeFile && (
          <Editor
            height="100%"
            language={activeFile.language}
            value={activeFile.content}
            onChange={handleEditorChange}
            theme="vs-dark"
            options={{
              minimap: { enabled: true },
              fontSize: 14,
              fontFamily: "Fira Code, Monaco, Menlo, monospace",
              lineNumbers: "on",
              renderWhitespace: "selection",
              scrollBeyondLastLine: false,
            }}
          />
        )}
      </div>
    </div>
  );
}
