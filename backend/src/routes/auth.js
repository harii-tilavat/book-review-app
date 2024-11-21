const express = require("express");
const router = express.Router();

// Route: Register a new user
router.post("/login", (req, res) => {
  res.send({ message: "User login endpoint." });
});

// Route: Login a user
router.post("/register", (req, res) => {
  res.send({ message: "User registration" });
});
module.exports = router;
