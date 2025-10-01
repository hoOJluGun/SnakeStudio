import { Wifi, Volume2 } from "lucide-react";

interface StatusBarProps {
  isRadioPlaying?: boolean;
  currentStation?: string;
}

export default function StatusBar({ isRadioPlaying = false, currentStation }: StatusBarProps) {
  return (
    <div className="h-6 bg-primary text-primary-foreground px-3 flex items-center justify-between text-xs font-mono">
      <div className="flex items-center gap-4">
        <span data-testid="text-cursor-position">Ln 1, Col 1</span>
        <span data-testid="text-file-type">TypeScript</span>
        <span data-testid="text-encoding">UTF-8</span>
      </div>
      
      <div className="flex items-center gap-4">
        {isRadioPlaying && currentStation && (
          <div className="flex items-center gap-1" data-testid="text-radio-status">
            <Volume2 className="h-3 w-3" />
            <span>{currentStation}</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <Wifi className="h-3 w-3" />
          <span>Connected</span>
        </div>
      </div>
    </div>
  );
}
