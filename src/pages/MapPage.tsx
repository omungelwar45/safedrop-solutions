import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ScrollReveal } from "../components/ScrollReveal";
import { Search, Navigation, Filter, Phone, Clock, Star, Locate, X, Truck, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Circle, CircleMarker, MapContainer, Polyline, TileLayer, Tooltip, useMap } from "react-leaflet";
import { latLngBounds, type LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

type LocationType = "pharmacy" | "hospital" | "collection";

type DisposalLocation = {
  id: number;
  name: string;
  type: LocationType;
  state: "Karnataka" | "Maharashtra";
  address: string;
  distance: string;
  rating: number;
  open: boolean;
  lat: number;
  lng: number;
};

const LOCATIONS: DisposalLocation[] = [
  { id: 1, name: "Apollo Pharmacy", type: "pharmacy", state: "Karnataka", address: "MG Road, Bengaluru", distance: "0.8 km", rating: 4.5, open: true, lat: 12.97, lng: 77.59 },
  { id: 2, name: "City Hospital Collection", type: "hospital", state: "Karnataka", address: "Koramangala, Bengaluru", distance: "1.2 km", rating: 4.8, open: true, lat: 12.93, lng: 77.62 },
  { id: 3, name: "Green Disposal Center", type: "collection", state: "Karnataka", address: "Indiranagar, Bengaluru", distance: "2.1 km", rating: 4.3, open: false, lat: 12.97, lng: 77.64 },
  { id: 4, name: "MedPlus Pharmacy", type: "pharmacy", state: "Karnataka", address: "HSR Layout, Bengaluru", distance: "2.8 km", rating: 4.1, open: true, lat: 12.91, lng: 77.64 },
  { id: 5, name: "Safe Med Collect", type: "collection", state: "Karnataka", address: "Whitefield, Bengaluru", distance: "5.4 km", rating: 4.6, open: true, lat: 12.97, lng: 77.75 },
  { id: 6, name: "Mumbai Civic Med Return", type: "collection", state: "Maharashtra", address: "Andheri East, Mumbai", distance: "1.0 km", rating: 4.7, open: true, lat: 19.115, lng: 72.869 },
  { id: 7, name: "Pune Care Hospital Drop", type: "hospital", state: "Maharashtra", address: "Shivajinagar, Pune", distance: "1.6 km", rating: 4.6, open: true, lat: 18.531, lng: 73.847 },
  { id: 8, name: "Nagpur Safe Pharmacy", type: "pharmacy", state: "Maharashtra", address: "Dharampeth, Nagpur", distance: "2.2 km", rating: 4.3, open: true, lat: 21.145, lng: 79.083 },
  { id: 9, name: "Nashik AMR Collection Hub", type: "collection", state: "Maharashtra", address: "College Road, Nashik", distance: "3.1 km", rating: 4.4, open: false, lat: 19.997, lng: 73.789 },
];

const USER_LOCATION: LatLngExpression = [12.955, 77.63];

const typeColors: Record<LocationType, string> = {
  pharmacy: "bg-primary/10 text-primary",
  hospital: "bg-destructive/10 text-destructive",
  collection: "bg-accent text-accent-foreground",
};

const typeLabels: Record<LocationType, string> = {
  pharmacy: "Pharmacy",
  hospital: "Hospital",
  collection: "Collection Center",
};

const heatIntensity: Record<LocationType, number> = {
  pharmacy: 1.4,
  hospital: 2.8,
  collection: 2.2,
};

const markerColor: Record<LocationType, string> = {
  pharmacy: "#16a34a",
  hospital: "#dc2626",
  collection: "#0ea5e9",
};

const neighborhoodRisk = [
  { zone: "Central", score: 71, trend: "+4" },
  { zone: "East", score: 64, trend: "-2" },
  { zone: "South", score: 58, trend: "+1" },
];

const FitToFilteredLocations = ({ filtered }: { filtered: DisposalLocation[] }) => {
  const map = useMap();

  useMemo(() => {
    if (filtered.length === 0) {
      return;
    }
    const bounds = latLngBounds(filtered.map((loc) => [loc.lat, loc.lng] as [number, number]));
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [filtered, map]);

  return null;
};

const FocusSelectedLocation = ({ selected }: { selected: DisposalLocation | null }) => {
  const map = useMap();

  useMemo(() => {
    if (!selected) {
      return;
    }
    map.flyTo([selected.lat, selected.lng], Math.max(map.getZoom(), 13), { duration: 0.8 });
  }, [map, selected]);

  return null;
};

const MapPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterState, setFilterState] = useState<string>("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const [showRiskLayer, setShowRiskLayer] = useState(true);
  const [selected, setSelected] = useState<DisposalLocation | null>(null);
  const [showDirections, setShowDirections] = useState(false);

  const filtered = LOCATIONS.filter((l) => {
    const matchSearch =
      !search ||
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.address.toLowerCase().includes(search.toLowerCase()) ||
      l.state.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "all" || l.type === filterType;
    const matchState = filterState === "all" || l.state === filterState;
    const matchOpen = !filterOpen || l.open;
    return matchSearch && matchType && matchState && matchOpen;
  });

  const routePath = useMemo(() => {
    if (!showDirections || !selected) {
      return null;
    }
    return [USER_LOCATION, [selected.lat, selected.lng] as [number, number]];
  }, [selected, showDirections]);

  const nearestLocation = useMemo(() => {
    const [userLat, userLng] = USER_LOCATION as [number, number];
    return LOCATIONS.reduce((best, current) => {
      const dBest = Math.hypot(best.lat - userLat, best.lng - userLng);
      const dCurrent = Math.hypot(current.lat - userLat, current.lng - userLng);
      return dCurrent < dBest ? current : best;
    });
  }, []);

  return (
    <div className="min-h-screen pt-16">
      <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)]">
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
                onClick={() => {
                  setSelected(nearestLocation);
                  setShowDirections(false);
                }}
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
                  {t === "all" ? "All" : typeLabels[t as LocationType]}
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
              {(["all", "Maharashtra", "Karnataka"] as const).map((state) => (
                <button
                  key={state}
                  onClick={() => setFilterState(state)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors active:scale-95 ${
                    filterState === state
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-muted"
                  }`}
                >
                  {state === "all" ? "All States" : state}
                </button>
              ))}
              <button
                onClick={() => setShowRiskLayer(!showRiskLayer)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors active:scale-95 ${
                  showRiskLayer ? "bg-destructive text-destructive-foreground" : "bg-secondary text-secondary-foreground"
                }`}
              >
                <Activity className="w-3 h-3" />
                AMR Risk Layer
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {filtered.map((loc, i) => (
              <ScrollReveal key={loc.id} delay={i * 0.05}>
                <button
                  onClick={() => {
                    setSelected(loc);
                    setShowDirections(false);
                  }}
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
                      <p className="text-muted-foreground text-xs truncate">{loc.address}, {loc.state}</p>
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

        <div className="flex-1 relative min-h-[300px]">
          <MapContainer center={USER_LOCATION} zoom={12} className="absolute inset-0 z-0" zoomControl={true}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <FitToFilteredLocations filtered={filtered} />
            <FocusSelectedLocation selected={selected} />

            {showRiskLayer && LOCATIONS.map((loc) => (
              <Circle
                key={`heat-${loc.id}`}
                center={[loc.lat, loc.lng]}
                radius={340 + heatIntensity[loc.type] * 210}
                pathOptions={{ color: "#06b6d4", weight: 0, fillColor: "#06b6d4", fillOpacity: 0.12 + heatIntensity[loc.type] * 0.05 }}
              />
            ))}

            <CircleMarker
              center={USER_LOCATION}
              radius={8}
              pathOptions={{ color: "#ffffff", weight: 2, fillColor: "#2563eb", fillOpacity: 1 }}
            >
              <Tooltip direction="top" offset={[0, -8]} permanent>
                You are here
              </Tooltip>
            </CircleMarker>

            {filtered.map((loc) => (
              <CircleMarker
                key={`marker-${loc.id}`}
                center={[loc.lat, loc.lng]}
                radius={selected?.id === loc.id ? 10 : 7}
                pathOptions={{ color: "#ffffff", weight: 2, fillColor: markerColor[loc.type], fillOpacity: 1 }}
                eventHandlers={{
                  click: () => {
                    setSelected(loc);
                    setShowDirections(false);
                  },
                }}
              >
                <Tooltip direction="top" offset={[0, -8]}>
                  {loc.name}
                </Tooltip>
              </CircleMarker>
            ))}

            {routePath && (
              <Polyline positions={routePath} pathOptions={{ color: "#0ea5e9", weight: 5, opacity: 0.9, dashArray: "10 8" }} />
            )}
          </MapContainer>

          <div className="absolute top-3 left-3 z-[500] glass-card px-3 py-2 text-xs text-muted-foreground">
            Real map + AMR risk intelligence
          </div>

          {showRiskLayer && (
            <div className="absolute top-3 right-3 z-[500] glass-card p-3 w-56">
              <p className="text-xs font-semibold mb-2">Neighborhood Risk Index</p>
              <div className="space-y-2">
                {neighborhoodRisk.map((risk) => (
                  <div key={risk.zone} className="text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span>{risk.zone}</span>
                      <span className="font-semibold">{risk.score}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-rose-500" style={{ width: `${risk.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <AnimatePresence>
            {selected && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute z-[500] bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 glass-card p-5"
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
                    <button
                      onClick={() => setShowDirections(false)}
                      className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm active:scale-[0.97] transition-transform"
                    >
                      <Navigation className="w-4 h-4" />
                      End In-App Navigation
                    </button>
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
                        onClick={() => navigate("/pickup")}
                        className="flex items-center justify-center gap-2 flex-1 px-4 py-2.5 rounded-xl bg-secondary text-secondary-foreground font-semibold text-xs active:scale-[0.97] transition-transform"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        Pickup Module
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
        </div>
      </div>
    </div>
  );
};

export default MapPage;
