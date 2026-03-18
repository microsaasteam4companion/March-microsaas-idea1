import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background relative flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-6 py-24 max-w-4xl">
        <h1 className="text-4xl font-bold font-display mb-8">Privacy Policy</h1>
        <div className="prose prose-sm md:prose-base dark:prose-invert">
          <p className="text-muted-foreground mb-4">Last Updated: March 2026</p>
          <p className="mb-4">
            At PetCare OS (part of Entrext Labs), your privacy and your pet's privacy are critically important to us.
            This Privacy Policy explains how we collect, use, and protect your data.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
          <p className="mb-4">
            We collect information you provide directly to us when creating an account or a pet profile, 
            including names, email addresses, and pet medical records.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Information</h2>
          <p className="mb-4">
            We use the information to provide, maintain, and improve our services, including 
            generating AI-powered health insights for your pets using secure infrastructure.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Data Security</h2>
          <p className="mb-4">
            All data is encrypted in transit and at rest. We do not sell your personal or pet data to third parties.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
