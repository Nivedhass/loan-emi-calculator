import React, { useEffect, useState } from 'react';
import { CgNotes } from 'react-icons/cg'; // Icon for all loans
import { MdHome } from 'react-icons/md'; // Icon for home loan
import { FaUserTie } from 'react-icons/fa'; // Icon for personal loan
import { FaCar } from 'react-icons/fa'; // Icon for vehicle loan
import { Link, useNavigate } from 'react-router-dom'; 
import { useDispatch } from 'react-redux'; 
import { authActions } from '../../store/auth';
import axios from 'axios';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  // Updated menu data to reflect loan sections
  const data = [
    {
      title: 'All Loans',
      icon: <CgNotes />,
      link: '/',
    },
    {
      title: 'Home Loan',
      icon: <MdHome />,
      link: '/Homeloan',
    },
    {
      title: 'Personal Loan',
      icon: <FaUserTie />,
      link: '/Personalloan',
    },
    {
      title: 'Vehicle Loan',
      icon: <FaCar />,
      link: '/Vehicleloan',
    },
  ];

  const logout = () => {
    dispatch(authActions.logout());
    localStorage.clear("id");
    localStorage.clear("token");
    navigate("/signup");
  };

  useEffect(() => {
    const headers = {
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:1000/api/v2/get-all-tasks", { headers });
        console.log("Response data:", response.data); 
        setUserData(response.data.user); 
      } catch (error) {
        console.error("Error fetching tasks:", error.response ? error.response.data : error.message);
      }
    };

    fetch();
  }, []); 

  return (
    <>
      <div className="flex flex-col h-full p-6 bg-blue-100 rounded-lg"> {/* Added background color */}
        {userData && (
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800">{userData.username}</h2>
            <h4 className="mb-1 text-gray-500">{userData.email}</h4>
            <hr className="border-gray-300" />
          </div>
        )}
        <div className="flex-grow">
          {data.map((items, i) => (
            <Link
              to={items.link}
              key={i}
              className="my-2 flex items-center p-3 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-all duration-300"
            >
              <span className="text-2xl">{items.icon}</span>
              <span className="ml-3">{items.title}</span>
            </Link>
          ))}
        </div>
        <div>
          <button 
            className="bg-blue-600 text-white w-full p-2 rounded-lg hover:bg-blue-700 transition duration-200" 
            onClick={logout}>
            Log Out
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;


