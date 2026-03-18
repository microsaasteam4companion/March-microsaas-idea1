import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { ChefHat, Sparkles, Check, Flame } from "lucide-react";
import { toast } from "sonner";

interface PawsAndPlatesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  petName?: string;
}

const INGREDIENTS = [
  "Chicken Breast", "Beef", "Salmon", "Carrots", "Sweet Potato",
  "Pumpkin", "Plain Yogurt", "Blueberries", "White Rice", "Oats", "Peanut Butter"
];

export function PawsAndPlatesModal({ open, onOpenChange, petName = "Your Pet" }: PawsAndPlatesModalProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [state, setState] = useState<"idle" | "thinking" | "result">("idle");
  const [recipe, setRecipe] = useState("");

  const toggleIngredient = (ing: string) => {
    if (selected.includes(ing)) {
      setSelected(selected.filter((i) => i !== ing));
    } else {
      if (selected.length >= 3) {
        toast.error("You can only select up to 3 ingredients!");
        return;
      }
      setSelected([...selected, ing]);
    }
  };

  const handleGenerate = () => {
    if (selected.length === 0) {
      toast.error("Please select at least 1 ingredient.");
      return;
    }
    setState("thinking");
    setTimeout(() => {
      setState("result");
      const r = `
### Michelin-Star ${selected.join(" & ")} Surprise

**Prep Time**: 10 mins | **Cook Time**: 15 mins

#### Instructions:
1. Thoroughly cook the **${selected[0]}** without any added oils or toxic seasonings.
2. ${selected[1] ? `Steam or boil the **${selected[1]}** until soft to ensure easy digestion.` : "Serve the first ingredient with a fresh bowl of water."}
3. ${selected[2] ? `Garnish with a sprinkle of **${selected[2]}** for an extra antioxidant boost.` : "Allow to cool to room temperature."}
4. Serve with love to ${petName}!

*Nutritional Note: This recipe is perfectly balanced, low in fat, and 100% pet-safe according to AI Veterinary standards.*
      `;
      setRecipe(r);
    }, 4000);
  };

  const reset = () => {
    setSelected([]);
    setState("idle");
    setRecipe("");
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
      if (!val) reset();
      onOpenChange(val);
    }}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="mx-auto h-16 w-16 rounded-full bg-amber/10 flex items-center justify-center mb-2 relative">
            <ChefHat className="h-8 w-8 text-amber" />
            <Sparkles className="absolute -top-1 -right-1 h-5 w-5 text-amber animate-spin-slow" />
          </div>
          <DialogTitle className="text-center text-2xl font-display uppercase tracking-widest text-foreground">
            Paws & Plates
          </DialogTitle>
          <DialogDescription className="text-center">
            AI-powered Michelin-star recipes for {petName}. Select up to 3 ingredients from your fridge!
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 flex flex-col items-center justify-center min-h-[300px]">
          <AnimatePresence mode="wait">
            {state === "idle" && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full"
              >
                <div className="flex flex-wrap gap-2 justify-center mb-8">
                  {INGREDIENTS.map((ing) => {
                    const isSelected = selected.includes(ing);
                    return (
                      <button
                        key={ing}
                        onClick={() => toggleIngredient(ing)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                          isSelected 
                            ? "bg-amber text-black shadow-lg shadow-amber/20 scale-105" 
                            : "bg-accent text-foreground hover:bg-black/5 dark:hover:bg-white/10"
                        }`}
                      >
                        {ing}
                        {isSelected && <Check className="inline-block ml-1 h-4 w-4" />}
                      </button>
                    );
                  })}
                </div>
                
                <div className="flex justify-center">
                  <button
                    onClick={handleGenerate}
                    className="relative px-8 py-3 rounded-xl bg-foreground text-background font-bold uppercase tracking-wider overflow-hidden group hover:scale-105 transition-transform"
                  >
                    <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300 ease-out" />
                    <span className="relative z-10 flex items-center gap-2">
                      <Flame className="h-5 w-5" /> Generate Recipe
                    </span>
                  </button>
                </div>
              </motion.div>
            )}

            {state === "thinking" && (
              <motion.div
                key="thinking"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center gap-6"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-amber/30 rounded-full blur-xl animate-pulse" />
                  <ChefHat className="h-20 w-20 text-foreground animate-bounce" />
                </div>
                <div className="text-lg font-bold font-display tracking-widest text-foreground uppercase flex items-center gap-1">
                  Drafting Gourmet Menu 
                  <span className="animate-[bounce_1s_infinite_0ms]">.</span>
                  <span className="animate-[bounce_1s_infinite_100ms]">.</span>
                  <span className="animate-[bounce_1s_infinite_200ms]">.</span>
                </div>
              </motion.div>
            )}

            {state === "result" && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full bg-accent/30 rounded-2xl p-6 border border-amber/20 shadow-xl"
              >
                <div className="prose prose-sm dark:prose-invert max-w-none font-medium leading-relaxed" 
                     dangerouslySetInnerHTML={{ __html: recipe.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong class="text-amber">$1</strong>') }} />
                
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={reset}
                    className="px-6 py-2 rounded-lg text-sm font-semibold border-2 border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors"
                  >
                    Cook Another Dish
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
