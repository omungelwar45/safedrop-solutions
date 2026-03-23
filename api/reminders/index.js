const mockReminders = [
  {
    id: "rx-end",
    title: "Rx Ending Soon",
    time: "09:00",
    channel: "push",
    enabled: true,
  },
  {
    id: "seasonal",
    title: "Seasonal Health Check",
    time: "10:00",
    channel: "email",
    enabled: true,
  },
  {
    id: "household",
    title: "Household Medicine Review",
    time: "14:00",
    channel: "sms",
    enabled: false,
  },
];

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origins", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  return res.json(mockReminders);
}
