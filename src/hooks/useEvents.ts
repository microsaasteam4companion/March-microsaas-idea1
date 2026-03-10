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
    updateDoc
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { toast } from "sonner";

export interface PetEvent {
    id: string;
    petId: string;
    petName?: string; // Optional, useful for UI display without joining
    title: string;
    date: string;
    type: "vaccine" | "appointment" | "medication" | "other";
    urgent: boolean;
}

export const useEvents = (userId: string | undefined) => {
    const [events, setEvents] = useState<PetEvent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) {
            setEvents([]);
            setLoading(false);
            return;
        }

        const eventsRef = collection(db, `users/${userId}/events`);
        // Note: sorting by string date might be tricky depending on format, 
        // ideally store a real date timestamp for sorting. For now, matching the UI format.
        const q = query(eventsRef, orderBy("createdAt", "desc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const eventsData: PetEvent[] = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as PetEvent));

            setEvents(eventsData);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching events:", error);
            toast.error("Failed to load events");
            setLoading(false);
        });

        return () => unsubscribe();
    }, [userId]);

    const addEvent = async (eventData: Omit<PetEvent, "id">) => {
        if (!userId) return null;
        try {
            const docRef = await addDoc(collection(db, `users/${userId}/events`), {
                ...eventData,
                createdAt: serverTimestamp()
            });
            toast.success("Event scheduled successfully!");
            return docRef.id;
        } catch (error: any) {
            console.error("Error adding event:", error);
            toast.error(error.message || "Failed to schedule event");
            return null;
        }
    };

    const deleteEvent = async (eventId: string) => {
        if (!userId) return;
        try {
            await deleteDoc(doc(db, `users/${userId}/events`, eventId));
            toast.success("Event removed");
        } catch (error: any) {
            console.error("Error deleting event:", error);
            toast.error(error.message || "Failed to delete event");
        }
    };

    const updateEvent = async (eventId: string, updatedData: Partial<Omit<PetEvent, "id">>) => {
        if (!userId) return false;
        try {
            const eventRef = doc(db, `users/${userId}/events`, eventId);
            await updateDoc(eventRef, updatedData);
            toast.success("Event updated successfully!");
            return true;
        } catch (error: any) {
            console.error("Error updating event:", error);
            toast.error(error.message || "Failed to update event");
            return false;
        }
    };

    return { events, loading, addEvent, updateEvent, deleteEvent };
};
