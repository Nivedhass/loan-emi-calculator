const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    console.log("Authorization Header:", authHeader); 
    console.log("Token:", token); 

    
    if (!token) {
        return res.status(401).json({ message: "Authentication token required." });
    }

    
    jwt.verify(token, "tcmTM", (err, user) => {
        if (err) {
            console.error("Token verification error:", err); 
            return res.status(403).json({ message: "Invalid or expired token." });
        }

        
        req.user = user;
        next(); 
    });
};

module.exports = authenticateToken;