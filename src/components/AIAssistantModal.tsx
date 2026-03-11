import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Bot, Sparkles, Loader2, AlertCircle, HeartPulse, Stethoscope, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AIAssistantModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onActionSelect?: (actionType: string) => void;
  activityText: string;
  petName: string;
}

export function AIAssistantModal({ open, onOpenChange, onActionSelect, activityText, petName }: AIAssistantModalProps) {
  const [analyzing, setAnalyzing] = useState(true);
  const [analysis, setAnalysis] = useState<any>(null);

  useEffect(() => {
    if (open) {
      setAnalyzing(true);
      setAnalysis(null);

      // Simulate an AI scanning the text and taking an action
      // In a real app, this is where you'd call fetch('/api/gemini', { body: { text: activityText } })
      
      const lowerText = activityText.toLowerCase();
      const isUnwell = lowerText.includes("unwell") || lowerText.includes("poor") || lowerText.includes("sick");
      const isVaccine = lowerText.includes("vaccine") || lowerText.includes("shot");
      const isMeds = lowerText.includes("medication") || lowerText.includes("mg") || lowerText.includes("twice a day");

      setTimeout(() => {
        if (isUnwell) {
          setAnalysis({
            type: "warning",
            title: `Potential Health Issue Detected for ${petName}`,
            summary: "The medical report indicates your pet was examined and found to be in poor condition or unwell.",
            actions: [
              { icon: Stethoscope, text: "Schedule a follow-up vet appointment immediately.", primary: true, actionId: "appointment" },
              { icon: HeartPulse, text: "Log their temperature and eating habits daily.", primary: false, actionId: "other" },
              { icon: AlertCircle, text: "Monitor for signs of dehydration (lethargy, dry gums).", primary: false, actionId: null }
            ]
          });
        } else if (isVaccine) {
          setAnalysis({
            type: "success",
            title: "Vaccination Record Found",
            summary: "I found a vaccination record in this document.",
            actions: [
              { icon: Sparkles, text: "Automatically schedule next booster shot.", primary: true, actionId: "vaccine" },
              { icon: ChevronRight, text: "Update pet's immunizations list.", primary: false, actionId: "vaccine" }
            ]
          });
        } else if (isMeds) {
           setAnalysis({
            type: "info",
            title: "Medication Instructions Detected",
            summary: "This document contains dosage or medication instructions.",
            actions: [
              { icon: Sparkles, text: "Add pill reminders to your timeline.", primary: true, actionId: "medication" },
              { icon: ChevronRight, text: "Update active medications list.", primary: false, actionId: "medication" }
            ]
          });
        } else {
            setAnalysis({
            type: "neutral",
            title: "Document Analyzed",
            summary: "I've read the document and saved it to the timeline. No immediate medical action items were detected.",
            actions: [
              { icon: Sparkles, text: "Summarize the full text.", primary: true, actionId: null }
            ]
          });
        }

        setAnalyzing(false);
      }, 1500);
    }
  }, [open, activityText, petName]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] border-border bg-card">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="h-10 w-10 rounded-xl bg-violet/10 flex items-center justify-center border border-violet/20 shadow-inner">
              <Bot className="h-5 w-5 text-violet-light" style={{ color: "var(--violet)" }} />
            </div>
            <div>
              <DialogTitle className="text-xl font-display">PetCare AI Assistant</DialogTitle>
              <DialogDescription className="text-xs">
                Analyzing the recent activity log for {petName}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="pt-4 min-h-[200px]">
             {/* Source Context */}
            <div className="mb-6 p-3 rounded-lg bg-accent/30 border border-border/50 text-xs text-muted-foreground italic line-clamp-2">
                "{activityText.replace("Document text extracted:\n", "")}"
            </div>

          <AnimatePresence mode="wait">
            {analyzing ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center py-8 text-center"
              >
                <div className="relative mb-4">
                     <div className="absolute inset-0 rounded-full blur-xl bg-violet/20 animate-pulse" />
                     <Loader2 className="h-8 w-8 text-violet animate-spin relative z-10" />
                </div>
                <p className="text-sm font-medium text-foreground">Reading medical document...</p>
                <p className="text-xs text-muted-foreground mt-1">Cross-referencing symptoms and generating actionable insights.</p>
              </motion.div>
            ) : analysis ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className={`p-4 rounded-xl border ${
                    analysis.type === 'warning' ? 'bg-destructive/10 border-destructive/20' : 
                    analysis.type === 'success' ? 'bg-secondary/10 border-secondary/20' : 
                    'bg-primary/5 border-primary/10'
                }`}>
                    <h4 className={`text-base font-bold mb-1 flex items-center gap-2 ${
                        analysis.type === 'warning' ? 'text-destructive' : 
                        analysis.type === 'success' ? 'text-secondary' : 
                        'text-primary'
                    }`}>
                        {analysis.type === 'warning' && <AlertCircle className="h-4 w-4" />}
                        {analysis.type === 'success' && <Sparkles className="h-4 w-4" />}
                        {analysis.title}
                    </h4>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                        {analysis.summary}
                    </p>
                </div>

                <div>
                    <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Recommended Actions</h5>
                    <div className="space-y-2">
                        {analysis.actions.map((action: any, i: number) => (
                            <button 
                                key={i}
                                className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all text-left ${
                                    action.primary 
                                        ? 'bg-violet hover:bg-violet/90 border-violet text-white shadow-sm' 
                                        : 'bg-card hover:bg-accent border-border text-foreground hover:border-border/80'
                                }`}
                                onClick={() => {
                                  if (action.actionId && onActionSelect) {
                                    onActionSelect(action.actionId);
                                  } else {
                                    onOpenChange(false);
                                  }
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`flex items-center justify-center ${action.primary ? 'text-white/80' : 'text-muted-foreground'}`}>
                                        <action.icon className="h-4 w-4" />
                                    </div>
                                    <span className="text-sm font-medium">{action.text}</span>
                                </div>
                                {!action.primary && <ChevronRight className="h-4 w-4 text-muted-foreground/50" />}
                            </button>
                        ))}
                    </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
