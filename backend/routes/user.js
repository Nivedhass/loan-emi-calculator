const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


router.post("/sign-in", async (req, res) => {
    const { username, email, password } = req.body;

   
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }
    
    if (username.length < 4) {
        return res.status(400).json({ message: "Username should have at least 4 characters." });
    }
    
    try {
        const existingUser = await User.findOne({ username: username });
        const existingEmail = await User.findOne({ email: email });

        if (existingUser) {
            return res.status(400).json({ message: "Username already exists." });
        }

        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists." });
        }

        const hashPass = await bcrypt.hash(password, 10);
        const newUser = new User({
            username: username,
            email: email,
            password: hashPass,
        });

        await newUser.save();
        return res.status(201).json({ message: "Sign-In successful." });
    } catch (error) {
        console.error("Sign-In Error:", error); 
        return res.status(500).json({ message: "Internal Server Error." });
    }
});


router.post("/log-in", async (req, res) => {
    const { username, password } = req.body;


    if (!username || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const existingUser = await User.findOne({ username: username });

        if (!existingUser) {
            return res.status(400).json({ message: "Invalid Credentials." });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);

        if (isMatch) {
           
            const token = jwt.sign(
                { id: existingUser._id, username: existingUser.username },
                "tcmTM",
                { expiresIn: "2d" }
            );

            return res.status(200).json({ id: existingUser._id, token: token });
        } else {
            return res.status(400).json({ message: "Invalid Credentials." });
        }
    } catch (error) {
        console.error("Log-In Error:", error); 
        return res.status(500).json({ message: "Internal Server Error." });
    }
});

module.exports = router;