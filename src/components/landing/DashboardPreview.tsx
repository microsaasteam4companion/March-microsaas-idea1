import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Sparkles } from "lucide-react";

const DashboardPreview = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.5, 1]);

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/40 to-background" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary mb-5">
            <Sparkles className="h-3.5 w-3.5" />
            See It In Action
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight mb-4">
            One dashboard for <span className="italic text-primary">everything</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Health records, vaccinations, medications, vet visits — all beautifully organized 
            for your entire pet family.
          </p>
        </motion.div>

        {/* Real dashboard screenshot with browser chrome */}
        <motion.div
          style={{ y, scale, opacity }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-border bg-accent/50">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-destructive/60" />
                <div className="h-3 w-3 rounded-full bg-primary/40" />
                <div className="h-3 w-3 rounded-full bg-secondary/40" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-background rounded-lg px-4 py-1 text-xs text-muted-foreground font-medium border border-border">
                  app.petcareos.com/dashboard
                </div>
              </div>
            </div>

            {/* Embedded real dashboard via iframe */}
            <div className="relative overflow-hidden" style={{ height: "520px" }}>
              <iframe
                src="/dashboard?preview=true"
                className="w-full border-0 pointer-events-none"
                style={{ 
                  transform: "scale(0.75)", 
                  transformOrigin: "top left", 
                  width: "133.33%", 
                  height: "133.33%",
                }}
                title="PetCare OS Dashboard Preview"
              />
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default DashboardPreview;
