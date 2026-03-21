import { ScrollReveal } from "../components/ScrollReveal";
import { Bug, Droplets, FlaskConical, HeartPulse, HelpCircle, Pill, ShieldAlert, Stethoscope } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const cards = [
  { icon: Bug, title: "What are Superbugs?", desc: "Bacteria that have evolved to resist multiple antibiotics, making infections extremely difficult or impossible to treat." },
  { icon: Pill, title: "Misuse of Antibiotics", desc: "Taking antibiotics without prescription, not completing courses, or using them for viral infections accelerates resistance." },
  { icon: Droplets, title: "Environmental Impact", desc: "Flushing antibiotics contaminates water systems, exposing bacteria to sub-lethal doses that drive resistance." },
  { icon: HeartPulse, title: "Human Health Risk", desc: "AMR could cause 10 million deaths annually by 2050, surpassing cancer as a leading cause of death." },
  { icon: FlaskConical, title: "Fewer New Drugs", desc: "Pharmaceutical companies are developing fewer antibiotics due to high cost and low profitability." },
  { icon: Stethoscope, title: "What You Can Do", desc: "Dispose of unused antibiotics properly, never self-medicate, complete prescribed courses, and spread awareness." },
];

const faqs = [
  { q: "Why can't I just throw antibiotics in the trash?", a: "Antibiotics in landfills can leach into soil and water, exposing bacteria to low-level antibiotic concentrations that accelerate resistance development." },
  { q: "Can I flush antibiotics down the toilet?", a: "No. Water treatment plants cannot fully remove pharmaceutical compounds, allowing them to enter rivers and ecosystems." },
  { q: "How do I dispose of antibiotics safely?", a: "Use MediSafe to find authorized disposal points like pharmacies, hospitals, or collection centers near you that safely handle pharmaceutical waste." },
  { q: "What happens at a collection center?", a: "Collected medicines are incinerated at high temperatures in specialized facilities, ensuring complete destruction without environmental contamination." },
  { q: "Are expired antibiotics dangerous?", a: "While they may lose efficacy, the bigger risk is improper disposal. Expired antibiotics should be returned to disposal points, not kept at home." },
];

const Awareness = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen pt-16">
      <section className="section-padding">
        <div className="container-tight">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-destructive/10 text-destructive text-xs font-medium mb-6">
                <ShieldAlert className="w-3.5 h-3.5" />
                Critical Global Health Threat
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold mb-4">
                Understanding <span className="glow-text">Antimicrobial Resistance</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                AMR is one of the top 10 global public health threats. Learn how improper antibiotic disposal contributes to this crisis and what you can do.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {cards.map((card, i) => (
              <ScrollReveal key={card.title} delay={i * 0.08}>
                <div className="glass-card p-6 h-full group hover:border-primary/30 transition-colors duration-300">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                    <card.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold mb-2">{card.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{card.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-center mb-8">
              Frequently Asked <span className="glow-text">Questions</span>
            </h2>
          </ScrollReveal>

          <div className="max-w-2xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="glass-card overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left active:scale-[0.99] transition-transform"
                  >
                    <span className="font-semibold text-sm pr-4">{faq.q}</span>
                    <HelpCircle className={`w-4 h-4 flex-shrink-0 text-muted-foreground transition-transform duration-200 ${openFaq === i ? "rotate-45 text-primary" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border/50 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Awareness;
