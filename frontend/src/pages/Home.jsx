import React from 'react';
import Sidebar from '../components/Home/Sidebar';
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex h-[98vh] gap-4 bg-gradient-to-r from-blue-50 to-green-50 p-4">
      <div className="w-1/5 border border-gray-300 bg-blue-100 rounded-lg shadow-lg p-6 flex flex-col justify-between">
        <Sidebar />
      </div>
      <div className="flex-1 border border-gray-300 bg-white rounded-lg shadow-lg p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
