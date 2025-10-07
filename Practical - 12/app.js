const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // serve CSS, JS, images

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.post("/calculate", (req, res) => {
  const num1 = parseFloat(req.body.num1);
  const num2 = parseFloat(req.body.num2);
  const operation = req.body.operation;

  let message;

  if (isNaN(num1) || isNaN(num2)) {
    message = "Invalid input! Enter numbers only.";
  } else {
    switch (operation) {
      case "add": message = `${num1} + ${num2} = ${num1 + num2}`; break;
      case "subtract": message = `${num1} - ${num2} = ${num1 - num2}`; break;
      case "multiply": message = `${num1} × ${num2} = ${num1 * num2}`; break;
      case "divide":
        message = num2 === 0 ? "Cannot divide by zero!" : `${num1} ÷ ${num2} = ${num1 / num2}`;
        break;
      default: message = "Invalid operation";
    }
  }

  res.send(`<h1>Kids Calculator</h1><p>${message}</p><a href="/">Go Back</a>`);
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
