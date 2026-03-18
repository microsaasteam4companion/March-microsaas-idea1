import { motion } from "framer-motion";
import { Check, ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

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
    price: "$5",
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
];

const faqs = [
  {
    q: "Is PetCare OS free to use?",
    a: "Yes! Our Free plan is completely free, forever. It includes unlimited pet profiles, vaccination records, medication reminders, and 500MB of document storage — no credit card required.",
  },
  {
    q: "How many pets can I add to my account?",
    a: "Both Free and Pro plans support unlimited pet profiles. Whether you have 1 pet or a whole fur family, PetCare OS grows with you.",
  },
  {
    q: "What kind of health records can I store?",
    a: "You can store vaccinations, medications, vet visit notes, lab results, insurance documents, and any other health-related files. Our AI scan feature can even auto-extract data from uploaded documents.",
  },
  {
    q: "Can I share my pet's records with my vet?",
    a: "Absolutely. Every pet gets an Emergency Mode QR code that instantly surfaces critical health information. Pro users can also generate a Boarding Passport with complete medical history.",
  },
  {
    q: "How does the AI Health Intelligence work?",
    a: "Our AI analyzes your pet's health score, medication history, and uploaded documents to surface personalized recommendations, detect potential drug interactions, and alert you to concerning trends before they become serious.",
  },
  {
    q: "Can I cancel my Pro subscription anytime?",
    a: "Yes, you can cancel anytime with no questions asked. You'll retain access to Pro features until the end of your billing period, then seamlessly fall back to the Free plan.",
  },
];

const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-5 text-left gap-4"
      >
        <span className="text-base font-semibold text-foreground">{q}</span>
        <ChevronDown
          className={`h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="text-sm text-muted-foreground leading-relaxed pb-5">{a}</p>
      </motion.div>
    </div>
  );
};

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

        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-20">
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

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">FAQ</p>
            <h2 className="text-2xl sm:text-3xl font-bold leading-tight tracking-tight">
              Frequently asked questions
            </h2>
          </div>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqs.map(faq => ({ "@type": "Question", "name": faq.q, "acceptedAnswer": { "@type": "Answer", "text": faq.a } })) }) }} /><div className="rounded-2xl border border-border bg-card px-6">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
