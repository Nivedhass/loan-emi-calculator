const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    loans: [{ // Change 'tasks' to 'loans'
        type: mongoose.Types.ObjectId,
        ref: "Loan", // Ensure this references the Loan model
    }],
});

// Export the model
module.exports = mongoose.model('User', userSchema);
