export interface Incident {
  id: string;
  title: string;
  type: "Homicide" | "Officer-Involved Shooting";
  incidentDate: string;
  incidentTime: string;
  locationLabel: string;
  location: { lat: number; lng: number };
  summary: string;
  caseStatus: string;
  sourceLabel: string;
  sourceUrl: string;
}

export const INCIDENTS_2026: Incident[] = [
  {
    id: "deangelo-scott-2026-04-10",
    title: "De'Angelo Scott Homicide",
    type: "Homicide",
    incidentDate: "2026-04-10",
    incidentTime: "8:34 PM",
    locationLabel: "3000 block of 30th Street, SE, Washington, DC",
    location: { lat: 38.8532817, lng: -76.9654461 },
    summary:
      "MPD reported that De'Angelo Scott was shot and killed at this location and requested public tips tied to the homicide investigation.",
    caseStatus: "Public information request active",
    sourceLabel: "MPDC publication",
    sourceUrl: "https://mpdc.dc.gov/publication/homicide-victim-deangelo-scott",
  },
  {
    id: "terrance-crutchfield-2026-03-09",
    title: "Terrance L. Crutchfield Homicide",
    type: "Homicide",
    incidentDate: "2026-03-09",
    incidentTime: "6:27 PM",
    locationLabel: "Front of 5300 block of E Street, SE, Washington, DC",
    location: { lat: 38.882058, lng: -76.926566 },
    summary:
      "MPD reported a fatal shooting of Terrance L. Crutchfield and asked the public to submit information that could support arrest and conviction.",
    caseStatus: "Public information request active",
    sourceLabel: "MPDC publication",
    sourceUrl: "https://mpdc.dc.gov/publication/homicide-victim-terrance-l-crutchfield",
  },
  {
    id: "john-despertt-2026-02-05",
    title: "John Despertt Homicide",
    type: "Homicide",
    incidentDate: "2026-02-05",
    incidentTime: "4:08 PM",
    locationLabel: "2400 block of Virginia Avenue, NW, Washington, DC",
    location: { lat: 38.8971657, lng: -77.0514787 },
    summary:
      "MPD reported John Despertt was stabbed and killed at this location and released a reward bulletin to gather case leads.",
    caseStatus: "Public information request active",
    sourceLabel: "MPDC publication",
    sourceUrl: "https://mpdc.dc.gov/publication/homicide-victim-john-despertt",
  },
  {
    id: "travis-fears-2026-02-21",
    title: "Travis Fears Homicide",
    type: "Homicide",
    incidentDate: "2026-02-21",
    incidentTime: "11:07 PM",
    locationLabel: "4400 block of 3rd Street, SE, Washington, DC",
    location: { lat: 38.82643, lng: -77.00198 },
    summary:
      "MPD reported that Travis Fears was shot and killed in Southeast and published a reward notice seeking witnesses or additional evidence.",
    caseStatus: "Public information request active",
    sourceLabel: "MPDC publication listing",
    sourceUrl: "https://mpdc.dc.gov/publications",
  },
  {
    id: "nyesha-walden-hatcher-2026-02-02",
    title: "Nyesha Walden-Hatcher Homicide",
    type: "Homicide",
    incidentDate: "2026-02-02",
    incidentTime: "3:00 AM",
    locationLabel: "3100 block of 16th Street, NW, Washington, DC",
    location: { lat: 38.928811, lng: -77.036578 },
    summary:
      "MPD reported Nyesha Walden-Hatcher was shot and killed at this location. Subsequent MPD release stated a suspect was charged in March 2026.",
    caseStatus: "Suspect charged (per MPD update)",
    sourceLabel: "MPDC publication and follow-up release",
    sourceUrl: "https://mpdc.dc.gov/node/1821096",
  },
  {
    id: "malik-moore-2026-01-21",
    title: "Malik Moore Homicide",
    type: "Homicide",
    incidentDate: "2026-01-21",
    incidentTime: "12:04 AM",
    locationLabel: "1300 block of Varnum Street, NE, Washington, DC",
    location: { lat: 38.942945, lng: -76.987088 },
    summary:
      "MPD reported that Malik Moore was shot and killed in Northeast and requested tips through the homicide branch channels.",
    caseStatus: "Public information request active",
    sourceLabel: "MPDC publication",
    sourceUrl: "https://mpdc.dc.gov/publication/homicide-victim-malik-moore",
  },
  {
    id: "nehemia-williams-2026-02-13",
    title: "Nehemia Williams Homicide",
    type: "Homicide",
    incidentDate: "2026-02-13",
    incidentTime: "2:15 PM",
    locationLabel: "2600 block of 14th Street, NW, Washington, DC",
    location: { lat: 38.9238407, lng: -77.0324184 },
    summary:
      "MPD reported Nehemia Williams was shot outside a gas station and later died at a hospital. The case remains listed in MPD reward publications.",
    caseStatus: "Public information request active",
    sourceLabel: "MPDC release",
    sourceUrl: "https://mpdc.dc.gov/release/mpd-investigating-14th%C2%A0street-homicide",
  },
  {
    id: "new-york-ave-ois-2026-01-18",
    title: "New York Avenue Officer-Involved Shooting",
    type: "Officer-Involved Shooting",
    incidentDate: "2026-01-18",
    incidentTime: "1:30 AM",
    locationLabel: "1800 block of New York Avenue, NE, Washington, DC",
    location: { lat: 38.917376, lng: -76.977269 },
    summary:
      "MPD reported officers responded to threats at a nightclub, pursued the suspect vehicle, and an officer discharged their service weapon during the encounter.",
    caseStatus: "Administrative review and independent federal review referenced by MPD",
    sourceLabel: "MPDC release",
    sourceUrl: "https://mpdc.dc.gov/release/mpd-investigating-new-york-avenue-officer-involved-shooting",
  },
];
