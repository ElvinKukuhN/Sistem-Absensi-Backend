const express = require("express");
const router = express.Router();
const controller = require("../controllers");


router.post("/signUp", controller.authController.signUp)
router.post("/signIn", controller.authController.signIn)
router.post("/logout", controller.authController.logout)

module.exports = router