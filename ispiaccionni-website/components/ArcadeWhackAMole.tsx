"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const HOLES = 9;
const ROUND_SEC = 60;
/** Shortest gap between spawn waves (end of round, matches prior feel). */
const SPAWN_MS_FAST = 720;
/** Longest gap at round start (gentle warm-up). */
const SPAWN_MS_SLOW = 1700;
const MOLE_MS = 1050;
const MOLE_IMG = "/images/virtus.jpg";

type Phase = "idle" | "playing";

function pickMoleCount(timeLeft: number): number {
  if (timeLeft > 40) return 1;
  if (timeLeft > 20) {
    return Math.random() < 0.42 ? 2 : 1;
  }
  const r = Math.random();
  if (r < 0.12) return 1;
  if (r < 0.38) return 2;
  if (r < 0.68) return 3;
  return 4;
}

function pickRandomDistinct(count: number, max: number): number[] {
  const set = new Set<number>();
  while (set.size < count) {
    set.add(Math.floor(Math.random() * max));
  }
  return [...set];
}

/** Progress 0 = round start, 1 = round end — spawn interval eases from slow to fast. */
function spawnDelayMs(timeLeft: number): number {
  const p = Math.max(0, Math.min(1, (ROUND_SEC - timeLeft) / ROUND_SEC));
  const curved = Math.pow(p, 1.15);
  return Math.round(SPAWN_MS_SLOW - (SPAWN_MS_SLOW - SPAWN_MS_FAST) * curved);
}

export function ArcadeWhackAMole() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_SEC);
  const [activeMoles, setActiveMoles] = useState<Set<number>>(() => new Set());
  const [lastRoundScore, setLastRoundScore] = useState<number | null>(null);

  const timeLeftRef = useRef(timeLeft);

  useEffect(() => {
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);

  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const spawnTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearMoleTimers = useCallback(() => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
    if (spawnTimerRef.current) {
      clearTimeout(spawnTimerRef.current);
      spawnTimerRef.current = null;
    }
  }, []);

  const startGame = useCallback(() => {
    clearMoleTimers();
    setScore(0);
    setTimeLeft(ROUND_SEC);
    setActiveMoles(new Set());
    setPhase("playing");
  }, [clearMoleTimers]);

  const endGame = useCallback(() => {
    clearMoleTimers();
    setActiveMoles(new Set());
    setScore((s) => {
      setLastRoundScore(s);
      return s;
    });
    setPhase("idle");
  }, [clearMoleTimers]);

  useEffect(() => {
    if (phase !== "playing") return;

    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(id);
          setTimeout(() => {
            endGame();
          }, 0);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [phase, endGame]);

  useEffect(() => {
    if (phase !== "playing") return;

    let cancelled = false;

    const spawn = () => {
      if (cancelled || timeLeftRef.current <= 0) return;
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
      const n = pickMoleCount(timeLeftRef.current);
      const holes = pickRandomDistinct(n, HOLES);
      setActiveMoles(new Set(holes));
      hideTimerRef.current = setTimeout(() => {
        hideTimerRef.current = null;
        setActiveMoles(new Set());
      }, MOLE_MS);
      spawnTimerRef.current = setTimeout(spawn, spawnDelayMs(timeLeftRef.current));
    };

    spawnTimerRef.current = setTimeout(spawn, 280);

    return () => {
      cancelled = true;
      clearMoleTimers();
    };
  }, [phase, clearMoleTimers]);

  useEffect(() => {
    return () => clearMoleTimers();
  }, [clearMoleTimers]);

  const whack = (index: number) => {
    if (phase !== "playing") return;
    setActiveMoles((prev) => {
      if (!prev.has(index)) return prev;
      setScore((s) => s + 1);
      const next = new Set(prev);
      next.delete(index);
      return next;
    });
  };

  const showTitle = phase === "idle";
  const showHud = phase === "playing";

  return (
    <div className="relative z-0 select-none rounded-xl border-4 border-neutral-700 bg-gradient-to-b from-neutral-600 via-neutral-800 to-neutral-900 p-3 shadow-[0_20px_50px_rgba(0,0,0,0.45)] md:p-4">
      {/* Marquee */}
      <div className="relative z-20 mb-2 rounded-md border border-amber-700/50 bg-gradient-to-r from-neutral-900 via-amber-950 to-neutral-900 px-3 py-2 text-center">
        <p className="text-xs font-bold tracking-[0.35em] text-amber-300 md:text-sm">
          WHACK-A-MOLE
        </p>
        <p className="text-[10px] text-amber-100/70 md:text-xs">I SPIACCIONNI ARCADE</p>
      </div>

      {/* Screen bezel — above playfield so moles never paint over it */}
      <div className="relative z-20 rounded-lg border-[10px] border-neutral-900 bg-neutral-950 p-2 shadow-[inset_0_0_24px_rgba(0,0,0,0.85)] md:border-[14px] md:p-3">
        <div
          className="relative flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-md bg-gradient-to-b from-slate-900 to-black px-4 py-6 md:min-h-[460px]"
          style={{
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)",
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 rounded-md opacity-[0.06]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)",
            }}
          />

          {showTitle && (
            <>
              <Image
                src="/images/logo.png"
                width={280}
                height={280}
                alt="I Spiaccionni"
                className="relative z-10 h-auto w-[min(72vw,220px)] drop-shadow-lg md:w-[min(60vw,260px)]"
                priority
              />
              {lastRoundScore !== null && (
                <p className="relative z-10 text-center text-sm text-amber-200/90 md:text-base">
                  Vorige ronde:{" "}
                  <span className="font-mono font-bold text-amber-100">{lastRoundScore}</span>{" "}
                  punten
                </p>
              )}
              <button
                type="button"
                onClick={startGame}
                className="relative z-10 rounded-xl border-b-4 border-red-900 bg-gradient-to-b from-red-500 to-red-700 px-10 py-3 text-xl font-black uppercase tracking-wider text-white shadow-lg transition hover:brightness-110 active:translate-y-0.5 active:border-b-2 md:px-14 md:py-4 md:text-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
              >
                Start
              </button>
            </>
          )}

          {showHud && (
            <div className="relative z-10 flex w-full max-w-sm flex-col items-center gap-2 text-amber-50">
              <div className="flex w-full justify-between gap-4 font-mono text-sm md:text-base">
                <span>
                  Score <span className="font-bold text-amber-200">{score}</span>
                </span>
                <span>
                  Tijd{" "}
                  <span className="font-bold text-amber-200 tabular-nums">{timeLeft}s</span>
                </span>
              </div>
              <p className="text-center text-xs text-amber-100/60">Sla de mol!</p>
            </div>
          )}
        </div>
      </div>

      {/* Control deck — clips moles so they stay inside the machine */}
      <div className="relative z-10 mt-3 overflow-hidden rounded-lg border-2 border-amber-900/40 bg-gradient-to-b from-amber-900/30 via-amber-950/80 to-neutral-950 p-4 shadow-inner md:mt-4 md:p-5">
        <div
          className="relative z-0 mx-auto grid max-w-md grid-cols-3 gap-3 md:gap-4"
          style={{
            opacity: phase === "playing" ? 1 : 0.45,
            pointerEvents: phase === "playing" ? "auto" : "none",
          }}
        >
          {Array.from({ length: HOLES }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => whack(i)}
              aria-label={`Gat ${i + 1}`}
              className="relative flex h-24 items-end justify-center overflow-hidden rounded-full border-4 border-neutral-900 bg-gradient-to-b from-neutral-900 to-black shadow-[inset_0_8px_16px_rgba(0,0,0,0.9)] md:h-28"
            >
              <span
                className={`absolute bottom-0 z-20 h-[200%] w-[58%] overflow-hidden rounded-t-full rounded-b-full border-2 border-neutral-800 shadow-md transition-transform duration-[90ms] ease-out ${
                  activeMoles.has(i) ? "translate-y-[50%]" : "translate-y-full"
                }`}
              >
                <span className="relative block h-full w-full bg-[#6c0220]">
                  <Image
                    src={MOLE_IMG}
                    alt="Mol"
                    fill
                    sizes="120px"
                    className="select-none object-contain object-top"
                    draggable={false}
                  />
                </span>
              </span>
              <span className="pointer-events-none absolute top-2 z-10 h-5 w-[55%] rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.55)_55%,transparent_78%)] shadow-[0_1px_3px_rgba(0,0,0,0.8)]" />
            </button>
          ))}
        </div>
        {phase !== "playing" && (
          <p className="mt-3 text-center text-xs text-amber-100/50">
            Druk op Start om te spelen.
          </p>
        )}
      </div>
    </div>
  );
}
