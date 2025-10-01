import { useState } from "react";
import { Play, Pause, Radio, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";

interface RadioStation {
  id: string;
  name: string;
  frequency: string;
  url: string;
}

const stations: RadioStation[] = [
  { id: "1", name: "NPR News", frequency: "89.3 FM", url: "https://npr-ice.streamguys1.com/live.mp3" },
  { id: "2", name: "KEXP", frequency: "90.3 FM", url: "https://kexp-mp3-128.streamguys1.com/kexp128.mp3" },
  { id: "3", name: "WNYC", frequency: "93.9 FM", url: "https://fm939.wnyc.org/wnycfm" },
  { id: "4", name: "KCRW", frequency: "89.9 FM", url: "https://kcrw.streamguys1.com/kcrw_192k_mp3_on_air" },
];

interface RadioPlayerProps {
  onStationChange?: (station: RadioStation) => void;
}

export default function RadioPlayer({ onStationChange }: RadioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStation, setCurrentStation] = useState(stations[0]);
  const [volume, setVolume] = useState([70]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    console.log(isPlaying ? "Paused" : "Playing", currentStation.name);
  };

  const selectStation = (station: RadioStation) => {
    setCurrentStation(station);
    onStationChange?.(station);
    console.log("Selected station:", station.name);
  };

  return (
    <div className="flex flex-col h-full p-4 gap-4">
      <Card className="p-4 hover-elevate">
        <div className="flex items-center gap-3 mb-4">
          <Radio className="h-8 w-8 text-primary" />
          <div>
            <h3 className="font-semibold text-lg" data-testid="text-station-name">{currentStation.name}</h3>
            <p className="text-sm text-muted-foreground" data-testid="text-station-frequency">{currentStation.frequency}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            size="icon"
            variant="default"
            onClick={togglePlay}
            data-testid="button-play-pause"
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>

          <div className="flex-1 flex items-center gap-2">
            <Volume2 className="h-4 w-4" />
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={100}
              step={1}
              className="flex-1"
              data-testid="slider-volume"
            />
            <span className="text-xs w-8 text-muted-foreground">{volume[0]}%</span>
          </div>
        </div>
      </Card>

      <div className="flex-1 overflow-y-auto">
        <h4 className="text-sm font-semibold mb-2 px-1">Stations</h4>
        <div className="space-y-1">
          {stations.map((station) => (
            <Button
              key={station.id}
              variant="ghost"
              className={`w-full justify-start hover-elevate ${
                currentStation.id === station.id ? "bg-accent" : ""
              }`}
              onClick={() => selectStation(station)}
              data-testid={`button-station-${station.id}`}
            >
              <div className="flex-1 text-left">
                <div className="text-sm font-medium">{station.name}</div>
                <div className="text-xs text-muted-foreground">{station.frequency}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
