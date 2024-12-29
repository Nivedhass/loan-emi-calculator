import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authActions } from '../store/auth';
import { useSelector, useDispatch } from 'react-redux';
import Modal from './Modal'; // Import the Modal component
import { FaUser, FaLock } from 'react-icons/fa'; // Importing icons for user and password fields

const Login = () => {
  const [Data, setData] = useState({ username: '', password: '' });
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const history = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (isLoggedIn === true) {
    history('/');
  }

  const dispatch = useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    let response;
    try {
      if (Data.username === '' || Data.password === '') {
        setModalMessage('All fields are required');
        setModalVisible(true);
        return;
      } else {
        response = await axios.post('http://localhost:1000/api/v1/log-in', Data);
      }
      setData({ username: '', password: '' });
      localStorage.setItem('id', response.data.id);
      localStorage.setItem('token', response.data.token);
      dispatch(authActions.login());
      history('/');
    } catch (error) {
      setModalMessage(`Error: ${error.response?.data?.message || 'An unexpected error occurred'}`);
      setModalVisible(true);
    }
  };

  return (
    <div className='h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 via-green-200 to-green-400'>
      <div className='p-8 w-96 rounded-lg shadow-xl bg-white'>
        <div className='text-3xl font-bold text-center text-gray-800 mb-6'>Welcome Back</div>
        <div className='flex items-center mb-4'>
          <FaUser className='text-gray-500 mr-2' />
          <input
            type='text'
            placeholder='Username'
            className='bg-gray-100 text-gray-800 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200'
            name='username'
            value={Data.username}
            onChange={change}
          />
        </div>
        <div className='flex items-center mb-6'>
          <FaLock className='text-gray-500 mr-2' />
          <input
            type='password'
            placeholder='Password'
            className='bg-gray-100 text-gray-800 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200'
            name='password'
            value={Data.password}
            onChange={change}
          />
        </div>
        <button
          className='bg-green-500 text-white font-semibold w-full py-2 rounded-lg hover:bg-green-600 transition duration-200 transform hover:scale-105'
          onClick={submit}
        >
          Login
        </button>
        <div className='mt-4 text-center'>
          <Link to='/signup' className='text-green-600 hover:text-green-800'>
            Not having an account? Signup here
          </Link>
        </div>
      </div>
      <Modal visible={modalVisible} message={modalMessage} onClose={() => setModalVisible(false)} />
    </div>
  );
};

export default Login;

