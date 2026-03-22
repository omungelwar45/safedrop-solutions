export type VerificationCheck = {
  id: string;
  label: string;
  passed: boolean;
  detail: string;
};

export type ProofVerificationResult = {
  confidence: number;
  riskFlag: "low" | "medium" | "high";
  checks: VerificationCheck[];
};

export type ChainRecord = {
  token: string;
  dropPoint: string;
  status: "collected" | "in-transit" | "destroyed";
  updatedAt: string;
};

export type ReminderItem = {
  id: string;
  title: string;
  time: string;
  channel: "push" | "sms" | "email";
  enabled: boolean;
};

export type Mission = {
  id: string;
  title: string;
  region: string;
  target: number;
  progress: number;
  reward: string;
};

export const runProofVerification = (): ProofVerificationResult => {
  const confidence = 92;
  const checks: VerificationCheck[] = [
    { id: "label", label: "Medicine label detected", passed: true, detail: "Antibiotic category recognized" },
    { id: "expiry", label: "Expiry date parsed", passed: true, detail: "Expired item confirmed" },
    { id: "location", label: "Location match", passed: true, detail: "Drop point geofence matched" },
    { id: "tamper", label: "Tamper check", passed: true, detail: "No manipulation signals found" },
  ];

  return {
    confidence,
    riskFlag: confidence >= 85 ? "low" : confidence >= 70 ? "medium" : "high",
    checks,
  };
};

export const createChainRecord = (dropPoint: string): ChainRecord => {
  const token = `MED-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  return {
    token,
    dropPoint,
    status: "collected",
    updatedAt: new Date().toLocaleString(),
  };
};

export const calculateImpactScore = (input: {
  disposals: number;
  verifiedRate: number;
  streak: number;
  missionCompletions: number;
}) => {
  const score =
    input.disposals * 8 +
    Math.round(input.verifiedRate * 40) +
    input.streak * 3 +
    input.missionCompletions * 25;

  return {
    score,
    grade: score >= 220 ? "A+" : score >= 180 ? "A" : score >= 140 ? "B" : "C",
  };
};

export const reminders: ReminderItem[] = [
  { id: "rx-end", title: "Post-prescription medicine check", time: "Every Sunday, 8:00 PM", channel: "push", enabled: true },
  { id: "seasonal", title: "Seasonal antibiotic awareness campaign", time: "1st day of month", channel: "email", enabled: true },
  { id: "household", title: "Household cabinet audit", time: "Every 2 weeks", channel: "sms", enabled: false },
];

export const missions: Mission[] = [
  { id: "m-ward-7", title: "Ward 7 Safe Disposal Sprint", region: "Ward 7", target: 600, progress: 412, reward: "Free health check vouchers" },
  { id: "m-school", title: "School AMR Awareness Drive", region: "District Schools", target: 900, progress: 640, reward: "Top school recognition" },
  { id: "m-neighborhood", title: "Neighborhood Clean Med Week", region: "East Zone", target: 350, progress: 208, reward: "Community grant points" },
];

export const partnerMetrics = {
  intakeToday: 132,
  pendingPickups: 18,
  missedSla: 3,
  fillLevelAvg: 67,
};

export const redemptionCatalog = [
  { id: "r-1", title: "Basic Health Checkup", points: 180, sponsor: "CityCare Labs" },
  { id: "r-2", title: "Pharmacy Discount 15%", points: 120, sponsor: "MediPartner" },
  { id: "r-3", title: "Insurance Wellness Credit", points: 300, sponsor: "HealthSure" },
];
