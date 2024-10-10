const jwt = require('jsonwebtoken');
const connection = require('../server');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log("Incoming request to:", req.originalUrl); // Debugging step
    console.log("Token:", token); // Debugging step

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log("Token verification failed:", err); // Debugging step
            return res.sendStatus(403);
        }

        const userId = user.id;

        connection.query('SELECT * FROM users WHERE id = ?', [userId], (error, results) => {
            if (error) {
                console.error("Database query failed:", error);
                return res.sendStatus(500);
            }

            if (results.length === 0) {
                console.log("User not found"); // Debugging step
                return res.sendStatus(404);
            }

            req.user = results[0];
            next();
        });
    });
};

module.exports = authenticateToken;
