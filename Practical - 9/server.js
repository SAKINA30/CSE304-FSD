// server.js
const express = require('express');
const app = express();
const homeRoutes = require('./routes/home');

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/', homeRoutes);

// Server Start
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
