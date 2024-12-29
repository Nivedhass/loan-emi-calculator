import React, { useEffect } from 'react';
import Home from './pages/Home';
import './index.css';
import Allloans from './pages/Allloans';
import Homeloan from './pages/Homeloan';
import Personalloan from './pages/Personalloan';
import Vehicleloan from './pages/Vehicleloan';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { useSelector, useDispatch } from 'react-redux'; 
import { Routes, Route, useNavigate } from 'react-router-dom';
import { authActions } from './store/auth';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      dispatch(authActions.login());
    }
  }, [dispatch]);

  useEffect(() => {
    if (!isLoggedIn && window.location.pathname !== '/signup' && window.location.pathname !== '/login') {
      navigate('/signup');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="bg-gray-900 text-white h-screen p-2 relative">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Allloans />} />
          <Route path="Homeloan" element={<Homeloan />} />
          <Route path="Personalloan" element={<Personalloan />} />
          <Route path="Vehicleloan" element={<Vehicleloan />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;


















