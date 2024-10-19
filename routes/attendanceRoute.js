const express = require("express");
const router = express.Router();
const controller = require("../controllers");
const authMiddleware = require("../middleware/authMiddleware");


router.post("/checkIn", authMiddleware, controller.attendanceControllerr.checkIn)
router.post("/checkOut", authMiddleware, controller.attendanceControllerr.checkOut)
router.get("/attendance", authMiddleware, controller.attendanceControllerr.getAttendance)

module.exports = router