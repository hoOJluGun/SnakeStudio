import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ActivityBar from "@/components/ActivityBar";
import StatusBar from "@/components/StatusBar";
import CodeEditor from "@/components/CodeEditor";
import Terminal from "@/components/Terminal";
import RadioPlayer from "@/components/RadioPlayer";
import OfferGenerator from "@/components/OfferGenerator";
import GameModal from "@/components/GameModal";
import ExtensionDownload from "@/components/ExtensionDownload";
import TelegramAuth from "@/components/TelegramAuth";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  const [activeView, setActiveView] = useState("editor");
  const [showTerminal, setShowTerminal] = useState(true);
  const [gameModalOpen, setGameModalOpen] = useState(false);
  const [currentGame, setCurrentGame] = useState<"snake" | "2048" | null>(null);
  const [isRadioPlaying, setIsRadioPlaying] = useState(false);
  const [currentStation, setCurrentStation] = useState<string>();

  const handleTerminalCommand = (command: string) => {
    if (command === "snake") {
      setCurrentGame("snake");
      setGameModalOpen(true);
    } else if (command === "2048") {
      setCurrentGame("2048");
      setGameModalOpen(true);
    }
  };

  const openGamesMenu = () => {
    setCurrentGame("snake");
    setGameModalOpen(true);
  };

  return (
    <div className="h-screen flex flex-col bg-background text-foreground">
      <div className="h-10 bg-card border-b border-card-border flex items-center justify-between px-3">
        <div className="flex items-center gap-4">
          <h1 className="text-sm font-semibold">ClineGo IDE</h1>
          <ExtensionDownload />
        </div>
        <div className="flex items-center gap-2">
          <TelegramAuth />
          <ThemeToggle />
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <ActivityBar activeView={activeView} onViewChange={setActiveView} />

        <div className="flex-1 flex flex-col">
          {activeView === "editor" && (
            <>
              <div className="flex-1 flex">
                <div className="flex-1">
                  <CodeEditor />
                </div>
              </div>
              {showTerminal && (
                <div className="h-60 border-t border-border">
                  <Terminal
                    onCommand={handleTerminalCommand}
                    onMinimize={() => setShowTerminal(false)}
                  />
                </div>
              )}
            </>
          )}

          {activeView === "radio" && (
            <div className="flex-1">
              <RadioPlayer
                onStationChange={(station) => {
                  setIsRadioPlaying(true);
                  setCurrentStation(station.frequency);
                }}
              />
            </div>
          )}

          {activeView === "games" && (
            <div className="flex-1 p-8 overflow-y-auto">
              <div className="max-w-4xl mx-auto space-y-6">
                <h2 className="text-2xl font-bold">Games</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="h-32 text-lg hover-elevate"
                    onClick={() => {
                      setCurrentGame("snake");
                      setGameModalOpen(true);
                    }}
                    data-testid="button-open-snake"
                  >
                    Snake Game
                  </Button>
                  <Button
                    variant="outline"
                    className="h-32 text-lg hover-elevate"
                    onClick={() => {
                      setCurrentGame("2048");
                      setGameModalOpen(true);
                    }}
                    data-testid="button-open-2048"
                  >
                    2048 Game
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeView === "offers" && (
            <div className="flex-1">
              <OfferGenerator />
            </div>
          )}
        </div>
      </div>

      <StatusBar isRadioPlaying={isRadioPlaying} currentStation={currentStation} />

      <Button
        size="icon"
        className="fixed bottom-20 right-6 h-12 w-12 rounded-full shadow-lg"
        onClick={openGamesMenu}
        data-testid="button-open-games"
      >
        <Plus className="h-6 w-6" />
      </Button>

      <GameModal
        isOpen={gameModalOpen}
        onClose={() => setGameModalOpen(false)}
        game={currentGame}
      />
    </div>
  );
}
