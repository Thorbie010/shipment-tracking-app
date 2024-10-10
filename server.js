const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
require('dotenv').config();
const jwt = require('jsonwebtoken');



const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log(`Incoming ${req.method} request to ${req.originalUrl}`);
    next();
});

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'qc_logi'
});
module.exports = pool;
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
    connection.release();
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});