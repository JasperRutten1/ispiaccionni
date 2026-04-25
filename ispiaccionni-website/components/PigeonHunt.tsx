'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';

interface Pigeon {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  hit: boolean;
}

export function PigeonHunt() {
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [pigeons, setPigeons] = useState<Pigeon[]>([]);
  const [lastScore, setLastScore] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const pigeonCountRef = useRef(0);
  const timeLeftRef = useRef(30);

  // Initialize game
  const startGame = useCallback(() => {
    setScore(0);
    setTimeLeft(30);
    setGameActive(true);
    setGameOver(false);
    setPigeons([]);
    pigeonCountRef.current = 0;
    timeLeftRef.current = 30;
  }, []);

  // End game
  const endGame = useCallback(() => {
    setGameActive(false);
    setGameOver(true);
    setLastScore(score);
    setPigeons([]);
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }
  }, [score]);

  // Timer
  useEffect(() => {
    if (!gameActive) return;

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        const newTime = t - 1;
        timeLeftRef.current = newTime;
        if (newTime <= 0) {
          setGameActive(false);
          setGameOver(true);
          if (gameLoopRef.current) {
            clearInterval(gameLoopRef.current);
          }
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameActive]);

  // Spawn pigeons
  useEffect(() => {
    if (!gameActive || !containerRef.current) return;

    const spawnPigeon = () => {
      const x = Math.random() * (containerRef.current?.clientWidth || 800 - 40);
      const y = Math.random() * (containerRef.current?.clientHeight || 400 - 40);
      const vx = (Math.random() - 0.5) * 6;
      const vy = (Math.random() - 0.5) * 6;

      setPigeons((prev) => [
        ...prev,
        {
          id: pigeonCountRef.current++,
          x,
          y,
          vx,
          vy,
          hit: false,
        },
      ]);
    };

    const spawnInterval = setInterval(spawnPigeon, 400);

    return () => clearInterval(spawnInterval);
  }, [gameActive]);

  // Game loop - update pigeon positions
  useEffect(() => {
    if (!gameActive || !containerRef.current) return;

    gameLoopRef.current = setInterval(() => {
      setPigeons((prev) => {
        return prev
          .map((pigeon) => {
            let newX = pigeon.x + pigeon.vx;
            let newY = pigeon.y + pigeon.vy;
            let newVx = pigeon.vx;
            let newVy = pigeon.vy;

            const width = containerRef.current?.clientWidth || 800;
            const height = containerRef.current?.clientHeight || 400;

            // Bounce off walls
            if (newX < 0 || newX > width - 40) {
              newVx *= -1;
              newX = Math.max(0, Math.min(width - 40, newX));
            }
            if (newY < 0 || newY > height - 40) {
              newVy *= -1;
              newY = Math.max(0, Math.min(height - 40, newY));
            }

            return {
              ...pigeon,
              x: newX,
              y: newY,
              vx: newVx,
              vy: newVy,
            };
          })
          .filter((pigeon) => {
            // Remove pigeons that have been hit after animation
            if (pigeon.hit) {
              return false;
            }
            return true;
          });
      });
    }, 30);

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameActive]);

  const hitPigeon = (id: number) => {
    if (!gameActive) return;

    setPigeons((prev) =>
      prev.map((p) => (p.id === id ? { ...p, hit: true } : p))
    );

    setScore((s) => s + 1);

    // Remove hit pigeon after a short delay for animation
    setTimeout(() => {
      setPigeons((prev) => prev.filter((p) => p.id !== id));
    }, 100);
  };

  return (
    <main className="mx-5 lg:mx-15 my-10 rounded-md bg-gray-800 p-5 lg:p-10 text-white">
      <h1 className="text-2xl font-bold mb-5">🎯 Pigeon Hunt</h1>

      <div className="mb-5 flex gap-8">
        <div className="text-lg">
          Score: <span className="font-bold text-2xl">{score}</span>
        </div>
        <div className="text-lg">
          Time: <span className="font-bold text-2xl">{timeLeft}s</span>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative w-full bg-sky-400 rounded-md overflow-hidden"
        style={{ width: '100%', height: '400px' }}
      >
        {gameActive && (
          <>
            {pigeons.map((pigeon) => (
              <div
                key={pigeon.id}
                className={`absolute cursor-crosshair transition-opacity duration-100 ${
                  pigeon.hit ? 'opacity-0' : 'opacity-100'
                }`}
                style={{
                  left: `${pigeon.x}px`,
                  top: `${pigeon.y}px`,
                  width: '40px',
                  height: '40px',
                }}
                onClick={() => hitPigeon(pigeon.id)}
              >
                <Image
                  src="/images/pigeon-hunt.png"
                  alt="Pigeon"
                  width={40}
                  height={40}
                  priority
                  style={{ cursor: 'pointer' }}
                />
              </div>
            ))}
          </>
        )}

        {!gameActive && !gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
            <p className="text-2xl font-bold mb-5">Ready to hunt some pigeons?</p>
            <button
              onClick={startGame}
              className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded"
            >
              Start Game
            </button>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
            <p className="text-3xl font-bold mb-3">Game Over!</p>
            <p className="text-2xl mb-5">Final Score: {lastScore}</p>
            <button
              onClick={() => {
                setGameOver(false);
                startGame();
              }}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded"
            >
              Play Again
            </button>
          </div>
        )}
      </div>

      <p className="mt-5 text-sm text-gray-300">
        Click on the pigeons to shoot them before time runs out! 🕊️
      </p>
    </main>
  );
}
