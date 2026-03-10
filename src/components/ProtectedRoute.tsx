import { Navigate } from "react-router-dom";
import { useAuth } from "@/lib/authContext";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-pulse flex flex-col items-center gap-4">
                    <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                    <p className="text-muted-foreground font-medium">Loading your profile...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/auth" />;
    }

    return <>{children}</>;
};
