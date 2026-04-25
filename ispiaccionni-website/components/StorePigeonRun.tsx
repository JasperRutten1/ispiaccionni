"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const CANVAS_W = 720;
const CANVAS_H = 280;
const GROUND_Y = CANVAS_H - 42;
const PIGEON_X = 130;
const PIGEON_SIZE = 42;
const JUMP_VY = -14.03;
const GRAVITY = 0.74;
const OBSTACLE_SPEED = 4.4;
const SPAWN_INTERVAL_MS = 1400;
const SPEED_GROWTH_PER_SECOND = 0.08;
const MIN_SPAWN_INTERVAL_MS = 900;
const PIGEON_SRC = "/game/pigeon-glide.svg";

type ObstacleType = "pole" | "drone";

type Obstacle = {
  x: number;
  type: ObstacleType;
  y: number;
  width: number;
  height: number;
  scored: boolean;
};

type Props = {
  open: boolean;
  onClose: () => void;
};

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    img.onload = () => resolve(img as HTMLImageElement);
    img.onerror = () => reject(new Error(`Failed to load ${src}`));
    img.src = src;
  });
}

function rectsIntersect(
  ax: number,
  ay: number,
  aw: number,
  ah: number,
  bx: number,
  by: number,
  bw: number,
  bh: number
) {
  return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
}

export function StorePigeonRun() {
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState(0);
  const [gameOverScore, setGameOverScore] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const openGame = useCallback(() => {
    setOpen(true);
    setGameOverScore(null);
    setSession((value) => value + 1);
  }, []);

  const closeGame = useCallback(() => {
    setOpen(false);
  }, []);

  const restartGame = useCallback(() => {
    setGameOverScore(null);
    setSession((value) => value + 1);
  }, []);

  useEffect(() => {
    if (!open) return;

    let cancelled = false;
    let innerCleanup: (() => void) | undefined;

    void (async () => {
      closeRef.current?.focus();
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      let pigeonImg: HTMLImageElement | null = null;
      try {
        pigeonImg = await loadImage(PIGEON_SRC);
      } catch {
        /* ignore image failure */
      }

      if (cancelled) return;

      let phase: "ready" | "playing" | "gameover" = "ready";
      let score = 0;
      let pigeonY = GROUND_Y - PIGEON_SIZE;
      let pigeonVy = 0;
      let lastSpawn = 0;
      let obstacles: Obstacle[] = [];
      let raf = 0;
      let lastTick = performance.now();
      let elapsedSeconds = 0;

      const resizeCanvas = () => {
        const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
        canvas.width = Math.floor(CANVAS_W * dpr);
        canvas.height = Math.floor(CANVAS_H * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };
      resizeCanvas();

      const drawBackground = () => {
        const sky = ctx.createLinearGradient(0, 0, 0, CANVAS_H);
        sky.addColorStop(0, "#15202B");
        sky.addColorStop(1, "#38506B");
        ctx.fillStyle = sky;
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

        ctx.fillStyle = "#1B2735";
        ctx.fillRect(0, GROUND_Y, CANVAS_W, CANVAS_H - GROUND_Y);

        ctx.strokeStyle = "#7F7F7F";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, GROUND_Y);
        ctx.lineTo(CANVAS_W, GROUND_Y);
        ctx.stroke();
      };

      const drawPigeon = () => {
        if (pigeonImg && pigeonImg.complete) {
          ctx.drawImage(
            pigeonImg,
            PIGEON_X - PIGEON_SIZE / 2,
            pigeonY,
            PIGEON_SIZE,
            PIGEON_SIZE
          );
        } else {
          ctx.fillStyle = "#FACC15";
          ctx.beginPath();
          ctx.ellipse(
            PIGEON_X,
            pigeonY + PIGEON_SIZE / 2,
            PIGEON_SIZE / 2,
            PIGEON_SIZE / 2.4,
            0,
            0,
            Math.PI * 2
          );
          ctx.fill();
          ctx.fillStyle = "#000";
          ctx.beginPath();
          ctx.arc(PIGEON_X + 12, pigeonY + 16, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      };

      const drawObstacle = (obstacle: Obstacle) => {
        if (obstacle.type === "pole") {
          ctx.fillStyle = "#E9A82C";
          ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
          ctx.strokeStyle = "#A96B0F";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(obstacle.x - 2, obstacle.y + 26);
          ctx.lineTo(obstacle.x + obstacle.width + 2, obstacle.y + 26);
          ctx.moveTo(obstacle.x - 2, obstacle.y + 44);
          ctx.lineTo(obstacle.x + obstacle.width + 2, obstacle.y + 44);
          ctx.stroke();
        } else {
          ctx.fillStyle = "#CED6DA";
          ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
          ctx.fillStyle = "#334155";
          ctx.fillRect(obstacle.x + 4, obstacle.y + 4, obstacle.width - 8, 6);
          ctx.fillRect(obstacle.x + 2, obstacle.y + obstacle.height - 10, obstacle.width - 4, 6);
          ctx.fillStyle = "#94A3B8";
          ctx.beginPath();
          ctx.arc(obstacle.x + obstacle.width / 2, obstacle.y - 6, 10, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = "#475569";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(obstacle.x + 4, obstacle.y + 6);
          ctx.lineTo(obstacle.x - 12, obstacle.y - 14);
          ctx.moveTo(obstacle.x + obstacle.width - 4, obstacle.y + 6);
          ctx.lineTo(obstacle.x + obstacle.width + 12, obstacle.y - 14);
          ctx.stroke();
        }
      };

      const drawHud = () => {
        ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
        ctx.fillRect(12, 12, 110, 36);
        ctx.fillStyle = "#F8FAFC";
        ctx.font = "600 18px ui-sans-serif, system-ui, sans-serif";
        ctx.fillText(`Score ${score}`, 20, 36);

        if (phase === "ready") {
          ctx.fillStyle = "rgba(255,255,255,0.88)";
          ctx.font = "500 16px ui-sans-serif, system-ui, sans-serif";
          ctx.textAlign = "center";
          ctx.fillText("Klik of druk op spatie om te springen", CANVAS_W / 2, CANVAS_H / 2 - 12);
          ctx.textAlign = "left";
        }
      };

      const createObstacle = (): Obstacle => {
        const isDrone = Math.random() < 0.45;
        if (isDrone) {
          const height = 34;
          const y = 92 + Math.random() * 34;
          return {
            x: CANVAS_W + 40,
            type: "drone",
            y,
            width: 48,
            height,
            scored: false,
          };
        }

        const height = 62;
        return {
          x: CANVAS_W + 36,
          type: "pole",
          y: GROUND_Y - height,
          width: 18,
          height,
          scored: false,
        };
      };

      const jump = (now: number) => {
        if (phase === "gameover") return;
        if (phase === "ready") {
          phase = "playing";
          lastSpawn = now;
        }
        if (pigeonY >= GROUND_Y - PIGEON_SIZE - 0.5) {
          pigeonVy = JUMP_VY;
        }
      };

      const checkCollision = () => {
        const pigeonBox = {
          x: PIGEON_X - PIGEON_SIZE / 2,
          y: pigeonY,
          width: PIGEON_SIZE,
          height: PIGEON_SIZE,
        };
        return obstacles.some((obstacle) =>
          rectsIntersect(
            pigeonBox.x,
            pigeonBox.y,
            pigeonBox.width,
            pigeonBox.height,
            obstacle.x,
            obstacle.y,
            obstacle.width,
            obstacle.height
          )
        );
      };

      const step = (dt: number, now: number) => {
        elapsedSeconds += dt;
        const currentSpeed = OBSTACLE_SPEED + elapsedSeconds * SPEED_GROWTH_PER_SECOND;
        const currentSpawnInterval = Math.max(
          MIN_SPAWN_INTERVAL_MS,
          SPAWN_INTERVAL_MS - elapsedSeconds * 18
        );

        const frameDt = dt * 60;
        pigeonVy += GRAVITY * frameDt;
        pigeonY += pigeonVy * frameDt;
        if (pigeonY >= GROUND_Y - PIGEON_SIZE) {
          pigeonY = GROUND_Y - PIGEON_SIZE;
          pigeonVy = 0;
        }

        if (phase === "playing") {
          obstacles = obstacles
            .map((obstacle) => ({
              ...obstacle,
              x: obstacle.x - currentSpeed * dt * 60,
            }))
            .filter((obstacle) => obstacle.x + obstacle.width > -20);

          if (now - lastSpawn > currentSpawnInterval) {
            obstacles.push(createObstacle());
            lastSpawn = now;
          }

          for (const obstacle of obstacles) {
            if (!obstacle.scored && obstacle.x + obstacle.width < PIGEON_X - 10) {
              obstacle.scored = true;
              score += 1;
            }
          }

          if (checkCollision()) {
            phase = "gameover";
            setGameOverScore(score);
          }
        }
      };

      const drawFrame = () => {
        drawBackground();
        for (const obstacle of obstacles) {
          drawObstacle(obstacle);
        }
        drawPigeon();
        drawHud();
      };

      const onPointerDown = (event: PointerEvent) => {
        if (event.button !== 0) return;
        event.preventDefault();
        jump(performance.now());
      };

      const onKeyDown = (event: KeyboardEvent) => {
        if (event.code === "Escape") {
          event.preventDefault();
          closeGame();
          return;
        }
        if (event.code === "Space") {
          event.preventDefault();
          jump(performance.now());
        }
      };

      canvas.addEventListener("pointerdown", onPointerDown);
      window.addEventListener("keydown", onKeyDown);

      const loop = (now: number) => {
        if (cancelled) return;
        const dt = Math.min((now - lastTick) / 1000, 0.033);
        lastTick = now;
        if (phase === "playing") {
          step(dt, now);
        }
        drawFrame();
        if (phase !== "gameover") {
          raf = requestAnimationFrame(loop);
        }
      };

      drawFrame();
      raf = requestAnimationFrame(loop);

      innerCleanup = () => {
        cancelAnimationFrame(raf);
        canvas.removeEventListener("pointerdown", onPointerDown);
        window.removeEventListener("keydown", onKeyDown);
      };
    })();

    return () => {
      cancelled = true;
      innerCleanup?.();
    };
  }, [open, session, closeGame]);

  return (
    <>
      <button
        type="button"
        onClick={openGame}
        className="fixed bottom-6 right-6 z-20 h-16 w-16 rounded-full border border-white/10 bg-white/10 shadow-lg hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-amber-400"
        aria-label="Start het geheime duivenrennen"
      >
        <span className="sr-only">Start het geheime duivenrennen</span>
        <Image
          src={PIGEON_SRC}
          alt="Geheime duivenknop"
          width={64}
          height={64}
          className="pointer-events-none"
        />
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="store-pigeon-run-title"
        >
          <div className="w-full max-w-[min(100%,760px)] rounded-3xl border border-white/10 bg-slate-950/95 p-4 shadow-2xl">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <h2 id="store-pigeon-run-title" className="text-lg font-semibold text-amber-100">
                  Pigeon Run
                </h2>
                <p className="text-sm text-slate-300">
                  Spring over elektriciteitspalen en ontwijk drones. Klik of druk op spatie om te springen.
                </p>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={closeGame}
                className="rounded-md border border-amber-200/20 bg-slate-900 px-3 py-2 text-sm font-medium text-amber-50 hover:bg-slate-800"
              >
                Sluiten
              </button>
            </div>
            <div className="relative overflow-hidden rounded-3xl border border-slate-700 bg-slate-900">
              <canvas
                ref={canvasRef}
                width={CANVAS_W}
                height={CANVAS_H}
                className="block w-full touch-manipulation"
                style={{ width: CANVAS_W, height: CANVAS_H }}
              />
              {gameOverScore !== null ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-3xl bg-black/65 p-4 text-center text-slate-100">
                  <p className="text-2xl font-semibold text-amber-200">Game over</p>
                  <p className="text-lg">Score: {gameOverScore}</p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <button
                      type="button"
                      onClick={restartGame}
                      className="rounded-md bg-amber-500 px-4 py-2 text-sm font-semibold text-black hover:bg-amber-400"
                    >
                      Opnieuw
                    </button>
                    <button
                      type="button"
                      onClick={closeGame}
                      className="rounded-md border border-slate-500 px-4 py-2 text-sm text-slate-100 hover:bg-white/5"
                    >
                      Sluiten
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
