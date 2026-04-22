"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Logical canvas size (CSS pixels). */
const CANVAS_W = 400;
const CANVAS_H = 600;
const GRAVITY = 0.38;
const FLAP_VY = -8.2;
const BIRD_X = 88;
const BIRD_R = 15;
const PIPE_W = 56;
const PIPE_SPEED = 2.35;
const GAP_H = 138;
const PIPE_SPAWN_EVERY = 1750;
const SKY_TOP = "#87CEEB";
const SKY_BOTTOM = "#E0F6FF";
const PIPE_COLOR = "#2d6a32";
const PIPE_EDGE = "#1b4020";
/** Drawn pigeon size (logical px); hitbox stays circular at `BIRD_X`, `birdY`. */
const BIRD_DRAW_W = 52;
const BIRD_DRAW_H = 40;
/** How long the "wings up" frame shows after each flap (ms). */
const FLAP_VISUAL_MS = 220;

const PIGEON_GLIDE_SRC = "/game/pigeon-glide.svg";
const PIGEON_FLAP_SRC = "/game/pigeon-flap.svg";

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load ${src}`));
    img.src = src;
  });
}

type Pipe = { x: number; gapY: number; scored: boolean };

function randomGapY(): number {
  const margin = 80;
  return margin + Math.random() * (CANVAS_H - GAP_H - margin * 2);
}

function circleRectHit(
  cx: number,
  cy: number,
  r: number,
  rx: number,
  ry: number,
  rw: number,
  rh: number
): boolean {
  const nx = Math.max(rx, Math.min(cx, rx + rw));
  const ny = Math.max(ry, Math.min(cy, ry + rh));
  const dx = cx - nx;
  const dy = cy - ny;
  return dx * dx + dy * dy < r * r;
}

type Props = {
  open: boolean;
  onClose: () => void;
};

export function FlappyBirdOverlay({ open, onClose }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [session, setSession] = useState(0);
  const [gameOverScore, setGameOverScore] = useState<number | null>(null);

  const restart = useCallback(() => {
    setGameOverScore(null);
    setSession((s) => s + 1);
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

      let glideImg: HTMLImageElement | null = null;
      let flapImg: HTMLImageElement | null = null;
      try {
        const [g, f] = await Promise.all([
          loadImage(PIGEON_GLIDE_SRC),
          loadImage(PIGEON_FLAP_SRC),
        ]);
        glideImg = g;
        flapImg = f;
      } catch {
        /* fallback: yellow circle */
      }

      if (cancelled) return;

      let raf = 0;
      let phase: "ready" | "playing" | "gameover" = "ready";

      let birdY = CANVAS_H * 0.45;
      let birdVy = 0;
      let pipes: Pipe[] = [];
      let lastPipeSpawn = 0;
      let score = 0;
      let lastFlapAt = 0;
      let flapVisualUntil = 0;

      const resizeCanvas = () => {
        const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
        canvas.width = Math.floor(CANVAS_W * dpr);
        canvas.height = Math.floor(CANVAS_H * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };

      resizeCanvas();

      const drawBackground = () => {
        const g = ctx.createLinearGradient(0, 0, 0, CANVAS_H);
        g.addColorStop(0, SKY_TOP);
        g.addColorStop(1, SKY_BOTTOM);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
      };

      const drawPipes = () => {
        for (const p of pipes) {
          ctx.fillStyle = PIPE_COLOR;
          ctx.strokeStyle = PIPE_EDGE;
          ctx.lineWidth = 2;
          ctx.fillRect(p.x, 0, PIPE_W, p.gapY);
          ctx.strokeRect(p.x, 0, PIPE_W, p.gapY);
          const bottomY = p.gapY + GAP_H;
          ctx.fillRect(p.x, bottomY, PIPE_W, CANVAS_H - bottomY);
          ctx.strokeRect(p.x, bottomY, PIPE_W, CANVAS_H - bottomY);
        }
      };

      const drawBird = (now: number) => {
        const showFlapFrame =
          now < flapVisualUntil && flapImg !== null && flapImg.complete;
        const img =
          showFlapFrame && flapImg
            ? flapImg
            : glideImg && glideImg.complete
              ? glideImg
              : null;

        if (img) {
          ctx.drawImage(
            img,
            BIRD_X - BIRD_DRAW_W / 2,
            birdY - BIRD_DRAW_H / 2,
            BIRD_DRAW_W,
            BIRD_DRAW_H
          );
        } else {
          ctx.beginPath();
          ctx.arc(BIRD_X, birdY, BIRD_R, 0, Math.PI * 2);
          ctx.fillStyle = "#fbbf24";
          ctx.fill();
          ctx.strokeStyle = "#92400e";
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      };

      const drawHud = (hint: boolean) => {
        ctx.fillStyle = "rgba(0,0,0,0.55)";
        ctx.font = "bold 22px system-ui, sans-serif";
        ctx.textAlign = "left";
        ctx.fillText(`Score: ${score}`, 16, 32);
        if (hint && phase === "ready") {
          ctx.font = "16px system-ui, sans-serif";
          ctx.textAlign = "center";
          ctx.fillText("Tap or Space to flap", CANVAS_W / 2, CANVAS_H / 2 - 8);
        }
        ctx.textAlign = "left";
      };

      const drawFrame = (showHint: boolean, now: number) => {
        drawBackground();
        drawPipes();
        drawBird(now);
        drawHud(showHint);
      };

      const checkCollision = (): boolean => {
        if (birdY - BIRD_R <= 0 || birdY + BIRD_R >= CANVAS_H) return true;
        for (const p of pipes) {
          if (
            circleRectHit(BIRD_X, birdY, BIRD_R, p.x, 0, PIPE_W, p.gapY) ||
            circleRectHit(
              BIRD_X,
              birdY,
              BIRD_R,
              p.x,
              p.gapY + GAP_H,
              PIPE_W,
              CANVAS_H - (p.gapY + GAP_H)
            )
          ) {
            return true;
          }
        }
        return false;
      };

      const updatePlaying = (now: number) => {
        birdVy += GRAVITY;
        birdY += birdVy;

        if (
          lastPipeSpawn > 0 &&
          now - lastPipeSpawn >= PIPE_SPAWN_EVERY
        ) {
          lastPipeSpawn = now;
          pipes.push({ x: CANVAS_W + 20, gapY: randomGapY(), scored: false });
        }

        for (const p of pipes) {
          p.x -= PIPE_SPEED;
          if (!p.scored && p.x + PIPE_W < BIRD_X) {
            p.scored = true;
            score += 1;
          }
        }
        pipes = pipes.filter((p) => p.x > -PIPE_W - 10);
      };

      const flap = (now: number) => {
        if (phase === "gameover") return;
        if (now - lastFlapAt < 80) return;
        lastFlapAt = now;
        flapVisualUntil = now + FLAP_VISUAL_MS;

        if (phase === "ready") {
          phase = "playing";
          lastPipeSpawn = now;
          pipes.push({ x: CANVAS_W + 20, gapY: randomGapY(), scored: false });
          birdVy = FLAP_VY;
          return;
        }
        if (phase === "playing") {
          birdVy = FLAP_VY;
        }
      };

      const onPointerDown = (e: PointerEvent) => {
        if (e.button !== 0) return;
        e.preventDefault();
        flap(performance.now());
      };

      const onKeyDown = (e: KeyboardEvent) => {
        if (e.code === "Escape") {
          e.preventDefault();
          onClose();
          return;
        }
        if (e.code === "Space") {
          e.preventDefault();
          flap(performance.now());
        }
      };

      canvas.addEventListener("pointerdown", onPointerDown);
      window.addEventListener("keydown", onKeyDown);

      const loop = (now: number) => {
        if (cancelled) return;

        if (phase === "playing") {
          updatePlaying(now);
          if (checkCollision()) {
            phase = "gameover";
            setGameOverScore(score);
            drawFrame(false, now);
            return;
          }
        }

        drawFrame(phase === "ready", now);

        if (phase !== "gameover") {
          raf = requestAnimationFrame(loop);
        }
      };

      drawFrame(true, performance.now());
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
  }, [open, session, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-black/70 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="flappy-title"
    >
      <div className="flex w-full max-w-[min(100%,440px)] items-center justify-between gap-2">
        <h2 id="flappy-title" className="text-lg font-semibold text-amber-50">
          Flappy pigeon
        </h2>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="rounded-md border border-amber-200/40 bg-zinc-900 px-3 py-1.5 text-sm text-amber-50 hover:bg-zinc-800"
        >
          Close
        </button>
      </div>

      <div className="relative rounded-lg border-2 border-black bg-sky-200 shadow-lg">
        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          className="block max-h-[min(85vh,640px)] w-auto max-w-full touch-manipulation"
          style={{ width: CANVAS_W, height: CANVAS_H }}
        />

        {gameOverScore !== null && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-lg bg-black/55 p-4 text-center">
            <p className="text-xl font-bold text-amber-50">Game over</p>
            <p className="text-lg text-amber-100">Score: {gameOverScore}</p>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                type="button"
                onClick={restart}
                className="rounded-md bg-amber-500 px-4 py-2 text-sm font-semibold text-black hover:bg-amber-400"
              >
                Restart
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-md border border-amber-200/50 px-4 py-2 text-sm text-amber-50 hover:bg-white/10"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      <p className="max-w-md text-center text-sm text-amber-100/90">
        Space or click/tap the game to flap. Escape closes this window.
      </p>
    </div>
  );
}
