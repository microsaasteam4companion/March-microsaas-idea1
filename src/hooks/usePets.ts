import { useState, useEffect } from "react";
import {
    collection,
    query,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    serverTimestamp,
    orderBy,
    updateDoc,
    where,
    getDocs,
    writeBatch
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { toast } from "sonner";

export interface Pet {
    id: string;
    name: string;
    breed: string;
    species: string;
    age: string;
    weight: string;
    image: string;
    healthScore: number;
    medications: number;
    lastVisit: string;
    nextVaccine: string;
    mood: string;
}

export const usePets = (userId: string | undefined) => {
    const [pets, setPets] = useState<Pet[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) {
            setPets([]);
            setLoading(false);
            return;
        }

        const petsRef = collection(db, `users/${userId}/pets`);
        const q = query(petsRef, orderBy("createdAt", "desc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const petsData: Pet[] = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Pet));

            setPets(petsData);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching pets:", error);
            toast.error("Failed to load pets");
            setLoading(false);
        });

        return () => unsubscribe();
    }, [userId]);

    const addPet = async (petData: Omit<Pet, "id">) => {
        if (!userId) return null;
        try {
            const docRef = await addDoc(collection(db, `users/${userId}/pets`), {
                ...petData,
                createdAt: serverTimestamp()
            });
            toast.success("Pet added successfully!");
            return docRef.id;
        } catch (error: any) {
            console.error("Error adding pet:", error);
            toast.error(error.message || "Failed to add pet");
            return null;
        }
    };

    const updatePet = async (petId: string, updatedData: Partial<Omit<Pet, "id">>) => {
        if (!userId) return false;
        try {
            const petRef = doc(db, `users/${userId}/pets`, petId);
            await updateDoc(petRef, updatedData);
            toast.success("Pet updated successfully!");
            return true;
        } catch (error: any) {
            console.error("Error updating pet:", error);
            toast.error(error.message || "Failed to update pet");
            return false;
        }
    };

    const deletePet = async (petId: string) => {
        if (!userId) return false;

        try {
            // Initiate a batch to delete all orphaned data
            const batch = writeBatch(db);

            // 1. Delete associated Events
            const eventsQ = query(collection(db, `users/${userId}/events`), where("petId", "==", petId));
            const eventsSnapshot = await getDocs(eventsQ);
            eventsSnapshot.forEach((doc) => {
                batch.delete(doc.ref);
            });

            // 2. Delete associated Activities
            const activitiesQ = query(collection(db, `users/${userId}/activities`), where("petId", "==", petId));
            const activitiesSnapshot = await getDocs(activitiesQ);
            activitiesSnapshot.forEach((doc) => {
                batch.delete(doc.ref);
            });

            // 3. Delete the Pet document itself
            const petRef = doc(db, `users/${userId}/pets`, petId);
            batch.delete(petRef);

            // Execute the batch
            await batch.commit();

            toast.success("Pet and all associated records removed.");
            return true;
        } catch (error: any) {
            console.error("Error deleting pet and records:", error);
            toast.error("Failed to delete pet completely.");
            return false;
        }
    };

    return { pets, loading, addPet, updatePet, deletePet };
};
