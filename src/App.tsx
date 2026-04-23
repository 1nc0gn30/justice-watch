import React, { useMemo, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import {
  AlertCircle,
  CalendarDays,
  ExternalLink,
  MapPin,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "./lib/utils";
import { INCIDENTS_2026, type Incident } from "./data/incidents";

const iconShadowUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png";

const homicideIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: iconShadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const oisIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png",
  shadowUrl: iconShadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function formatIncidentDate(date: string): string {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function getMapCenter(incidents: Incident[]): [number, number] {
  if (incidents.length === 0) return [38.9072, -77.0369];

  const totals = incidents.reduce(
    (acc, incident) => {
      return {
        lat: acc.lat + incident.location.lat,
        lng: acc.lng + incident.location.lng,
      };
    },
    { lat: 0, lng: 0 },
  );

  return [totals.lat / incidents.length, totals.lng / incidents.length];
}

export default function App() {
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistError, setWaitlistError] = useState("");
  const [isSubmittingWaitlist, setIsSubmittingWaitlist] = useState(false);
  const [waitlistOpenedAt] = useState(() => Date.now());
  const [hasJoinedWaitlist, setHasJoinedWaitlist] = useState(() => {
    if (typeof window === "undefined") return false;
    return Boolean(window.localStorage.getItem("justicewatch_waitlist_email"));
  });

  const mapCenter = useMemo(() => getMapCenter(INCIDENTS_2026), []);
  const incidentsByType = useMemo(() => {
    const homicideCount = INCIDENTS_2026.filter((item) => item.type === "Homicide").length;
    return {
      homicideCount,
      oisCount: INCIDENTS_2026.length - homicideCount,
    };
  }, []);

  const handleWaitlistSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const normalizedEmail = waitlistEmail.trim().toLowerCase();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);
    if (!emailOk) {
      setWaitlistError("Enter a valid email address to continue.");
      return;
    }

    setIsSubmittingWaitlist(true);
    setWaitlistError("");

    try {
      const body = new URLSearchParams({
        "form-name": "waitlist",
        email: normalizedEmail,
        "bot-field": "",
      }).toString();

      const response = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      });

      if (!response.ok) {
        throw new Error(`Waitlist request failed with status ${response.status}`);
      }

      window.localStorage.setItem("justicewatch_waitlist_email", normalizedEmail);
      setHasJoinedWaitlist(true);
    } catch (error) {
      const isLocalDev =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1";

      if (isLocalDev) {
        window.localStorage.setItem("justicewatch_waitlist_email", normalizedEmail);
        setHasJoinedWaitlist(true);
      } else {
        console.error(error);
        setWaitlistError("Submission failed. Please try again in a moment.");
      }
    } finally {
      setIsSubmittingWaitlist(false);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-zinc-950 text-zinc-100">
      <header className="absolute inset-x-0 top-0 z-20 border-b border-zinc-800/80 bg-zinc-950/80 px-4 py-3 backdrop-blur md:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <img
              src="/favicon.svg"
              alt="JusticeWatch logo mark"
              className="h-6 w-6 rounded-md"
            />
            <div>
              <h1 className="text-base font-semibold tracking-tight md:text-lg">JusticeWatch</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 md:text-[11px]">
                2026 Incident Briefing Map
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-5 text-xs text-zinc-300 md:flex">
            <div>
              <span className="text-zinc-500">Cases:</span> {INCIDENTS_2026.length}
            </div>
            <div>
              <span className="text-zinc-500">Homicide:</span> {incidentsByType.homicideCount}
            </div>
            <div>
              <span className="text-zinc-500">OIS:</span> {incidentsByType.oisCount}
            </div>
          </div>
        </div>
      </header>

      <main className="relative h-full w-full pt-[62px]">
        <MapContainer center={mapCenter} zoom={12} className="h-full w-full" zoomControl={false}>
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />

          {INCIDENTS_2026.map((incident) => (
            <Marker
              key={incident.id}
              position={[incident.location.lat, incident.location.lng]}
              icon={incident.type === "Officer-Involved Shooting" ? oisIcon : homicideIcon}
              eventHandlers={{ click: () => setSelectedIncident(incident) }}
            >
              <Popup className="custom-popup">
                <article className="space-y-2 p-1 text-zinc-900">
                  <p
                    className={cn(
                      "inline-flex rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-wide",
                      incident.type === "Officer-Involved Shooting"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-red-100 text-red-800",
                    )}
                  >
                    {incident.type}
                  </p>
                  <h2 className="text-sm font-bold leading-tight">{incident.title}</h2>
                  <p className="text-xs text-zinc-700">{incident.locationLabel}</p>
                  <p className="text-xs text-zinc-700">
                    {formatIncidentDate(incident.incidentDate)} at {incident.incidentTime}
                  </p>
                </article>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        <AnimatePresence>
          {selectedIncident && (
            <motion.aside
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="absolute bottom-4 left-4 right-4 z-30 max-h-[76vh] overflow-y-auto rounded-2xl border border-zinc-700/70 bg-zinc-900/95 shadow-2xl backdrop-blur md:bottom-6 md:left-auto md:right-6 md:w-[420px]"
            >
              <div className="relative border-b border-zinc-800 p-5">
                <button
                  onClick={() => setSelectedIncident(null)}
                  className="absolute right-4 top-4 rounded-full bg-zinc-800 p-1.5 text-zinc-300 transition hover:bg-zinc-700"
                  aria-label="Close incident details"
                >
                  <X className="h-4 w-4" />
                </button>

                <p
                  className={cn(
                    "mb-3 inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider",
                    selectedIncident.type === "Officer-Involved Shooting"
                      ? "bg-amber-400/15 text-amber-300"
                      : "bg-red-400/15 text-red-300",
                  )}
                >
                  {selectedIncident.type}
                </p>
                <h2 className="pr-10 text-xl font-semibold leading-tight">{selectedIncident.title}</h2>
                <div className="mt-3 space-y-1 text-sm text-zinc-300">
                  <p className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" />
                    <span>{selectedIncident.locationLabel}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-zinc-400" />
                    <span>
                      {formatIncidentDate(selectedIncident.incidentDate)} at {selectedIncident.incidentTime}
                    </span>
                  </p>
                </div>
              </div>

              <div className="space-y-4 p-5">
                <section>
                  <h3 className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                    Incident Brief
                  </h3>
                  <p className="text-sm leading-6 text-zinc-200">{selectedIncident.summary}</p>
                </section>

                <section>
                  <h3 className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                    Case Status
                  </h3>
                  <p className="text-sm text-zinc-200">{selectedIncident.caseStatus}</p>
                </section>

                <a
                  href={selectedIncident.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-blue-400/40 bg-blue-500/10 px-3 py-2 text-sm font-medium text-blue-200 transition hover:bg-blue-500/20"
                >
                  Source: {selectedIncident.sourceLabel}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!hasJoinedWaitlist && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-40 flex items-center justify-center bg-zinc-950/85 px-4 backdrop-blur-sm"
              aria-modal="true"
              role="dialog"
            >
              <motion.div
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="w-full max-w-lg rounded-2xl border border-zinc-700 bg-zinc-900 p-6 shadow-2xl md:p-8"
              >
                <div className="mb-4 inline-flex rounded-full border border-blue-400/40 bg-blue-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-200">
                  Waitlist Access Gate
                </div>
                <h2 className="text-2xl font-semibold tracking-tight text-white">Access JusticeWatch Briefing</h2>
                <p className="mt-3 text-sm leading-6 text-zinc-300">
                  This preview contains mapped incident briefings from 2026 public releases. Submit your email to join the waitlist and unlock the map.
                </p>

                <form onSubmit={handleWaitlistSubmit} className="mt-6 space-y-3">
                  <label htmlFor="waitlist-email" className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
                    Email address (required)
                  </label>
                  <input
                    id="waitlist-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={waitlistEmail}
                    onChange={(e) => setWaitlistEmail(e.target.value)}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-blue-400"
                    placeholder="name@domain.com"
                  />

                  {waitlistError ? (
                    <p className="flex items-center gap-2 text-sm text-red-300">
                      <AlertCircle className="h-4 w-4" />
                      {waitlistError}
                    </p>
                  ) : (
                    <p className="text-xs text-zinc-500">
                      Mandatory submission. Map access unlocks after successful waitlist sign-up.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmittingWaitlist}
                    className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmittingWaitlist ? "Joining waitlist..." : "Join Waitlist and Enter Map"}
                  </button>
                </form>

                <p className="mt-4 text-[11px] text-zinc-500">
                  Session gate started {new Date(waitlistOpenedAt).toLocaleTimeString()}.
                </p>
              </motion.div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
