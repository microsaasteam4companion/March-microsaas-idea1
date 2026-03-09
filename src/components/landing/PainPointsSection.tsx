import { motion } from "framer-motion";
import {
  Smartphone, FileWarning, Pill, AlertTriangle,
  CreditCard, MapPin, ArrowDown,
} from "lucide-react";

const problems = [
  { icon: Smartphone, stat: "6–8 apps", label: "Scattered tools", color: "bg-primary/10 text-primary" },
  { icon: FileWarning, stat: "30+ min", label: "Finding records", color: "bg-secondary/10 text-secondary" },
  { icon: Pill, stat: "42% miss", label: "Medication errors", color: "bg-coral/10 text-coral" },
  { icon: AlertTriangle, stat: "3.3M/yr", label: "Insurance claims", color: "bg-violet/10 text-violet" },
  { icon: MapPin, stat: "10M/yr", label: "Lost pets", color: "bg-blue/10 text-blue" },
  { icon: CreditCard, stat: "52% skip", label: "Vet cost anxiety", color: "bg-primary/10 text-primary" },
];

const PainPointsSection = () => {
  return (
    <section id="problem" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/30 to-background" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-destructive/10 px-4 py-1.5 text-xs font-semibold text-destructive mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-destructive animate-pulse" />
            The Problem
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight mb-3">
            Pet care is <span className="italic text-primary">broken</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed text-sm">
            Real data from thousands of frustrated pet parents.
          </p>
        </motion.div>

        {/* Horizontal scrollable chips on mobile, 2-row grid on desktop */}
        <div className="max-w-4xl mx-auto">
          {/* Top row - flowing connected visual */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {problems.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group relative rounded-2xl border border-border bg-card p-4 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`h-10 w-10 rounded-xl ${p.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  <p.icon className="h-4.5 w-4.5" />
                </div>
                <div className="text-lg font-bold text-foreground font-display leading-tight">{p.stat}</div>
                <div className="text-[11px] text-muted-foreground font-medium mt-0.5">{p.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Arrow to solution */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mt-10"
        >
          <div className="flex flex-col items-center gap-2">
            <ArrowDown className="h-5 w-5 text-primary animate-bounce" />
            <span className="text-sm font-semibold text-primary">There's a better way</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PainPointsSection;
