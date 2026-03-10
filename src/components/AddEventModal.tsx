import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { useAuth } from "@/lib/authContext";
import { useEvents } from "@/hooks/useEvents";
import { Calendar, Syringe, Pill, AlertCircle } from "lucide-react";

interface AddEventModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    petId: string;
    petName: string;
    editEventData?: any; // Pass existing event data to switch to edit mode
}

export function AddEventModal({ open, onOpenChange, petId, petName, editEventData }: AddEventModalProps) {
    const { user } = useAuth();
    const { addEvent, updateEvent } = useEvents(user?.uid);

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        date: "",
        type: "appointment" as "vaccine" | "appointment" | "medication" | "other",
        urgent: false
    });

    useEffect(() => {
        if (open) {
            if (editEventData) {
                setFormData({
                    title: editEventData.title || "",
                    date: editEventData.date || "",
                    type: editEventData.type || "appointment",
                    urgent: editEventData.urgent || false,
                });
            } else {
                setFormData({ title: "", date: "", type: "appointment", urgent: false });
            }
        }
    }, [open, editEventData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        let success;
        if (editEventData) {
            success = await updateEvent(editEventData.id, formData);
        } else {
            success = await addEvent({
                ...formData,
                petId,
                petName,
            });
        }

        setLoading(false);
        if (success) {
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
                        {editEventData ? "Modify your scheduled appointment or medication details." : "Schedule a new appointment, vaccine, or medication."}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                    <div>
                        <label className="text-sm font-medium text-foreground mb-1 block">Title</label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="e.g. Annual Checkup"
                            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                    </div>

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
