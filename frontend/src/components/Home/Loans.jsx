import React from 'react';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import axios from 'axios';

const Loans = ({ home, setInputDiv, loans, setLoans, onDelete, onEdit }) => {
    const headers = {
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    // Function to delete a loan
    const handleDeleteLoan = async (id) => {
        try {
            await axios.delete(`http://localhost:1000/api/v2/delete-loan/${id}`, { headers });
            // Update the local state after deletion
            setLoans((prevLoans) => prevLoans.filter((loan) => loan._id !== id));
        } catch (error) {
            console.error("Error deleting loan", error);
        }
    };

    // Function to update loan details
    const handleUpdateLoan = (loan) => {
        onEdit(loan);
        setInputDiv("fixed");
    };

    return (
        <div className="grid grid-cols-3 gap-4 p-4">
            {loans && loans.length > 0 ? (
                loans.map((loan) => (
                    <div key={loan._id} className="flex flex-col justify-between bg-gray-800 rounded-sm p-4">
                        <div>
                            <h3 className="text-xl font-semibold">Loan Type: {loan.loanType}</h3>
                            <p className="text-gray-300 my-2">Amount: ₹{loan.amount}</p>
                            <p className="text-gray-300 my-2">Interest Rate: {loan.interestRate}%</p>
                            <p className="text-gray-300 my-2">Term: {loan.term} months</p>
                            <p className="text-gray-300 my-2">EMI: ₹{loan.emi}</p>
                        </div>
                        <div className="mt-4 w-full flex items-center">
                            <div className="text-white p-2 w-full text-2xl font-semibold flex justify-around">
                                <button onClick={() => handleUpdateLoan(loan)}>
                                    <FaRegEdit />
                                </button>
                                <button onClick={() => handleDeleteLoan(loan._id)}>
                                    <MdDeleteOutline />
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-gray-300 text-center col-span-3">No loans available</div>
            )}

            {home === "true" && (
                <div
                    className="flex flex-col justify-center items-center bg-gray-800 rounded-sm p-4 text-gray-300 hover:scale-105 hover:cursor-pointer transition-all duration-300"
                    onClick={() => setInputDiv("fixed")}
                >
                    <IoIosAddCircle className="text-5xl" />
                    <h2 className="text-2xl mt-4">Add Loan</h2>
                </div>
            )}
        </div>
    );
};

export default Loans;