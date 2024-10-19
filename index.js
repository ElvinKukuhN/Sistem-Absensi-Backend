const express = require('express');
const sequelize = require('./config/database/database');
const app = express()
const link = require("./routes");
const db = require('./config/database/database');
require('dotenv').config();

const port = process.env.PORT

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
// Middleware to parse incoming JSON requests
app.use(express.json());

// If you're using URL-encoded form data
app.use(express.urlencoded({ extended: true }));


// ROUTER
app.use("/api/auth/", link.authRouter)
app.use("/api/attendance/", link.attendanceRouter)

//Cek Koneksi DB
app.get("/", async (req, res, next) => {
		await db.authenticate();
});

module.exports = app;