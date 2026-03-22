import cors from "cors";
import express from "express";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, "db.json");

const app = express();
const PORT = Number(process.env.PORT || 8787);

app.use(cors());
app.use(express.json());

const readDb = async () => {
  const content = await fs.readFile(dbPath, "utf-8");
  return JSON.parse(content);
};

const writeDb = async (db) => {
  await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
};

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "safedrop-backend" });
});

app.post("/api/auth/login", (req, res) => {
  const email = String(req.body?.email || "").trim().toLowerCase();
  const password = String(req.body?.password || "").trim();

  if (!email || !password) {
    return res.status(400).json({ error: "Please enter both email and password." });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters." });
  }

  const name = (email.split("@")[0] || "MediSafe User").replace(/\./g, " ");
  const token = Buffer.from(`${email}:${Date.now()}`).toString("base64");

  return res.json({
    token,
    user: {
      email,
      name,
    },
  });
});

app.get("/api/reminders", async (_req, res) => {
  const db = await readDb();
  res.json({ reminders: db.reminders || [] });
});

app.patch("/api/reminders/:id", async (req, res) => {
  const id = String(req.params.id || "");
  const enabled = req.body?.enabled;

  if (typeof enabled !== "boolean") {
    return res.status(400).json({ error: "enabled must be a boolean." });
  }

  const db = await readDb();
  const reminderIndex = (db.reminders || []).findIndex((item) => item.id === id);

  if (reminderIndex === -1) {
    return res.status(404).json({ error: "Reminder not found." });
  }

  db.reminders[reminderIndex] = {
    ...db.reminders[reminderIndex],
    enabled,
  };

  await writeDb(db);

  return res.json({ reminder: db.reminders[reminderIndex] });
});

app.post("/api/pickups", async (req, res) => {
  const fullName = String(req.body?.fullName || "").trim();
  const phoneNumber = String(req.body?.phoneNumber || "").trim();
  const pickupAddress = String(req.body?.pickupAddress || "").trim();
  const preferredDate = String(req.body?.preferredDate || "").trim();
  const preferredTime = String(req.body?.preferredTime || "").trim();
  const medicineNotes = String(req.body?.medicineNotes || "").trim();

  if (!fullName || !phoneNumber || !pickupAddress || !preferredDate || !preferredTime) {
    return res.status(400).json({ error: "Missing required pickup fields." });
  }

  const db = await readDb();
  const id = `pk_${Date.now()}`;

  db.pickups = db.pickups || [];
  db.pickups.push({
    id,
    fullName,
    phoneNumber,
    pickupAddress,
    preferredDate,
    preferredTime,
    medicineNotes,
    status: "requested",
    createdAt: new Date().toISOString(),
  });

  await writeDb(db);

  return res.status(201).json({ id });
});

app.listen(PORT, () => {
  console.log(`SafeDrop backend running on http://localhost:${PORT}`);
});
