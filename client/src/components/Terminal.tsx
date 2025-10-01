import { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TerminalProps {
  onCommand?: (command: string) => void;
  onMinimize?: () => void;
}

export default function Terminal({ onCommand, onMinimize }: TerminalProps) {
  const [history, setHistory] = useState<string[]>([
    "Welcome to ClineGo Terminal v1.0.0",
    "Type 'help' for available commands",
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const newHistory = [...history, `$ ${trimmed}`];

    switch (trimmed.toLowerCase()) {
      case "help":
        newHistory.push("Available commands:");
        newHistory.push("  help     - Show this help message");
        newHistory.push("  clear    - Clear terminal");
        newHistory.push("  snake    - Play Snake game");
        newHistory.push("  2048     - Play 2048 game");
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "snake":
        newHistory.push("Launching Snake game...");
        onCommand?.("snake");
        break;
      case "2048":
        newHistory.push("Launching 2048 game...");
        onCommand?.("2048");
        break;
      default:
        newHistory.push(`Command not found: ${trimmed}`);
        newHistory.push("Type 'help' for available commands");
    }

    setHistory(newHistory);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input);
    }
  };

  return (
    <div className="h-full bg-[#0a0a0a] text-green-400 font-mono text-sm flex flex-col">
      <div className="h-9 bg-card border-b border-card-border flex items-center justify-between px-3">
        <div className="flex items-center gap-2">
          <TerminalIcon className="h-4 w-4" />
          <span className="text-xs font-medium text-foreground">TERMINAL</span>
        </div>
        {onMinimize && (
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6 hover-elevate"
            onClick={onMinimize}
            data-testid="button-minimize-terminal"
          >
            <Minimize2 className="h-3 w-3" />
          </Button>
        )}
      </div>

      <div
        ref={historyRef}
        className="flex-1 overflow-y-auto p-3 space-y-1"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((line, i) => (
          <div key={i} data-testid={`terminal-line-${i}`}>{line}</div>
        ))}
        <div className="flex items-center gap-2">
          <span className="text-green-500">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-green-400"
            autoFocus
            data-testid="input-terminal"
          />
        </div>
      </div>
    </div>
  );
}
