import { Link } from "react-router-dom";
import { Heart, Mail, Twitter, Instagram, Facebook, Github } from "lucide-react";

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "For Clinics", href: "#" },
      { label: "API Docs", href: "#" },
      { label: "Changelog", href: "#" },
      { label: "Integrations", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Help Center", href: "#" },
      { label: "Pet Health Blog", href: "#" },
      { label: "Vaccination Guide", href: "#" },
      { label: "Breed Database", href: "#" },
      { label: "Community Forum", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press Kit", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Partners", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Security", href: "#" },
      { label: "HIPAA Compliance", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  },
];

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Github, href: "#", label: "GitHub" },
];

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      {/* Newsletter section */}
      <div className="border-b border-border">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl mx-auto">
            <div>
              <h3 className="text-lg font-bold text-foreground font-display mb-1">
                Stay in the loop 🐾
              </h3>
              <p className="text-sm text-muted-foreground">
                Pet health tips, product updates, and exclusive offers. No spam, ever.
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <div className="flex items-center gap-2 bg-background rounded-lg border border-border px-4 py-2.5 flex-1 md:w-72">
                <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                <input
                  type="email"
                  placeholder="Your email address"
                  className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground"
                />
              </div>
              <button className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity shrink-0">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Links grid */}
      <div className="container mx-auto px-6 py-14">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-10">
          {/* Brand column */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-primary-foreground">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
                </svg>
              </div>
              <span className="font-display text-lg font-bold text-foreground tracking-tight">PetCare OS</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed mb-6">
              The all-in-one platform for modern pet parents. Health records, vaccinations, medications, 
              and insurance — beautifully unified.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="h-9 w-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2026 PetCare OS, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            Made with <Heart className="h-3 w-3 text-destructive fill-destructive mx-0.5" /> for pet parents everywhere
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Status</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Sitemap</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
