import { motion } from "framer-motion";
import {
  PawPrint, Syringe, Pill, AlertOctagon, HeartPulse, FileText,
  Brain, Users, Wallet, Stethoscope,
} from "lucide-react";
import dogsPlaying from "@/assets/dogs-playing.jpg";
import petFamily from "@/assets/pet-family.jpg";

const freeFeatures = [
  { icon: PawPrint, title: "Pet Profiles", desc: "Unlimited pets with photos, breed, weight & microchip" },
  { icon: Syringe, title: "Vaccination Vault", desc: "All records stored with smart expiry reminders" },
  { icon: Pill, title: "Med Reminders", desc: "Never miss a dose with smart scheduling" },
  { icon: HeartPulse, title: "Health Journal", desc: "Track weight, symptoms & daily wellness" },
];

const proFeatures = [
  { icon: Brain, title: "AI Health Intelligence", desc: "Predictive calendar, trend analysis & breed-specific alerts" },
  { icon: Users, title: "Family Command Center", desc: "Shared roles, task boards & caregiver activity feeds" },
  { icon: Stethoscope, title: "Drug Interaction Checker", desc: "Cross-checks medications across all your pets" },
  { icon: Wallet, title: "Budget & Spend Hub", desc: "Vet spend analytics, subscription tracking & projections" },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/20 to-background" />

      <div className="container mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-semibold text-secondary mb-5">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight mb-4">
            Everything your pets need, <span className="italic text-primary">nothing they don't</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Start free with the essentials. Upgrade for AI-powered intelligence when you're ready.
          </p>
        </motion.div>

        {/* FREE TIER — Image + features side by side */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs font-bold text-secondary uppercase tracking-wider bg-teal-light px-3 py-1.5 rounded-full">
              ✦ Free Forever
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="grid lg:grid-cols-2 gap-6 items-stretch">
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden relative group"
            >
              <img src={dogsPlaying} alt="Happy dogs playing together" className="w-full h-full object-cover min-h-[240px] max-h-[280px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="bg-card/95 backdrop-blur-sm rounded-xl p-4 border border-border">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                      <AlertOctagon className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">Emergency Mode Active</div>
                      <div className="text-xs text-muted-foreground">One-tap shareable QR profile for lost pets</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Feature cards */}
            <div className="grid grid-cols-2 gap-4">
              {freeFeatures.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-xl border border-border bg-card p-5 hover:border-secondary/30 hover:shadow-md transition-all duration-300 flex flex-col"
                >
                  <div className="h-10 w-10 rounded-xl bg-teal-light flex items-center justify-center mb-4">
                    <f.icon className="h-5 w-5 text-secondary" />
                  </div>
                  <h3 className="text-sm font-bold text-foreground mb-1.5">{f.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed flex-1">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* PRO TIER — Reversed layout */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs font-bold text-primary uppercase tracking-wider bg-amber-light px-3 py-1.5 rounded-full">
              ✦ Pro · $12/mo
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="grid lg:grid-cols-2 gap-6 items-stretch">
            {/* Compact feature list */}
            <div className="rounded-2xl border border-border bg-card p-5 order-2 lg:order-1 flex flex-col justify-center">
              <div className="space-y-3">
                {proFeatures.map((f, i) => (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="h-9 w-9 rounded-lg bg-amber-light flex items-center justify-center shrink-0">
                      <f.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground leading-tight">{f.title}</h3>
                      <p className="text-xs text-muted-foreground">{f.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden relative group order-1 lg:order-2"
            >
              <img src={petFamily} alt="Happy family with pets" className="w-full h-full object-cover min-h-[240px] max-h-[280px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="bg-card/95 backdrop-blur-sm rounded-xl p-4 border border-border">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Brain className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">AI Health Alert</div>
                      <div className="text-xs text-muted-foreground">Buddy's weight trend suggests a vet check</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
