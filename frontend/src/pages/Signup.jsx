import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Modal from './Modal'; // Import the Modal component
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa'; // Importing icons for user, email, and password fields

const Signup = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const history = useNavigate();
  if (isLoggedIn === true) {
    history('/');
  }

  const [Data, setData] = useState({ username: '', email: '', password: '' });
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    try {
      if (Data.username === '' || Data.email === '' || Data.password === '') {
        setModalMessage('All fields are required');
        setModalVisible(true);
        return; 
      }

      const response = await axios.post('http://localhost:1000/api/v1/sign-in', Data);

      if (response.status === 200) {
        setData({ username: '', email: '', password: '' }); 
        history('/login');
      } else {
        setModalMessage(` ${response.data.message || 'An unexpected error occurred'}`);
        setModalVisible(true);
      }
    } catch (error) {
      setModalMessage(`Error: ${error.response?.data?.message || 'An unexpected error occurred'}`);
      setModalVisible(true);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 via-green-200 to-green-400">
      <div className="p-8 w-96 rounded-lg shadow-xl bg-white">
        <div className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</div>
        <div className="flex items-center mb-4">
          <FaUser className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Username"
            className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
            name="username"
            value={Data.username}
            onChange={change}
          />
        </div>
        <div className="flex items-center mb-4">
          <FaEnvelope className="text-gray-500 mr-2" />
          <input
            type="email"
            placeholder="Email"
            className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
            name="email"
            value={Data.email}
            onChange={change}
          />
        </div>
        <div className="flex items-center mb-6">
          <FaLock className="text-gray-500 mr-2" />
          <input
            type="password"
            placeholder="Password"
            className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
            name="password"
            value={Data.password}
            onChange={change}
          />
        </div>
        <button
          className="bg-green-500 text-white font-semibold w-full py-2 rounded-lg hover:bg-green-600 transition duration-200 transform hover:scale-105"
          onClick={submit}
        >
          Sign Up
        </button>
        <div className="mt-4 text-center">
          <Link to="/login" className="text-green-600 hover:text-green-800">
            Already have an account? Login here
          </Link>
        </div>
      </div>
      <Modal visible={modalVisible} message={modalMessage} onClose={() => setModalVisible(false)} />
    </div>
  );
};

export default Signup;

