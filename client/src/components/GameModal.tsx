import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SnakeGame from "./SnakeGame";
import Game2048 from "./Game2048";

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  game: "snake" | "2048" | null;
}

export default function GameModal({ isOpen, onClose, game }: GameModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{game === "snake" ? "Snake Game" : "2048 Game"}</span>
            <Button
              size="icon"
              variant="ghost"
              onClick={onClose}
              className="h-6 w-6"
              data-testid="button-close-game"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {game === "snake" ? <SnakeGame /> : <Game2048 />}
        </div>
      </DialogContent>
    </Dialog>
  );
}
