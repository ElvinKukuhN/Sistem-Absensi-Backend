const attendance = require("./attendanceRoute")
const auth = require("./authRoute")


module.exports = {
    authRouter: auth,
    attendanceRouter: attendance
}