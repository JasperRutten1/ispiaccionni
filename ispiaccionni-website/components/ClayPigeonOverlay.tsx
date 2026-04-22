"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CANVAS_W = 400;
const CANVAS_H = 600;
const SKY_TOP = "#87CEEB";
const SKY_BOTTOM = "#E0F6FF";
/** Horizon / vanishing point X (first-person down-range). */
const VANISH_X = CANVAS_W * 0.5;
/** Sky–grass line: lower on screen = more sky (ground sits lower). */
const HORIZON_Y = CANVAS_H * 0.54;
const CLAY_IMG_SRC = "/game/clay-pigeon.svg";
const PIGEON_GLIDE_SRC = "/game/pigeon-glide.svg";
const CLAY_DRAW_W = 58;
const CLAY_DRAW_H = 36;

type LevelConfig = {
  quota: number;
  maxSimultaneous: number;
  spawnIntervalMs: number;
  speed: number;
  hitSlop: number;
};

const LEVELS: LevelConfig[] = [
  { quota: 4, maxSimultaneous: 1, spawnIntervalMs: 2400, speed: 2.6, hitSlop: 40 },
  { quota: 5, maxSimultaneous: 1, spawnIntervalMs: 2200, speed: 2.75, hitSlop: 38 },
  { quota: 5, maxSimultaneous: 2, spawnIntervalMs: 2000, speed: 2.9, hitSlop: 36 },
  { quota: 6, maxSimultaneous: 2, spawnIntervalMs: 1900, speed: 3.05, hitSlop: 36 },
  { quota: 6, maxSimultaneous: 2, spawnIntervalMs: 1750, speed: 3.2, hitSlop: 34 },
  { quota: 7, maxSimultaneous: 2, spawnIntervalMs: 1650, speed: 3.35, hitSlop: 34 },
  { quota: 7, maxSimultaneous: 3, spawnIntervalMs: 1550, speed: 3.5, hitSlop: 32 },
  { quota: 8, maxSimultaneous: 3, spawnIntervalMs: 1450, speed: 3.65, hitSlop: 32 },
  { quota: 8, maxSimultaneous: 3, spawnIntervalMs: 1350, speed: 3.8, hitSlop: 30 },
  { quota: 9, maxSimultaneous: 3, spawnIntervalMs: 1250, speed: 4.0, hitSlop: 28 },
];

/**
 * Clay flies down-range: progress 0 → 1.
 * Vertical path is a quadratic Bezier (launch → apex → end) so the disc rises first, then falls.
 */
type Clay = {
  progress: number;
  speedZ: number;
  startX: number;
  launchY: number;
  apexY: number;
  endY: number;
  lateral: number;
};

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load ${src}`));
    img.src = src;
  });
}

function logicalPointer(
  canvas: HTMLCanvasElement,
  clientX: number,
  clientY: number
): { x: number; y: number } {
  const r = canvas.getBoundingClientRect();
  const x = ((clientX - r.left) / r.width) * CANVAS_W;
  const y = ((clientY - r.top) / r.height) * CANVAS_H;
  return { x, y };
}

function clayScreenState(c: Clay): { x: number; y: number; scale: number; alpha: number } {
  const t = Math.min(1.15, c.progress);
  const u = 1 - t;
  const arc = Math.sin(t * Math.PI) * c.lateral * 52 * (1 - t * 0.85);
  const x = VANISH_X + (c.startX - VANISH_X) * (1 - t) + arc;
  const y = u * u * c.launchY + 2 * u * t * c.apexY + t * t * c.endY;
  const scale = Math.max(0.07, 1 - 0.9 * t * t);
  const alpha = Math.max(0.06, 1 - 0.35 * t);
  return { x, y, scale, alpha };
}

type Props = {
  open: boolean;
  onClose: () => void;
};

type Screen = "menu" | "play" | "levelDone" | "dead" | "victory";

export function ClayPigeonOverlay({ open, onClose }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const livesRef = useRef(3);
  const [screen, setScreen] = useState<Screen>("menu");
  const [level, setLevel] = useState(1);
  const [playSession, setPlaySession] = useState(0);

  const startRun = useCallback(() => {
    livesRef.current = 3;
    setLevel(1);
    setPlaySession((s) => s + 1);
    setScreen("play");
  }, []);

  const nextLevel = useCallback(() => {
    setLevel((l) => l + 1);
    setPlaySession((s) => s + 1);
    setScreen("play");
  }, []);

  const restartAfterDeath = useCallback(() => {
    livesRef.current = 3;
    setLevel(1);
    setPlaySession((s) => s + 1);
    setScreen("play");
  }, []);

  useEffect(() => {
    if (!open) {
      setScreen("menu");
      setLevel(1);
      livesRef.current = 3;
    }
  }, [open]);

  useEffect(() => {
    if (!open || screen !== "play") return;

    let cancelled = false;
    let innerCleanup: (() => void) | undefined;

    void (async () => {
      closeRef.current?.focus();

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      let clayImg: HTMLImageElement | null = null;
      let grassPigeonImg: HTMLImageElement | null = null;
      try {
        clayImg = await loadImage(CLAY_IMG_SRC);
      } catch {
        /* fallback ellipse */
      }
      try {
        grassPigeonImg = await loadImage(PIGEON_GLIDE_SRC);
      } catch {
        /* decorative only */
      }

      if (cancelled) return;

      const cfg = LEVELS[level - 1] ?? LEVELS[LEVELS.length - 1];
      let clays: Clay[] = [];
      let hits = 0;
      let livesLeft = livesRef.current;
      let lastSpawn = 0;
      let aimX = CANVAS_W / 2;
      let aimY = CANVAS_H / 2;
      let flashUntil = 0;
      let ended = false;

      const endRun = (next: Screen) => {
        if (ended) return;
        ended = true;
        livesRef.current = livesLeft;
        setScreen(next);
      };

      const resizeCanvas = () => {
        const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
        canvas.width = Math.floor(CANVAS_W * dpr);
        canvas.height = Math.floor(CANVAS_H * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };
      resizeCanvas();

      const spawnClay = (now: number) => {
        const startX = 48 + Math.random() * (CANVAS_W - 96);
        const launchY = HORIZON_Y + 92 + Math.random() * 58;
        const apexY = CANVAS_H * (0.07 + Math.random() * 0.14);
        const endY = HORIZON_Y + 4 + Math.random() * 52;
        const lateral = (Math.random() - 0.5) * 2;
        const speedZ = cfg.speed * (0.00019 + Math.random() * 0.00004);
        clays.push({
          progress: 0,
          speedZ,
          startX,
          launchY,
          apexY,
          endY,
          lateral,
        });
        lastSpawn = now;
      };

      const drawGrassPigeon = () => {
        const bx = 8;
        const by = CANVAS_H - 4;
        const s = 0.44;
        ctx.save();
        ctx.translate(bx, by);
        ctx.scale(s, s);
        if (grassPigeonImg && grassPigeonImg.complete) {
          ctx.drawImage(grassPigeonImg, 0, -72, 96, 72);
        } else {
          ctx.fillStyle = "#6b7280";
          ctx.beginPath();
          ctx.ellipse(48, -36, 22, 14, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#9ca3af";
          ctx.beginPath();
          ctx.arc(68, -40, 8, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      };

      const drawBackground = () => {
        const g = ctx.createLinearGradient(0, 0, 0, HORIZON_Y + 36);
        g.addColorStop(0, SKY_TOP);
        g.addColorStop(1, SKY_BOTTOM);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, CANVAS_W, HORIZON_Y + 28);

        const gg = ctx.createLinearGradient(VANISH_X, HORIZON_Y, VANISH_X, CANVAS_H);
        gg.addColorStop(0, "#5aad63");
        gg.addColorStop(0.45, "#3d8c47");
        gg.addColorStop(1, "#1e4d24");
        ctx.fillStyle = gg;
        ctx.beginPath();
        ctx.moveTo(0, CANVAS_H);
        ctx.lineTo(0, HORIZON_Y + 20);
        ctx.lineTo(CANVAS_W, HORIZON_Y + 20);
        ctx.lineTo(CANVAS_W, CANVAS_H);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = "rgba(22,101,52,0.55)";
        ctx.lineWidth = 1;
        for (let i = 0; i < 7; i++) {
          const t = i / 6;
          const y = HORIZON_Y + 24 + t * (CANVAS_H - HORIZON_Y - 32);
          const inset = t * CANVAS_W * 0.42;
          ctx.beginPath();
          ctx.moveTo(inset, y);
          ctx.lineTo(CANVAS_W - inset, y);
          ctx.stroke();
        }

        drawGrassPigeon();
      };

      const drawClays = () => {
        const sorted = [...clays].sort(
          (a, b) => clayScreenState(a).scale - clayScreenState(b).scale
        );
        for (const c of sorted) {
          const { x, y, scale, alpha } = clayScreenState(c);
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.translate(x, y);
          ctx.scale(scale, scale);
          const hw = CLAY_DRAW_W / 2;
          const hh = CLAY_DRAW_H / 2;
          if (clayImg && clayImg.complete) {
            ctx.drawImage(clayImg, -hw, -hh, CLAY_DRAW_W, CLAY_DRAW_H);
          } else {
            ctx.beginPath();
            ctx.ellipse(0, 0, hw - 4, hh - 2, 0, 0, Math.PI * 2);
            ctx.fillStyle = "#ea580c";
            ctx.fill();
            ctx.strokeStyle = "#7c2d12";
            ctx.lineWidth = 2;
            ctx.stroke();
          }
          ctx.restore();
        }
      };

      const drawCrosshair = (now: number) => {
        const cx = aimX;
        const cy = aimY;
        const r = 14;
        ctx.strokeStyle = "rgba(255,255,255,0.95)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.strokeStyle = "rgba(220,38,38,0.9)";
        ctx.lineWidth = 1.5;
        const arm = 10;
        ctx.beginPath();
        ctx.moveTo(cx - arm, cy);
        ctx.lineTo(cx + arm, cy);
        ctx.moveTo(cx, cy - arm);
        ctx.lineTo(cx, cy + arm);
        ctx.stroke();
        if (now < flashUntil) {
          ctx.strokeStyle = "rgba(250,250,250,0.5)";
          ctx.beginPath();
          ctx.arc(cx, cy, r + 6, 0, Math.PI * 2);
          ctx.stroke();
        }
      };

      const drawHud = () => {
        ctx.fillStyle = "rgba(0,0,0,0.55)";
        ctx.font = "bold 18px system-ui, sans-serif";
        ctx.textAlign = "left";
        ctx.fillText(`Level ${level} / 10`, 12, 26);
        ctx.fillText(`Hits: ${hits} / ${cfg.quota}`, 12, 48);
        ctx.fillText(`Lives: ${livesLeft}`, 12, 70);
      };

      const drawFrame = (now: number) => {
        drawBackground();
        drawClays();
        drawCrosshair(now);
        drawHud();
      };

      const update = (now: number, dt: number) => {
        if (ended) return;

        const needMoreTargets = hits < cfg.quota;
        const canSpawn =
          needMoreTargets &&
          clays.length < cfg.maxSimultaneous &&
          (clays.length === 0 || now - lastSpawn >= cfg.spawnIntervalMs);

        if (canSpawn) {
          spawnClay(now);
        }

        const next: Clay[] = [];
        for (const c of clays) {
          const speedBoost = 1 + 0.5 * c.progress;
          const np = c.progress + c.speedZ * speedBoost * dt;
          const tmp = { ...c, progress: np };
          const { scale, alpha } = clayScreenState(tmp);

          const escaped = np >= 1 || alpha < 0.11 || scale < 0.075;

          if (escaped) {
            livesLeft -= 1;
            livesRef.current = livesLeft;
            if (livesLeft <= 0) {
              clays = [];
              endRun("dead");
              return;
            }
            continue;
          }

          next.push({ ...c, progress: np });
        }
        clays = next;

        if (!ended && hits >= cfg.quota) {
          clays = [];
          endRun(level >= 10 ? "victory" : "levelDone");
        }
      };

      const tryHit = (lx: number, ly: number, now: number) => {
        if (ended) return;
        flashUntil = now + 80;
        const hitR = cfg.hitSlop * 0.42;
        for (let i = clays.length - 1; i >= 0; i--) {
          const c = clays[i]!;
          const { x, y, scale, alpha } = clayScreenState(c);
          if (alpha < 0.12) continue;
          const rx = (CLAY_DRAW_W / 2) * scale * 0.85;
          const ry = (CLAY_DRAW_H / 2) * scale * 0.85;
          const dx = lx - x;
          const dy = ly - y;
          const dist =
            (dx * dx) / (rx * rx + hitR * hitR) + (dy * dy) / (ry * ry + hitR * hitR);
          if (dist <= 1) {
            clays.splice(i, 1);
            hits += 1;
            if (hits >= cfg.quota) {
              clays = [];
              endRun(level >= 10 ? "victory" : "levelDone");
            }
            return;
          }
        }
      };

      const onPointerMove = (e: PointerEvent) => {
        const { x, y } = logicalPointer(canvas, e.clientX, e.clientY);
        aimX = x;
        aimY = y;
      };

      const onPointerDown = (e: PointerEvent) => {
        if (e.button !== 0) return;
        e.preventDefault();
        const { x, y } = logicalPointer(canvas, e.clientX, e.clientY);
        tryHit(x, y, performance.now());
      };

      const onKeyDown = (e: KeyboardEvent) => {
        if (e.code === "Escape") {
          e.preventDefault();
          onClose();
        }
      };

      canvas.addEventListener("pointermove", onPointerMove);
      canvas.addEventListener("pointerdown", onPointerDown);
      window.addEventListener("keydown", onKeyDown);

      let raf = 0;
      let last = performance.now();

      const loop = (now: number) => {
        if (cancelled || ended) return;

        const dt = Math.min(48, now - last);
        last = now;

        update(now, dt);
        if (cancelled || ended) return;

        drawFrame(now);
        raf = requestAnimationFrame(loop);
      };

      drawFrame(performance.now());
      raf = requestAnimationFrame(loop);

      innerCleanup = () => {
        cancelAnimationFrame(raf);
        canvas.removeEventListener("pointermove", onPointerMove);
        canvas.removeEventListener("pointerdown", onPointerDown);
        window.removeEventListener("keydown", onKeyDown);
      };
    })();

    return () => {
      cancelled = true;
      innerCleanup?.();
    };
  }, [open, screen, level, playSession, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-black/70 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="clay-title"
    >
      <div className="flex w-full max-w-[min(100%,440px)] items-center justify-between gap-2">
        <h2 id="clay-title" className="text-lg font-semibold text-amber-50">
          Clay pigeon shooting
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

      {screen === "menu" && (
        <div className="flex max-w-[min(100%,440px)] flex-col items-center gap-6 rounded-lg border-2 border-black bg-zinc-900/95 p-8 text-center shadow-lg">
          <p className="text-amber-100/90">
            First-person view: clays arc up, then fall away into the distance. Shoot them before
            they shrink into the sky. You have three lives for the whole run. Ten levels — good
            luck.
          </p>
          <button
            type="button"
            onClick={startRun}
            className="rounded-md bg-amber-500 px-6 py-2.5 text-sm font-semibold text-black hover:bg-amber-400"
          >
            Start
          </button>
        </div>
      )}

      {(screen === "play" || screen === "levelDone" || screen === "dead" || screen === "victory") && (
        <div className="relative rounded-lg border-2 border-black bg-sky-200 shadow-lg">
          <canvas
            ref={canvasRef}
            width={CANVAS_W}
            height={CANVAS_H}
            className="block max-h-[min(85vh,640px)] w-auto max-w-full cursor-none touch-manipulation"
            style={{ width: CANVAS_W, height: CANVAS_H }}
          />

          {screen === "levelDone" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-lg bg-black/55 p-4 text-center">
              <p className="text-xl font-bold text-amber-50">Level {level} cleared</p>
              <button
                type="button"
                onClick={nextLevel}
                className="rounded-md bg-amber-500 px-4 py-2 text-sm font-semibold text-black hover:bg-amber-400"
              >
                Next level
              </button>
            </div>
          )}

          {screen === "dead" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-lg bg-black/55 p-4 text-center">
              <p className="text-xl font-bold text-amber-50">Game over</p>
              <p className="text-amber-100">A pigeon got away one time too many.</p>
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  type="button"
                  onClick={restartAfterDeath}
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

          {screen === "victory" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-lg bg-black/55 p-4 text-center">
              <p className="text-xl font-bold text-amber-50">You cleared all 10 levels</p>
              <p className="text-amber-100">Skeet legend.</p>
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  type="button"
                  onClick={startRun}
                  className="rounded-md bg-amber-500 px-4 py-2 text-sm font-semibold text-black hover:bg-amber-400"
                >
                  Play again
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
      )}

      {screen === "play" && (
        <p className="max-w-md text-center text-sm text-amber-100/90">
          Aim down-range; click to shoot. Escape closes this window.
        </p>
      )}

      {screen === "menu" && (
        <p className="max-w-md text-center text-sm text-amber-100/90">Escape closes this window.</p>
      )}
    </div>
  );
}
