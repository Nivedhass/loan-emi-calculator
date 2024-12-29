const express = require("express");
const router = express.Router();
const Loan = require("../models/loan");
const auth = require("./auth"); // Assuming you have an auth middleware

// Function to calculate EMI with different rates based on loan type
const calculateEMI = (loanType, principal, interestRate, term) => {
    let adjustedInterestRate = interestRate;

    // Adjust interest rates based on loan type
    switch (loanType) {
        case 'Personal':
            // For personal loans, no adjustment
            break; 
        case 'Home':
            adjustedInterestRate += 5; // Example adjustment for home loans
            break;
        case 'Vehicle':
            adjustedInterestRate -= 2; // Example adjustment for vehicle loans
            break;
        default:
            throw new Error("Invalid loan type");
    }

    // Ensure interest rate is valid
    if (isNaN(adjustedInterestRate) || adjustedInterestRate < 0) {
        throw new Error("Invalid interest rate");
    }

    const monthlyRate = adjustedInterestRate / (12 * 100);
    return (principal * monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
};

// Create a new loan
router.post("/create-loan", auth, async (req, res) => {
    try {
        const { loanType, amount, interestRate, term } = req.body; 
        const { id } = req.user; // Ensure you get user ID from req.user set by auth middleware

        // Calculate EMI
        const emi = calculateEMI(loanType, amount, interestRate, term).toFixed(2);
        
        const newLoan = new Loan({ 
            user: id, 
            loanType: loanType, 
            amount: amount, 
            interestRate: interestRate, 
            term: term,
            emi: emi 
        });
        
        const savedLoan = await newLoan.save();
        res.status(200).json({ message: "Loan Created", loanId: savedLoan._id });
    } catch (error) {
        console.error("Error creating loan:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

// Get all loans for the logged-in user
router.get("/get-all-loans", auth, async (req, res) => {
    try {
        const { id } = req.user;
        const loans = await Loan.find({ user: id });
        res.status(200).json({ loans });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get all Home loans for the logged-in user
router.get("/get-home-loans", auth, async (req, res) => {
    try {
        const { id } = req.user;
        const homeLoans = await Loan.find({ user: id, loanType: 'Home' });
        res.status(200).json({ homeLoans });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get all Personal loans for the logged-in user
router.get("/get-personal-loans", auth, async (req, res) => {
    try {
        const { id } = req.user;
        const personalLoans = await Loan.find({ user: id, loanType: 'Personal' });
        res.status(200).json({ personalLoans });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get all Vehicle loans for the logged-in user
router.get("/get-vehicle-loans", auth, async (req, res) => {
    try {
        const { id } = req.user;
        const vehicleLoans = await Loan.find({ user: id, loanType: 'Vehicle' });
        res.status(200).json({ vehicleLoans });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Delete a loan by ID
router.delete("/delete-loan/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        await Loan.findByIdAndDelete(id);
        res.status(200).json({ message: "Loan Deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Update a loan by ID
router.put("/update-loan/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { loanType, amount, interestRate, term } = req.body;

        // Calculate new EMI
        const emi = calculateEMI(loanType, amount, interestRate, term).toFixed(2);

        const updatedLoan = await Loan.findByIdAndUpdate(
            id,
            { loanType, amount, interestRate, term, emi },
            { new: true }
        );

        if (!updatedLoan) {
            return res.status(404).json({ message: "Loan not found" });
        }

        res.status(200).json({ message: "Loan Updated successfully", loan: updatedLoan });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Calculate EMI based on loan type
router.post("/calculate-emi", async (req, res) => {
    try {
        const { loanType, principal, interestRate, term } = req.body;

        // Calculate EMI with the adjusted interest rate based on loan type
        const emi = calculateEMI(loanType, principal, interestRate, term).toFixed(2);
        res.status(200).json({ emi });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
});

module.exports = router;





