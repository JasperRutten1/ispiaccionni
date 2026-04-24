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
    <div className="relative z-0 select-none rounded-lg border-[3px] border-neutral-700 bg-gradient-to-b from-neutral-600 via-neutral-800 to-neutral-900 p-2 shadow-[0_12px_32px_rgba(0,0,0,0.4)] sm:rounded-xl sm:border-4 md:p-3">
      {/* Marquee — arcade-style wide lettering */}
      <div className="relative z-20 mb-1.5 rounded-md border-2 border-amber-600/60 bg-gradient-to-r from-neutral-950 via-amber-950 to-neutral-950 px-3 py-2 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_3px_10px_rgba(0,0,0,0.4)] sm:mb-2 sm:rounded-lg sm:px-4 sm:py-2.5 md:rounded-xl md:px-5 md:py-3">
        <p className="text-base font-black uppercase leading-none tracking-[0.08em] text-amber-200 [text-shadow:0_0_14px_rgba(251,191,36,0.4),0_2px_0_#1a0a0a,0_3px_8px_rgba(0,0,0,0.55)] sm:text-lg md:text-xl md:tracking-[0.1em] lg:text-2xl">
          WHACK-A-VIRTUS
        </p>
        <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-100/80 sm:text-[11px] md:mt-1.5 md:text-xs md:tracking-[0.3em]">
          I SPIACCIONNI ARCADE
        </p>
      </div>

      {/* Screen bezel — above playfield so moles never paint over it */}
      <div className="relative z-20 rounded-md border-[6px] border-neutral-900 bg-neutral-950 p-1.5 shadow-[inset_0_0_18px_rgba(0,0,0,0.85)] sm:rounded-lg sm:border-[8px] md:border-[10px] md:p-2">
        <div
          className="relative flex min-h-[min(52vh,300px)] flex-col items-center justify-center gap-2 rounded-md bg-gradient-to-b from-slate-900 to-black px-3 py-4 sm:min-h-[320px] sm:gap-3 sm:py-5 md:min-h-[360px] md:px-4"
          style={{
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)",
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 z-[2] rounded-md opacity-[0.06]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)",
            }}
          />

          {phase === "playing" && (
            <div className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center px-4 py-6">
              <Image
                src="/images/logo.png"
                width={280}
                height={280}
                alt=""
                aria-hidden
                className="h-auto max-h-[min(42vh,220px)] w-[min(70vw,200px)] opacity-[0.2] brightness-90 contrast-125 drop-shadow-md sm:max-h-[min(48vh,260px)] sm:w-[min(65vw,240px)]"
              />
            </div>
          )}

          {showTitle && (
            <>
              <Image
                src="/images/logo.png"
                width={280}
                height={280}
                alt="I Spiaccionni"
                className="relative z-10 h-auto w-[min(64vw,168px)] drop-shadow-lg sm:w-[min(58vw,200px)] md:w-[min(50vw,230px)]"
                priority
              />
              {lastRoundScore !== null && (
                <p className="relative z-10 text-center text-xs text-amber-200/90 sm:text-sm">
                  Vorige ronde:{" "}
                  <span className="font-mono font-bold text-amber-100">{lastRoundScore}</span>{" "}
                  punten
                </p>
              )}
              <button
                type="button"
                onClick={startGame}
                className="relative z-10 rounded-lg border-b-[3px] border-red-900 bg-gradient-to-b from-red-500 to-red-700 px-8 py-2.5 text-base font-black uppercase tracking-wide text-white shadow-md transition hover:brightness-110 active:translate-y-0.5 active:border-b-2 sm:rounded-xl sm:border-b-4 sm:px-10 sm:py-3 sm:text-lg md:px-12 md:text-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
              >
                Start
              </button>
            </>
          )}

          {showHud && (
            <div className="relative z-20 flex w-full max-w-xs flex-col items-center gap-1.5 px-1 text-amber-50 drop-shadow-[0_1px_6px_rgba(0,0,0,0.85)] sm:max-w-sm sm:gap-2">
              <div className="flex w-full justify-between gap-3 font-mono text-xs sm:text-sm md:text-base">
                <span>
                  Score <span className="font-bold text-amber-200">{score}</span>
                </span>
                <span>
                  Tijd{" "}
                  <span className="font-bold text-amber-200 tabular-nums">{timeLeft}s</span>
                </span>
              </div>
              <p className="text-center text-xs text-amber-100/60">KLOPT EROP!!</p>
            </div>
          )}
        </div>
      </div>

      {/* Control deck — clips moles so they stay inside the machine */}
      <div className="relative z-10 mt-2 overflow-hidden rounded-lg border-2 border-amber-900/40 bg-gradient-to-b from-amber-900/30 via-amber-950/80 to-neutral-950 p-2.5 shadow-inner sm:mt-3 sm:p-3 md:p-4">
        <div
          className="relative z-0 mx-auto grid max-w-[min(100%,22rem)] grid-cols-3 gap-2 sm:max-w-md sm:gap-2.5 md:gap-3"
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
              className="relative flex h-20 items-end justify-center overflow-hidden rounded-full border-[3px] border-neutral-900 bg-gradient-to-b from-neutral-900 to-black shadow-[inset_0_6px_12px_rgba(0,0,0,0.9)] sm:h-[5.25rem] sm:border-4 md:h-24"
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
                    sizes="(max-width:640px) 80px, 100px"
                    className="select-none object-contain object-top"
                    draggable={false}
                  />
                </span>
              </span>
              <span className="pointer-events-none absolute top-1.5 z-10 h-4 w-[55%] rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.55)_55%,transparent_78%)] shadow-[0_1px_2px_rgba(0,0,0,0.8)] sm:top-2 sm:h-5" />
            </button>
          ))}
        </div>
        {phase !== "playing" && (
          <p className="mt-2 text-center text-[11px] text-amber-100/50 sm:mt-2.5 sm:text-xs">
            Druk op Start om te spelen.
          </p>
        )}
      </div>
    </div>
  );
}
