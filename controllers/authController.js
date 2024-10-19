const db = require("../config/database/database");
const { errorResponse, defaultResponse } = require("../utils/responseHelper");
const bcrypt = require('bcryptjs');
const { generateUUID } = require("../utils/uuidHelper");
const jwt = require('jsonwebtoken');


const controller = {}

controller.signUp = async (req, res) => {
    try {
        const { name, email, password, role } = req.body
        const query = `INSERT INTO users (id, name, email, password, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)`

        // Create a MySQL connection
        const conn = db;

        // Check if user already exists
        const [rows] = await conn.query('SELECT email FROM users WHERE email = ?', [email]);
        if (rows.length > 0) {
            throw errorResponse('User already exists', 400);
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate UUID using the helper
        const userId = generateUUID();

        const bind = [userId, name, email, hashedPassword, role, new Date(), new Date()]
        // Insert user into database
        const [data] = await conn.query(query, bind)


        const result = {
            id: userId,
            name: data,
            email: email,
            role: role
        }

        return res.status(201).json(defaultResponse(true, 'User created successfully', result, 201));

    } catch (e) {
        return res.status(400).json(errorResponse(e.message, 400));
    }
}

controller.signIn = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body

        // Create a MySQL connection
        const conn = db;

        // Check if user exists
        const [rows] = await conn.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) {
            throw errorResponse('Invalid email or password', 401);
        }
        const user = rows[0];

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw errorResponse('Invalid email or password', 401);
        }

        // Check Active user
        if (user.is_active != 'A') {
            throw errorResponse('User is not active', 400);
        }

        const token = jwt.sign(
            { id: user.id, name: user.name, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn:'1h'}
        )

        const result = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: token
        }

        return res.status(200).json(defaultResponse(true, 'User logged in successfully', result, 200));

    } catch (error) {
        return res.status(400).json(errorResponse(error.message, 400));
    }
}

controller.logout = (req, res) => {
    try {
        // Tidak ada logika yang rumit di sini, hanya mengembalikan respons sukses
        return res.status(200).json(defaultResponse(true, 'Logged out successfully', null, 200));
    } catch (error) {
        return res.status(500).json(errorResponse(error.message, 500));
    }
};

module.exports = controller;