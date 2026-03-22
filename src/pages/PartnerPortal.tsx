import { ScrollReveal } from "@/components/ScrollReveal";
import { partnerMetrics } from "@/lib/impact";
import { AlertTriangle, ClipboardCheck, Package, Truck } from "lucide-react";

const pickupQueue = [
  { site: "Apollo Pharmacy - MG Road", bins: "2/5 full", nextPickup: "Today 6:30 PM", status: "On track" },
  { site: "City Hospital Collection", bins: "4/5 full", nextPickup: "Today 4:00 PM", status: "Priority" },
  { site: "Green Disposal Center", bins: "3/5 full", nextPickup: "Tomorrow 9:00 AM", status: "On track" },
];

const PartnerPortal = () => {
  return (
    <div className="min-h-screen pt-16">
      <section className="section-padding">
        <div className="container-tight">
          <ScrollReveal>
            <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">Partner Operations Portal</h1>
            <p className="text-muted-foreground mb-8">Real-time intake monitoring, pickup planning, and compliance-ready operational visibility.</p>
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Intake Today", value: partnerMetrics.intakeToday, icon: ClipboardCheck },
              { label: "Pending Pickups", value: partnerMetrics.pendingPickups, icon: Truck },
              { label: "Missed SLA", value: partnerMetrics.missedSla, icon: AlertTriangle },
              { label: "Avg Fill Level", value: `${partnerMetrics.fillLevelAvg}%`, icon: Package },
            ].map((item) => (
              <ScrollReveal key={item.label}>
                <div className="glass-card p-5">
                  <item.icon className="w-5 h-5 text-primary mb-2" />
                  <p className="font-display text-2xl font-bold">{item.value}</p>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="glass-card p-6">
              <h2 className="font-display font-semibold mb-4">Pickup Queue</h2>
              <div className="space-y-3">
                {pickupQueue.map((row) => (
                  <div key={row.site} className="rounded-xl border border-border/60 bg-background/70 p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold">{row.site}</p>
                      <p className="text-xs text-muted-foreground">{row.bins} • {row.nextPickup}</p>
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-md ${row.status === "Priority" ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"}`}>
                      {row.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default PartnerPortal;
