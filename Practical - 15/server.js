// server.js
// Library portal with login, profile, and logout using sessions

const express = require("express");
const session = require("express-session");
const path = require("path");



const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true })); // parse form data
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

// Session setup
app.use(
  session({
    secret: "librarySecretKey123", // should be kept safe in real apps
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 30 }, // 30 min session
  })
);

// ==== ROUTES ====

// Home page
app.get("/", (req, res) => {
  res.render("index", { user: req.session.user });
});

// Login form
app.get("/login", (req, res) => {
  res.render("login", { message: null });
});

// Handle login
app.post("/login", (req, res) => {
  const { name } = req.body;

  if (!name || name.trim() === "") {
    return res.render("login", { message: "Name is required!" });
  }

  // Save user info in session
  req.session.user = {
    name,
    loginTime: new Date().toLocaleString(),
  };

  res.redirect("/profile");
});

// Profile page (protected)
app.get("/profile", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  res.render("profile", { user: req.session.user });
});

// Logout
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send("Error logging out");
    }
    res.redirect("/");
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

