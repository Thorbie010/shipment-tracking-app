// Functions for handling User Creation and Authentication
const { User } = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../server');
require('dotenv').config();

// Function to create a new user
const createUser = async (req, res) => {
    const { firstname, lastname, email, phonenumber, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO users (firstname, lastname, email, phonenumber, password) VALUE (?, ?, ?, ?, ?)';
        connection.query(sql, [firstname, lastname, email, phonenumber, hashedPassword], (err, result) => {
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
};

const loginUser = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and Password are required.' });
    }

    connection.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
        if (error) {
            console.error('Database query failed:', error);
            return res.status(500).json({ success: false, message: 'An error occurred while logging in.' });
        }

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        const user = results[0];

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ success: false, message: 'Invalid password.' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ success: true, message: 'Login Successful', token });
    });
};

const logoutUser = (req, res) => {
    res.json({ message: 'Logout successful' });
  };

module.exports = { loginUser, createUser, logoutUser};
