import React from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { IoIosAddCircle } from 'react-icons/io';

const LoanCards = ({ loans, onDelete, onEdit, setInputDiv }) => {
    return (
        <div className='p-4'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {loans.map((loan) => (
                    <div
                        key={loan._id}
                        className='bg-gradient-to-b from-light-blue-100 to-light-green-100 rounded-lg shadow-md p-4 flex flex-col transition-transform transform hover:scale-105'
                    >
                        <div className='flex-grow'>
                            <h2 className='text-xl font-semibold text-blue-800'>Loan Type: {loan.loanType}</h2>
                            <h2 className='text-xl font-semibold text-blue-800'>Loan Amount: ₹{loan.amount}</h2>
                            <p className='text-gray-700'>Interest Rate: {loan.interestRate}%</p>
                            <p className='text-gray-700'>Term: {loan.term} months</p>
                            <p className='text-gray-700'>EMI: ₹{loan.emi.toFixed(2)}</p>
                        </div>
                        <div className='flex space-x-2 mt-4'>
                            <button
                                onClick={() => onEdit(loan)}
                                className='flex-1 text-blue-500 bg-blue-100 hover:bg-blue-200 p-2 rounded transition duration-300'
                            >
                                <FaRegEdit className='inline-block mr-1' /> Edit
                            </button>
                            <button
                                onClick={() => onDelete(loan._id)}
                                className='flex-1 text-red-500 bg-red-100 hover:bg-red-200 p-2 rounded transition duration-300'
                            >
                                <MdDeleteOutline className='inline-block mr-1' /> Delete
                            </button>
                        </div>
                    </div>
                ))}

                {/* Add Loan Card */}
                <div
                    className='flex flex-col justify-center items-center bg-gradient-to-b from-blue-100 to-green-100 rounded-lg p-4 text-white hover:scale-105 hover:cursor-pointer transition-all duration-300'
                    onClick={() => setInputDiv("InputLoan")}
                >
                    <IoIosAddCircle className='text-4xl bg-blue-800' />
                    <h2 className='text-2xl mt-2 text-blue-800'>Add Loan</h2>
                </div>
            </div>
        </div>
    );
};

export default LoanCards;











