import { ScrollReveal } from "@/components/ScrollReveal";
import { Download, FileSpreadsheet, ShieldCheck } from "lucide-react";

const complianceRows = [
  { metric: "Verified disposal events", value: "2,842" },
  { metric: "Traceable chain tokens", value: "2,842" },
  { metric: "SLA met pickups", value: "96.8%" },
  { metric: "Policy exceptions", value: "7" },
];

const Compliance = () => {
  return (
    <div className="min-h-screen pt-16">
      <section className="section-padding">
        <div className="container-tight max-w-4xl">
          <ScrollReveal>
            <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">Compliance Center</h1>
            <p className="text-muted-foreground mb-8">Generate municipal and biomedical disposal reports with audit-ready traceability.</p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <ScrollReveal>
              <div className="glass-card p-5">
                <ShieldCheck className="w-5 h-5 text-primary mb-2" />
                <p className="font-display text-2xl font-bold">Q1 2026</p>
                <p className="text-xs text-muted-foreground">Current reporting window</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.06}>
              <div className="glass-card p-5">
                <FileSpreadsheet className="w-5 h-5 text-primary mb-2" />
                <p className="font-display text-2xl font-bold">CSV + PDF</p>
                <p className="text-xs text-muted-foreground">Export formats supported</p>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <div className="glass-card p-6">
              <h2 className="font-display font-semibold mb-4">Report Snapshot</h2>
              <div className="space-y-2 mb-5">
                {complianceRows.map((row) => (
                  <div key={row.metric} className="flex items-center justify-between text-sm border-b border-border/50 pb-2">
                    <span className="text-muted-foreground">{row.metric}</span>
                    <span className="font-semibold">{row.value}</span>
                  </div>
                ))}
              </div>

              <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold">
                <Download className="w-4 h-4" />
                Export Compliance Pack
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Compliance;
