import { motion } from "framer-motion";
import {
  Smartphone, FileWarning, Pill, AlertTriangle,
  CreditCard, MapPin, ArrowDown,
} from "lucide-react";

const problems = [
  { icon: Smartphone, stat: "6–8 apps", label: "Scattered tools", color: "bg-accent border border-border/50 text-foreground shadow-sm" },
  { icon: FileWarning, stat: "30+ min", label: "Finding records", color: "bg-primary/10 border border-primary/20 text-primary shadow-sm" },
  { icon: Pill, stat: "42% miss", label: "Medication errors", color: "bg-destructive/10 border border-destructive/20 text-destructive shadow-sm" },
  { icon: AlertTriangle, stat: "3.3M/yr", label: "Insurance claims", color: "bg-accent border border-border/50 text-foreground shadow-sm" },
  { icon: MapPin, stat: "10M/yr", label: "Lost pets", color: "bg-primary/10 border border-primary/20 text-primary shadow-sm" },
  { icon: CreditCard, stat: "52% skip", label: "Vet cost anxiety", color: "bg-destructive/10 border border-destructive/20 text-destructive shadow-sm" },
];

const PainPointsSection = () => {
  return (
    <section id="problem" className="py-24 relative overflow-hidden bg-accent/20 border-y border-border/50">

        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
          <span className="inline-flex items-center gap-2 uppercase tracking-widest text-sm font-bold text-destructive mb-4">
            <span className="h-1.5 w-1.5 bg-destructive animate-pulse pulse-dot" />
            The Problem
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight mb-3">
            Pet care is <span className="italic text-primary">broken</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
      Real data from thousands of frustrated pet parents.
    </p>
  </motion.div>

{/* Horizontal scrollable chips on mobile, 2-row grid on desktop */ }
<div className="max-w-4xl mx-auto">
  {/* Top row - flowing connected visual */}
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
    {problems.map((p, i) => (
      <motion.div
        key={p.label}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.05 }}
        className="group relative rounded-lg border border-border/60 bg-background p-4 text-center hover:shadow-sm transition-all duration-300"
      >
        <div className={`h-10 w-10 rounded-xl ${p.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
          <p.icon className="h-4.5 w-4.5" />
        </div>
                <div className="text-xl font-bold text-foreground font-display leading-tight">{p.stat}</div>
                <div className="text-sm text-muted-foreground font-medium mt-0.5">{p.label}</div>
              </motion.div >
            ))}
          </div >
        </div >

  {/* Arrow to solution */ }
  < motion.div
initial = {{ opacity: 0 }}
whileInView = {{ opacity: 1 }}
viewport = {{ once: true }}
className = "flex justify-center mt-10"
  >
  <div className="flex flex-col items-center gap-2">
            <ArrowDown className="h-6 w-6 text-primary animate-bounce" />
            <span className="text-base font-semibold text-primary">There's a better way</span>
          </div >
        </motion.div >
      </div >
    </section >
  );
};

export default PainPointsSection;
