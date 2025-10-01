import { useState } from "react";
import GameModal from "../GameModal";
import { Button } from "@/components/ui/button";

export default function GameModalExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [game, setGame] = useState<"snake" | "2048">("snake");

  return (
    <div className="p-4 space-y-2">
      <Button onClick={() => { setGame("snake"); setIsOpen(true); }}>
        Open Snake Game
      </Button>
      <Button onClick={() => { setGame("2048"); setIsOpen(true); }}>
        Open 2048 Game
      </Button>
      <GameModal isOpen={isOpen} onClose={() => setIsOpen(false)} game={game} />
    </div>
  );
}
