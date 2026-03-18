import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background relative flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-6 py-24 max-w-4xl">
        <h1 className="text-4xl font-bold font-display mb-8">Terms of Service</h1>
        <div className="prose prose-sm md:prose-base dark:prose-invert">
          <p className="text-muted-foreground mb-4">Last Updated: March 2026</p>
          <p className="mb-4">
            Welcome to PetCare OS. By accessing or using our services, you agree to these Terms of Service.
            Please read them carefully.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="mb-4">
            By creating an account and using PetCare OS, you agree to be bound by these terms. If you do not agree, 
            do not use our services.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Description of Service</h2>
          <p className="mb-4">
            PetCare OS provides pet health tracking, document storage, and AI-assisted insights. Our insights 
            are intended to assist pet owners and are absolutely <strong>not a replacement for professional veterinary advice</strong>. 
            Always consult a licensed veterinarian for medical decisions regarding your pet.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. User Accounts</h2>
          <p className="mb-4">
            You are responsible for safeguarding the password that you use to access the service and for any activities 
            or actions under your password.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
