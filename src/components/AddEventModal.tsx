import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { useAuth } from "@/lib/authContext";
import { useEvents } from "@/hooks/useEvents";
import { useActivities } from "@/hooks/useActivities";
import { Calendar, Syringe, Pill, AlertCircle } from "lucide-react";

interface AddEventModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    petId: string;
    petName: string;
    petScore?: number;
    editEventData?: any; // Pass existing event data to switch to edit mode
    defaultType?: "vaccine" | "appointment" | "medication" | "other";
}

export function AddEventModal({ open, onOpenChange, petId, petName, petScore = 100, editEventData, defaultType }: AddEventModalProps) {
    const { user } = useAuth();
    const { addEvent, updateEvent } = useEvents(user?.uid);
    const { addActivity } = useActivities(user?.uid);

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        date: "",
        type: "appointment" as "vaccine" | "appointment" | "medication" | "other",
        urgent: false,
        medDosage: "",
        medFrequency: "",
        vetName: "",
        reason: ""
    });

    useEffect(() => {
        if (open) {
            if (editEventData) {
                setFormData({
                    title: editEventData.title || "",
                    date: editEventData.date || "",
                    type: editEventData.type || "appointment",
                    urgent: editEventData.urgent || false,
                    medDosage: "", medFrequency: "", vetName: "", reason: ""
                });
                let autoTitle = "";
                let autoReason = "";
                if (defaultType === "appointment") {
                    autoTitle = "General Health Check";
                    if (petScore < 80) {
                        autoTitle = "Follow-up Vet Visit";
                        autoReason = "Recent low health score / unwell symptoms";
                    }
                }
                setFormData({ title: autoTitle, date: "", type: defaultType || "appointment", urgent: petScore < 80 && defaultType === "appointment", medDosage: "", medFrequency: "", vetName: "", reason: autoReason });
            }
        }
    }, [open, editEventData, defaultType, petScore]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        let finalTitle = formData.title;
        if (!editEventData) {
            if (formData.type === "medication" && (formData.medDosage || formData.medFrequency)) {
                finalTitle = `${formData.title} - ${formData.medDosage} ${formData.medFrequency}`.trim();
            } else if (formData.type === "appointment" && (formData.vetName || formData.reason)) {
                finalTitle = `${formData.title} (${formData.vetName ? formData.vetName + ' - ' : ''}${formData.reason})`.trim();
            }
        }

        const payload = {
            title: finalTitle,
            date: formData.date,
            type: formData.type,
            urgent: formData.urgent
        };

        let success;
        if (editEventData) {
            success = await updateEvent(editEventData.id, payload);
        } else {
            success = await addEvent({
                ...payload,
                petId,
                petName,
            });
        }

        setLoading(false);
        if (success) {
            // Also log to recent activity timeline if it's a new event
            if (!editEventData && addActivity) {
                let textDesc = "Scheduled an appointment";
                let iconN = "Calendar";
                if (formData.type === "vaccine") { textDesc = `Scheduled vaccine: ${formData.title}`; iconN = "Syringe"; }
                if (formData.type === "medication") { textDesc = `Logged medication: ${formData.title}`; iconN = "Pill"; }
                if (formData.type === "appointment" || formData.type === "other") { textDesc = `Health check/appointment: ${formData.title}`; iconN = "Activity"; }
                
                addActivity({
                    petId,
                    petName,
                    text: textDesc,
                    iconName: iconN as any
                });
            }
            onOpenChange(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Calendar className="h-4 w-4 text-primary" />
                        </div>
                        <DialogTitle>{editEventData ? "Edit Event" : `Add Event for ${petName}`}</DialogTitle>
                    </div>
                    <DialogDescription>
                        {editEventData 
                            ? "Modify your scheduled appointment or medication details." 
                            : formData.type === "appointment" 
                                ? (petScore < 80 ? `💡 AI SUGGESTION: Based on ${petName}'s recent health drop, a follow-up visit is highly recommended.` : "Schedule a routine wellness exam or specific vet appointment.")
                                : "Schedule a new appointment, vaccine, or medication."}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                    <div>
                        <label className="text-sm font-medium text-foreground mb-1 block">
                            {formData.type === "medication" ? "Medicine Name" : formData.type === "appointment" ? "Appointment Title" : "Title"}
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                            placeholder={formData.type === "medication" ? "e.g. Amoxicillin" : formData.type === "appointment" ? "e.g. Annual Checkup" : "Event Title"}
                            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                    </div>

                    {formData.type === "medication" && !editEventData && (
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-foreground mb-1 block">Dosage</label>
                                <input
                                    type="text"
                                    value={formData.medDosage}
                                    onChange={(e) => setFormData(prev => ({ ...prev, medDosage: e.target.value }))}
                                    placeholder="e.g. 50mg"
                                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-foreground mb-1 block">Frequency</label>
                                <input
                                    type="text"
                                    value={formData.medFrequency}
                                    onChange={(e) => setFormData(prev => ({ ...prev, medFrequency: e.target.value }))}
                                    placeholder="e.g. Twice a day"
                                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                />
                            </div>
                        </div>
                    )}

                    {formData.type === "appointment" && !editEventData && (
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-foreground mb-1 block">Vet/Clinic Name</label>
                                <input
                                    type="text"
                                    value={formData.vetName}
                                    onChange={(e) => setFormData(prev => ({ ...prev, vetName: e.target.value }))}
                                    placeholder="e.g. City Vet"
                                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-foreground mb-1 block">Reason</label>
                                <input
                                    type="text"
                                    value={formData.reason}
                                    onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                                    placeholder="e.g. Vaccination"
                                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                />
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-foreground mb-1 block">Date</label>
                            <input
                                type="date"
                                required
                                value={formData.date}
                                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-foreground mb-1 block">Type</label>
                            <select
                                value={formData.type}
                                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
                                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            >
                                <option value="appointment">Appointment</option>
                                <option value="vaccine">Vaccine</option>
                                <option value="medication">Medication</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                        <input
                            type="checkbox"
                            id="urgent"
                            checked={formData.urgent}
                            onChange={(e) => setFormData(prev => ({ ...prev, urgent: e.target.checked }))}
                            className="rounded border-input text-primary focus:ring-primary h-4 w-4"
                        />
                        <label htmlFor="urgent" className="text-sm font-medium text-foreground flex items-center gap-1">
                            Mark as urgent
                            <AlertCircle className="h-3 w-3 text-destructive" />
                        </label>
                    </div>

                    <DialogFooter className="pt-4">
                        <button
                            type="button"
                            onClick={() => onOpenChange(false)}
                            className="px-4 py-2 rounded-lg text-sm font-semibold text-foreground hover:bg-accent transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 rounded-lg bg-primary text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
                        >
                            {loading ? "Saving..." : (editEventData ? "Save Changes" : "Schedule Event")}
                        </button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
