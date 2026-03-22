import { useState } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { redemptionCatalog } from "@/lib/impact";
import { Gift } from "lucide-react";

const Marketplace = () => {
  const [points, setPoints] = useState(240);

  const redeem = (cost: number) => {
    if (points >= cost) {
      setPoints((current) => current - cost);
    }
  };

  return (
    <div className="min-h-screen pt-16">
      <section className="section-padding">
        <div className="container-tight">
          <ScrollReveal>
            <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">Incentive Marketplace</h1>
            <p className="text-muted-foreground mb-8">Redeem verified disposal points for health benefits and sponsor-backed rewards.</p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="glass-card p-5 mb-6">
              <p className="text-xs uppercase tracking-[0.08em] text-muted-foreground">Available Points</p>
              <p className="font-display text-3xl font-bold text-primary">{points}</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-4">
            {redemptionCatalog.map((item, index) => (
              <ScrollReveal key={item.id} delay={index * 0.08}>
                <div className="glass-card p-5 h-full flex flex-col">
                  <Gift className="w-5 h-5 text-primary mb-3" />
                  <h3 className="font-display font-semibold text-lg">{item.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 mb-4">Sponsor: {item.sponsor}</p>
                  <p className="text-sm font-semibold mb-4">{item.points} points</p>
                  <button
                    onClick={() => redeem(item.points)}
                    disabled={points < item.points}
                    className="mt-auto px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold disabled:opacity-50"
                  >
                    Redeem
                  </button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Marketplace;
