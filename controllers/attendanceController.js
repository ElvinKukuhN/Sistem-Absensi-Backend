const db = require("../config/database/database")
const { errorResponse, defaultResponse } = require("../utils/responseHelper");
const { generateUUID } = require("../utils/uuidHelper");

const controller = {}

controller.checkIn = async (req, res) => {
    try {
        const userId = req.user.id
        const currentDate = new Date
        const conn = db
        console.log(req.headers);


        // Check if user alredy check-in todey
        const [rows] = await conn.query('SELECT * FROM attendance WHERE user_id = ? AND DATE(createdAt) = CURDATE()', [userId]);

        if (rows.length > 0) {
            throw errorResponse('User already check-in today', 400);
        }

        // Insert user into database
        const query = `INSERT INTO attendance (id, user_id, check_in, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)`;
        const attendanceId = generateUUID();
        const bind = [attendanceId, userId, currentDate, 'checked_in', currentDate, currentDate];

        const [data] = await conn.query(query, bind);

        const result = {
            id: attendanceId,
            userId: userId,
            checkInTime: currentDate
        }

        return res.status(201).json(defaultResponse(true,'Checked in successfully', result, 201))
    } catch (error) {
        return res.status(400).json(errorResponse(error.message, 400));
    }
}

controller.checkOut = async (req, res) => {
    try {
        const userId = req.user.id
        const currentDate = new Date
        const conn = db

        // Check if user alredy check-in todey
        const [rows] = await conn.query('SELECT * FROM attendance WHERE user_id = ? AND DATE(createdAt) = CURDATE()', [userId]);

        if (rows.length === 0) {
            throw errorResponse('User not check-in today', 400);
        }

        // Check if user alredy check-out todey
        if (rows[0].status === 'present') {
            throw errorResponse('User already check-out today', 400);
        }

        // Insert user into database
        const query = `UPDATE attendance SET check_out = ?, status = ?, updatedAt = ? WHERE user_id = ? AND DATE(createdAt) = CURDATE()`;
        const bind = [currentDate, 'present', currentDate, userId];

        const [data] = await conn.query(query, bind);

        const result = {
            id: rows[0].attendanceId,
            userId: rows[0].user_id,
            checkInTime: rows[0].check_in,
            checkOutTime: currentDate
        }

        return res.status(200).json(defaultResponse(true, 'Checked out successfully', result, 200))
    } catch (error) {
        return res.status(400).json(errorResponse(error.message, 400));
    }
}

controller.getAttendance = async (req, res) => {
    try {
        const userId = req.user.id
        const conn = db

        const [rows] = await conn.query('SELECT * FROM attendance WHERE user_id = ?', [userId]);
        if (rows.length === 0) {
            return res.status(404).json(errorResponse('No attendance records found', 404));
        }

        console.log(rows);
        
        return res.status(200).json(defaultResponse(true, 'Attendance records found', rows, 200))
    } catch (error) {
        return res.status(400).json(errorResponse(error.message, 400))
    }
}

module.exports = controller;