import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial3 from "@/assets/testimonial-3.jpg";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Mom of 2 dogs & 1 cat",
    image: testimonial1,
    rating: 5,
    text: "I used to juggle 5 different apps for my pets. Now everything is in one place — vaccines, meds, vet records. The reminders alone have been a lifesaver for Buddy's heartworm pills.",
    pet: "Buddy, Max & Whiskers",
    highlight: "Saved 2+ hours per week",
  },
  {
    name: "James Cooper",
    role: "First-time cat dad",
    image: testimonial2,
    rating: 4,
    text: "As a new pet parent, I was overwhelmed keeping track of everything. PetCare OS made it so simple. The health score gives me peace of mind that Oliver is doing great.",
    pet: "Oliver the tabby",
    highlight: "98% health score maintained",
  },
  {
    name: "Mei Lin",
    role: "Dog mom & foster volunteer",
    image: testimonial3,
    rating: 4,
    text: "I foster dogs regularly, so keeping track of different vaccination schedules was a nightmare. Now I add each foster pup in seconds and the vet has everything they need instantly.",
    pet: "Mochi + 12 foster dogs",
    highlight: "Manages 12+ pets seamlessly",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/20 to-background" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary mb-5">
            ❤️ Loved by Pet Parents
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight mb-4">
            5k+ happy <span className="italic text-primary">fur families</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Real stories from real pet parents who simplified their pet care.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-2xl border border-border bg-card p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Quote icon */}
              <Quote className="h-8 w-8 text-primary/15 mb-4" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 text-primary fill-primary" />
                ))}
              </div>

              {/* Review text */}
              <p className="text-sm text-foreground leading-relaxed mb-5">
                "{t.text}"
              </p>

              {/* Highlight badge */}
              <div className="inline-flex items-center gap-1.5 rounded-full bg-secondary/10 px-3 py-1 mb-5">
                <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">
                  ✦ {t.highlight}
                </span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <img src={t.image} alt={t.name} className="h-11 w-11 rounded-full object-cover ring-2 ring-primary/10" />
                <div>
                  <div className="text-sm font-bold text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        
      </div>
    </section>
  );
};

export default TestimonialsSection;
