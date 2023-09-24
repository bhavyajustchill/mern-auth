const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth.controller");
const verifyUser = require("../middleware/auth.middleware");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/", verifyUser, controller.verifyJwt);
router.get("/logout", controller.logout);

module.exports = router;
