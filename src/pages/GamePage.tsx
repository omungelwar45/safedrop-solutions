import { useEffect, useMemo, useState } from "react";
import { Biohazard, Brain, Clock3, Pill, Play, RotateCcw, ShieldCheck, Target, Trophy } from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";

type TargetType = "expired" | "good";

const GRID_SIZE = 9;
const BEST_SCORE_KEY = "medisafe.game.bestScore";
const PENDING_POINTS_KEY = "medisafe.game.pendingPoints";

const DIFFICULTY = {
  easy: { label: "Easy", seconds: 35, tickMs: 900, goodChance: 0.2 },
  normal: { label: "Normal", seconds: 30, tickMs: 700, goodChance: 0.25 },
  pro: { label: "Pro", seconds: 25, tickMs: 520, goodChance: 0.3 },
} as const;

type DifficultyKey = keyof typeof DIFFICULTY;

const randomCell = () => Math.floor(Math.random() * GRID_SIZE);
const randomTargetType = (difficulty: DifficultyKey): TargetType =>
  Math.random() > DIFFICULTY[difficulty].goodChance ? "expired" : "good";

const GamePage = () => {
  const [difficulty, setDifficulty] = useState<DifficultyKey>("normal");
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(DIFFICULTY.normal.seconds);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [targetCell, setTargetCell] = useState<number | null>(null);
  const [targetType, setTargetType] = useState<TargetType>("expired");
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [combo, setCombo] = useState(0);
  const [claimedThisRun, setClaimedThisRun] = useState(false);

  const impactPoints = Math.max(0, Math.floor(score / 5));

  const accuracy = useMemo(() => {
    const total = hits + misses;
    if (total === 0) {
      return 0;
    }
    return Math.round((hits / total) * 100);
  }, [hits, misses]);

  useEffect(() => {
    const storedBest = Number(localStorage.getItem(BEST_SCORE_KEY) || "0");
    if (!Number.isNaN(storedBest)) {
      setBestScore(storedBest);
    }
  }, []);

  const startGame = () => {
    setIsPlaying(true);
    setTimeLeft(DIFFICULTY[difficulty].seconds);
    setScore(0);
    setHits(0);
    setMisses(0);
    setCombo(0);
    setClaimedThisRun(false);
    setTargetCell(randomCell());
    setTargetType(randomTargetType(difficulty));
  };

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const countdown = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(countdown);
          setIsPlaying(false);
          setTargetCell(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(countdown);
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const tick = window.setInterval(() => {
      setTargetCell(randomCell());
      setTargetType(randomTargetType(difficulty));
    }, DIFFICULTY[difficulty].tickMs);

    return () => window.clearInterval(tick);
  }, [difficulty, isPlaying]);

  useEffect(() => {
    if (!isPlaying && timeLeft === 0) {
      setBestScore((prev) => {
        const next = score > prev ? score : prev;
        localStorage.setItem(BEST_SCORE_KEY, String(next));
        return next;
      });
    }
  }, [isPlaying, score, timeLeft]);

  const handleCellClick = (index: number) => {
    if (!isPlaying) {
      return;
    }

    if (targetCell !== index) {
      setMisses((prev) => prev + 1);
      setCombo(0);
      setScore((prev) => Math.max(0, prev - 2));
      return;
    }

    if (targetType === "expired") {
      const bonus = Math.min(12, combo * 2);
      setScore((prev) => prev + 10 + bonus);
      setHits((prev) => prev + 1);
      setCombo((prev) => prev + 1);
    } else {
      setScore((prev) => Math.max(0, prev - 8));
      setMisses((prev) => prev + 1);
      setCombo(0);
    }

    setTargetCell(randomCell());
    setTargetType(randomTargetType(difficulty));
  };

  const claimRewards = () => {
    if (impactPoints <= 0 || claimedThisRun) {
      return;
    }

    const current = Number(localStorage.getItem(PENDING_POINTS_KEY) || "0");
    const next = Number.isNaN(current) ? impactPoints : current + impactPoints;
    localStorage.setItem(PENDING_POINTS_KEY, String(next));
    setClaimedThisRun(true);
  };

  return (
    <div className="min-h-screen pt-16">
      <section className="section-padding">
        <div className="container-tight">
          <ScrollReveal>
            <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">
              Play the <span className="glow-text">AMR Defender</span>
            </h1>
            <p className="text-muted-foreground mb-8">
              Tap expired antibiotics quickly, avoid safe medicine, and convert your score into reward points for disposal missions.
            </p>
          </ScrollReveal>

          <div className="grid lg:grid-cols-[1fr_320px] gap-5">
            <ScrollReveal>
              <div className="glass-card p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {(Object.keys(DIFFICULTY) as DifficultyKey[]).map((key) => (
                    <button
                      key={key}
                      onClick={() => {
                        if (!isPlaying) {
                          setDifficulty(key);
                          setTimeLeft(DIFFICULTY[key].seconds);
                        }
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        difficulty === key ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                      } ${isPlaying ? "opacity-60 cursor-not-allowed" : ""}`}
                      disabled={isPlaying}
                    >
                      {DIFFICULTY[key].label}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {Array.from({ length: GRID_SIZE }).map((_, i) => {
                    const isActive = i === targetCell;
                    const isExpired = targetType === "expired";
                    return (
                      <button
                        key={i}
                        onClick={() => handleCellClick(i)}
                        className="aspect-square rounded-2xl bg-secondary border border-border/60 flex items-center justify-center relative overflow-hidden transition-transform active:scale-95"
                        disabled={!isPlaying}
                        aria-label={`Game cell ${i + 1}`}
                      >
                        {isActive ? (
                          <div
                            className={`w-14 h-14 rounded-full flex items-center justify-center ${
                              isExpired ? "bg-destructive/20 text-destructive" : "bg-emerald-500/20 text-emerald-500"
                            }`}
                          >
                            {isExpired ? <Biohazard className="w-7 h-7" /> : <Pill className="w-7 h-7" />}
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-full border border-dashed border-border/60" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="glass-card p-5 sm:p-6 space-y-4 h-full">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-secondary p-3">
                    <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                      <Clock3 className="w-3.5 h-3.5" />
                      Time
                    </div>
                    <p className="font-display text-2xl font-bold">{timeLeft}s</p>
                  </div>
                  <div className="rounded-xl bg-secondary p-3">
                    <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                      <Target className="w-3.5 h-3.5" />
                      Score
                    </div>
                    <p className="font-display text-2xl font-bold glow-text">{score}</p>
                  </div>
                  <div className="rounded-xl bg-secondary p-3">
                    <div className="text-xs text-muted-foreground mb-1">Best</div>
                    <p className="font-display text-xl font-bold">{bestScore}</p>
                  </div>
                  <div className="rounded-xl bg-secondary p-3">
                    <div className="text-xs text-muted-foreground mb-1">Accuracy</div>
                    <p className="font-display text-xl font-bold">{accuracy}%</p>
                  </div>
                  <div className="rounded-xl bg-secondary p-3">
                    <div className="text-xs text-muted-foreground mb-1">Combo</div>
                    <p className="font-display text-xl font-bold">x{combo}</p>
                  </div>
                  <div className="rounded-xl bg-secondary p-3">
                    <div className="text-xs text-muted-foreground mb-1">Reward</div>
                    <p className="font-display text-xl font-bold text-primary">+{impactPoints}</p>
                  </div>
                </div>

                <div className="rounded-xl bg-secondary p-3 text-xs space-y-1">
                  <p className="font-semibold text-sm flex items-center gap-1 mb-2"><ShieldCheck className="w-4 h-4 text-primary" /> Rules</p>
                  <p>Hit biohazard icon: <span className="text-primary font-semibold">+10 + combo bonus</span></p>
                  <p>Hit normal pill: <span className="text-destructive font-semibold">-8</span></p>
                  <p>Tap wrong cell: <span className="text-destructive font-semibold">-2</span></p>
                </div>

                {!isPlaying && timeLeft === 0 && (
                  <div className="rounded-xl border border-primary/30 bg-primary/5 p-3 text-sm">
                    <p className="font-semibold inline-flex items-center gap-1 mb-1"><Trophy className="w-4 h-4 text-primary" /> Run complete</p>
                    <p className="text-muted-foreground text-xs mb-3">Score {score}, accuracy {accuracy}%. Claim your reward points to dashboard.</p>
                    <button
                      onClick={claimRewards}
                      disabled={claimedThisRun || impactPoints <= 0}
                      className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold disabled:opacity-50"
                    >
                      {claimedThisRun ? "Reward Claimed" : `Claim +${impactPoints} points`}
                    </button>
                  </div>
                )}

                <div className="rounded-xl bg-secondary p-3 text-xs">
                  <p className="font-semibold text-sm inline-flex items-center gap-1 mb-1"><Brain className="w-4 h-4 text-primary" /> AMR Fact</p>
                  <p className="text-muted-foreground">Unused antibiotics discarded in regular trash can increase resistance pressure in soil and water ecosystems.</p>
                </div>

                {isPlaying ? (
                  <button
                    onClick={startGame}
                    className="w-full px-4 py-2.5 rounded-xl bg-secondary text-secondary-foreground font-semibold text-sm transition-transform active:scale-[0.97] inline-flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Restart
                  </button>
                ) : (
                  <button
                    onClick={startGame}
                    className="w-full px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm transition-transform active:scale-[0.97] inline-flex items-center justify-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    {timeLeft === 0 ? "Play Again" : "Start Game"}
                  </button>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GamePage;
