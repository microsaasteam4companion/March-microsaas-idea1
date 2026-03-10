import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import dogHero from "@/assets/dog-hero.jpg";
import catHero from "@/assets/cat-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden border-b border-border/50">
      {/* Soft elegant background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-accent/20 -z-10" />

        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="flex items-center gap-2 mb-8">
                <span className="text-sm font-bold uppercase tracking-widest text-primary/80">
                  Premium Pet Care Management
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-medium leading-[1.1] tracking-tight mb-6 text-foreground">
                Every pet deserves <br />
                <span className="italic text-primary font-serif">organized</span> care
              </h1>

              <p className="text-xl text-muted-foreground max-w-lg mb-10 leading-relaxed font-body">
                Health records, vaccinations, medications, vet appointments, and insurance —
                all in one beautifully crafted dashboard for your entire pet family.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  to="/auth?mode=signup"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-8 py-3.5 text-base font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
                >
                  Start Free — No Card Required
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background px-8 py-3.5 text-base font-medium text-foreground hover:bg-accent transition-colors shadow-sm"
                >
                  Explore Features
                </a>
              </div>

              {/* Stats row - Minimalist */}
              <div className="flex items-center gap-10 border-t border-border/60 pt-8">
            {[
              { value: "37M+", label: "Pet households" },
              { value: "4.9/5", label: "App rating" },
              { value: "<2min", label: "Setup time" },
            ].map((s) => (
              <div key={s.label}>
                  <div className="text-2xl font-display font-semibold text-foreground">{s.value}</div>
                  <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider mt-1">{s.label}</div>
                </div >
              ))}
            </div >
          </motion.div >

  {/* Right - Photo grid */ }
  < motion.div
initial = {{ opacity: 0, x: 20 }}
animate = {{ opacity: 1, x: 0 }}
transition = {{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
className = "relative"
  >
  <div className="grid grid-cols-5 gap-4 h-[520px]">
    {/* Large left image */}
    <div className="col-span-3 rounded-xl overflow-hidden relative shadow-md">
          <img
            src={dogHero}
            alt="Happy golden retriever"
            className="w-full h-full object-cover"
          />
{/* Clean Floating card */ }
<div className="absolute bottom-6 left-6 right-6 bg-background/95 backdrop-blur-md rounded-lg p-4 border border-border/50 shadow-sm">
  <div className="flex items-center justify-between">
    <div>
      <div className="text-base font-semibold text-foreground font-display">Buddy</div>
      <div className="text-sm text-muted-foreground">Next: Rabies vaccine in 3 days</div>
    </div>
    <div className="h-2 w-2 rounded-full bg-primary" />
      </div>
    </div>
  </div>

  {/* Right column - stacked */}
<div className="col-span-2 flex flex-col gap-4">
  <div className="flex-1 rounded-xl overflow-hidden shadow-md">
        <img
          src={catHero}
          alt="Beautiful tabby cat"
          className="w-full h-full object-cover"
        />
      </div>
{/* Clean Stat Box instead of vibrant block */ }
<div className="rounded-xl border border-border bg-card p-6 flex flex-col justify-center shadow-sm relative overflow-hiddenGroup">
  <div className="absolute top-0 right-0 p-4 opacity-10">
    <Star className="h-16 w-16" />
  </div>
  <div className="relative z-10">
    <div className="text-4xl font-display font-semibold text-foreground">98<span className="text-lg text-muted-foreground">%</span></div>
    <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider mt-1">Health Score</div>
  </div>
  <div className="mt-4 flex items-center gap-1.5 relative z-10">
    <div className="h-1.5 flex-1 rounded-full bg-accent">
      <div className="h-full w-[98%] rounded-full bg-primary" />
          </div>
        </div>
      </div>
    </div>
  </div>
</motion.div>
        </div >
      </div >
    </section >
  );
};

export default HeroSection;
