const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const User = require('./Models/User')
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log(`Incoming ${req.method} request to ${req.originalUrl}`);
    next();
});

const conection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'qc_logi'
});

conection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err)
        return;
    }
    console.log('Connected to MySQL database');
});

const shipments = [
    { trackingId: '123456', status: 'In Transit', location: 'New York' },
    { trackingId: '789012', status: 'Delivered', location: 'Los Angeles' },
    { trackingId: '345678', status: 'Out for Delivery', location: 'Chicago' },
    { trackingId: '901234', status: 'Arrived', location: 'Houston' },
    // Add more sample shipments here
];

// Endpoint to get shipment data by tracking ID
app.post('/shipments', (req, res) => {
    const { trackingId } = req.body; // Extract trackingId from request body
    const shipment = shipments.find(item => item.trackingId === trackingId); // Find shipment by tracking ID
    if (shipment) {
        res.json(shipment); // Return shipment data if found
    } else {
        res.status(404).json({ error: 'Shipment not found' }); // Return error if shipment not found
    }
});

app.post('/api/register', async (req, res) => {
    const { firstname, lastname, email, phonenumber, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO users (firstname, lastname, email, phonenumber, password) VALUE (?, ?, ?, ?, ?)';
        conection.query(sql, [firstname, lastname, email, phonenumber, hashedPassword], (err, result) => {
            if (err) {
                console.error('Error inserting user into database:', err);
                res.status(500).json({ error: 'Registration failed' });
                return;
            }
            console.log('User registered successfully');
            res.status(200).json({ success: true });
        });
    } catch (error) {
        console.error('Error hashing password:', error);
        res.status(500).json({ error: 'Registration failed' });
        return;
    }
})
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'email and Password are required.' });
    }

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found.' });
        }
        
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ success: false, message: 'Invalid password.' });
        }
        console.log('Login Successful')
        return res.json({ success: true, message: 'Login Successful' });
    } catch(error) {
        console.error('Error logging in', error)
        return res.status(500).json({ success: false, message: 'An error occured while logging in.' });
    }
});





app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});