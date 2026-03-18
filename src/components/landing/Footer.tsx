import { useState } from "react";
import { Heart, Mail, Twitter, Instagram, Linkedin, MessageCircle, Rss, Sun, Moon } from "lucide-react";

const footerLinks = [
  {
    title: "Projects",
    links: [
      { label: "PetVault", href: "https://petvault.entrext.com" },
      { label: "Pawnote", href: "https://pawnote.entrext.com" },
      { label: "AquaOS", href: "https://aquaOS.entrext.com" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "FAQ", href: "#faq" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com/entrextlabs", label: "Twitter" },
  { icon: Instagram, href: "https://www.instagram.com/entrext.labs/", label: "Instagram" },
  { icon: Linkedin, href: "http://linkedin.com/company/entrext/", label: "LinkedIn" },
  { icon: MessageCircle, href: "https://discord.com/invite/ZZx3cBrx2", label: "Discord" },
  { icon: Rss, href: "https://entrextlabs.substack.com/subscribe", label: "Substack" },
];

const Footer = () => {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"));

  const toggleTheme = () => {
    const root = document.documentElement;
    if (root.classList.contains("dark")) {
      root.classList.remove("dark");
      setIsDark(false);
    } else {
      root.classList.add("dark");
      setIsDark(true);
    }
  };

  return (
    <footer className="border-t border-border bg-card">
      <div className="border-b border-border">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl mx-auto">
            <div>
              <h3 className="text-lg font-bold text-foreground font-display mb-1">
                Stay updated
              </h3>
              <p className="text-sm text-muted-foreground">
                Get product updates and exclusive offers directly to your inbox.
              </p>
            </div>
            <form action="https://entrextlabs.substack.com/subscribe" target="_blank" method="GET" className="flex gap-2 w-full md:w-auto">
              <div className="flex items-center gap-2 bg-background rounded-lg border border-border px-4 py-2.5 flex-1 md:w-72">
                <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Your email address"
                  className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground"
                />
              </div>
              <button type="submit" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity shrink-0">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-14">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10">
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

            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="h-9 w-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

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

      <div className="border-t border-border">
        <div className="container mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2026 PetCare OS, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            Made with <Heart className="h-3 w-3 text-destructive fill-destructive mx-0.5" /> love from entrextlabs
          </div>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
          >
            {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            {isDark ? "Light mode" : "Dark mode"}
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
