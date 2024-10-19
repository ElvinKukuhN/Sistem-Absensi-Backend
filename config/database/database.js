
require('dotenv').config();
const mysql = require('mysql2/promise');

const db = mysql.createPool({
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        
    }

)

const connection = db.getConnection(); // Ambil koneksi dari pool

// console.log(`Sistem Absensi : ${connection.config.host} Connected`);

module.exports = db;