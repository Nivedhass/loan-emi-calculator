import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import LoanCards from '../components/Home/LoanCards';
import UpdateLoan from '../components/Home/UpdateLoan';
import InputLoan from '../components/Home/InputLoan';
import axios from 'axios';

const HomeLoan = () => {
    const [inputDiv, setInputDiv] = useState("hidden"); 
    const navigate = useNavigate(); 
    const [updateDiv, setUpdateDiv] = useState("hidden");
    const [homeLoans, setHomeLoans] = useState([]);
    const [loanToUpdate, setLoanToUpdate] = useState(null);
    const [reload, setReload] = useState(false); // New state for forcing a re-render

    // Function to get headers
    const getHeaders = () => {
        return {
            id: localStorage.getItem("id"),
            authorization: `Bearer ${localStorage.getItem("token")}`,
        };
    };

    // Function to fetch home loans
    const fetchLoans = async () => {
        try {
            const headers = getHeaders();
            const response = await axios.get("http://localhost:1000/api/v2/get-home-loans", { headers });
            setHomeLoans(response.data.homeLoans || []); 
        } catch (error) {
            console.error("Error fetching home loans:", error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        fetchLoans();
    }, [reload]); // Add reload to the dependency array

    const calculateEMI = (loanType, principal, interestRate, term) => {
        let adjustedInterestRate = interestRate;

        // Adjust interest rates based on loan type
        switch (loanType) {
            case 'Personal':
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

        const monthlyRate = adjustedInterestRate / (12 * 100);
        return (principal * monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
    };

    const handleLoanSubmit = async (loan) => {
        const headers = getHeaders();

        try {
            const response = await axios.post("http://localhost:1000/api/v2/create-loan", loan, { headers });
            
            // Calculate the EMI immediately after receiving the response
            const emi = calculateEMI(loan.loanType, loan.amount, loan.interestRate, loan.term);
            
            const newLoan = { ...loan, _id: response.data._id, emi }; // Include EMI in new loan
            
            setHomeLoans(prevLoans => [...prevLoans, newLoan]); // Update state with new loan
            
            // Reload the HomeLoan page
            navigate('/Homeloan'); // Navigate to the HomeLoan page
            
        } catch (error) {
            console.error("Error creating loan:", error.response ? error.response.data : error.message);
        }

        setInputDiv("hidden");
        setReload(prev => !prev); // Hide InputLoan after submission
    };

    const handleLoanDelete = async (loanId) => {
        const headers = getHeaders();
        try {
            await axios.delete(`http://localhost:1000/api/v2/delete-loan/${loanId}`, { headers });
            setHomeLoans(prevLoans => prevLoans.filter(loan => loan._id !== loanId));
        } catch (error) {
            console.error("Error deleting loan:", error.response ? error.response.data : error.message);
        }
    };

    const handleLoanUpdate = async (updatedLoan) => {
        const headers = getHeaders();
        try {
            await axios.put(`http://localhost:1000/api/v2/update-loan/${loanToUpdate._id}`, updatedLoan, { headers });
            // Update the loan immediately
            setHomeLoans(prevLoans => 
                prevLoans.map(loan => 
                    loan._id === loanToUpdate._id ? { ...loan, ...updatedLoan } : loan
                )
            );
            setUpdateDiv("hidden");
            setLoanToUpdate(null);
            setReload(prev => !prev); // Force reload by toggling the state
        } catch (error) {
            console.error("Error updating loan:", error.response ? error.response.data : error.message);
        }
    };

    const handleEditLoan = (loan) => {
        setLoanToUpdate(loan);
        setUpdateDiv("fixed");
    };

    return (
        <div>
            <div className="loan-container scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                {homeLoans.length > 0 ? (
                    <LoanCards
                        loans={homeLoans}
                        onDelete={handleLoanDelete}
                        onEdit={handleEditLoan}
                        setInputDiv={setInputDiv} 
                    />
                ) : (
                    <div className="text-center text-gray-500">No home loans available.</div>
                )}
            </div>
            <InputLoan inputDiv={inputDiv} setInputDiv={setInputDiv} onSubmit={handleLoanSubmit} />
            <UpdateLoan updateDiv={updateDiv} setUpdateDiv={setUpdateDiv} loanToUpdate={loanToUpdate} onUpdate={handleLoanUpdate} />

            <style jsx>{`
                /* Custom scrollbar styles */
                .loan-container::-webkit-scrollbar {
                    width: 8px;
                }
                .loan-container::-webkit-scrollbar-track {
                    background: #f1f5f9;
                }
                .loan-container::-webkit-scrollbar-thumb {
                    background-color: #6b7280;
                    border-radius: 10px;
                }
                .loan-container::-webkit-scrollbar-thumb:hover {
                    background-color: #4b5563;
                }
            `}</style>
        </div>
    );
};

export default HomeLoan;















