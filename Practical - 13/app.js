const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// Show the income form
app.get("/", (req, res) => {
  res.render("form", { error: null });
});

// Handle form submission
app.post("/calculate", (req, res) => {
  const income1 = req.body.income1;
  const income2 = req.body.income2;

  // Validation: must be numbers
  if (
    isNaN(income1) || income1.trim() === "" ||
    isNaN(income2) || income2.trim() === ""
  ) {
    return res.render("form", { error: "Please enter valid numbers for both incomes." });
  }

  const total = parseFloat(income1) + parseFloat(income2);
  res.render("result", { income1, income2, total });
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
