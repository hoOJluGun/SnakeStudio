import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Grid = (number | null)[][];

const GRID_SIZE = 4;

const initGrid = (): Grid => {
  const grid: Grid = Array(GRID_SIZE)
    .fill(null)
    .map(() => Array(GRID_SIZE).fill(null));
  addRandomTile(grid);
  addRandomTile(grid);
  return grid;
};

const addRandomTile = (grid: Grid) => {
  const emptyCells: [number, number][] = [];
  grid.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell === null) emptyCells.push([i, j]);
    });
  });

  if (emptyCells.length > 0) {
    const [i, j] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    grid[i][j] = Math.random() < 0.9 ? 2 : 4;
  }
};

export default function Game2048() {
  const [grid, setGrid] = useState<Grid>(initGrid());
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const move = useCallback(
    (direction: "up" | "down" | "left" | "right") => {
      let newGrid = grid.map((row) => [...row]);
      let moved = false;
      let points = 0;

      const slide = (arr: (number | null)[]): (number | null)[] => {
        const filtered = arr.filter((x) => x !== null);
        const result: (number | null)[] = [];

        for (let i = 0; i < filtered.length; i++) {
          if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
            result.push(filtered[i]! * 2);
            points += filtered[i]! * 2;
            i++;
          } else {
            result.push(filtered[i]);
          }
        }

        while (result.length < GRID_SIZE) {
          result.push(null);
        }

        return result;
      };

      if (direction === "left") {
        newGrid = newGrid.map((row) => slide(row));
      } else if (direction === "right") {
        newGrid = newGrid.map((row) => slide([...row].reverse()).reverse());
      } else if (direction === "up") {
        for (let j = 0; j < GRID_SIZE; j++) {
          const column = newGrid.map((row) => row[j]);
          const slided = slide(column);
          slided.forEach((val, i) => {
            newGrid[i][j] = val;
          });
        }
      } else if (direction === "down") {
        for (let j = 0; j < GRID_SIZE; j++) {
          const column = newGrid.map((row) => row[j]).reverse();
          const slided = slide(column).reverse();
          slided.forEach((val, i) => {
            newGrid[i][j] = val;
          });
        }
      }

      moved = JSON.stringify(grid) !== JSON.stringify(newGrid);

      if (moved) {
        addRandomTile(newGrid);
        setGrid(newGrid);
        setScore((s) => s + points);
      }

      const hasEmptyCells = newGrid.some((row) => row.includes(null));
      const canMove = hasEmptyCells;
      if (!canMove) {
        setGameOver(true);
      }
    },
    [grid]
  );

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver) return;

      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          e.preventDefault();
          move("up");
          break;
        case "ArrowDown":
        case "s":
        case "S":
          e.preventDefault();
          move("down");
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          e.preventDefault();
          move("left");
          break;
        case "ArrowRight":
        case "d":
        case "D":
          e.preventDefault();
          move("right");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [move, gameOver]);

  const resetGame = () => {
    setGrid(initGrid());
    setScore(0);
    setGameOver(false);
  };

  const getTileColor = (value: number | null) => {
    if (!value) return "bg-muted";
    const colors: Record<number, string> = {
      2: "bg-[#eee4da] text-foreground",
      4: "bg-[#ede0c8] text-foreground",
      8: "bg-[#f2b179] text-primary-foreground",
      16: "bg-[#f59563] text-primary-foreground",
      32: "bg-[#f67c5f] text-primary-foreground",
      64: "bg-[#f65e3b] text-primary-foreground",
      128: "bg-[#edcf72] text-primary-foreground",
      256: "bg-[#edcc61] text-primary-foreground",
      512: "bg-[#edc850] text-primary-foreground",
      1024: "bg-[#edc53f] text-primary-foreground",
      2048: "bg-[#edc22e] text-primary-foreground",
    };
    return colors[value] || "bg-primary text-primary-foreground";
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">2048 Game</h3>
          <p className="text-sm text-muted-foreground">Use arrow keys or WASD</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold" data-testid="text-score-2048">{score}</div>
          <div className="text-xs text-muted-foreground">Score</div>
        </div>
      </div>

      <div className="bg-background border border-border p-2 mx-auto mb-4 w-fit">
        <div className="grid grid-cols-4 gap-2">
          {grid.map((row, i) =>
            row.map((cell, j) => (
              <div
                key={`${i}-${j}`}
                className={`w-16 h-16 flex items-center justify-center text-xl font-bold rounded-md ${getTileColor(
                  cell
                )}`}
              >
                {cell || ""}
              </div>
            ))
          )}
        </div>
      </div>

      {gameOver && (
        <div className="text-center text-destructive font-semibold mb-2">
          Game Over!
        </div>
      )}

      <div className="flex gap-2 justify-center">
        <Button onClick={resetGame} data-testid="button-reset-2048">
          New Game
        </Button>
      </div>
    </Card>
  );
}
