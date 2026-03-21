import { Link } from "react-router-dom";
import { ScrollReveal } from "../components/ScrollReveal";
import { MapPin, Shield, Award, ArrowRight, Pill, AlertTriangle, Recycle, Users } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
        </div>
        <div className="container-tight relative">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 glow-border text-primary text-xs font-medium mb-8">
                <Shield className="w-3.5 h-3.5" />
                Fighting Antimicrobial Resistance
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-6">
                Dispose Smart.{" "}
                <span className="glow-text">Protect Lives.</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                Safely dispose of unused antibiotics, earn rewards, and join the fight against antimicrobial resistance — one pill at a time.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to="/map"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-200 active:scale-[0.97]"
                >
                  <MapPin className="w-4 h-4" />
                  Find Disposal Point
                </Link>
                <Link
                  to="/awareness"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary text-secondary-foreground font-semibold text-sm hover:bg-secondary/80 transition-all duration-200 active:scale-[0.97]"
                >
                  Learn About AMR
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding-sm">
        <div className="container-tight">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Antibiotics wasted yearly", value: "73B+", icon: Pill },
              { label: "Drug-resistant deaths/yr", value: "1.27M", icon: AlertTriangle },
              { label: "Disposal points mapped", value: "2,400+", icon: MapPin },
              { label: "Active community members", value: "18K+", icon: Users },
            ].map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.08}>
                <div className="glass-card p-5 sm:p-6 text-center">
                  <stat.icon className="w-5 h-5 text-primary mx-auto mb-3" />
                  <div className="font-display text-2xl sm:text-3xl font-bold glow-text mb-1">{stat.value}</div>
                  <div className="text-muted-foreground text-xs sm:text-sm">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* What is AMR */}
      <section className="section-padding">
        <div className="container-tight">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">
                What is <span className="glow-text">Antimicrobial Resistance?</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                When antibiotics are improperly discarded, they enter water supplies and soil, accelerating the evolution of drug-resistant superbugs that threaten modern medicine.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: Pill, title: "Unused Antibiotics", desc: "Millions of antibiotic doses go unused every year, creating a ticking time bomb if not disposed of properly." },
              { icon: AlertTriangle, title: "Superbugs Emerge", desc: "Antibiotics in landfills and waterways help bacteria develop resistance, making infections harder to treat." },
              { icon: Recycle, title: "Safe Disposal Helps", desc: "Proper disposal prevents environmental contamination and slows the spread of antimicrobial resistance." },
            ].map((card, i) => (
              <ScrollReveal key={card.title} delay={i * 0.1}>
                <div className="glass-card p-6 sm:p-8 h-full group hover:border-primary/30 transition-colors duration-300">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                    <card.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">{card.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{card.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="section-padding-sm">
        <div className="container-tight">
          <ScrollReveal>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-center mb-12">
              How <span className="glow-text">MediSafe</span> Works
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { step: "01", title: "Find a Point", desc: "Use our map to find the nearest safe disposal location.", icon: MapPin },
              { step: "02", title: "Dispose Safely", desc: "Drop off your unused or expired antibiotics.", icon: Recycle },
              { step: "03", title: "Upload Proof", desc: "Take a photo and upload your disposal proof.", icon: Shield },
              { step: "04", title: "Earn Rewards", desc: "Get points, badges, and climb the leaderboard.", icon: Award },
            ].map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 0.1}>
                <div className="glass-card p-6 relative overflow-hidden group hover:border-primary/30 transition-colors duration-300">
                  <span className="absolute -top-2 -right-2 font-display text-6xl font-bold text-primary/5 group-hover:text-primary/10 transition-colors select-none">
                    {item.step}
                  </span>
                  <item.icon className="w-5 h-5 text-primary mb-4" />
                  <h3 className="font-display font-semibold mb-1.5">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-tight">
          <ScrollReveal>
            <div className="glass-card glow-border p-8 sm:p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none" />
              <div className="relative">
                <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">
                  Ready to make a difference?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                  Join thousands of responsible citizens fighting antimicrobial resistance through safe antibiotic disposal.
                </p>
                <Link
                  to="/map"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-200 active:scale-[0.97]"
                >
                  <MapPin className="w-4 h-4" />
                  Start Disposing Safely
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container-tight px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span className="font-display font-semibold text-foreground">MediSafe</span>
          <span>© 2026 MediSafe. Fighting AMR together.</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
