const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json()); // to parse JSON body
app.use(express.static("public")); // to serve CSS and JS

// Serve HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});


// Load current count from data.json
app.get("/api/count", (req, res) => {
  const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
  res.json(data);
});

// Update count (increase, decrease, reset)
app.post("/api/count", (req, res) => {
  const { count } = req.body;

  if (typeof count === "number") {
    fs.writeFileSync("data.json", JSON.stringify({ count }));
    res.json({ success: true, count });
  } else {
    res.status(400).json({ success: false, message: "Invalid count" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
