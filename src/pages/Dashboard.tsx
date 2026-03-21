import { useState } from "react";
import { ScrollReveal } from "../components/ScrollReveal";
import { Award, Flame, TrendingUp, Camera, CheckCircle2, Trophy, Star, Shield, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

  return (
    <div className="min-h-screen pt-16">
      <section className="section-padding">
        <div className="container-tight">
          <ScrollReveal>
            <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">
              Your <span className="glow-text">Dashboard</span>
            </h1>
            <p className="text-muted-foreground mb-8">Track your impact and earn rewards for safe disposal.</p>
          </ScrollReveal>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Medicines Disposed", value: "7", icon: CheckCircle2, sub: "+3 this week" },
              { label: "Total Points", value: "110", icon: TrendingUp, sub: "Level 2" },
              { label: "Badges Earned", value: "2/5", icon: Award, sub: "3 to go" },
              { label: "Current Streak", value: "3 days", icon: Flame, sub: "Best: 5 days" },
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
                <h3 className="font-display font-semibold mb-4">Upload Disposal Proof</h3>
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
                      <p className="font-semibold text-sm">Disposal verified! +10 points</p>
                      <button onClick={() => setUploaded(false)} className="text-xs text-primary mt-2 hover:underline">Upload another</button>
                    </motion.div>
                  ) : (
                    <motion.div key="upload" exit={{ opacity: 0 }}>
                      <button
                        onClick={() => { setShowUpload(true); setTimeout(() => { setShowUpload(false); setUploaded(true); }, 1500); }}
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
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
