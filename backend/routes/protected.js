const router = require("express").Router();
const authenticateToken = require("./path/to/auth");


router.get("/protected-route", authenticateToken, (req, res) => {
    res.status(200).json({ message: "Access granted", user: req.user });
});

module.exports = router;