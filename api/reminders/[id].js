const reminders = {
  "rx-end": { id: "rx-end", title: "Rx Ending Soon", time: "09:00", channel: "push", enabled: true },
  "seasonal": { id: "seasonal", title: "Seasonal Health Check", time: "10:00", channel: "email", enabled: true },
  "household": { id: "household", title: "Household Medicine Review", time: "14:00", channel: "sms", enabled: false },
};

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { id } = req.query;

  if (req.method === "PATCH") {
    if (!reminders[id]) {
      return res.status(404).json({ error: "Reminder not found" });
    }

    const reminder = reminders[id];
    if (req.body.enabled !== undefined) {
      reminder.enabled = req.body.enabled;
    }

    return res.json(reminder);
  }

  res.status(405).json({ error: "Method not allowed" });
}
