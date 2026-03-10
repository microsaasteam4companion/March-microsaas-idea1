import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { useAuth } from "@/lib/authContext";
import { usePets } from "@/hooks/usePets";
import { PawPrint } from "lucide-react";

interface AddPetModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    editPetData?: any; // Pass existing pet data to switch to edit mode
}

export function AddPetModal({ open, onOpenChange, editPetData }: AddPetModalProps) {
    const { user } = useAuth();
    const { addPet, updatePet } = usePets(user?.uid);

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        species: "Dog",
        breed: "",
        age: "",
        weight: "",
    });

    useEffect(() => {
        if (open) {
            if (editPetData) {
                setFormData({
                    name: editPetData.name || "",
                    species: editPetData.species || "Dog",
                    breed: editPetData.breed || "",
                    age: editPetData.age || "",
                    weight: editPetData.weight || "",
                });
            } else {
                setFormData({ name: "", species: "Dog", breed: "", age: "", weight: "" });
            }
        }
    }, [open, editPetData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        let success;
        if (editPetData) {
            success = await updatePet(editPetData.id, formData);
        } else {
            success = await addPet({
                ...formData,
                image: "", // Will use default placeholder based on species in Dashboard
                healthScore: 100,
                medications: 0,
                lastVisit: "Never",
                nextVaccine: "Not scheduled",
                mood: formData.species === "Dog" ? "Happy 🐕" : "Relaxed 🐈"
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
                            <PawPrint className="h-4 w-4 text-primary" />
                        </div>
                        <DialogTitle>{editPetData ? "Edit pet profile" : "Add a new pet"}</DialogTitle>
                    </div>
                    <DialogDescription>
                        {editPetData ? "Update your pet's details below." : "Enter your pet's details below to create their profile."}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="text-sm font-medium text-foreground mb-1 block">Name</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                placeholder="Buddy"
                                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-foreground mb-1 block">Species</label>
                            <select
                                value={formData.species}
                                onChange={(e) => setFormData(prev => ({ ...prev, species: e.target.value }))}
                                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            >
                                <option value="Dog">Dog</option>
                                <option value="Cat">Cat</option>
                                <option value="Bird">Bird</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-foreground mb-1 block">Breed</label>
                            <input
                                type="text"
                                required
                                value={formData.breed}
                                onChange={(e) => setFormData(prev => ({ ...prev, breed: e.target.value }))}
                                placeholder="Golden Retriever"
                                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-foreground mb-1 block">Age</label>
                            <input
                                type="text"
                                required
                                value={formData.age}
                                onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                                placeholder="3 years"
                                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-foreground mb-1 block">Weight</label>
                            <input
                                type="text"
                                required
                                value={formData.weight}
                                onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                                placeholder="32 kg"
                                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                        </div>
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
                            {loading ? "Saving..." : (editPetData ? "Save Changes" : "Save Pet")}
                        </button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
