const express = require("express");
const router = express.Router();
const ConfigController = require("../controllers/configController");
// const ConfigController = new 

// Routes for config (Auth section)
const configController = new ConfigController();
configController.register(router);


module.exports = router;