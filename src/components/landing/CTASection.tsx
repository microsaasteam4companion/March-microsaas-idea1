import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import dogPortrait from "@/assets/dog-portrait.jpg";
import catPortrait from "@/assets/cat-portrait.jpg";

const CTASection = () => {
  return (
    <section className="py-24 border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden bg-foreground"
        >
          <div className="grid lg:grid-cols-2">
            {/* Content */}
            <div className="p-10 sm:p-14 flex flex-col justify-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-background leading-tight tracking-tight mb-4 font-display">
                Your pets deserve better than 6 apps
              </h2>
              <p className="text-background/70 mb-8 leading-relaxed">
                Join thousands of families who simplified their pet care. 
                Free forever plan. Set up in under 2 minutes. No credit card needed.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/auth?mode=signup"
                  className="group inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  Get Started Free
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <a
                  href="#pricing"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-background/20 px-7 py-3.5 text-sm font-semibold text-background hover:bg-background/10 transition-colors"
                >
                  View Pricing
                </a>
              </div>
            </div>

            {/* Image mosaic */}
            <div className="hidden lg:grid grid-cols-2 gap-2 p-2">
              <div className="rounded-2xl overflow-hidden">
                <img src={dogPortrait} alt="Happy dog" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden">
                <img src={catPortrait} alt="Beautiful cat" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
