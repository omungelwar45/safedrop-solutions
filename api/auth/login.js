export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

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
}
