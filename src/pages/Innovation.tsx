import { FormEvent, useMemo, useState } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useAuth } from "@/components/AuthProvider";
import {
  addPrescriptionSync,
  getBadgeProgress,
  getImpactMetrics,
  getImpactSeries,
  getLeaderboard,
  getRecentScans,
  getSyncedPrescriptions,
  recordMedicineScan,
} from "@/lib/hackathonFeatures";
import { BellRing, Camera, Medal, Pill, QrCode, Sparkles, Trophy, Users, Waves } from "lucide-react";

const barcodeMedicineMap: Record<string, string> = {
  "8901234567890": "Amoxicillin 500mg",
  "8901234500001": "Azithromycin 250mg",
  "8901234500002": "Cefixime 200mg",
  "8901234500003": "Doxycycline 100mg",
};

const barMax = (values: number[]) => Math.max(1, ...values);

const Innovation = () => {
  const { user } = useAuth();
  const [barcode, setBarcode] = useState("");
  const [manualName, setManualName] = useState("");
  const [scanMessage, setScanMessage] = useState("");
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);
  const [medicineName, setMedicineName] = useState("");
  const [dose, setDose] = useState("");
  const [daysSupply, setDaysSupply] = useState(30);
  const [syncMessage, setSyncMessage] = useState("");
  const [refreshToken, setRefreshToken] = useState(0);

  const refresh = () => setRefreshToken((current) => current + 1);

  const metrics = useMemo(() => getImpactMetrics(), [refreshToken]);
  const series = useMemo(() => getImpactSeries(), [refreshToken]);
  const badgeProgress = useMemo(() => getBadgeProgress(), [refreshToken]);
  const leaderboard = useMemo(() => getLeaderboard(user?.name || "You"), [refreshToken, user?.name]);
  const scans = useMemo(() => getRecentScans(), [refreshToken]);
  const syncedPrescriptions = useMemo(() => getSyncedPrescriptions(), [refreshToken]);

  const analyzeScan = (source: "camera" | "manual") => {
    const mappedName = barcodeMedicineMap[barcode.trim()] || "";
    const nextName = (mappedName || manualName).trim();

    if (!nextName) {
      setScanMessage("Enter a known barcode or medicine name before scanning.");
      return;
    }

    const result = recordMedicineScan({
      medicineName: nextName,
      barcode: barcode.trim(),
      source,
    });

    setScanMessage(`${nextName} verified for safe disposal. +${result.pointsAwarded} impact points.`);
    setBarcode("");
    setManualName("");
    refresh();
  };

  const handleSyncPrescription = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!medicineName.trim() || !dose.trim() || daysSupply <= 0 || !startDate) {
      setSyncMessage("Please fill all prescription fields.");
      return;
    }

    addPrescriptionSync({
      medicineName: medicineName.trim(),
      dose: dose.trim(),
      daysSupply,
      startDate,
    });

    setSyncMessage(`${medicineName} synced. Reminder and refill tracking are active.`);
    setMedicineName("");
    setDose("");
    setDaysSupply(30);
    refresh();
  };

  const maxBar = barMax(series.map((point) => point.value));

  return (
    <div className="min-h-screen pt-16">
      <section className="section-padding">
        <div className="container-tight">
          <ScrollReveal>
            <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">Innovation Hub</h1>
            <p className="text-muted-foreground mb-8">Fully working hackathon features: scanner, impact visualizer, badges, leaderboard, and prescription sync.</p>
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-7">
            {[
              { label: "Verified Disposals", value: String(metrics.disposals), icon: Pill },
              { label: "Impact Points", value: String(metrics.points), icon: Sparkles },
              { label: "Badges Earned", value: `${badgeProgress.earnedCount}/5`, icon: Medal },
              { label: "Water Protected", value: `${metrics.waterProtectedLiters}L`, icon: Waves },
              { label: "Risk Events Avoided", value: String(metrics.riskEventsAvoided), icon: BellRing },
            ].map((item) => (
              <ScrollReveal key={item.label}>
                <div className="glass-card p-5">
                  <item.icon className="w-5 h-5 text-primary mb-2" />
                  <p className="font-display text-2xl font-bold glow-text">{item.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-5 mb-7">
            <ScrollReveal>
              <div className="glass-card p-6">
                <h2 className="font-display text-xl font-semibold mb-1 inline-flex items-center gap-2"><Camera className="w-5 h-5 text-primary" /> Medicine Scanner</h2>
                <p className="text-sm text-muted-foreground mb-4">Scan barcode or enter medicine name to verify disposal and add impact points.</p>

                <div className="space-y-3">
                  <input
                    value={barcode}
                    onChange={(event) => setBarcode(event.target.value)}
                    placeholder="Barcode (try 8901234567890)"
                    className="w-full px-3 py-2.5 rounded-xl bg-secondary border border-border/60 text-sm"
                  />
                  <input
                    value={manualName}
                    onChange={(event) => setManualName(event.target.value)}
                    placeholder="Medicine name (fallback)"
                    className="w-full px-3 py-2.5 rounded-xl bg-secondary border border-border/60 text-sm"
                  />
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => analyzeScan("camera")}
                      className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold inline-flex items-center gap-2"
                    >
                      <Camera className="w-4 h-4" />
                      Analyze with Camera
                    </button>
                    <button
                      onClick={() => analyzeScan("manual")}
                      className="px-4 py-2 rounded-xl bg-secondary text-secondary-foreground text-sm font-semibold inline-flex items-center gap-2"
                    >
                      <QrCode className="w-4 h-4" />
                      Manual Verify
                    </button>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground mt-4">{scanMessage || "No scans yet in this session."}</p>

                <div className="mt-4 space-y-2">
                  {scans.length === 0 ? (
                    <p className="text-xs text-muted-foreground">Recent scans will appear here.</p>
                  ) : (
                    scans.map((scan) => (
                      <div key={scan.id} className="rounded-xl bg-secondary p-3 text-xs flex items-center justify-between gap-2">
                        <span>{scan.medicineName}</span>
                        <span className="text-muted-foreground uppercase">{scan.source}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <div className="glass-card p-6">
                <h2 className="font-display text-xl font-semibold mb-1 inline-flex items-center gap-2"><Waves className="w-5 h-5 text-primary" /> Impact Visualizer</h2>
                <p className="text-sm text-muted-foreground mb-4">Monthly disposal trend from verified scans and pickups.</p>

                <div className="rounded-2xl bg-secondary/70 p-4">
                  <div className="h-44 flex items-end gap-2">
                    {series.map((point) => {
                      const height = Math.max(8, Math.round((point.value / maxBar) * 100));
                      return (
                        <div key={point.key} className="flex-1 flex flex-col items-center gap-2">
                          <div className="w-full rounded-t-lg bg-gradient-to-t from-primary to-accent" style={{ height: `${height}%` }} />
                          <p className="text-[11px] text-muted-foreground">{point.label}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="rounded-xl bg-secondary p-3">
                    <p className="text-xs text-muted-foreground">Households Reached</p>
                    <p className="font-display text-xl font-bold">{metrics.householdsReached}</p>
                  </div>
                  <div className="rounded-xl bg-secondary p-3">
                    <p className="text-xs text-muted-foreground">Disposal Velocity</p>
                    <p className="font-display text-xl font-bold">{Math.max(0, Math.round(metrics.disposals / 6))}/mo</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="grid lg:grid-cols-2 gap-5 mb-7">
            <ScrollReveal>
              <div className="glass-card p-6">
                <h2 className="font-display text-xl font-semibold mb-1 inline-flex items-center gap-2"><BellRing className="w-5 h-5 text-primary" /> Prescription Sync</h2>
                <p className="text-sm text-muted-foreground mb-4">Mock pharmacy sync that creates refill and disposal reminders automatically.</p>

                <form onSubmit={handleSyncPrescription} className="space-y-3">
                  <input
                    value={medicineName}
                    onChange={(event) => setMedicineName(event.target.value)}
                    placeholder="Medicine name"
                    className="w-full px-3 py-2.5 rounded-xl bg-secondary border border-border/60 text-sm"
                  />
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input
                      value={dose}
                      onChange={(event) => setDose(event.target.value)}
                      placeholder="Dose (e.g. 500mg)"
                      className="w-full px-3 py-2.5 rounded-xl bg-secondary border border-border/60 text-sm"
                    />
                    <input
                      value={daysSupply}
                      onChange={(event) => setDaysSupply(Number(event.target.value) || 0)}
                      type="number"
                      min={1}
                      placeholder="Days supply"
                      className="w-full px-3 py-2.5 rounded-xl bg-secondary border border-border/60 text-sm"
                    />
                  </div>
                  <input
                    value={startDate}
                    onChange={(event) => setStartDate(event.target.value)}
                    type="date"
                    className="w-full px-3 py-2.5 rounded-xl bg-secondary border border-border/60 text-sm"
                  />

                  <button type="submit" className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold">Sync Prescription</button>
                </form>

                <p className="text-xs text-muted-foreground mt-4">{syncMessage || "Synced prescriptions will appear below."}</p>

                <div className="mt-4 space-y-2">
                  {syncedPrescriptions.length === 0 ? (
                    <p className="text-xs text-muted-foreground">No synced prescriptions yet.</p>
                  ) : (
                    syncedPrescriptions.map((item) => (
                      <div key={item.id} className="rounded-xl bg-secondary p-3 text-xs">
                        <p className="font-semibold">{item.medicineName} • {item.dose}</p>
                        <p className="text-muted-foreground mt-1">Refill + disposal check on {item.expectedRefillDate}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <div className="glass-card p-6">
                <h2 className="font-display text-xl font-semibold mb-3 inline-flex items-center gap-2"><Medal className="w-5 h-5 text-primary" /> Badge System</h2>
                <div className="space-y-3">
                  {badgeProgress.badges.map((badge) => (
                    <div key={badge.id} className="rounded-xl border border-border/70 bg-background/60 p-3 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold">{badge.title}</p>
                        <p className="text-xs text-muted-foreground">{badge.description}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${badge.earned ? "bg-primary/15 text-primary" : "bg-secondary text-muted-foreground"}`}>
                        {badge.earned ? "Earned" : "Locked"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <div className="glass-card p-6">
              <h2 className="font-display text-xl font-semibold mb-3 inline-flex items-center gap-2"><Trophy className="w-5 h-5 text-primary" /> Community Leaderboard</h2>
              <p className="text-sm text-muted-foreground mb-4 inline-flex items-center gap-1"><Users className="w-4 h-4" /> Rank is based on points + verified disposal activity.</p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-muted-foreground border-b border-border/60">
                      <th className="py-2 pr-2">Rank</th>
                      <th className="py-2 pr-2">Name</th>
                      <th className="py-2 pr-2">Score</th>
                      <th className="py-2">Disposals</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((entry) => (
                      <tr key={`${entry.name}-${entry.rank}`} className={`border-b border-border/40 ${entry.isUser ? "bg-primary/5" : ""}`}>
                        <td className="py-2 pr-2 font-semibold">#{entry.rank}</td>
                        <td className="py-2 pr-2">{entry.name}</td>
                        <td className="py-2 pr-2 text-primary font-semibold">{entry.score}</td>
                        <td className="py-2">{entry.disposals}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Innovation;