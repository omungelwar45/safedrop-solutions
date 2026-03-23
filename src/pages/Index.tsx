import { Link } from "react-router-dom";
import { ScrollReveal } from "../components/ScrollReveal";
import { MapPin, Shield, Award, ArrowRight, Pill, AlertTriangle, Recycle, Users, HeartPulse } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  const avatarPhotos = [
    "https://images.unsplash.com/photo-1614436163996-25cee5f54290?auto=format&fit=crop&w=120&q=80",
    "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=300",
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=120&q=80",
  ];

  const heroImages = {
    team: "https://images.pexels.com/photos/8460099/pexels-photo-8460099.jpeg?auto=compress&cs=tinysrgb&w=1200",
  };

  return (
    <div className="min-h-screen pt-16 landing-atmosphere">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 lg:pt-12 pb-8 sm:pb-10 lg:pb-14 min-h-[calc(100svh-4rem)] lg:min-h-[calc(100svh-4rem)] flex items-center">
        <div className="container-tight relative">
          <div className="clinic-hero-shell p-6 sm:p-8 lg:p-10">
            <div className="clinic-fade-panel" />
            <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-6 lg:gap-8 items-center relative z-[1]">
              <div>
                <ScrollReveal>
                  <p className="font-display text-white text-4xl sm:text-5xl leading-none tracking-tight mb-4">MediSafe</p>
                </ScrollReveal>

                <ScrollReveal>
                  <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#2b5f8d] text-white text-xs font-semibold tracking-[0.1em] mb-6 shadow-md">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2f8cff]" />
                    NEW UPDATE
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.08}>
                  <h1 className="font-display text-white text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.05] tracking-tight mb-6 max-w-2xl">
                    Your Partner in<span className="block text-[#dff0ff]">Medicine Safety and Wellness</span>
                  </h1>
                </ScrollReveal>

                <ScrollReveal delay={0.14}>
                  <p className="text-white/85 text-base sm:text-lg lg:text-xl max-w-2xl mb-8 leading-relaxed">
                    MediSafe helps families and communities return unused antibiotics safely, preventing pollution and slowing antimicrobial resistance through one smart platform.
                  </p>
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                  <div className="flex flex-wrap items-center gap-4">
                    <Link
                      to="/map"
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-[#15518a] font-semibold text-base hover:bg-white/90 transition-colors"
                    >
                      <MapPin className="w-5 h-5" />
                      Find Disposal Point
                    </Link>
                    <Link
                      to="/awareness"
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/35 bg-white/10 text-white font-semibold text-base hover:bg-white/15 transition-colors"
                    >
                      See How It Works
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </ScrollReveal>
              </div>

              <ScrollReveal delay={0.2} direction="right">
                <div className="relative min-h-[380px] sm:min-h-[480px] lg:min-h-[540px] xl:min-h-[620px] lg:pr-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.8 }}
                    className="clinic-panel absolute left-0 right-12 top-8 p-5 sm:p-6 lg:p-7"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2 text-[#245f93]">
                        <Shield className="w-5 h-5" />
                        <span className="text-base font-semibold">MediSafe</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#245f93]">
                        <MapPin className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="font-display text-[#183f67] text-xl sm:text-[1.85rem] font-bold max-w-md mb-3 leading-tight">
                      Dispose Right. Keep Antibiotics Effective.
                    </h3>
                    <p className="text-[#2f658f] text-sm sm:text-[15px] max-w-md mb-4">
                      Build healthier neighborhoods by dropping expired antibiotics at safe centers and tracking your impact.
                    </p>

                    <div className="grid grid-cols-3 gap-3 bg-white/70 rounded-2xl p-3 border border-white/70">
                      {[
                        { label: "Date", value: "March 2026" },
                        { label: "Focus", value: "AMR Safety" },
                        { label: "Region", value: "Your City" },
                      ].map((item) => (
                        <div key={item.label} className="rounded-xl bg-white p-2.5">
                          <p className="text-[12px] text-[#4c7498]">{item.label}</p>
                          <p className="text-[12px] font-semibold text-[#1f4c77]">{item.value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 relative h-[160px] sm:h-[200px]">
                      <div className="absolute left-0 bottom-3 rounded-2xl bg-white/85 border border-white/80 p-3 shadow-md">
                        <div className="flex items-center">
                          {avatarPhotos.map((photo, i) => (
                            <img
                              key={photo}
                              src={photo}
                              alt="Medical professional"
                              className={`w-9 h-9 rounded-full object-cover border-2 border-white ${i > 0 ? "-ml-3" : ""}`}
                              loading="lazy"
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = "/placeholder.svg";
                              }}
                            />
                          ))}
                        </div>
                        <p className="text-[12px] mt-2 text-[#326892]">150K+ Patient Recovery</p>
                      </div>

                      <div className="absolute right-0 bottom-0 w-[74%] h-full clinic-photo-cutout">
                        <img
                          src={heroImages.team}
                          alt="Doctors team"
                          className="w-full h-full object-cover object-center"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "/placeholder.svg";
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="clinic-mobile-card absolute right-0 top-0 w-[200px] sm:w-[220px] p-4"
                  >
                    <div className="flex items-center justify-between text-[#245f93] mb-4">
                      <span className="text-xs font-semibold">MediSafe</span>
                      <MapPin className="w-4 h-4" />
                    </div>
                    <h4 className="font-display text-[#183f67] text-[1.35rem] sm:text-[1.5rem] leading-[1.05] mb-2">Your Community Safety Feed</h4>
                    <p className="text-[13px] sm:text-[14px] text-[#3b668d] mb-3">Live proof-based updates from disposal points near you.</p>
                    <div className="rounded-xl bg-white p-3 text-sm text-[#26537b]">
                      <p className="font-semibold">870+ collection partners</p>
                      <p className="text-[#4f7597] mt-1">150K+ safe returns recorded</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.7, delay: 0.32 }}
                    className="absolute right-2 sm:right-4 bottom-3 glass-card p-3 sm:p-3.5 w-[200px] sm:w-[220px] bg-white/80"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={avatarPhotos[0]}
                        alt="Medical advisor"
                        className="w-12 h-12 rounded-full object-cover border-2 border-white"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/placeholder.svg";
                        }}
                      />
                      <div>
                        <p className="text-sm sm:text-base font-semibold text-[#1b4972]">150K+ Patient Recovery</p>
                        <p className="text-[12px] sm:text-xs text-[#53799c]">Top Rated Medical Partner</p>
                      </div>
                    </div>
                  </motion.div>

                  <div className="absolute left-1 sm:-left-2 top-2 sm:top-4 rounded-2xl bg-white text-[#1f4f7b] px-4 py-2 shadow-lg text-xs sm:text-base font-semibold">
                    <span className="inline-flex items-center gap-2">
                      <Shield className="w-5 h-5 text-[#2f8cff]" />
                      No.1 Safe Disposal Network
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
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
