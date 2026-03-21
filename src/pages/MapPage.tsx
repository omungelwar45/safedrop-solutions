import { useState } from "react";
import { ScrollReveal } from "../components/ScrollReveal";
import { MapPin, Search, Navigation, Filter, Phone, Clock, Star, ChevronRight, Locate, X, Truck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LOCATIONS = [
  { id: 1, name: "Apollo Pharmacy", type: "pharmacy", address: "MG Road, Bengaluru", distance: "0.8 km", rating: 4.5, open: true, lat: 12.97, lng: 77.59 },
  { id: 2, name: "City Hospital Collection", type: "hospital", address: "Koramangala, Bengaluru", distance: "1.2 km", rating: 4.8, open: true, lat: 12.93, lng: 77.62 },
  { id: 3, name: "Green Disposal Center", type: "collection", address: "Indiranagar, Bengaluru", distance: "2.1 km", rating: 4.3, open: false, lat: 12.97, lng: 77.64 },
  { id: 4, name: "MedPlus Pharmacy", type: "pharmacy", address: "HSR Layout, Bengaluru", distance: "2.8 km", rating: 4.1, open: true, lat: 12.91, lng: 77.64 },
  { id: 5, name: "Safe Med Collect", type: "collection", address: "Whitefield, Bengaluru", distance: "5.4 km", rating: 4.6, open: true, lat: 12.97, lng: 77.75 },
];

const typeColors: Record<string, string> = {
  pharmacy: "bg-primary/10 text-primary",
  hospital: "bg-destructive/10 text-destructive",
  collection: "bg-accent text-accent-foreground",
};

const typeLabels: Record<string, string> = {
  pharmacy: "Pharmacy",
  hospital: "Hospital",
  collection: "Collection Center",
};

const MapPage = () => {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selected, setSelected] = useState<typeof LOCATIONS[0] | null>(null);
  const [showPickup, setShowPickup] = useState(false);
  const [showDirections, setShowDirections] = useState(false);

  const filtered = LOCATIONS.filter((l) => {
    const matchSearch = !search || l.name.toLowerCase().includes(search.toLowerCase()) || l.address.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "all" || l.type === filterType;
    const matchOpen = !filterOpen || l.open;
    return matchSearch && matchType && matchOpen;
  });

  return (
    <div className="min-h-screen pt-16">
      <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className="lg:w-96 w-full flex-shrink-0 border-r border-border/50 flex flex-col bg-background">
          <div className="p-4 border-b border-border/50 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search area, city, or pincode..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary border border-border/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
              <button
                onClick={() => {}}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 glow-border text-primary text-xs font-medium whitespace-nowrap active:scale-95 transition-transform"
              >
                <Locate className="w-3.5 h-3.5" />
                Use My Location
              </button>
              {["all", "pharmacy", "hospital", "collection"].map((t) => (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors active:scale-95 ${
                    filterType === t ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"
                  }`}
                >
                  {t === "all" ? "All" : typeLabels[t]}
                </button>
              ))}
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors active:scale-95 ${
                  filterOpen ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                }`}
              >
                <Filter className="w-3 h-3" />
                Open Now
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {filtered.map((loc, i) => (
              <ScrollReveal key={loc.id} delay={i * 0.05}>
                <button
                  onClick={() => { setSelected(loc); setShowDirections(false); }}
                  className={`w-full text-left glass-card p-4 hover:border-primary/30 transition-all duration-200 active:scale-[0.98] ${
                    selected?.id === loc.id ? "border-primary/40 glow-border" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${typeColors[loc.type]}`}>
                          {typeLabels[loc.type]}
                        </span>
                        {loc.open ? (
                          <span className="text-[10px] font-medium text-emerald-500">Open</span>
                        ) : (
                          <span className="text-[10px] font-medium text-muted-foreground">Closed</span>
                        )}
                      </div>
                      <h3 className="font-semibold text-sm truncate">{loc.name}</h3>
                      <p className="text-muted-foreground text-xs truncate">{loc.address}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                        {loc.rating}
                      </div>
                      <span className="text-xs font-medium text-primary">{loc.distance}</span>
                    </div>
                  </div>
                </button>
              </ScrollReveal>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-12 text-muted-foreground text-sm">
                No locations found. Try adjusting your filters.
              </div>
            )}
          </div>
        </div>

        {/* Map Area */}
        <div className="flex-1 relative bg-secondary/30 min-h-[300px]">
          {/* Mock Map */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="w-full h-full relative" style={{ background: "linear-gradient(135deg, hsl(var(--secondary)) 0%, hsl(var(--muted)) 100%)" }}>
              {/* Grid lines */}
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={`h-${i}`} className="absolute left-0 right-0 border-t border-border/20" style={{ top: `${i * 5}%` }} />
              ))}
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={`v-${i}`} className="absolute top-0 bottom-0 border-l border-border/20" style={{ left: `${i * 5}%` }} />
              ))}
              {/* Mock roads */}
              <div className="absolute top-0 bottom-0 left-[30%] w-1 bg-muted-foreground/10" />
              <div className="absolute top-0 bottom-0 left-[60%] w-0.5 bg-muted-foreground/8" />
              <div className="absolute left-0 right-0 top-[40%] h-1 bg-muted-foreground/10" />
              <div className="absolute left-0 right-0 top-[70%] h-0.5 bg-muted-foreground/8" />

              {/* Pins */}
              {filtered.map((loc, i) => {
                const positions = [
                  { top: "35%", left: "28%" },
                  { top: "50%", left: "45%" },
                  { top: "30%", left: "65%" },
                  { top: "65%", left: "35%" },
                  { top: "45%", left: "75%" },
                ];
                const pos = positions[i % positions.length];
                return (
                  <button
                    key={loc.id}
                    onClick={() => { setSelected(loc); setShowDirections(false); }}
                    className="absolute -translate-x-1/2 -translate-y-full group"
                    style={pos}
                  >
                    <div className={`relative ${selected?.id === loc.id ? "animate-pin-bounce" : ""}`}>
                      <MapPin
                        className={`w-8 h-8 drop-shadow-lg transition-transform duration-200 group-hover:scale-110 ${
                          selected?.id === loc.id ? "text-primary scale-125" : "text-primary/70"
                        }`}
                        fill={selected?.id === loc.id ? "currentColor" : "none"}
                      />
                      {selected?.id === loc.id && (
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-1 rounded-full bg-primary/30 blur-sm" />
                      )}
                    </div>
                  </button>
                );
              })}

              {/* User location */}
              <div className="absolute top-[48%] left-[40%] -translate-x-1/2 -translate-y-1/2">
                <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-background shadow-lg relative">
                  <div className="absolute inset-0 rounded-full bg-blue-500/30 animate-ping" />
                </div>
              </div>
            </div>
          </div>

          {/* Location Detail Card */}
          <AnimatePresence>
            {selected && !showPickup && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 glass-card p-5"
              >
                <button onClick={() => setSelected(null)} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${typeColors[selected.type]}`}>
                  {typeLabels[selected.type]}
                </span>
                <h3 className="font-display font-bold text-lg mt-2">{selected.name}</h3>
                <p className="text-muted-foreground text-sm mb-1">{selected.address}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><Navigation className="w-3 h-3" />{selected.distance}</span>
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-500 fill-amber-500" />{selected.rating}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{selected.open ? "Open now" : "Closed"}</span>
                </div>
                {showDirections ? (
                  <div className="space-y-3">
                    <div className="bg-secondary/80 rounded-xl p-3 text-xs space-y-2">
                      <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500" /><span>Your Location</span></div>
                      <div className="ml-1 border-l-2 border-dashed border-primary/30 h-6" />
                      <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary" /><span>{selected.name}</span></div>
                    </div>
                    <a
                      href={`https://maps.google.com/?q=${selected.lat},${selected.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm active:scale-[0.97] transition-transform"
                    >
                      <Navigation className="w-4 h-4" />
                      Navigate via Google Maps
                    </a>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <button
                      onClick={() => setShowDirections(true)}
                      className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm active:scale-[0.97] transition-transform"
                    >
                      <Navigation className="w-4 h-4" />
                      Get Directions
                    </button>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setShowPickup(true)}
                        className="flex items-center justify-center gap-2 flex-1 px-4 py-2.5 rounded-xl bg-secondary text-secondary-foreground font-semibold text-xs active:scale-[0.97] transition-transform"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        Schedule Pickup
                      </button>
                      <a
                        href="tel:+919876543210"
                        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-secondary text-secondary-foreground font-semibold text-xs active:scale-[0.97] transition-transform"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        Call
                      </a>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pickup Form */}
          <AnimatePresence>
            {showPickup && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 glass-card p-5"
              >
                <button onClick={() => setShowPickup(false)} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
                <h3 className="font-display font-bold mb-4">Schedule Pickup</h3>
                <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); setShowPickup(false); }}>
                  <input placeholder="Your Name" className="w-full px-3 py-2.5 rounded-xl bg-secondary border border-border/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  <input placeholder="Phone Number" className="w-full px-3 py-2.5 rounded-xl bg-secondary border border-border/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  <input placeholder="Address" className="w-full px-3 py-2.5 rounded-xl bg-secondary border border-border/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  <input type="date" className="w-full px-3 py-2.5 rounded-xl bg-secondary border border-border/50 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  <button type="submit" className="w-full px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm active:scale-[0.97] transition-transform">
                    Confirm Pickup
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
