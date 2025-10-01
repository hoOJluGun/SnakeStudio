import { Code2, Radio, Gamepad2, FileText, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ActivityBarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export default function ActivityBar({ activeView, onViewChange }: ActivityBarProps) {
  const items = [
    { id: "editor", icon: Code2, label: "Code Editor" },
    { id: "radio", icon: Radio, label: "Radio Player" },
    { id: "games", icon: Gamepad2, label: "Games" },
    { id: "offers", icon: FileText, label: "Offer Generator" },
  ];

  return (
    <div className="w-12 bg-card border-r border-card-border flex flex-col items-center py-2 gap-1">
      {items.map((item) => (
        <Tooltip key={item.id}>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className={`h-10 w-10 hover-elevate ${
                activeView === item.id ? "bg-accent" : ""
              }`}
              onClick={() => onViewChange(item.id)}
              data-testid={`button-activity-${item.id}`}
            >
              <item.icon className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">{item.label}</TooltipContent>
        </Tooltip>
      ))}
      
      <div className="flex-1" />
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="h-10 w-10 hover-elevate"
            data-testid="button-profile"
          >
            <User className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">Profile</TooltipContent>
      </Tooltip>
    </div>
  );
}
