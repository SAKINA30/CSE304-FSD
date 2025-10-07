// controllers/homeController.js
const getHomePage = (req, res) => {
  res.send('Welcome to our site');
};

module.exports = { getHomePage };
