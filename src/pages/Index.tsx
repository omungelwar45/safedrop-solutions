import { Link } from "react-router-dom";
import { ScrollReveal } from "../components/ScrollReveal";
import {
  Activity,
  ArrowRight,
  Award,
  Calendar,
  Beaker,
  BellRing,
  HeartPulse,
  MapPin,
  Menu,
  Pill,
  Recycle,
  Search,
  Shield,
  Stethoscope,
  Target,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  const heroImages = {
    team: "https://images.unsplash.com/photo-1612277795421-9bc7706a4a41?auto=format&fit=crop&w=1200&q=80",
    portrait: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=700&q=80",
    mobile: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80",
  };

  const avatarPhotos = [
    "https://images.unsplash.com/photo-1614436163996-25cee5f54290?auto=format&fit=crop&w=120&q=80",
    "https://images.unsplash.com/photo-1594824475544-3fa0f38d5fc7?auto=format&fit=crop&w=120&q=80",
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=120&q=80",
  ];

  const quickStats = [
    { label: "Unused antibiotic doses", value: "73B+", icon: Pill },
    { label: "Drug-resistant deaths each year", value: "1.27M", icon: Activity },
    { label: "Verified disposal points", value: "2,400+", icon: MapPin },
    { label: "Citizens in the movement", value: "18K+", icon: Users },
  ];

  const impactSteps = [
    {
      id: "01",
      title: "Locate a safe drop point",
      desc: "Open the disposal map and choose the closest verified collection center near you.",
      icon: MapPin,
    },
    {
      id: "02",
      title: "Drop expired antibiotics",
      desc: "Seal unused medicine and dispose through approved channels instead of sinks or trash bins.",
      icon: Recycle,
    },
    {
      id: "03",
      title: "Verify and earn impact points",
      desc: "Upload a quick proof image and receive points, streaks, and community badges.",
      icon: Award,
    },
    {
      id: "04",
      title: "Cut superbug exposure",
      desc: "Every safe disposal lowers environmental antibiotic pressure and slows resistance growth.",
      icon: Shield,
    },
  ];

  return (
    <div className="min-h-screen pt-16 landing-atmosphere">
      {/* Hero */}
      <section className="section-padding relative overflow-hidden">
        <div className="container-tight relative">
          <div className="clinic-hero-shell p-5 sm:p-8 lg:p-10">
            <div className="clinic-fade-panel" />
            <div className="grid lg:grid-cols-[0.92fr_1.08fr] gap-8 items-center relative z-[1]">
              <div>
                <ScrollReveal>
                  <div className="flex items-center gap-3 mb-5 text-white">
                    <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center border border-white/35">
                      <Shield className="w-5 h-5" />
                    </div>
                    <p className="font-display text-4xl leading-none tracking-tight">ProHealth</p>
                  </div>
                </ScrollReveal>

                <ScrollReveal>
                  <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#2b5f8d] text-white text-xs font-semibold tracking-[0.1em] mb-6 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-[#2f8cff]" />
                    NEW UPDATE
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.08}>
                  <h1 className="font-display text-white text-4xl sm:text-5xl lg:text-[3.65rem] leading-[1.03] tracking-tight mb-5 max-w-xl">
                    Your Partner in
                    <span className="block text-[#dff0ff]">Medicine Safety and Wellness</span>
                  </h1>
                </ScrollReveal>

                <ScrollReveal delay={0.14}>
                  <p className="text-white/80 text-sm sm:text-base max-w-xl mb-7 leading-relaxed">
                    MediSafe helps families and communities return unused antibiotics safely, preventing pollution and
                    slowing antimicrobial resistance through one smart platform.
                  </p>
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      to="/map"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-[#15518a] font-semibold text-sm hover:bg-white/90 transition-colors"
                    >
                      <MapPin className="w-4 h-4" />
                      Find Disposal Point
                    </Link>
                    <Link
                      to="/awareness"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/35 bg-white/10 text-white font-semibold text-sm hover:bg-white/15 transition-colors"
                    >
                      See How It Works
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </ScrollReveal>
              </div>

              <ScrollReveal delay={0.2} direction="right">
                <div className="relative min-h-[440px] sm:min-h-[500px] lg:min-h-[560px]">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.8 }}
                    className="clinic-panel absolute left-0 right-20 top-16 p-5 sm:p-7"
                  >
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-2 text-[#245f93]">
                        <Shield className="w-4 h-4" />
                        <span className="text-sm font-semibold">MediSafe</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#245f93]">
                        <Search className="w-4 h-4" />
                        <Menu className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="font-display text-[#183f67] text-2xl sm:text-3xl font-bold max-w-md mb-4 leading-tight">
                      Dispose Right. Keep Antibiotics Effective.
                    </h3>
                    <p className="text-[#2f658f] text-sm max-w-md mb-6">
                      Build healthier neighborhoods by dropping expired antibiotics at safe centers and tracking your impact.
                    </p>

                    <div className="grid grid-cols-3 gap-3 bg-white/70 rounded-2xl p-3 border border-white/70">
                      {[
                        { icon: Calendar, label: "Date", value: "March 2026" },
                        { icon: Stethoscope, label: "Focus", value: "AMR Safety" },
                        { icon: MapPin, label: "Region", value: "Your City" },
                      ].map((item) => (
                        <div key={item.label} className="rounded-xl bg-white p-2.5">
                          <item.icon className="w-4 h-4 text-[#2f8cff] mb-1.5" />
                          <p className="text-[11px] text-[#4c7498]">{item.label}</p>
                          <p className="text-[11px] font-semibold text-[#1f4c77]">{item.value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 relative h-[185px] sm:h-[230px]">
                      <div className="absolute left-0 bottom-3 rounded-2xl bg-white/85 border border-white/80 p-2.5 shadow-md">
                        <div className="flex items-center">
                          {avatarPhotos.map((photo, i) => (
                            <img
                              key={photo}
                              src={photo}
                              alt="Medical professional"
                              className={`w-8 h-8 rounded-full object-cover border-2 border-white ${i > 0 ? "-ml-3" : ""}`}
                              loading="lazy"
                            />
                          ))}
                        </div>
                        <p className="text-[11px] mt-1 text-[#326892]">150K+ Patient Recovery</p>
                      </div>

                      <div className="absolute right-0 bottom-0 w-[74%] h-full clinic-photo-cutout">
                        <img
                          src={heroImages.team}
                          alt="Doctors team"
                          className="w-full h-full object-cover object-center"
                          loading="lazy"
                        />
                      </div>

                      <div className="absolute right-1 top-0 rounded-2xl bg-white/86 border border-white/80 px-3 py-2 text-center">
                        <div className="flex items-center justify-center mb-1">
                          {avatarPhotos.map((photo, i) => (
                            <img
                              key={`hero-${photo}`}
                              src={photo}
                              alt="Top doctor"
                              className={`w-6 h-6 rounded-full object-cover border-2 border-white ${i > 0 ? "-ml-2" : ""}`}
                              loading="lazy"
                            />
                          ))}
                        </div>
                        <p className="text-xs font-semibold text-[#2b5f8d] leading-none">870+</p>
                        <p className="text-[10px] text-[#5a7f9f]">Doctors</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="clinic-mobile-card absolute right-0 top-2 w-[200px] sm:w-[228px] p-4"
                  >
                    <div className="flex items-center justify-between text-[#245f93] mb-4">
                      <span className="text-xs font-semibold">MediSafe</span>
                      <div className="flex items-center gap-1.5">
                        <Search className="w-3.5 h-3.5" />
                        <Menu className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <h4 className="font-display text-[#183f67] text-[1.6rem] leading-[1.05] mb-2">Your Community Safety Feed</h4>
                    <p className="text-[12px] text-[#3b668d] mb-4">Live proof-based updates from disposal points near you.</p>
                    <div className="rounded-xl bg-white p-3 text-xs text-[#26537b]">
                      <p className="font-semibold">870+ collection partners</p>
                      <p className="text-[#4f7597] mt-1">150K+ safe returns recorded</p>
                    </div>
                    <img src={heroImages.mobile} alt="Healthcare specialist" className="mt-4 rounded-xl w-full h-28 object-cover object-top" loading="lazy" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.7, delay: 0.32 }}
                    className="absolute right-2 sm:right-6 bottom-8 glass-card p-3 sm:p-4 w-[210px] bg-white/80"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={heroImages.portrait}
                        alt="Medical advisor"
                        className="w-10 h-10 rounded-full object-cover border-2 border-white"
                        loading="lazy"
                      />
                      <div>
                        <p className="text-sm font-semibold text-[#1b4972]">150K+ Patient Recovery</p>
                        <p className="text-xs text-[#53799c]">Top Rated Medical Partner</p>
                      </div>
                    </div>
                  </motion.div>

                  <div className="absolute left-2 sm:-left-5 top-5 sm:top-8 rounded-2xl bg-white text-[#1f4f7b] px-4 py-2 shadow-lg text-sm font-semibold">
                    <span className="inline-flex items-center gap-2">
                      <HeartPulse className="w-4 h-4 text-[#2f8cff]" />
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
            {quickStats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.08}>
                <div className="glass-card p-5 sm:p-6 text-center hover:-translate-y-0.5 transition-transform duration-300">
                  <stat.icon className="w-5 h-5 text-primary mx-auto mb-3" />
                  <div className="font-display text-2xl sm:text-3xl font-bold glow-text mb-1">{stat.value}</div>
                  <div className="text-muted-foreground text-xs sm:text-sm">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Story Strip */}
      <section className="section-padding">
        <div className="container-tight">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                From Home Cabinet to <span className="glow-text">Global Risk</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Improper medicine disposal is not a small mistake. It compounds into resistant infections that affect
                surgeries, maternal health, and everyday treatments.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: BellRing,
                title: "Leftovers Build Up",
                desc: "Partially used antibiotic packs sit in homes and often end up in regular trash or sinks.",
              },
              {
                icon: Beaker,
                title: "Environment Gets Exposed",
                desc: "Trace antibiotics in landfills and waterways accelerate bacterial adaptation over time.",
              },
              {
                icon: Target,
                title: "Intervene Early",
                desc: "Safe collection closes this loop and helps keep treatment options effective for everyone.",
              },
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

      {/* Impact Loop */}
      <section className="section-padding-sm">
        <div className="container-tight">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">
                The <span className="glow-text">Impact Loop</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A simple four-step cycle that makes participation frictionless and impact measurable.
              </p>
            </div>
          </ScrollReveal>
          <div className="relative">
            <div className="hidden lg:block absolute top-12 left-10 right-10 h-px bg-gradient-to-r from-primary/15 via-primary/40 to-primary/15" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {impactSteps.map((item, i) => (
              <ScrollReveal key={item.id} delay={i * 0.1}>
                <div className="glass-card p-6 relative overflow-hidden group hover:border-primary/30 transition-colors duration-300">
                  <span className="absolute -top-2 -right-2 font-display text-6xl font-bold text-primary/5 group-hover:text-primary/10 transition-colors select-none">
                    {item.id}
                  </span>
                  <item.icon className="w-5 h-5 text-primary mb-4" />
                  <h3 className="font-display font-semibold mb-1.5">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 items-stretch">
            <ScrollReveal direction="left">
              <div className="glass-card p-6 sm:p-8 h-full relative overflow-hidden">
                <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-primary/10 blur-3xl" />
                <p className="text-xs uppercase tracking-[0.14em] text-primary font-semibold mb-3">Mission Control</p>
                <h3 className="font-display text-2xl sm:text-3xl font-bold mb-3">Designed to Feel Like a Public Health Product</h3>
                <p className="text-muted-foreground mb-6 max-w-xl">
                  MediSafe blends clarity, urgency, and momentum. The experience is intentionally crafted so citizens can
                  act in under 60 seconds while understanding why each action matters.
                </p>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { label: "Average disposal flow", value: "58 sec" },
                    { label: "Photo verification confidence", value: "96%" },
                    { label: "Weekly challenge participation", value: "72%" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-xl border border-border/60 bg-background/70 p-3">
                      <p className="text-lg font-display font-bold text-foreground">{item.value}</p>
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.1}>
              <div className="glass-card p-6 sm:p-8 h-full">
                <h3 className="font-display text-xl font-bold mb-4">Live Community Signals</h3>
                <div className="space-y-3">
                  {[
                    "132 safe disposals completed today",
                    "14 schools joined this month",
                    "3 new municipal collection partners onboarded",
                    "Top neighborhood reduced improper disposal by 28%",
                  ].map((entry, i) => (
                    <motion.div
                      key={entry}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.7 }}
                      transition={{ duration: 0.45, delay: 0.06 * i }}
                      className="flex items-start gap-3 p-3 rounded-xl bg-background/70 border border-border/60"
                    >
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-primary shrink-0 animate-pulse" />
                      <span className="text-sm text-foreground/90">{entry}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-tight">
          <ScrollReveal>
            <div className="glass-card glow-border p-8 sm:p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/35 pointer-events-none" />
              <div className="absolute inset-0 pointer-events-none aurora-band" />
              <div className="relative">
                <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">
                  Ready to make your city safer?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                  Join a movement where disposal is measurable, rewarding, and built for real public health outcomes.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    to="/map"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-200 active:scale-[0.97]"
                  >
                    <MapPin className="w-4 h-4" />
                    Start Disposing Safely
                  </Link>
                  <Link
                    to="/game"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-background/70 border border-border/70 font-semibold text-sm hover:bg-background transition-all duration-200"
                  >
                    Join Weekly Challenge
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container-tight px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span className="font-display font-semibold text-foreground">MediSafe</span>
          <span>© 2026 MediSafe. Building healthier communities together.</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
