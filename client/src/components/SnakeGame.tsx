import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Position = { x: number; y: number };

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SNAKE: Position[] = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION: Direction = "RIGHT";

export default function SnakeGame() {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Position>({ x: 15, y: 10 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const gameLoopRef = useRef<number>();

  const generateFood = useCallback((): Position => {
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(generateFood());
    setScore(0);
    setIsPlaying(false);
  };

  const moveSnake = useCallback(() => {
    setSnake((prevSnake) => {
      const head = prevSnake[0];
      let newHead: Position;

      switch (direction) {
        case "UP":
          newHead = { x: head.x, y: head.y - 1 };
          break;
        case "DOWN":
          newHead = { x: head.x, y: head.y + 1 };
          break;
        case "LEFT":
          newHead = { x: head.x - 1, y: head.y };
          break;
        case "RIGHT":
          newHead = { x: head.x + 1, y: head.y };
          break;
      }

      if (
        newHead.x < 0 ||
        newHead.x >= GRID_SIZE ||
        newHead.y < 0 ||
        newHead.y >= GRID_SIZE ||
        prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)
      ) {
        setIsPlaying(false);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      if (newHead.x === food.x && newHead.y === food.y) {
        setFood(generateFood());
        setScore((s) => s + 10);
        return newSnake;
      }

      newSnake.pop();
      return newSnake;
    });
  }, [direction, food, generateFood]);

  useEffect(() => {
    if (isPlaying) {
      gameLoopRef.current = window.setInterval(moveSnake, 150);
      return () => {
        if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      };
    }
  }, [isPlaying, moveSnake]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPlaying) return;

      switch (e.key.toLowerCase()) {
        case "w":
        case "arrowup":
          if (direction !== "DOWN") setDirection("UP");
          break;
        case "s":
        case "arrowdown":
          if (direction !== "UP") setDirection("DOWN");
          break;
        case "a":
        case "arrowleft":
          if (direction !== "RIGHT") setDirection("LEFT");
          break;
        case "d":
        case "arrowright":
          if (direction !== "LEFT") setDirection("RIGHT");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [direction, isPlaying]);

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">Snake Game</h3>
          <p className="text-sm text-muted-foreground">Use WASD keys to move</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold" data-testid="text-score">{score}</div>
          <div className="text-xs text-muted-foreground">Score</div>
        </div>
      </div>

      <div
        className="relative bg-background border border-border mx-auto mb-4"
        style={{
          width: GRID_SIZE * CELL_SIZE,
          height: GRID_SIZE * CELL_SIZE,
        }}
      >
        {snake.map((segment, i) => (
          <div
            key={i}
            className={`absolute ${i === 0 ? "bg-primary" : "bg-primary/70"}`}
            style={{
              left: segment.x * CELL_SIZE,
              top: segment.y * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE,
            }}
          />
        ))}
        <div
          className="absolute bg-chart-2 rounded-sm"
          style={{
            left: food.x * CELL_SIZE,
            top: food.y * CELL_SIZE,
            width: CELL_SIZE,
            height: CELL_SIZE,
          }}
        />
      </div>

      <div className="flex gap-2 justify-center">
        {!isPlaying ? (
          <Button onClick={() => setIsPlaying(true)} data-testid="button-start-snake">
            Start Game
          </Button>
        ) : (
          <Button onClick={() => setIsPlaying(false)} variant="secondary" data-testid="button-pause-snake">
            Pause
          </Button>
        )}
        <Button onClick={resetGame} variant="outline" data-testid="button-reset-snake">
          Reset
        </Button>
      </div>
    </Card>
  );
}
