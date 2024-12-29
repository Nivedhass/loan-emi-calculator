import React, { useState, useEffect } from 'react';
import { RxCross2 } from "react-icons/rx";

const UpdateLoan = ({ updateDiv, setUpdateDiv, loanToUpdate, onUpdate }) => {
    const [amount, setAmount] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [term, setTerm] = useState('');
    const [loanType, setLoanType] = useState(''); // State for loan type

    useEffect(() => {
        if (loanToUpdate) {
            setAmount(loanToUpdate.amount);
            setInterestRate(loanToUpdate.interestRate);
            setTerm(loanToUpdate.term);
            setLoanType(loanToUpdate.loanType || ''); // Set loan type if available
        }
    }, [loanToUpdate]);

    const handleUpdate = (e) => {
        e.preventDefault();

        if (!amount || !interestRate || !term || !loanType) {
            alert("Please fill in all fields.");
            return;
        }

        onUpdate({ amount, interestRate, term, loanType }); // Include loan type in the update
        setUpdateDiv("hidden");
    };

    return (
        <>
            <div className={`fixed top-0 left-0 bg-gray-800 opacity-50 h-screen w-full ${updateDiv === "hidden" ? "hidden" : ""}`}></div>

            <div className={`fixed top-0 left-0 flex items-center justify-center h-screen w-full ${updateDiv === "hidden" ? "hidden" : ""}`}>
                <div className='w-4/12 bg-white p-6 rounded-lg shadow-lg'>
                    <div className='flex justify-between items-center mb-4'>
                        <h2 className="text-2xl font-bold text-gray-800">Update Loan</h2>
                        <button className='text-2xl text-gray-600 hover:text-gray-800' onClick={() => setUpdateDiv("hidden")}>
                            <RxCross2 />
                        </button>
                    </div>

                    <form onSubmit={handleUpdate}>
                        <select
                            value={loanType}
                            onChange={(e) => setLoanType(e.target.value)}
                            className="px-4 py-3 rounded w-full bg-gray-100 mb-3 border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring focus:ring-green-300"
                        >
                            <option value="" disabled>Select Loan Type</option>
                            <option value="Home">Home Loan</option>
                            <option value="Personal">Personal Loan</option>
                            <option value="Vehicle">Vehicle Loan</option>
                        </select>

                        <input
                            type="number"
                            placeholder="Loan Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="px-4 py-3 rounded w-full bg-gray-100 mb-3 border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring focus:ring-green-300"
                        />
                        <input
                            type="number"
                            placeholder="Interest Rate (%)"
                            value={interestRate}
                            onChange={(e) => setInterestRate(e.target.value)}
                            className="px-4 py-3 rounded w-full bg-gray-100 mb-3 border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring focus:ring-green-300"
                        />
                        <input
                            type="number"
                            placeholder="Loan Term (Months)"
                            value={term}
                            onChange={(e) => setTerm(e.target.value)}
                            className="px-4 py-3 rounded w-full bg-gray-100 mb-4 border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring focus:ring-green-300"
                        />

                        <button
                            type="submit"
                            className='px-4 py-2 bg-green-600 rounded text-white text-lg font-semibold w-full transition duration-300 hover:bg-green-500'
                        >
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default UpdateLoan;





