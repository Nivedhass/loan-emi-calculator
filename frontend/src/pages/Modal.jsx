import React from 'react';

const Modal = ({ visible, message, onClose }) => {
  if (!visible) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-60'>
      <div className='bg-white p-8 rounded-lg shadow-lg text-center transform transition-transform duration-300 ease-in-out scale-95 hover:scale-100'>
        <h2 className='text-xl font-semibold text-gray-800 mb-4'>Notification</h2>
        <p className='text-lg text-gray-600 mb-6'>{message}</p> {/* Increased font size from text-md to text-lg */}
        <button
          className='bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-200'
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;




