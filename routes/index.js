var express = require('express');
var router = express.Router();
const attendance = require("./attendanceRoute")
const auth = require("./authRoute")

module.exports = {
  authRouter: auth,
  attendanceRouter: attendance
}
