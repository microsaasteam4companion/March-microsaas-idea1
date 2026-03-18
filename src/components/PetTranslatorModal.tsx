import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Activity, Volume2, Sparkles, MessageSquare, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface PetTranslatorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  petName?: string;
}

export function PetTranslatorModal({ open, onOpenChange, petName = "Your Pet" }: PetTranslatorModalProps) {
  const [state, setState] = useState<"idle" | "listening" | "analyzing" | "result" | "error">("idle");
  const [resultMsg, setResultMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number>(0);
  
  const statsRef = useRef({ maxVol: 0, avgPitch: 0, pitchCount: 0 });

  const stopRecording = () => {
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    if (sourceRef.current) sourceRef.current.disconnect();
    if (analyserRef.current) analyserRef.current.disconnect();
    if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
    }
  };

  useEffect(() => {
    if (!open) {
      stopRecording();
      setState("idle");
      setResultMsg("");
    }
    return stopRecording;
  }, [open]);

  const handleStart = async () => {
    try {
      setState("listening");
      statsRef.current = { maxVol: 0, avgPitch: 0, pitchCount: 0 };
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      streamRef.current = stream;
      
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;
      
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 2048;
      analyserRef.current = analyser;
      
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);
      sourceRef.current = source;
      
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      const analyzeAudio = () => {
        analyser.getByteFrequencyData(dataArray);
        
        let sum = 0;
        let maxIndex = 0;
        let maxVal = 0;
        
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
          if (dataArray[i] > maxVal) {
            maxVal = dataArray[i];
            maxIndex = i;
          }
        }
        
        const volume = sum / bufferLength;
        const pitch = maxIndex * (audioCtx.sampleRate / 2) / bufferLength;
        
        if (volume > statsRef.current.maxVol) statsRef.current.maxVol = volume;
        if (volume > 5) { 
            statsRef.current.avgPitch += pitch;
            statsRef.current.pitchCount++;
        }
        
        animationFrameRef.current = requestAnimationFrame(analyzeAudio);
      };
      
      analyzeAudio();
      
      setTimeout(() => {
        stopRecording();
        setState("analyzing");
        
        setTimeout(() => {
           generateTranslation();
        }, 1500); 
      }, 3000);
      
    } catch (err) {
      console.error("Microphone Error:", err);
      stopRecording();
      setErrorMsg("Microphone access denied. Please allow microphone permissions in your browser.");
      setState("error");
    }
  };

  const generateTranslation = () => {
      const { maxVol, avgPitch, pitchCount } = statsRef.current;
      const finalPitch = pitchCount > 0 ? avgPitch / pitchCount : 0;
      
      let msg = "";
      const isLoud = maxVol > 30;
      const isHighPitch = finalPitch > 800;
      const isSilent = maxVol < 5;
      
      if (isSilent) {
          const silentMsgs = ["I'm just relaxing here. No thoughts, head empty.", "Please do not disturb my silence.", "I am plotting my next nap.", "Can a pet get some peace and quiet?"];
          msg = silentMsgs[Math.floor(Math.random() * silentMsgs.length)];
      } else if (isLoud && isHighPitch) {
          const loudHighMsgs = ["GIVE ME TREATS RIGHT NOW!!", "THE SQUIRREL IS BACK! LET ME AT HIM!", "PLAYTIME IS NON-NEGOTIABLE FOREVER!", "I demand your undivided attention immediately!"];
          msg = loudHighMsgs[Math.floor(Math.random() * loudHighMsgs.length)];
      } else if (isLoud && !isHighPitch) {
          const loudDeepMsgs = ["The mailman has arrived. I must protect my kingdom.", "A stranger approaches the door. I am the defender.", "Who goes there?! State your business!", "Intruder alert! Sounding the alarm!"];
          msg = loudDeepMsgs[Math.floor(Math.random() * loudDeepMsgs.length)];
      } else if (!isLoud && isHighPitch) {
           const quietHighMsgs = ["Excuse me, is it dinner time yet?", "I would like some pets, please.", "Did someone say... walk?", "I am slightly annoyed, please rectify this."];
          msg = quietHighMsgs[Math.floor(Math.random() * quietHighMsgs.length)];
      } else {
           const avgMsgs = ["Why did you stop petting me? I did not authorize that.", "I am just saying hello, human. I love you.", "The vacuum cleaner is my mortal enemy. Hide it.", "I am judging your outfit today."];
          msg = avgMsgs[Math.floor(Math.random() * avgMsgs.length)];
      }
      
      setResultMsg(msg);
      setState("result");
      toast.success("Translation complete!");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] text-center">
        <DialogHeader>
          <div className="mx-auto h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-2">
            <Volume2 className="h-6 w-6 text-blue-500" />
          </div>
          <DialogTitle className="text-center text-xl">Pet Translator</DialogTitle>
          <DialogDescription className="text-center">
            Record what {petName} is saying, and our audio engine will analyze the sound profile!
          </DialogDescription>
        </DialogHeader>

        <div className="py-8 flex flex-col items-center justify-center min-h-[200px]">
          <AnimatePresence mode="wait">
            {state === "idle" && (
              <motion.div key="idle" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="flex flex-col items-center gap-4">
                <button onClick={handleStart} className="relative group h-24 w-24 rounded-full bg-primary flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                  <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping group-hover:animate-none" />
                  <Mic className="h-10 w-10 text-primary-foreground" />
                </button>
                <p className="text-sm font-semibold text-muted-foreground mt-2">Tap and gently make a sound for {petName}</p>
              </motion.div>
            )}

            {state === "listening" && (
              <motion.div key="listening" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-6">
                <div className="relative flex justify-center items-center h-24 w-24">
                  <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                  <Mic className="h-8 w-8 text-primary animate-pulse" />
                </div>
                <div className="flex items-center gap-1 text-primary font-bold">
                  Listening to audio
                  <span className="animate-[bounce_1s_infinite_0ms]">.</span>
                  <span className="animate-[bounce_1s_infinite_100ms]">.</span>
                  <span className="animate-[bounce_1s_infinite_200ms]">.</span>
                </div>
              </motion.div>
            )}

            {state === "analyzing" && (
              <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-6">
                <div className="flex gap-2 h-24 items-center">
                  {[...Array(5)].map((_, i) => (
                    <motion.div key={i} animate={{ height: ["20%", "100%", "20%"] }} transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }} className="w-3 bg-blue-500 rounded-full" />
                  ))}
                </div>
                <div className="flex items-center gap-2 text-blue-500 font-bold">
                  <Activity className="h-5 w-5 animate-pulse" />
                  Analyzing vocal volume & pitch...
                </div>
              </motion.div>
            )}

            {state === "result" && (
              <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center w-full">
                <div className="relative bg-accent/80 p-6 rounded-2xl border border-border/50 text-center shadow-sm max-w-sm w-full">
                  <MessageSquare className="absolute -top-3 -left-3 h-8 w-8 text-primary fill-primary/10" />
                  <Sparkles className="absolute -bottom-2 -right-2 h-6 w-6 text-amber-500 animate-spin-slow" />
                  <p className="text-lg font-display font-medium text-foreground italic">
                    "{resultMsg}"
                  </p>
                </div>
                <button onClick={() => setState("idle")} className="mt-6 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
                  Translate again
                </button>
              </motion.div>
            )}
            
            {state === "error" && (
              <motion.div key="error" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-4 text-center">
                <AlertCircle className="h-12 w-12 text-destructive opacity-80" />
                <p className="text-sm font-semibold text-destructive">{errorMsg}</p>
                <button onClick={() => setState("idle")} className="mt-4 px-4 py-2 rounded-lg bg-accent text-sm font-semibold hover:bg-accent/80 transition-colors">
                  Try Again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
