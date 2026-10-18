// Vercel Serverless Function: proxies AI requests to Anthropic. Needs env var ANTHROPIC_API_KEY.
module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).send("Method not allowed");
  try {
    const { prompt } = req.body || {};
    if (!prompt || typeof prompt !== "string" || prompt.length > 12000) return res.status(400).json({ error: "bad prompt" });
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": process.env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model: "claude-sonnet-5-5", max_tokens: 1500, messages: [{ role: "user", content: prompt }] })
    });
    const d = await r.json();
    const text = (d.content || []).map(b => b.text || "").join("");
    return res.status(r.ok ? 200 : 502).json({ text });
  } catch (e) {
    return res.status(500).json({ error: "server" });
  }
};
