const mongoose = require('mongoose');

// Define the Loan schema
const loanSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    loanType: {
        type: String,
        enum: ['Home', 'Personal', 'Vehicle'],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    interestRate: {
        type: Number,
        required: true,
    },
    term: {
        type: Number,
        required: true,
    },
    emi: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt timestamps
});

// Export the Loan model
module.exports = mongoose.model('Loan', loanSchema);
