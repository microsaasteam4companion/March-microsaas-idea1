import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  PawPrint, Syringe, Pill, HeartPulse, Calendar, FileText,
  Bell, Settings, LogOut, Plus, Search, TrendingUp,
  Activity, Droplets, Moon, Sun, Utensils, Camera, Shield, AlertCircle,
  ChevronRight, Weight, Clock, Thermometer, Edit, Trash2, X, Sparkles, Bot,
  Heart,
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import Tesseract from "tesseract.js";
import { toast } from "sonner";
import dogPortrait from "@/assets/dog-portrait.jpg";
import catPortrait from "@/assets/cat-portrait.jpg";
import dogGolden from "@/assets/dog_golden_retriever.png";
import dogFrenchie from "@/assets/dog_french_bulldog.png";
import dogSamoyed from "@/assets/dog_samoyed.png";
import catMaineCoon from "@/assets/cat_maine_coon.png";
import catGinger from "@/assets/cat_ginger.png";
import logoPaw from "@/assets/logo-paw.png";
import { useAuth } from "@/lib/authContext";
import { usePets } from "@/hooks/usePets";
import { useEvents } from "@/hooks/useEvents";
import { useActivities, PetActivity } from "@/hooks/useActivities";
import { AddPetModal } from "@/components/AddPetModal";
import { AddEventModal } from "@/components/AddEventModal";
import { AIAssistantModal } from "@/components/AIAssistantModal";
import { PetTranslatorModal } from "@/components/PetTranslatorModal";
import { DigitalIDModal } from "@/components/DigitalIDModal";
import { PawsAndPlatesModal } from "@/components/PawsAndPlatesModal";
import { Mic, ScanFace, ChefHat } from "lucide-react";

const generateMockChartData = (currentHealth: number, currentWeight: string) => {
  const weightNum = parseFloat(currentWeight) || 12;
  const now = new Date();
  return Array.from({length: 6}).map((_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    const monthStr = d.toLocaleDateString("en-US", { month: "short" });
    return {
      name: monthStr,
      Health: Math.round(Math.min(100, Math.max(0, currentHealth + (Math.random() * 10 - 5)))),
      Weight: Number(Math.max(0, weightNum + (Math.random() * 2 - 1)).toFixed(1))
    };
  });
};

const quickActions = [
  { id: "vaccine", icon: Syringe, label: "Add Vaccine", color: "bg-teal-light text-secondary" },
  { id: "med", icon: Pill, label: "Log Medication", color: "bg-amber-light text-primary" },
  { id: "health", icon: HeartPulse, label: "Health Check", color: "bg-coral-light text-coral" },
  { id: "doc", icon: Sparkles, label: "AI Scan Doc", color: "bg-violet text-white shadow-sm shadow-violet/20" },
  { id: "translator", icon: Mic, label: "Pet Translator", color: "bg-blue/10 text-blue font-bold shadow-sm" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { pets, loading: petsLoading, deletePet, updatePet } = usePets(user?.uid);
  const { events, loading: eventsLoading, deleteEvent, addEvent } = useEvents(user?.uid);
  const { activities, addActivity } = useActivities(user?.uid);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => document.documentElement.classList.contains("dark"));

  const toggleDarkMode = () => {
    const root = document.documentElement;
    if (root.classList.contains("dark")) {
      root.classList.remove("dark");
      setIsDarkMode(false);
    } else {
      root.classList.add("dark");
      setIsDarkMode(true);
    }
  };

  const [activePet, setActivePet] = useState(0);
  const [activeTab, setActiveTab] = useState<"overview" | "records" | "timeline">("overview");
  const [showAddPet, setShowAddPet] = useState(false);
  const [petToEdit, setPetToEdit] = useState<any>(null);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [eventToEdit, setEventToEdit] = useState<any>(null);
  const [defaultEventType, setDefaultEventType] = useState<"vaccine" | "appointment" | "medication" | "other" | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedActivityForAI, setSelectedActivityForAI] = useState<PetActivity | null>(null);
  const [showTranslator, setShowTranslator] = useState(false);
  const [showDigitalID, setShowDigitalID] = useState(false);
  const [showChefMode, setShowChefMode] = useState(false);

  const processMedicalText = (text: string) => {
    const lowerText = text.toLowerCase();
    
    // Risks
    const riskKeywords = ["unwell", "poor condition", "sick", "disease", "infection", "abnormal", "critical", "pain", "fever", "diarrhea", "vomiting", "lethargy"];
    const foundRisks = riskKeywords.filter(kw => lowerText.includes(kw));
    const hasNegativeWords = foundRisks.length > 0;

    // Medicines
    const medicineMatches = [];
    const medRegex = /([a-zA-Z0-9\-]+(?:\s+[a-zA-Z0-9\-]+){0,2})\s*(?:(?:mg|ml|tablets?|capsules?|drops?|mcg|g)\b)?\s*(?:to be taken|take|give)?\s*(\d+\s*times?(?:\s*a\s*day)?|twice a day|once a day|thrice a day|every \d+\s*hours?|bid|sid|tid|q\d+h)\s*(?:at\s+)?(\d{1,2}(?::\d{2})?\s*(?:am|pm))?/gi;
    let match;
    while ((match = medRegex.exec(text)) !== null) {
        const medName = match[1].trim();
        const frequency = match[2].trim();
        const specificTime = match[3] ? ` at ${match[3].trim()}` : '';
        if (medName.toLowerCase() !== 'and' && medName.toLowerCase() !== 'the') {
           medicineMatches.push(`Prescribed Medication: ${medName} - ${frequency}${specificTime}`);
        }
    }
    if (medicineMatches.length === 0) {
        if (lowerText.includes("twice a day") || lowerText.includes("bid") || lowerText.includes("2 times")) medicineMatches.push("Medication direction: Twice a day");
        if (lowerText.includes("once a day") || lowerText.includes("sid") || lowerText.includes("1 time")) medicineMatches.push("Medication direction: Once a day");
        if (lowerText.includes("thrice a day") || lowerText.includes("tid") || lowerText.includes("3 times")) medicineMatches.push("Medication direction: Thrice a day");
    }

    // Activities
    const activityMatches = [];
    if (lowerText.includes("walk") || lowerText.match(/exercise (\d+) mins/)) {
       const actStr = text.match(/.{0,20}(?:exercise|walk).{0,30}/i);
       activityMatches.push(`Activity Note: ${actStr ? actStr[0].trim() : "Light walks recommended"}`);
    }
    if (lowerText.includes("rest") || lowerText.includes("sleep") || lowerText.includes("cage")) {
       activityMatches.push("Activity Note: Strict rest recommended.");
    }
    if (lowerText.includes("diet") || lowerText.includes("food")) {
       const dietStr = text.match(/.{0,20}(?:diet|food|feed).{0,30}/i);
       activityMatches.push(`Diet Note: ${dietStr ? dietStr[0].trim() : "Monitor food intake"}`);
    }

    let summary = `🩺 Medical Report Summary:\n\n`;
    if (hasNegativeWords) {
        summary += `⚠️ Potential Risks:\nThe report indicates possible health issues, specifically mentioning: ${foundRisks.join(", ")}. This may indicate an infection or condition that requires attention.\n\n`;
        summary += `🛡️ Recommended Precautions:\n- Please consult your veterinarian to discuss these findings immediately.\n- Follow any prescribed medication strictly.`;
    } else {
        summary += `✅ Potential Risks:\nNo immediate critical risks detected. The document appears to reflect a routine checkup or normal parameters.\n\n`;
        summary += `🛡️ Recommended Precautions:\n- Continue regular preventive care.\n- Maintain a balanced diet and regular exercise.`;
    }

    return { summary, hasNegativeWords, medicineMatches, activityMatches };
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    toast.promise(
      Tesseract.recognize(file, 'eng').then(async ({ data: { text } }) => {
        let loggedActivity = Promise.resolve();
        const { summary, hasNegativeWords, medicineMatches, activityMatches } = processMedicalText(text);

        // Name Matching for Pet Context Switching
        const lowerText = text.toLowerCase();
        let targetPetIndex = activePet;
        let foundPet = pets.find((p, index) => {
            if (p.name) {
                // Use regex with word boundaries to ensure we match the exact name, regardless of surrounding punctuation
                const nameRegex = new RegExp(`\\b${p.name.toLowerCase()}\\b`, 'i');
                if (nameRegex.test(lowerText)) {
                    targetPetIndex = index;
                    return true;
                }
            }
            return false;
        });

        const currentPet = foundPet || pets[activePet] || pets[0];
        
        // Auto-switch pet view if we detected a distinct pet name in the text
        if (foundPet && targetPetIndex !== activePet) {
            setActivePet(targetPetIndex);
            toast.success(`Detected ${currentPet.name}'s name in document. Switching profile.`);
        }

        if (addActivity && currentPet) {
          loggedActivity = addActivity({
            petId: currentPet.id,
            petName: currentPet.name,
            text: summary,
            iconName: "FileText" as any
          }) as unknown as Promise<void>;

          for (const med of medicineMatches) {
            // Also log literal medication events into their pet timeline for tracking
            if (addEvent) {
                await addEvent({
                    petId: currentPet.id,
                    petName: currentPet.name,
                    title: med,
                    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                    type: "medication",
                    urgent: true
                });
            }
            addActivity({ petId: currentPet.id, petName: currentPet.name, text: med, iconName: "Pill" as any });
          }
          for (const act of activityMatches) {
            addActivity({ petId: currentPet.id, petName: currentPet.name, text: act, iconName: "Activity" as any });
          }
        }

        if (hasNegativeWords && updatePet && currentPet) {
          const currentScore = currentPet.healthScore || 100;
          const dropAmount = Math.floor(Math.random() * 10) + 5;
          const newScore = Math.max(0, currentScore - dropAmount);

          await updatePet(currentPet.id, {
            healthScore: newScore
          });

          setTimeout(() => {
            toast.warning(`${currentPet.name}'s health score decreased to ${newScore}% based on the recent medical document. Please consult your vet.`);
          }, 1000);
        }

        return loggedActivity;
      }),
      {
        loading: 'Extracting text via OCR...',
        success: 'Text extracted and analyzed!',
        error: 'Failed to extract text from document',
      }
    );

    // Reset file input
    event.target.value = "";
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleEditPetClick = () => {
    setPetToEdit(pet);
    setShowAddPet(true);
  };

  const handleDeletePetClick = async () => {
    if (!pet) return;
    const confirmDelete = window.confirm(`Are you absolutely sure you want to completely remove ${pet.name} and all their records?`);
    if (confirmDelete) {
      const success = await deletePet(pet.id);
      if (success && pets.length > 0) setActivePet(0);
    }
  };

  if (!user) return null;

  const displayName = user.displayName || user.email?.split("@")[0] || "User";

  // Fallback safe pet selection
  const pet = pets.length > 0 ? pets[activePet] || pets[0] : null;

  // Use dynamic default images if empty
  const getPetImage = (petObj: any) => {
    if (!petObj) return logoPaw;
    if (petObj.image) return petObj.image;
    const species = (petObj.species || "").toLowerCase();
    if (species.includes("cat")) return catPortrait;
    if (species.includes("dog") || species.includes("puppy")) return dogPortrait;
    
    if (species.includes("bird") || species.includes("parrot") || species.includes("macaw") || species.includes("canary") || species.includes("cockatiel")) {
        // Hash the pet's name to consistently pick one of the 3 bird avatars
        const charSum = (petObj.name || "").split("").reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
        const index = (charSum % 3) + 1;
        return `/bird_avatar_${index}.png`;
    }

    if (species.includes("rabbit") || species.includes("bunny") || species.includes("guinea") || species.includes("hamster") || species.includes("exotic")) {
        return `/other_pet_avatar.png`;
    }
    
    return logoPaw; // Ultimate fallback
  };

  // Helper map for dynamically parsing icons from DB string
  const getIconComponent = (iconName: string) => {
    const icons: Record<string, any> = { Activity, Utensils, Moon, Droplets, Weight, Thermometer, Syringe, Pill };
    return icons[iconName] || Activity;
  };

  const filteredActivity = activities.filter(a => {
    const matchesSearch = searchQuery ? a.text.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    const matchesPet = pet ? a.petId === pet.id : true;
    return matchesSearch && matchesPet;
  });

  // Filter dynamic events for Records tab
  const petRecords = pet ? events.filter(e => e.petId === pet.id && (e.type === "vaccine" || e.type === "medication")) : [];

  const upcomingEvents = pet ? events.filter(e => e.petId === pet.id) : events;

  // Compute stats
  const avgHealth = pets.length > 0 ? Math.round(pets.reduce((acc, p) => acc + p.healthScore, 0) / pets.length) : 0;
  const activeMedsCount = events.filter(e => e.type === "medication").length;
  const vaccinesDueCount = events.filter(e => e.type === "vaccine").length;

  // Compute Alerts based on urgent events
  const urgentAlerts = upcomingEvents.filter(e => e.urgent);

  return (
    <div className="min-h-screen bg-background">
      {/* Hidden file input for OCR */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center shadow-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-primary-foreground">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
              </svg>
            </div>
            <span className="font-display text-lg font-bold text-foreground tracking-tight hidden sm:inline">PetCare OS</span>
          </div>

          <div className="hidden md:flex items-center gap-1 bg-accent/50 rounded-lg px-4 py-2 w-72 border border-border/50">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search pets, records, events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="text-muted-foreground hover:text-foreground">
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button onClick={toggleDarkMode} className="relative p-2.5 rounded-lg hover:bg-accent transition-colors">
              {isDarkMode ? <Sun className="h-4 w-4 text-muted-foreground" /> : <Moon className="h-4 w-4 text-muted-foreground" />}
            </button>
            <div className="w-px h-6 bg-border mx-1" />
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-sm font-bold text-foreground border border-border/50 shadow-sm">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-foreground hidden sm:inline">{displayName}</span>
            </div>
            <button onClick={handleLogout}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-6 max-w-7xl">
        {/* Greeting */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight font-display">
            Good morning, {displayName} 👋
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            You have <span className="font-semibold text-primary">{events.length} upcoming events</span> across {pets.length} pets.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Avg Health", value: `${avgHealth}%`, icon: HeartPulse, color: "text-foreground", bg: "bg-accent", trend: (pts: number) => pts > 0 ? "Tracking" : "Need Data" },
            { label: "Active Meds", value: activeMedsCount.toString(), icon: Pill, color: "text-foreground", bg: "bg-accent", trend: "Scheduled" },
            { label: "Appointments", value: events.length.toString(), icon: Calendar, color: "text-foreground", bg: "bg-accent", trend: "Upcoming" },
            { label: "Total Pets", value: pets.length.toString(), icon: PawPrint, color: "text-foreground", bg: "bg-accent", trend: "Managed" },
          ].map((s) => (
            <div key={s.label} className="rounded-lg border border-border/60 bg-card p-5 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{s.label}</div>
                <div className={`h-10 w-10 rounded-md ${s.bg} flex items-center justify-center border border-border/50`}>
                  <s.icon className={`h-5 w-5 ${s.color}`} />
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground font-display leading-none mb-1">{s.value}</div>
                <div className="text-xs text-muted-foreground font-medium">{typeof s.trend === 'function' ? s.trend(pets.length) : s.trend}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Quick actions */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Quick Actions</h2>
            <button
              onClick={() => { setEventToEdit(null); setDefaultEventType(undefined); setShowAddEvent(true); }}
              className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
            >
              <Plus className="h-3 w-3" /> Add Event
            </button>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {quickActions.map((a) => (
              <button key={a.label}
                onClick={() => {
                  if (a.id === "doc") {
                    fileInputRef.current?.click();
                  } else if (a.id === "translator") {
                    setShowTranslator(true);
                  } else if (a.id === "vaccine") {
                    setDefaultEventType("vaccine"); setEventToEdit(null); setShowAddEvent(true);
                  } else if (a.id === "med") {
                    setDefaultEventType("medication"); setEventToEdit(null); setShowAddEvent(true);
                  } else if (a.id === "health") {
                    setDefaultEventType("appointment"); setEventToEdit(null); setShowAddEvent(true);
                  }
                }}
                className="flex flex-col items-center gap-3 rounded-lg border border-border/60 bg-card p-4 hover:border-border hover:shadow-sm transition-all duration-200">
                <div className={`h-10 w-10 rounded-md ${a.id === 'doc' ? a.color : 'bg-accent'} flex items-center justify-center border border-border/50`}>
                  <a.icon className={`h-5 w-5 ${a.id === 'doc' ? 'text-white' : 'text-foreground'}`} />
                </div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{a.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pet selector */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-foreground">My Pets</h2>
                <button
                  onClick={() => { setPetToEdit(null); setShowAddPet(true); }}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                  <Plus className="h-3.5 w-3.5" /> Add Pet
                </button>
              </div>

              {petsLoading ? (
                <div className="animate-pulse flex gap-3 mb-4">
                  <div className="h-16 w-32 bg-accent rounded-xl" />
                  <div className="h-16 w-32 bg-accent rounded-xl" />
                </div>
              ) : pets.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border p-8 text-center bg-card/50">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <PawPrint className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-1">No pets yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">Add your first pet to start tracking their health and records.</p>
                  <button
                    onClick={() => { setPetToEdit(null); setShowAddPet(true); }}
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity">
                    <Plus className="h-4 w-4" /> Add Pet
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex gap-3 mb-6 overflow-x-auto pb-2 scrollbar-none">
                    {pets.map((p, i) => (
                      <button key={p.id} onClick={() => setActivePet(i)}
                        className={`flex items-center gap-3 rounded-lg border px-4 py-3 transition-all duration-200 shrink-0 ${activePet === i
                          ? "border-primary bg-primary/5 shadow-sm"
                          : "border-border/60 bg-card hover:border-border"
                          }`}>
                        <div className="relative inline-block">
                          <img src={getPetImage(p)} alt={p.name} className={`h-12 w-12 rounded-md object-cover shadow-sm transition-all duration-300 ${p.healthScore < 80 || events.some(e => e.petId === p.id && e.urgent) ? "avatar-warning border-2 border-destructive" : ""}`} />
                        </div>
                        <div className="text-left">
                          <div className="text-base font-bold text-foreground font-display">{p.name}</div>
                          <div className="text-sm text-muted-foreground">{p.breed}</div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {pet && (
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={pet.id}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="rounded-lg border border-border/60 bg-card overflow-hidden shadow-sm"
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6">
                          <div className="relative inline-block shrink-0">
                            <img src={getPetImage(pet)} alt={pet.name} className={`h-20 w-20 rounded-md object-cover shadow-sm border transition-all duration-300 ${pet.healthScore < 80 || urgentAlerts.length > 0 ? "avatar-warning border-destructive" : "border-border/50"}`} />
                            {pet.healthScore >= 80 && urgentAlerts.length === 0 && (
                              <div className="absolute inset-0 pointer-events-none overflow-visible">
                                <Heart className="absolute -top-2 -right-2 h-5 w-5 text-coral animate-float-hearts" fill="currentColor" />
                                <Sparkles className="absolute -bottom-2 -left-2 h-4 w-4 text-amber animate-sparkle-spin" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-1.5">
                              <h3 className="text-3xl font-bold text-foreground font-display">{pet.name}</h3>
                              <span className="text-xs uppercase tracking-widest bg-accent border border-border/50 px-3 py-1.5 rounded-md text-muted-foreground font-bold">{pet.mood}</span>
                            </div>
                            <p className="text-base text-muted-foreground">{pet.breed} · {pet.age} · {pet.weight}</p>
                          </div>
                          <div className="text-left sm:text-right w-full sm:w-auto mt-2 sm:mt-0 pt-4 sm:pt-0 border-t border-border/50 sm:border-0">
                            <div className="text-4xl font-bold text-foreground font-display leading-none mb-1">{pet.healthScore}%</div>
                            <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Health Score</div>
                          </div>
                        </div>

                        {/* Tab navigation */}
                        <div className="border-t border-border px-5">
                          <div className="flex gap-0">
                            {(["overview", "records", "timeline"] as const).map((tab) => (
                              <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-5 py-4 text-sm font-semibold capitalize border-b-2 transition-colors ${activeTab === tab
                                  ? "border-primary text-primary"
                                  : "border-transparent text-muted-foreground hover:text-foreground"
                                  }`}
                              >
                                {tab}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Tab content */}
                        <div className="p-5">
                          {activeTab === "overview" && (
                            <div>
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                                {[
                                  { label: "Weight", value: pet.weight, icon: Weight },
                                  { label: "Medications", value: events.filter(e => e.petId === pet.id && e.type === "medication").map(m => m.title.replace(/Prescribed Medication:\s*/i, '').replace(/Medication direction:\s*/i, '').trim()).join(', ') || "0", icon: Pill },
                                  { label: "Last Vet Visit", value: pet.lastVisit, icon: Calendar },
                                  { label: "Next Vaccine", value: pet.nextVaccine.split("—")[0].trim(), icon: Syringe },
                                ].map((s) => (
                                  <div key={s.label} className="rounded-lg bg-accent/50 p-3 text-center flex flex-col justify-center overflow-hidden">
                                    <s.icon className="h-5 w-5 text-muted-foreground mx-auto mb-2 shrink-0" />
                                    <div className={`font-bold text-foreground px-1 mb-0.5 ${s.label === 'Medications' && s.value !== '0' ? 'text-[10px] leading-tight line-clamp-2' : 'text-base truncate'}`} title={s.value}>{s.value}</div>
                                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{s.label}</div>
                                  </div>
                                ))}
                              </div>

                              {/* Interactive Health Tracking Chart */}
                              <div className="mb-4 rounded-lg border border-border bg-card p-4">
                                <h4 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                                  <TrendingUp className="h-4 w-4 text-primary" />
                                  Health & Weight Trends
                                </h4>
                                <div className="h-48 w-full">
                                  <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={generateMockChartData(pet.healthScore, pet.weight)} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} dy={10} />
                                      <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                                      <YAxis yAxisId="right" orientation="right" domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                                      <Tooltip
                                        contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }}
                                        itemStyle={{ color: "hsl(var(--foreground))", fontWeight: "bold" }}
                                        labelStyle={{ color: "hsl(var(--muted-foreground))" }}
                                      />
                                      <Line yAxisId="right" name="Health Score" type="monotone" dataKey="Health" stroke="hsl(var(--secondary))" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                                      <Line yAxisId="left" name="Weight (kg)" type="monotone" dataKey="Weight" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                                    </LineChart>
                                  </ResponsiveContainer>
                                </div>
                              </div>

                              {/* Dynamic AI Insight Recommendation */}
                              <div className={`mb-4 rounded-lg border p-4 ${
                                pet.healthScore < 80 ? "border-destructive/20 bg-destructive/5" : "border-violet/20 bg-violet/5"
                              }`}>
                                <h4 className={`text-sm font-bold flex items-center gap-2 mb-2 ${
                                    pet.healthScore < 80 ? "text-destructive" : "text-violet"
                                }`}>
                                    <Bot className="h-4 w-4" />
                                    AI Health Insights
                                </h4>
                                <p className="text-xs text-foreground/80 leading-relaxed">
                                    {pet.healthScore < 80
                                      ? "Given the recent drop in health score, consider a bland diet of boiled chicken and white rice. Ensure they have constant access to fresh water and avoid rich or fatty foods."
                                      : "Health condition is excellent. Maintain current balanced diet. You can offer occasional healthy treats like baby carrots or apple slices."}
                                </p>
                              </div>

                              <div className="flex flex-wrap gap-2">
                                {[
                                  { icon: FileText, label: "View Records", onClick: () => setActiveTab("records") },
                                  { icon: Edit, label: "Edit Profile", onClick: handleEditPetClick },
                                  { icon: ScanFace, label: "Digital ID", onClick: () => setShowDigitalID(true) },
                                ].map((a) => (
                                  <button key={a.label} onClick={a.onClick}
                                    className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground hover:bg-accent hover:border-primary/20 transition-all">
                                    <a.icon className="h-3.5 w-3.5 text-muted-foreground" />
                                    {a.label}
                                  </button>
                                ))}
                                <button
                                  onClick={handleDeletePetClick}
                                  className="inline-flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2 text-xs font-semibold text-destructive hover:bg-destructive/10 transition-all ml-auto">
                                  <Trash2 className="h-3.5 w-3.5" />
                                  Remove Pet
                                </button>
                              </div>
                            </div>
                          )}

                          {activeTab === "records" && (
                            <div className="space-y-2">
                              {petRecords.length === 0 ? (
                                <div className="p-4 text-center text-xs text-muted-foreground">No records added yet. Add records via Quick Actions.</div>
                              ) : petRecords.map((r, i) => (
                                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border border-border p-3 hover:bg-accent/30 transition-colors">
                                  <div className="flex items-center gap-3">
                                    <div className={`h-2 w-2 rounded-full ${r.urgent ? "bg-destructive" : "bg-secondary"}`} />
                                    <div>
                                      <div className="text-sm font-semibold text-foreground">{r.title}</div>
                                      <div className="text-xs text-muted-foreground capitalize">{r.type}</div>
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto mt-2 sm:mt-0 pt-2 sm:pt-0 border-t border-border sm:border-0 border-dashed">
                                    <div className={`text-xs font-bold ${r.urgent ? "text-destructive" : "text-secondary"}`}>
                                      {r.date}
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <button onClick={() => { setEventToEdit(r); setShowAddEvent(true); }} className="p-1.5 hover:bg-accent rounded-md text-muted-foreground hover:text-foreground">
                                        <Edit className="h-3.5 w-3.5" />
                                      </button>
                                      <button onClick={async () => {
                                        if (window.confirm('Delete this record?')) await deleteEvent(r.id);
                                      }} className="p-1.5 hover:bg-destructive/10 rounded-md text-muted-foreground hover:text-destructive">
                                        <Trash2 className="h-3.5 w-3.5" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {activeTab === "timeline" && (
                            <div className="space-y-3">
                              {filteredActivity.length === 0 ? (
                                <div className="text-center text-xs text-muted-foreground p-4">No recent activity.</div>
                              ) : filteredActivity.filter(a => a.petId === pet.id).map((a, i) => {
                                const IconComp = getIconComponent(a.iconName);
                                return (
                                  <button key={i} onClick={() => setSelectedActivityForAI(a as PetActivity)} className="w-full text-left flex items-center gap-3 p-2 rounded-lg hover:bg-accent/30 transition-colors cursor-pointer">
                                    <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center shrink-0">
                                      <IconComp className="h-3.5 w-3.5 text-muted-foreground" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="text-sm text-foreground">{a.text}</div>
                                      <div className="text-[10px] text-muted-foreground">
                                        {a.createdAt ? new Date(a.createdAt?.toDate?.() || Date.now()).toLocaleDateString() : 'Just now'}
                                      </div>
                                    </div>
                                  </button>
                                )
                              })}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  )}
                </>
              )}
            </motion.div>

            {/* Activity feed */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-foreground">Recent Activity</h2>
                <span className="text-xs text-muted-foreground">{filteredActivity.length} entries</span>
              </div>
              <div className="rounded-xl border border-border bg-card divide-y divide-border">
                {filteredActivity.length === 0 ? (
                  <div className="p-4 text-center text-sm text-muted-foreground">No recent activity found.</div>
                ) : filteredActivity.slice(0, 5).map((a, i) => {
                  const IconComp = getIconComponent(a.iconName);
                  return (
                    <button key={i} onClick={() => setSelectedActivityForAI(a as PetActivity)} className="w-full text-left flex items-center gap-4 p-4 hover:bg-accent/30 transition-colors cursor-pointer">
                      <div className="h-9 w-9 rounded-lg bg-accent flex items-center justify-center shrink-0">
                        <IconComp className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground">{a.petName} — {a.text}</div>
                        <div className="text-xs text-muted-foreground">
                          {a.createdAt ? new Date(a.createdAt?.toDate?.() || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                    </button>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming events */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-foreground">Upcoming</h2>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="rounded-xl border border-border bg-card divide-y divide-border">
                {upcomingEvents.length === 0 ? (
                  <div className="p-4 text-center text-sm text-muted-foreground">No upcoming events.</div>
                ) : upcomingEvents.map((ev, i) => (
                  <div key={i} className="group flex items-center justify-between gap-3 p-3 hover:bg-accent/30 transition-colors">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className={`h-8 w-8 rounded-md flex items-center justify-center shrink-0 border border-border/50 shadow-sm ${ev.type === "vaccine" ? "bg-accent text-foreground" :
                        ev.type === "medication" ? "bg-primary/10 text-primary" :
                          "bg-primary/5 text-foreground"
                        }`}>
                        {ev.type === "vaccine" ? <Syringe className="h-3.5 w-3.5" /> :
                          ev.type === "medication" ? <Pill className="h-3.5 w-3.5" /> :
                            <Calendar className="h-3.5 w-3.5" />}
                      </div>
                      <div className="flex-1 min-w-0 pr-2">
                        <div className="flex items-center gap-2">
                          <div className="text-xs font-medium text-foreground truncate">{ev.title}</div>
                          {ev.urgent && (
                            <span className="shrink-0 text-[8px] font-bold text-destructive bg-destructive/10 px-1 py-0.5 rounded-full">
                              SOON
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-muted-foreground">{ev.petName} · {ev.date}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      <button onClick={() => { setEventToEdit(ev); setShowAddEvent(true); }} className="p-1.5 hover:bg-accent rounded-md text-muted-foreground hover:text-foreground">
                        <Edit className="h-3.5 w-3.5" />
                      </button>
                      <button onClick={async () => {
                        if (window.confirm('Delete this event?')) await deleteEvent(ev.id);
                      }} className="p-1.5 hover:bg-destructive/10 rounded-md text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Health overview */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h2 className="text-lg font-bold text-foreground mb-3">Health Overview</h2>
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-11 w-11 rounded-xl bg-teal-light flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground font-display">{avgHealth}%</div>
                    <div className="text-xs text-muted-foreground font-medium">Average Health Score</div>
                  </div>
                </div>
                <div className="space-y-3">
                  {pets.length === 0 ? (
                    <div className="text-center text-sm text-muted-foreground">Add pets to see health overview.</div>
                  ) : pets.map((p) => (
                    <div key={p.id}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <img src={getPetImage(p)} alt={p.name} className="h-5 w-5 rounded-full object-cover" />
                          <span className="text-xs font-semibold text-foreground">{p.name}</span>
                        </div>
                        <span className="text-xs font-bold text-secondary">{p.healthScore}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-accent overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${p.healthScore}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full rounded-full bg-secondary"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Alerts */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <h2 className="text-lg font-bold text-foreground mb-3">Alerts</h2>
              <div className="space-y-2">
                {urgentAlerts.length === 0 ? (
                  <div className="rounded-xl border border-primary/20 bg-primary/5 p-3.5 flex items-start gap-3">
                    <HeartPulse className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold text-foreground">All clear!</div>
                      <div className="text-xs text-muted-foreground mt-0.5">No urgent alerts or pending medications right now.</div>
                    </div>
                  </div>
                ) : (
                  urgentAlerts.map(alert => (
                    <div key={alert.id} className="rounded-xl border border-destructive/20 bg-destructive/5 p-3.5 flex items-start gap-3">
                      <AlertCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-semibold text-foreground">{alert.title}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">Scheduled for: {alert.date}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>

            {/* Pet Gallery */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <h2 className="text-lg font-bold text-foreground mb-3">🐾 Pet Gallery</h2>
              <div className="rounded-xl border border-border bg-card p-4">
                {pets.length === 0 ? (
                  <p className="text-xs text-muted-foreground text-center py-4">Add pets to see their gallery here.</p>
                ) : (
                  <div className="grid grid-cols-3 gap-2">
                    {pets.slice(0, 6).map((p) => (
                      <div key={p.id} className="relative group overflow-hidden rounded-lg aspect-square">
                        <img
                          src={getPetImage(p)}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-1.5">
                          <span className="text-[10px] font-bold text-white truncate">{p.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <PetTranslatorModal
        open={showTranslator}
        onOpenChange={setShowTranslator}
        petName={pet?.name}
      />
      <DigitalIDModal
        open={showDigitalID}
        onOpenChange={setShowDigitalID}
        pet={pet}
        ownerName={displayName}
        petImage={getPetImage(pet)}
      />
      <PawsAndPlatesModal
        open={showChefMode}
        onOpenChange={setShowChefMode}
        petName={pet?.name}
      />
      <AddPetModal
        open={showAddPet}
        onOpenChange={setShowAddPet}
        editPetData={petToEdit}
      />

      {pet && (
        <AddEventModal
          open={showAddEvent}
          onOpenChange={setShowAddEvent}
          petId={pet.id}
          petName={pet.name}
          petScore={pet.healthScore}
          editEventData={eventToEdit}
          defaultType={defaultEventType}
        />
      )}

      {selectedActivityForAI && (
        <AIAssistantModal
          open={!!selectedActivityForAI}
          onOpenChange={(open) => !open && setSelectedActivityForAI(null)}
          onActionSelect={(actionType) => {
            setSelectedActivityForAI(null);
            if (actionType && pet) {
              setDefaultEventType(actionType as any);
              setEventToEdit(null);
              setShowAddEvent(true);
            }
          }}
          activityText={selectedActivityForAI.text}
          petName={selectedActivityForAI.petName}
        />
      )}

      {/* Floating Chatbot Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          if (pet && activities.length > 0) {
            setSelectedActivityForAI(activities[0] as PetActivity);
          } else {
            toast.info("Ask me anything about your pet's health!", { description: "Add a pet and some activity to get personalized AI insights." });
          }
        }}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-xl flex items-center justify-center hover:bg-primary/90 transition-colors"
        aria-label="Open AI Pet Assistant"
      >
        <Bot className="h-6 w-6" />
      </motion.button>
    </div>
  );
};

export default Dashboard;
