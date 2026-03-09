import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "Everything you need to get started.",
    features: [
      "Unlimited pet profiles",
      "Vaccination records",
      "Medication reminders",
      "Emergency mode + QR",
      "Basic health log",
      "500MB document storage",
    ],
    cta: "Get Started",
    ctaLink: "/auth?mode=signup",
    featured: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "/month",
    desc: "AI-powered intelligence for serious pet parents.",
    features: [
      "Everything in Free",
      "AI Health Intelligence",
      "Family Command Center",
      "Insurance Manager",
      "Drug Interaction Checker",
      "Boarding Passport",
      "Budget & Spend Hub",
      "All integrations",
      "Unlimited storage",
      "Priority support",
    ],
    cta: "Start 14-Day Free Trial",
    ctaLink: "/auth?mode=signup&plan=pro",
    featured: true,
  },
  {
    name: "Clinic",
    price: "$99",
    period: "/month",
    desc: "White-label portal for vet practices.",
    features: [
      "Everything in Pro",
      "White-label branding",
      "Pre-visit AI summaries",
      "Patient dashboard",
      "Vet record sync API",
      "Multi-staff access",
      "Custom integrations",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
    ctaLink: "#",
    featured: false,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Pricing</p>
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight mb-4">
            Less than a bag of premium treats
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Free to start. Upgrade when your fur family needs superpowers.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`relative rounded-2xl p-7 transition-all ${
                plan.featured
                  ? "bg-foreground text-background border-2 border-foreground shadow-lg"
                  : "bg-card border border-border"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <h3 className={`text-lg font-semibold mb-1 ${plan.featured ? "text-background" : "text-foreground"}`}>
                {plan.name}
              </h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className={`text-4xl font-bold font-display ${plan.featured ? "text-background" : "text-foreground"}`}>
                  {plan.price}
                </span>
                <span className={`text-sm ${plan.featured ? "text-background/60" : "text-muted-foreground"}`}>
                  {plan.period}
                </span>
              </div>
              <p className={`text-sm mb-6 ${plan.featured ? "text-background/70" : "text-muted-foreground"}`}>
                {plan.desc}
              </p>

              <ul className="space-y-2.5 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className={`h-4 w-4 mt-0.5 shrink-0 ${plan.featured ? "text-primary" : "text-secondary"}`} />
                    <span className={`text-sm ${plan.featured ? "text-background/90" : "text-foreground"}`}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                to={plan.ctaLink}
                className={`w-full group inline-flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold transition-all ${
                  plan.featured
                    ? "bg-primary text-primary-foreground hover:opacity-90"
                    : "border border-border text-foreground hover:bg-accent"
                }`}
              >
                {plan.cta}
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
