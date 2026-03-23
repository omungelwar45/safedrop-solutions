const pickups = [];
let pickupId = 0;

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { fullName, phoneNumber, pickupAddress, preferredDate, preferredTime } = req.body;

  if (!fullName || !phoneNumber || !pickupAddress || !preferredDate || !preferredTime) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const pickup = {
    id: String(++pickupId),
    fullName,
    phoneNumber,
    pickupAddress,
    preferredDate,
    preferredTime,
    createdAt: new Date().toISOString(),
  };

  pickups.push(pickup);

  return res.status(201).json(pickup);
}
