import React, { useState, useEffect } from 'react';
import { IoIosAddCircle } from "react-icons/io";
import LoanCards from '../components/Home/LoanCards';
import InputLoan from '../components/Home/InputLoan';
import UpdateLoan from '../components/Home/UpdateLoan';
import axios from 'axios';

const AllLoans = () => {
    const [inputDiv, setInputDiv] = useState("hidden"); // Control visibility of InputLoan
    const [updateDiv, setUpdateDiv] = useState("hidden");
    const [data, setData] = useState([]);
    const [loanToUpdate, setLoanToUpdate] = useState(null);
    const [loanAmount, setLoanAmount] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [loanTerm, setLoanTerm] = useState('');

    const getHeaders = () => {
        return {
            id: localStorage.getItem("id"),
            authorization: `Bearer ${localStorage.getItem("token")}`,
        };
    };

    const fetchLoans = async () => {
        try {
            const headers = getHeaders();
            const response = await axios.get("http://localhost:1000/api/v2/get-all-loans", { headers });
            setData(response.data.loans);
        } catch (error) {
            console.error("Error fetching loans:", error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        fetchLoans();
    }, []);

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
            const emi = calculateEMI(loan.loanType, loan.amount, loan.interestRate, loan.term); // Add loanType to the loan object if needed
            
            const newLoan = { ...loan, _id: response.data._id, emi }; // Include EMI in new loan
            
            setData(prevLoans => [...prevLoans, newLoan]); // Update state with new loan
            
        } catch (error) {
            console.error("Error creating loan:", error.response ? error.response.data : error.message);
        }

        setInputDiv("hidden"); // Hide InputLoan after submission
    };

    const handleLoanDelete = async (loanId) => {
        const headers = getHeaders();

        try {
            await axios.delete(`http://localhost:1000/api/v2/delete-loan/${loanId}`, { headers });
            setData(prevLoans => prevLoans.filter(loan => loan._id !== loanId));
        } catch (error) {
            console.error("Error deleting loan:", error.response ? error.response.data : error.message);
        }
    };

    const handleLoanUpdate = async (updatedLoan) => {
        const headers = getHeaders();

        try {
            await axios.put(`http://localhost:1000/api/v2/update-loan/${loanToUpdate._id}`, updatedLoan, { headers });
            const emi = calculateEMI(updatedLoan.loanType, updatedLoan.amount, updatedLoan.interestRate, updatedLoan.term); // Recalculate EMI for the updated loan
            setData(prevLoans => prevLoans.map(loan =>
                loan._id === loanToUpdate._id ? { ...loan, amount: updatedLoan.amount, interestRate: updatedLoan.interestRate, term: updatedLoan.term, emi } : loan
            ));
            setUpdateDiv("hidden");
            setLoanToUpdate(null);
            setLoanAmount('');
            setInterestRate('');
            setLoanTerm('');
            fetchLoans();
        } catch (error) {
            console.error("Error updating loan:", error.response ? error.response.data : error.message);
        }
    };

    const handleEditLoan = (loan) => {
        setLoanToUpdate(loan);
        setLoanAmount(loan.amount);
        setInterestRate(loan.interestRate);
        setLoanTerm(loan.term);
        setUpdateDiv("fixed");
    };

    return (
        <div>
            <div className='w-full flex justify-end px-4 py-2'>
                <button onClick={() => setInputDiv("InputLoan")}> {/* Opens the InputData form */}
                    <IoIosAddCircle className="text-4xl text-gray-400 hover:text-gray-600 transition-all duration-300" />
                </button>
            </div>

            <div
                className="loan-container scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
                style={{ maxHeight: '70vh', overflowY: 'auto' }}
            >
                <LoanCards
                    loans={data}
                    onDelete={handleLoanDelete}
                    onEdit={handleEditLoan}
                    setInputDiv={setInputDiv} // Pass setInputDiv here if needed in LoanCards
                />
            </div>

            <InputLoan inputDiv={inputDiv} setInputDiv={setInputDiv} onSubmit={handleLoanSubmit} />
            <UpdateLoan updateDiv={updateDiv} setUpdateDiv={setUpdateDiv} loanToUpdate={loanToUpdate} onUpdate={handleLoanUpdate} />

            <style jsx>{`
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

export default AllLoans;











