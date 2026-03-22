import { ScrollReveal } from "@/components/ScrollReveal";
import { missions } from "@/lib/impact";
import { Trophy, Users } from "lucide-react";

const Missions = () => {
  return (
    <div className="min-h-screen pt-16">
      <section className="section-padding">
        <div className="container-tight">
          <ScrollReveal>
            <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">Community Missions</h1>
            <p className="text-muted-foreground mb-8">Neighborhood leagues and city-wide challenges to drive verified safe disposal.</p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-4">
            {missions.map((mission, index) => {
              const progressPercent = Math.min(100, Math.round((mission.progress / mission.target) * 100));
              return (
                <ScrollReveal key={mission.id} delay={index * 0.08}>
                  <div className="glass-card p-6 h-full">
                    <div className="flex items-center gap-2 text-primary mb-3">
                      <Trophy className="w-4 h-4" />
                      <span className="text-xs font-semibold uppercase tracking-[0.08em]">{mission.region}</span>
                    </div>
                    <h3 className="font-display text-lg font-semibold mb-2">{mission.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">Reward: {mission.reward}</p>
                    <div className="h-2.5 rounded-full bg-secondary overflow-hidden mb-2">
                      <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent" style={{ width: `${progressPercent}%` }} />
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{mission.progress}/{mission.target} disposals</span>
                      <span>{progressPercent}%</span>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          <ScrollReveal>
            <div className="glass-card p-6 mt-6 flex items-center gap-3">
              <Users className="w-5 h-5 text-primary" />
              <p className="text-sm text-muted-foreground">League scoring updates every 24 hours based on verified disposal events.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Missions;
