import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Map, Flame } from "lucide-react";

// Fix for custom icons in Leaflet within React/Vite
const pawIcon = new L.DivIcon({
  html: `<div style="background-color: #fca5a5; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(252,165,165,0.8);"></div>`,
  className: "custom-leaflet-icon",
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

export function PawsplorerMap() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Central Park coordinates mockup
  const startPos: [number, number] = [40.7812, -73.9665];
  
  // A curvy mock walk path simulating a territory heatmap
  const walkPath: [number, number][] = [
    [40.7812, -73.9665],
    [40.7820, -73.9658],
    [40.7830, -73.9660],
    [40.7840, -73.9650],
    [40.7850, -73.9645],
    [40.7860, -73.9660],
    [40.7855, -73.9675],
    [40.7845, -73.9685],
    [40.7835, -73.9680],
  ];

  if (!mounted) return <div className="h-64 bg-accent/50 animate-pulse rounded-xl" />;

  return (
    <div className="w-full flex flex-col rounded-xl overflow-hidden border border-border bg-card shadow-sm">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-rose-500/10 flex items-center justify-center">
            <Map className="h-4 w-4 text-rose-500" />
          </div>
          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest text-foreground">Pawsplorer Heatmap</h3>
            <p className="text-[10px] text-muted-foreground uppercase font-semibold">Live Territory Tracking</p>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-black/5 dark:bg-white/10 px-3 py-1.5 rounded-lg">
          <Flame className="h-4 w-4 text-rose-500 animate-pulse" />
          <span className="text-xs font-bold text-foreground">Territory Claimed: 15%</span>
        </div>
      </div>
      
      <div className="h-[280px] w-full relative z-0">
        <MapContainer 
          center={startPos} 
          zoom={15} 
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
          attributionControl={false}
        >
          {/* Stunning Dark Theme Tile Layer from CartoDB */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          
          {/* Heatmap-like glowing polyline */}
          <Polyline 
            positions={walkPath} 
            pathOptions={{ color: '#fca5a5', weight: 6, opacity: 0.8, className: "animate-pulse" }} 
          />
          <Polyline 
            positions={walkPath} 
            pathOptions={{ color: '#ef4444', weight: 3, opacity: 1 }} 
          />

          <Marker position={walkPath[walkPath.length - 1]} icon={pawIcon}>
            <Popup className="font-bold text-xs uppercase">
              Current Location
            </Popup>
          </Marker>
        </MapContainer>
        
        {/* Vignette Overlay for premium look */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(0,0,0,0.5)] z-[1000] mix-blend-overlay" />
      </div>
    </div>
  );
}
