import { Dialog, DialogContent } from "@/components/ui/dialog";
import { QRCodeSVG } from "qrcode.react";
import { ShieldCheck, Fingerprint } from "lucide-react";

interface DigitalIDModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pet: any; // Using any for simplicity here to accept the Dashboard's pet object
  ownerName: string;
  petImage: string;
}

export function DigitalIDModal({ open, onOpenChange, pet, ownerName, petImage }: DigitalIDModalProps) {
  if (!pet) return null;

  // Generate a mock microchip ID based on the pet's ID
  const microchipId = pet.id ? pet.id.replace(/\D/g, '').padEnd(15, '0').slice(0, 15) : "985141002938475";
  
  // Data encoded in the QR Code
  const qrData = `🐾 Pet Emergency Contact 🐾\nName: ${pet.name}\nSpecies: ${pet.species || "Dog"} (${pet.breed || "Mixed"})\nAge: ${pet.age || "Unknown"} | Weight: ${pet.weight || "Unknown"}\nMicrochip ID: ${microchipId}\nOwner: ${ownerName}\nContact: petcare-os-demo.vercel.app/found`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* We make the dialog content transparent so we can draw our own glass UI */}
      <DialogContent className="sm:max-w-md bg-transparent border-0 shadow-none p-0 overflow-hidden outline-none">
        
        {/* Card Container */}
        <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-white/90 to-white/50 dark:from-gray-900/90 dark:to-gray-800/50 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl p-6 sm:p-8">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8 border-b border-black/10 dark:border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <span className="font-display font-bold text-lg tracking-widest uppercase text-foreground">Digital Pet ID</span>
            </div>
            <div className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase bg-black/5 dark:bg-white/10 px-2 py-1 rounded-sm">
              Verified
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
            
            {/* Left side: Avatar and Nose print */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative p-1 rounded-2xl bg-gradient-to-br from-primary to-amber">
                <img 
                  src={petImage || pet.image || "https://via.placeholder.com/150"} 
                  alt={pet.name} 
                  className="h-28 w-28 rounded-xl object-cover border-2 border-background"
                />
              </div>
              
              <div className="flex flex-col items-center gap-1 mt-2 text-primary/80 dark:text-primary">
                <Fingerprint className="h-10 w-10 opacity-80" />
                <span className="text-[9px] uppercase tracking-widest font-bold opacity-60">Nose Print Scanned</span>
              </div>
            </div>

            {/* Right side: Details */}
            <div className="flex-1 w-full space-y-4">
              <div>
                <h2 className="text-3xl font-display font-black text-foreground uppercase tracking-wide">{pet.name}</h2>
                <p className="text-sm font-medium text-muted-foreground">{pet.breed || "Mixed Breed"} • {pet.species || "Dog"}</p>
              </div>

              <div className="grid grid-cols-2 gap-y-3 gap-x-2 w-full pt-2">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Age</div>
                  <div className="text-sm font-bold text-foreground">{pet.age || "Unknown"}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Weight</div>
                  <div className="text-sm font-bold text-foreground">{pet.weight || "Unknown"}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Microchip ID</div>
                  <div className="text-sm font-mono tracking-wider font-bold text-foreground bg-black/5 dark:bg-white/5 py-1 px-2 rounded mt-0.5 inline-block">
                    {microchipId}
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Owner</div>
                  <div className="text-sm font-bold text-foreground">{ownerName}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom section with QR */}
          <div className="mt-8 pt-6 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
            <div className="text-xs text-muted-foreground max-w-[180px]">
              Scan this code to access secure emergency contact information and medical records.
            </div>
            <div className="p-2 bg-white rounded-xl shadow-sm border border-black/5">
              <QRCodeSVG value={qrData} size={80} level="M" />
            </div>
          </div>
          
          {/* Subtle decorative background elements */}
          <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-primary/20 blur-3xl rounded-full pointer-events-none -z-10" />
          <div className="absolute bottom-[-50px] left-[-50px] w-48 h-48 bg-blue/20 blur-3xl rounded-full pointer-events-none -z-10" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
