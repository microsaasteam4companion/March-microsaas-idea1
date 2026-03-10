import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Why PetCare OS", href: "#problem" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
<<<<<<< HEAD
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50"
=======
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border"
>>>>>>> team/main
    >
      <div className="container mx-auto flex items-center justify-between px-6 h-16">
        <a href="#" className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-primary-foreground">
<<<<<<< HEAD
  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor" />
            </svg >
          </div >
  <span className="font-display text-2xl font-bold text-foreground tracking-tight">
    PetCare OS
  </span>
        </a >
=======
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
            </svg>
          </div>
          <span className="font-display text-xl font-bold text-foreground tracking-tight">
            PetCare OS
          </span>
        </a>
>>>>>>> team/main

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
<<<<<<< HEAD
              className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
=======
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
>>>>>>> team/main
            >
              {l.label}
            </a>
          ))}
        </div>

<<<<<<< HEAD
        <div className="hidden md:flex items-center gap-5">
          <Link to="/auth" className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors">
          Log in
        </Link>
        <Link
          to="/auth?mode=signup"
          className="rounded-md bg-primary px-5 py-2.5 text-base font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
        >
          Get Started Free
        </Link>
      </div>

      <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
  </div>

  <AnimatePresence>
    {open && (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="md:hidden overflow-hidden border-t border-border bg-background"
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="px-3 py-2.5 text-base font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent transition-all"
            >
              {l.label}
            </a>
          ))}
<div className="mt-3 pt-3 border-t border-border/50 flex flex-col gap-2">
  <Link to="/auth" className="px-3 py-2.5 text-base font-medium text-muted-foreground hover:text-foreground transition-colors">Log in</Link>
  <Link
    to="/auth?mode=signup"
    className="rounded-md bg-primary px-5 py-2.5 text-base font-medium text-primary-foreground text-center shadow-sm"
  >
    Get Started Free
  </Link>
</div>
            </div >
          </motion.div >
        )}
      </AnimatePresence >
    </motion.nav >
=======
        <div className="hidden md:flex items-center gap-4">
          <Link to="/auth" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Log in
          </Link>
          <Link
            to="/auth?mode=signup"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Get Started Free
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-border bg-background"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent transition-all"
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-3 pt-3 border-t border-border flex flex-col gap-2">
                <Link to="/auth" className="px-3 py-2.5 text-sm font-medium text-muted-foreground">Log in</Link>
                <Link
                  to="/auth?mode=signup"
                  className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground text-center"
                >
                  Get Started Free
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
>>>>>>> team/main
  );
};

export default Navbar;
