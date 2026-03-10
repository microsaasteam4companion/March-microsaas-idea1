import { useState, useEffect } from "react";
import {
    collection,
    query,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    serverTimestamp,
    orderBy
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { toast } from "sonner";

export interface PetActivity {
    id: string;
    petId: string;
    petName: string;
    text: string;
    iconName: "Activity" | "Utensils" | "Moon" | "Droplets" | "Weight" | "Thermometer" | "Syringe" | "Pill";
    createdAt: any;
}

export const useActivities = (userId: string | undefined) => {
    const [activities, setActivities] = useState<PetActivity[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) {
            setActivities([]);
            setLoading(false);
            return;
        }

        const activitiesRef = collection(db, `users/${userId}/activities`);
        const q = query(activitiesRef, orderBy("createdAt", "desc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const actData: PetActivity[] = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as PetActivity));

            // Optional: Format timestamp to string 'time' on the fly here if needed
            setActivities(actData);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching activities:", error);
            toast.error("Failed to load activities");
            setLoading(false);
        });

        return () => unsubscribe();
    }, [userId]);

    const addActivity = async (activityData: Omit<PetActivity, "id" | "createdAt">) => {
        if (!userId) return null;
        try {
            const docRef = await addDoc(collection(db, `users/${userId}/activities`), {
                ...activityData,
                createdAt: serverTimestamp()
            });
            return docRef.id;
        } catch (error: any) {
            console.error("Error adding activity:", error);
            // Failing silently for activities to not overwhelm UI
            return null;
        }
    };

    const deleteActivity = async (activityId: string) => {
        if (!userId) return;
        try {
            await deleteDoc(doc(db, `users/${userId}/activities`, activityId));
        } catch (error: any) {
            console.error("Error deleting activity:", error);
        }
    };

    return { activities, loading, addActivity, deleteActivity };
};
