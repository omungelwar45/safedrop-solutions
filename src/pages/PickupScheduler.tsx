import { FormEvent, useState } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Truck, CheckCircle2 } from "lucide-react";

const PickupScheduler = () => {
  const [submitted, setSubmitted] = useState(false);

  const submitPickup = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-16">
      <section className="section-padding">
        <div className="container-tight max-w-3xl">
          <ScrollReveal>
            <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">Pickup Scheduler</h1>
            <p className="text-muted-foreground mb-8">Request reverse-logistics pickup for households with limited mobility or remote access.</p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="glass-card p-6">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  </div>
                  <h2 className="font-display text-xl font-bold mb-2">Pickup Requested</h2>
                  <p className="text-sm text-muted-foreground">Your route was sent to the logistics team. You will receive ETA confirmation shortly.</p>
                </div>
              ) : (
                <form className="space-y-3" onSubmit={submitPickup}>
                  <input required placeholder="Full Name" className="w-full px-3 py-2.5 rounded-xl bg-secondary border border-border/50 text-sm" />
                  <input required placeholder="Phone Number" className="w-full px-3 py-2.5 rounded-xl bg-secondary border border-border/50 text-sm" />
                  <input required placeholder="Pickup Address" className="w-full px-3 py-2.5 rounded-xl bg-secondary border border-border/50 text-sm" />
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input required type="date" className="w-full px-3 py-2.5 rounded-xl bg-secondary border border-border/50 text-sm" />
                    <input required type="time" className="w-full px-3 py-2.5 rounded-xl bg-secondary border border-border/50 text-sm" />
                  </div>
                  <textarea placeholder="Medicine notes (optional)" className="w-full px-3 py-2.5 rounded-xl bg-secondary border border-border/50 text-sm min-h-24" />

                  <button type="submit" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm">
                    <Truck className="w-4 h-4" />
                    Confirm Pickup Request
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default PickupScheduler;
