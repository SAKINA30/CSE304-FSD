// server.js
// Express job portal: Resume uploader with PDF-only & 2MB limit

const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// set EJS view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// serve static files (optional, e.g. css)
app.use(express.static("public"));

// ---- Multer Config ---- //
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // save in uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// File filter (PDF only)
function fileFilter(req, file, cb) {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed!"), false);
  }
}

// Multer middleware
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter,
});

// ---- Routes ---- //

// GET form page
app.get("/", (req, res) => {
  res.render("index", { message: null });
});

// POST upload handler
app.post("/upload", (req, res) => {
  upload.single("resume")(req, res, function (err) {
    if (err) {
      // Multer error (file too big, wrong type, etc.)
      return res.status(400).render("index", { message: err.message });
    }
    if (!req.file) {
      return res.status(400).render("index", { message: "Please upload a PDF file." });
    }
    res.render("result", { filename: req.file.filename });
  });
});

// start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
