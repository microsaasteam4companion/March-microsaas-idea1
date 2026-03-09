import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import dogHero from "@/assets/dog-hero.jpg";
import catHero from "@/assets/cat-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="flex -space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-primary fill-primary" />
                ))}
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                Loved by 10,000+ pet families
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-tight mb-6">
              Every pet deserves{" "}
              <span className="italic text-primary">organized</span>{" "}
              care
            </h1>

            <p className="text-lg text-muted-foreground max-w-md mb-8 leading-relaxed">
              Health records, vaccinations, medications, vet appointments, and insurance — 
              all in one beautiful dashboard for your entire pet family.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link
                to="/auth?mode=signup"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Start Free — No Card Required
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-7 py-3.5 text-sm font-semibold text-foreground hover:bg-accent transition-colors"
              >
                See Features
              </a>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-8">
              {[
                { value: "37M+", label: "Pet households" },
                { value: "4.9/5", label: "App rating" },
                { value: "<2min", label: "Setup time" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-xl font-bold text-foreground font-display">{s.value}</div>
                  <div className="text-xs text-muted-foreground font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - Photo grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-5 gap-3 h-[480px]">
              {/* Large left image */}
              <div className="col-span-3 rounded-2xl overflow-hidden relative">
                <img
                  src={dogHero}
                  alt="Happy golden retriever"
                  className="w-full h-full object-cover"
                />
                {/* Floating card */}
                <div className="absolute bottom-4 left-4 right-4 bg-card/95 backdrop-blur-sm rounded-xl p-3.5 border border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-foreground">Buddy · Golden Retriever</div>
                      <div className="text-xs text-muted-foreground">Next: Rabies vaccine in 3 days</div>
                    </div>
                    <div className="h-9 w-9 rounded-lg bg-teal-light flex items-center justify-center">
                      <span className="text-sm">💉</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column - stacked */}
              <div className="col-span-2 flex flex-col gap-3">
                <div className="flex-1 rounded-2xl overflow-hidden relative">
                  <img
                    src={catHero}
                    alt="Beautiful tabby cat"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl bg-primary p-5 flex flex-col justify-between">
                  <div>
                    <div className="text-2xl font-bold text-primary-foreground font-display">98%</div>
                    <div className="text-xs text-primary-foreground/80 font-medium">Health Score</div>
                  </div>
                  <div className="mt-3 flex items-center gap-1.5">
                    <div className="h-1.5 flex-1 rounded-full bg-primary-foreground/20">
                      <div className="h-full w-[98%] rounded-full bg-primary-foreground" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
