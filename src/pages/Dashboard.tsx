import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  PawPrint, Syringe, Pill, HeartPulse, Calendar, FileText,
  Bell, Settings, LogOut, Plus, Search, TrendingUp,
  Activity, Droplets, Moon, Utensils, Camera, Shield, AlertCircle,
  ChevronRight, Weight, Clock, Thermometer, Edit, Trash2, X,
} from "lucide-react";
import dogPortrait from "@/assets/dog-portrait.jpg";
import catPortrait from "@/assets/cat-portrait.jpg";

interface Pet {
  id: number; name: string; breed: string; age: string; weight: string;
  image: string; healthScore: number; nextVaccine: string;
  medications: number; lastVisit: string; mood: string; species: string;
}

const defaultPets: Pet[] = [
  {
    id: 1, name: "Buddy", breed: "Golden Retriever", age: "3 years", weight: "32 kg",
    image: dogPortrait, healthScore: 98, nextVaccine: "Rabies — Dec 15",
    medications: 1, lastVisit: "Nov 2, 2026", mood: "Happy 🐕", species: "Dog",
  },
  {
    id: 2, name: "Luna", breed: "British Shorthair", age: "2 years", weight: "4.5 kg",
    image: catPortrait, healthScore: 95, nextVaccine: "FVRCP — Jan 8",
    medications: 0, lastVisit: "Oct 18, 2026", mood: "Relaxed 🐈", species: "Cat",
  },
];

const upcomingEvents = [
  { icon: Syringe, title: "Rabies Vaccine — Buddy", date: "Dec 15, 2026", type: "vaccine", urgent: true },
  { icon: Calendar, title: "Annual Checkup — Luna", date: "Dec 22, 2026", type: "appointment", urgent: false },
  { icon: Pill, title: "Heartworm Pill — Buddy", date: "Dec 1, 2026", type: "medication", urgent: false },
  { icon: Syringe, title: "FVRCP Booster — Luna", date: "Jan 8, 2027", type: "vaccine", urgent: false },
];

const quickActions = [
  { icon: Syringe, label: "Add Vaccine", color: "bg-teal-light text-secondary" },
  { icon: Pill, label: "Log Medication", color: "bg-amber-light text-primary" },
  { icon: HeartPulse, label: "Health Check", color: "bg-coral-light text-coral" },
  { icon: FileText, label: "Upload Doc", color: "bg-violet-light text-violet" },
  { icon: Camera, label: "Add Photo", color: "bg-blue-light text-blue" },
  { icon: Shield, label: "Insurance", color: "bg-teal-light text-secondary" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [activePet, setActivePet] = useState(0);
  const [activeTab, setActiveTab] = useState<"overview" | "records" | "timeline">("overview");
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [activityLog, setActivityLog] = useState([
    { time: "Today, 8:30 AM", text: "Buddy — Morning walk completed (45 min)", icon: Activity, pet: "Buddy" },
    { time: "Today, 7:00 AM", text: "Luna — Breakfast served (wet food)", icon: Utensils, pet: "Luna" },
    { time: "Yesterday, 10 PM", text: "Buddy — Sleep tracked (9h 12m)", icon: Moon, pet: "Buddy" },
    { time: "Yesterday, 6 PM", text: "Luna — Water intake logged (220ml)", icon: Droplets, pet: "Luna" },
    { time: "Yesterday, 2 PM", text: "Buddy — Weight check: 32 kg ✓", icon: Weight, pet: "Buddy" },
    { time: "2 days ago", text: "Luna — Temperature normal: 38.5°C", icon: Thermometer, pet: "Luna" },
  ]);

  const [vaccineRecords] = useState([
    { name: "Rabies", date: "Jun 15, 2026", status: "current", next: "Dec 15, 2026", pet: "Buddy" },
    { name: "DHPP", date: "Mar 10, 2026", status: "current", next: "Mar 10, 2027", pet: "Buddy" },
    { name: "Bordetella", date: "Sep 1, 2026", status: "current", next: "Mar 1, 2027", pet: "Buddy" },
    { name: "FVRCP", date: "Jul 8, 2026", status: "expiring", next: "Jan 8, 2027", pet: "Luna" },
    { name: "Rabies", date: "Aug 20, 2026", status: "current", next: "Aug 20, 2027", pet: "Luna" },
  ]);

  const isPreview = new URLSearchParams(window.location.search).get("preview") === "true";

  useEffect(() => {
    if (isPreview) {
      setUser({ name: "Demo User", email: "demo@test.com" });
      return;
    }
    const stored = localStorage.getItem("petcare_user");
    if (!stored) { navigate("/auth"); return; }
    setUser(JSON.parse(stored));
  }, [navigate, isPreview]);

  const handleLogout = () => {
    localStorage.removeItem("petcare_user");
    navigate("/");
  };

  if (!user) return null;

  const pet = defaultPets[activePet];
  const filteredActivity = searchQuery
    ? activityLog.filter(a => a.text.toLowerCase().includes(searchQuery.toLowerCase()))
    : activityLog;
  const petVaccines = vaccineRecords.filter(v => v.pet === pet.name);

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <PawPrint className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold text-foreground tracking-tight hidden sm:inline">PetCare OS</span>
          </div>

          <div className="hidden md:flex items-center gap-1 bg-accent rounded-xl px-4 py-2 w-72">
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
            <button className="relative p-2.5 rounded-xl hover:bg-accent transition-colors">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive ring-2 ring-card" />
            </button>
            <button className="p-2.5 rounded-xl hover:bg-accent transition-colors">
              <Settings className="h-4 w-4 text-muted-foreground" />
            </button>
            <div className="w-px h-6 bg-border mx-1" />
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                {user.name.charAt(0)}
              </div>
              <span className="text-sm font-medium text-foreground hidden sm:inline">{user.name}</span>
            </div>
            <button onClick={handleLogout}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-6 max-w-7xl">
        {/* Greeting */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight font-display">
            Good morning, {user.name} 👋
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            You have <span className="font-semibold text-primary">2 upcoming events</span> this week across {defaultPets.length} pets.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Avg Health", value: "96.5%", icon: HeartPulse, color: "text-secondary", bg: "bg-teal-light", trend: "+2.1%" },
            { label: "Active Meds", value: "1", icon: Pill, color: "text-primary", bg: "bg-amber-light", trend: "On track" },
            { label: "Vaccines Due", value: "2", icon: Syringe, color: "text-coral", bg: "bg-coral-light", trend: "This month" },
            { label: "Total Pets", value: defaultPets.length.toString(), icon: PawPrint, color: "text-violet", bg: "bg-violet-light", trend: "All healthy" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-card p-4 flex items-center gap-3 hover:shadow-sm transition-shadow">
              <div className={`h-10 w-10 rounded-xl ${s.bg} flex items-center justify-center shrink-0`}>
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <div>
                <div className="text-lg font-bold text-foreground font-display leading-tight">{s.value}</div>
                <div className="text-[10px] text-muted-foreground font-medium">{s.label}</div>
                <div className="text-[10px] text-secondary font-semibold">{s.trend}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Quick actions */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Quick Actions</h2>
            <button
              onClick={() => setShowAddEvent(!showAddEvent)}
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              <Plus className="h-3 w-3" /> Add Event
            </button>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {quickActions.map((a) => (
              <button key={a.label}
                className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-3 hover:border-primary/20 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className={`h-10 w-10 rounded-xl ${a.color} flex items-center justify-center`}>
                  <a.icon className="h-4 w-4" />
                </div>
                <span className="text-[11px] font-semibold text-foreground">{a.label}</span>
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
                <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                  <Plus className="h-3.5 w-3.5" /> Add Pet
                </button>
              </div>

              <div className="flex gap-3 mb-4">
                {defaultPets.map((p, i) => (
                  <button key={p.id} onClick={() => setActivePet(i)}
                    className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-200 ${
                      activePet === i
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border bg-card hover:border-primary/20"
                    }`}>
                    <img src={p.image} alt={p.name} className="h-10 w-10 rounded-lg object-cover" />
                    <div className="text-left">
                      <div className="text-sm font-bold text-foreground">{p.name}</div>
                      <div className="text-xs text-muted-foreground">{p.breed}</div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Pet detail card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={pet.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="rounded-2xl border border-border bg-card overflow-hidden"
                >
                  <div className="flex items-center gap-5 p-5">
                    <img src={pet.image} alt={pet.name} className="h-16 w-16 rounded-2xl object-cover ring-2 ring-primary/10" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="text-lg font-bold text-foreground font-display">{pet.name}</h3>
                        <span className="text-xs bg-accent px-2 py-0.5 rounded-full text-muted-foreground font-medium">{pet.mood}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{pet.breed} · {pet.age} · {pet.weight}</p>
                    </div>
                    <div className="text-right hidden sm:block">
                      <div className="text-2xl font-bold text-secondary font-display">{pet.healthScore}%</div>
                      <div className="text-[10px] text-muted-foreground font-medium">Health Score</div>
                    </div>
                  </div>

                  {/* Tab navigation */}
                  <div className="border-t border-border px-5">
                    <div className="flex gap-0">
                      {(["overview", "records", "timeline"] as const).map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`px-4 py-3 text-xs font-semibold capitalize border-b-2 transition-colors ${
                            activeTab === tab
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
                            { label: "Medications", value: pet.medications.toString(), icon: Pill },
                            { label: "Last Vet Visit", value: pet.lastVisit, icon: Calendar },
                            { label: "Next Vaccine", value: pet.nextVaccine.split("—")[0].trim(), icon: Syringe },
                          ].map((s) => (
                            <div key={s.label} className="rounded-lg bg-accent/50 p-3 text-center">
                              <s.icon className="h-4 w-4 text-muted-foreground mx-auto mb-1.5" />
                              <div className="text-sm font-bold text-foreground">{s.value}</div>
                              <div className="text-[10px] text-muted-foreground">{s.label}</div>
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {[
                            { icon: FileText, label: "View Records" },
                            { icon: HeartPulse, label: "Health Log" },
                            { icon: Camera, label: "Photos" },
                            { icon: Edit, label: "Edit Profile" },
                          ].map((a) => (
                            <button key={a.label}
                              className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground hover:bg-accent hover:border-primary/20 transition-all">
                              <a.icon className="h-3.5 w-3.5 text-muted-foreground" />
                              {a.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === "records" && (
                      <div className="space-y-2">
                        {petVaccines.map((v, i) => (
                          <div key={i} className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-accent/30 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className={`h-2 w-2 rounded-full ${v.status === "current" ? "bg-secondary" : "bg-primary"}`} />
                              <div>
                                <div className="text-sm font-semibold text-foreground">{v.name}</div>
                                <div className="text-xs text-muted-foreground">Given: {v.date}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={`text-xs font-bold ${v.status === "current" ? "text-secondary" : "text-primary"}`}>
                                {v.status === "current" ? "Current" : "Expiring Soon"}
                              </div>
                              <div className="text-[10px] text-muted-foreground">Next: {v.next}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeTab === "timeline" && (
                      <div className="space-y-3">
                        {filteredActivity.filter(a => a.pet === pet.name).map((a, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center shrink-0">
                              <a.icon className="h-3.5 w-3.5 text-muted-foreground" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm text-foreground">{a.text.replace(`${a.pet} — `, "")}</div>
                              <div className="text-[10px] text-muted-foreground">{a.time}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Activity feed */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-foreground">Recent Activity</h2>
                <span className="text-xs text-muted-foreground">{filteredActivity.length} entries</span>
              </div>
              <div className="rounded-xl border border-border bg-card divide-y divide-border">
                {filteredActivity.slice(0, 5).map((a, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 hover:bg-accent/30 transition-colors">
                    <div className="h-9 w-9 rounded-lg bg-accent flex items-center justify-center shrink-0">
                      <a.icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground">{a.text}</div>
                      <div className="text-xs text-muted-foreground">{a.time}</div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                  </div>
                ))}
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
                {upcomingEvents.map((ev, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 hover:bg-accent/30 transition-colors">
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${
                      ev.type === "vaccine" ? "bg-teal-light text-secondary" :
                      ev.type === "medication" ? "bg-amber-light text-primary" :
                      "bg-blue-light text-blue"
                    }`}>
                      <ev.icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-foreground truncate">{ev.title}</div>
                      <div className="text-[10px] text-muted-foreground">{ev.date}</div>
                    </div>
                    {ev.urgent && (
                      <span className="shrink-0 text-[9px] font-bold text-destructive bg-destructive/10 px-1.5 py-0.5 rounded-full">
                        SOON
                      </span>
                    )}
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
                    <div className="text-2xl font-bold text-foreground font-display">96.5%</div>
                    <div className="text-xs text-muted-foreground font-medium">Average Health Score</div>
                  </div>
                </div>
                <div className="space-y-3">
                  {defaultPets.map((p) => (
                    <div key={p.id}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <img src={p.image} alt={p.name} className="h-5 w-5 rounded-full object-cover" />
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
                <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-3.5 flex items-start gap-3">
                  <AlertCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-foreground">Rabies vaccine expiring</div>
                    <div className="text-xs text-muted-foreground mt-0.5">Buddy's vaccine expires in 7 days.</div>
                  </div>
                </div>
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-3.5 flex items-start gap-3">
                  <Pill className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-foreground">Heartworm pill due</div>
                    <div className="text-xs text-muted-foreground mt-0.5">Monthly medication is due Dec 1.</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick tip */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <div className="rounded-xl bg-primary/5 border border-primary/10 p-4">
                <div className="text-xs font-bold text-primary mb-1">💡 Pro Tip</div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Upload your pet's vaccination certificates as PDFs and we'll auto-extract the dates and set reminders.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
