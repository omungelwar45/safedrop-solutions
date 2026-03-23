export type ReminderChannel = "push" | "sms" | "email";

export type SyncedReminder = {
  id: string;
  title: string;
  time: string;
  channel: ReminderChannel;
  enabled: boolean;
};

export type PrescriptionSyncInput = {
  medicineName: string;
  dose: string;
  daysSupply: number;
  startDate: string;
};

export type ScanInput = {
  medicineName: string;
  barcode: string;
  source: "camera" | "manual";
};

type ScanRecord = {
  id: string;
  medicineName: string;
  barcode: string;
  source: "camera" | "manual";
  createdAt: string;
};

type PrescriptionRecord = {
  id: string;
  medicineName: string;
  dose: string;
  daysSupply: number;
  startDate: string;
  expectedRefillDate: string;
};

type HackathonState = {
  disposals: number;
  points: number;
  scans: ScanRecord[];
  prescriptions: PrescriptionRecord[];
  syncedReminders: SyncedReminder[];
  monthlyDisposals: Record<string, number>;
};

const STORAGE_KEY = "medisafe.hackathon.features.v1";

const getMonthKey = (value: Date) => {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
};

const monthLabel = (key: string) => {
  const [year, month] = key.split("-").map(Number);
  const value = new Date(year, (month || 1) - 1, 1);
  return value.toLocaleDateString(undefined, { month: "short" });
};

const toIsoDate = (value: Date) => value.toISOString().split("T")[0];

const defaultState = (): HackathonState => {
  const now = new Date();
  const monthlyDisposals: Record<string, number> = {};

  for (let i = 5; i >= 0; i -= 1) {
    const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
    monthlyDisposals[getMonthKey(month)] = 0;
  }

  return {
    disposals: 0,
    points: 0,
    scans: [],
    prescriptions: [],
    syncedReminders: [],
    monthlyDisposals,
  };
};

const readState = (): HackathonState => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return defaultState();
  }

  try {
    const parsed = JSON.parse(raw) as Partial<HackathonState>;
    const fallback = defaultState();
    return {
      ...fallback,
      ...parsed,
      scans: Array.isArray(parsed.scans) ? parsed.scans : fallback.scans,
      prescriptions: Array.isArray(parsed.prescriptions) ? parsed.prescriptions : fallback.prescriptions,
      syncedReminders: Array.isArray(parsed.syncedReminders) ? parsed.syncedReminders : fallback.syncedReminders,
      monthlyDisposals: {
        ...fallback.monthlyDisposals,
        ...(parsed.monthlyDisposals || {}),
      },
    };
  } catch {
    return defaultState();
  }
};

const writeState = (next: HackathonState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
};

export const getHackathonState = () => readState();

export const recordMedicineScan = (input: ScanInput) => {
  const state = readState();
  const now = new Date();
  const id = `scan-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const pointsAwarded = 15;
  const monthKey = getMonthKey(now);

  state.scans.unshift({
    id,
    medicineName: input.medicineName,
    barcode: input.barcode,
    source: input.source,
    createdAt: now.toISOString(),
  });

  state.disposals += 1;
  state.points += pointsAwarded;
  state.monthlyDisposals[monthKey] = (state.monthlyDisposals[monthKey] || 0) + 1;

  writeState(state);
  return { state, pointsAwarded };
};

export const addPrescriptionSync = (input: PrescriptionSyncInput) => {
  const state = readState();
  const id = `rx-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const startDate = new Date(input.startDate);
  const refillDate = new Date(startDate);
  refillDate.setDate(refillDate.getDate() + input.daysSupply);

  const prescription: PrescriptionRecord = {
    id,
    medicineName: input.medicineName,
    dose: input.dose,
    daysSupply: input.daysSupply,
    startDate: toIsoDate(startDate),
    expectedRefillDate: toIsoDate(refillDate),
  };

  const reminder: SyncedReminder = {
    id: `sync-${id}`,
    title: `${input.medicineName} refill and disposal check`,
    time: "09:00",
    channel: "push",
    enabled: true,
  };

  state.prescriptions.unshift(prescription);
  state.syncedReminders.unshift(reminder);
  state.points += 10;
  writeState(state);

  return { prescription, reminder };
};

export const listSyncedReminders = () => readState().syncedReminders;

export const updateSyncedReminder = (id: string, enabled: boolean) => {
  const state = readState();
  const target = state.syncedReminders.find((item) => item.id === id);
  if (!target) {
    return null;
  }
  target.enabled = enabled;
  writeState(state);
  return target;
};

export const getImpactMetrics = () => {
  const state = readState();
  const waterProtectedLiters = state.disposals * 24;
  const riskEventsAvoided = state.disposals * 3;
  const householdsReached = Math.max(0, Math.floor(state.disposals * 0.6));

  return {
    disposals: state.disposals,
    points: state.points,
    waterProtectedLiters,
    riskEventsAvoided,
    householdsReached,
  };
};

export const getImpactSeries = () => {
  const state = readState();
  return Object.entries(state.monthlyDisposals)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => ({
      key,
      label: monthLabel(key),
      value,
    }));
};

export const getBadgeProgress = () => {
  const state = readState();
  const { disposals, points, prescriptions } = state;

  const badges = [
    {
      id: "first-disposal",
      title: "First Disposal",
      description: "Complete your first verified disposal",
      earned: disposals >= 1,
    },
    {
      id: "scanner-pro",
      title: "Scanner Pro",
      description: "Scan 5 medicines using Smart Scanner",
      earned: state.scans.length >= 5,
    },
    {
      id: "sync-guardian",
      title: "Sync Guardian",
      description: "Sync 2 prescriptions",
      earned: prescriptions.length >= 2,
    },
    {
      id: "impact-builder",
      title: "Impact Builder",
      description: "Earn 120 impact points",
      earned: points >= 120,
    },
    {
      id: "community-leader",
      title: "Community Leader",
      description: "Reach 200 impact points",
      earned: points >= 200,
    },
  ];

  return {
    badges,
    earnedCount: badges.filter((badge) => badge.earned).length,
  };
};

export const getLeaderboard = (userName: string) => {
  const state = readState();
  const userScore = state.points + state.disposals * 5;

  const seeded = [
    { name: "CityCare Clinic", score: 410, disposals: 62 },
    { name: "GreenLife Pharmacy", score: 355, disposals: 51 },
    { name: "AMR Warriors", score: 312, disposals: 46 },
    { name: "HealthFirst Group", score: 280, disposals: 39 },
  ];

  const entries = [
    ...seeded,
    {
      name: userName || "You",
      score: userScore,
      disposals: state.disposals,
      isUser: true,
    },
  ]
    .sort((left, right) => right.score - left.score)
    .map((item, index) => ({
      rank: index + 1,
      ...item,
    }));

  return entries;
};

export const getRecentScans = () => readState().scans.slice(0, 6);

export const getSyncedPrescriptions = () => readState().prescriptions.slice(0, 8);