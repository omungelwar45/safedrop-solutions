import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ScrollReveal } from "../components/ScrollReveal";
import { Award, Flame, TrendingUp, Camera, CheckCircle2, Trophy, Star, Shield, Zap, QrCode, Brain, FileCheck2, BellRing, Truck, Gift, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { calculateImpactScore, createChainRecord, runProofVerification } from "@/lib/impact";

const PENDING_POINTS_KEY = "medisafe.game.pendingPoints";

const badges = [
  { name: "First Disposal", icon: Star, earned: true },
  { name: "Safe Medicine Champion", icon: Shield, earned: true },
  { name: "Streak Master", icon: Flame, earned: false },
  { name: "Community Leader", icon: Trophy, earned: false },
  { name: "Eco Warrior", icon: Zap, earned: false },
];

const recentActivity = [
  { date: "Mar 18", action: "Disposed 3 expired antibiotics", points: 30 },
  { date: "Mar 15", action: "Earned 'Safe Medicine Champion' badge", points: 50 },
  { date: "Mar 12", action: "Disposed 1 unused antibiotic", points: 10 },
  { date: "Mar 8", action: "First disposal completed!", points: 20 },
];

const Dashboard = () => {
  const [showUpload, setShowUpload] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [verification, setVerification] = useState<ReturnType<typeof runProofVerification> | null>(null);
  const [chainRecord, setChainRecord] = useState<ReturnType<typeof createChainRecord> | null>(null);
  const [pendingGamePoints, setPendingGamePoints] = useState(0);
  const [claimedBonus, setClaimedBonus] = useState(0);

  const totalPoints = 110 + claimedBonus;

  useEffect(() => {
    const pending = Number(localStorage.getItem(PENDING_POINTS_KEY) || "0");
    if (!Number.isNaN(pending)) {
      setPendingGamePoints(pending);
    }
  }, []);

  const impact = useMemo(
    () => calculateImpactScore({ disposals: 7, verifiedRate: verification ? verification.confidence / 100 : 0.85, streak: 3, missionCompletions: 2 }),
    [verification],
  );

  const claimGamePoints = () => {
    if (pendingGamePoints <= 0) {
      return;
    }
    setClaimedBonus((prev) => prev + pendingGamePoints);
    setPendingGamePoints(0);
    localStorage.setItem(PENDING_POINTS_KEY, "0");
  };

  const runVerification = () => {
    setShowUpload(true);
    setTimeout(() => {
      const verify = runProofVerification();
      const chain = createChainRecord("Apollo Pharmacy - MG Road");
      setVerification(verify);
      setChainRecord(chain);
      setShowUpload(false);
      setUploaded(true);
    }, 1300);
  };

  return (
    <div className="min-h-screen pt-16">
      <section className="section-padding">
        <div className="container-tight">
          <ScrollReveal>
            <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">
              Your <span className="glow-text">Dashboard</span>
            </h1>
            <p className="text-muted-foreground mb-8">Track your impact, verify disposal with AI checks, and manage traceable chain-of-custody records.</p>
          </ScrollReveal>

          {pendingGamePoints > 0 && (
            <ScrollReveal>
              <div className="glass-card p-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-primary/30">
                <p className="text-sm">You have <span className="font-semibold text-primary">+{pendingGamePoints} game points</span> ready to add from AMR Defender.</p>
                <button onClick={claimGamePoints} className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold">Claim Points</button>
              </div>
            </ScrollReveal>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {[
              { label: "Medicines Disposed", value: "7", icon: CheckCircle2, sub: "+3 this week" },
              { label: "Total Points", value: String(totalPoints), icon: TrendingUp, sub: "Level 2" },
              { label: "Badges Earned", value: "2/5", icon: Award, sub: "3 to go" },
              { label: "Current Streak", value: "3 days", icon: Flame, sub: "Best: 5 days" },
              { label: "Impact Score", value: `${impact.score}`, icon: Brain, sub: `Grade ${impact.grade}` },
            ].map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.08}>
                <div className="glass-card p-5">
                  <stat.icon className="w-5 h-5 text-primary mb-3" />
                  <div className="font-display text-2xl font-bold glow-text">{stat.value}</div>
                  <div className="text-sm font-medium mt-1">{stat.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{stat.sub}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Progress & Upload Row */}
          <div className="grid lg:grid-cols-2 gap-5 mb-8">
            <ScrollReveal>
              <div className="glass-card p-6">
                <h3 className="font-display font-semibold mb-4">Level Progress</h3>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Level 2</span>
                  <span className="text-primary font-medium">110 / 200 pts</span>
                </div>
                <div className="h-2.5 rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "55%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-3">90 points to Level 3 — unlock "Eco Warrior" badge</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="glass-card p-6">
                <h3 className="font-display font-semibold mb-4">Smart Proof Verification</h3>
                <AnimatePresence mode="wait">
                  {uploaded ? (
                    <motion.div
                      key="success"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex flex-col items-center py-4"
                    >
                      <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-3">
                        <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                      </div>
                      <p className="font-semibold text-sm">Disposal verified and scored!</p>
                      <p className="text-xs text-muted-foreground mt-1">AI confidence: {verification?.confidence}% • risk flag: {verification?.riskFlag}</p>
                      <button onClick={() => { setUploaded(false); setVerification(null); setChainRecord(null); }} className="text-xs text-primary mt-2 hover:underline">Upload another</button>
                    </motion.div>
                  ) : (
                    <motion.div key="upload" exit={{ opacity: 0 }}>
                      <button
                        onClick={runVerification}
                        className="w-full border-2 border-dashed border-border hover:border-primary/40 rounded-xl p-6 flex flex-col items-center gap-2 transition-colors group active:scale-[0.98]"
                      >
                        <Camera className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          {showUpload ? "Processing..." : "Tap to upload photo"}
                        </span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          </div>

          <div className="grid lg:grid-cols-2 gap-5 mb-8">
            <ScrollReveal>
              <div className="glass-card p-6">
                <h3 className="font-display font-semibold mb-4 inline-flex items-center gap-2"><QrCode className="w-4 h-4 text-primary" />Serialized Disposal Chain</h3>
                {chainRecord ? (
                  <div className="space-y-3 text-sm">
                    <div className="rounded-xl bg-secondary/70 p-3 border border-border/60">
                      <p className="text-xs text-muted-foreground">Chain Token</p>
                      <p className="font-semibold tracking-wide">{chainRecord.token}</p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Drop Point: {chainRecord.dropPoint}</span>
                      <span className="text-primary font-semibold uppercase">{chainRecord.status}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Updated: {chainRecord.updatedAt}</p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Upload proof to generate a traceable disposal token from citizen to final destruction.</p>
                )}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="glass-card p-6">
                <h3 className="font-display font-semibold mb-4 inline-flex items-center gap-2"><FileCheck2 className="w-4 h-4 text-primary" />Verification Checks</h3>
                <div className="space-y-2">
                  {(verification?.checks ?? [
                    { id: "placeholder-1", label: "Medicine label detected", passed: false, detail: "Waiting for upload" },
                    { id: "placeholder-2", label: "Expiry date parsed", passed: false, detail: "Waiting for upload" },
                    { id: "placeholder-3", label: "Location match", passed: false, detail: "Waiting for upload" },
                  ]).map((check) => (
                    <div key={check.id} className="rounded-xl border border-border/60 bg-background/70 p-3">
                      <p className="text-sm font-medium">{check.label}</p>
                      <p className="text-xs text-muted-foreground">{check.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Badges & Activity */}
          <div className="grid lg:grid-cols-2 gap-5">
            <ScrollReveal>
              <div className="glass-card p-6">
                <h3 className="font-display font-semibold mb-4">Badges</h3>
                <div className="grid grid-cols-5 gap-3">
                  {badges.map((badge) => (
                    <div key={badge.name} className="flex flex-col items-center text-center gap-1.5">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                        badge.earned ? "bg-primary/10 glow-border" : "bg-muted"
                      }`}>
                        <badge.icon className={`w-5 h-5 ${badge.earned ? "text-primary" : "text-muted-foreground/40"}`} />
                      </div>
                      <span className={`text-[10px] leading-tight ${badge.earned ? "font-medium" : "text-muted-foreground/50"}`}>
                        {badge.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="glass-card p-6">
                <h3 className="font-display font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {recentActivity.map((a, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <div>
                        <p className="font-medium text-sm">{a.action}</p>
                        <p className="text-xs text-muted-foreground">{a.date}</p>
                      </div>
                      <span className="text-primary font-semibold text-xs">+{a.points} pts</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {[
              { to: "/missions", label: "Community Missions", icon: Users },
              { to: "/partner", label: "Partner Portal", icon: Shield },
              { to: "/reminders", label: "Smart Reminders", icon: BellRing },
              { to: "/pickup", label: "Pickup Scheduler", icon: Truck },
              { to: "/compliance", label: "Compliance Center", icon: FileCheck2 },
              { to: "/marketplace", label: "Rewards Marketplace", icon: Gift },
            ].map((item) => (
              <ScrollReveal key={item.to}>
                <Link to={item.to} className="glass-card p-4 flex items-center gap-3 hover:border-primary/30 transition-colors">
                  <item.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
