const express = require("express");
const router = express.Router();
const managerController = require("../controllers/managerController");
const managerRule = require("../middlewares/managerRule");

// login
router.post("/login", managerRule, managerController.login);

// register
router.post("/register", managerRule, managerController.register);

module.exports = router;
