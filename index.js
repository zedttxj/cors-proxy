const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("✅ CORS Proxy is running!");
});

app.get("/proxy", async (req, res) => {
  const target = req.query.url;
  if (!target) return res.status(400).send("Missing ?url=");

  try {
    const response = await fetch(target, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    const contentType = response.headers.get("content-type");
    res.set("Content-Type", contentType);
    const buffer = await response.arrayBuffer();
    res.send(Buffer.from(buffer));
  } catch (err) {
    res.status(500).send("Failed to fetch: " + err.message);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
