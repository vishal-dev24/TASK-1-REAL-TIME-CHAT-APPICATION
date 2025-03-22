import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await axios.get('http://localhost:4000/profile', { withCredentials: true });
      setUser(res.data);
    } catch (error) {
      setUser(null);
      navigate('/login');
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await axios.get('http://localhost:4000/logout', { withCredentials: true });
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-purple-200 flex flex-col items-center">
      <nav className="bg-slate-100 shadow-xl w-full py-3 px-10 flex justify-between items-center">
        <h1 className="text-lg font-bold text-gray-700">My Profile</h1>
        <div className='space-x-4 flex items-center'>
          <button onClick={() => navigate('/home')} className="bg-gradient-to-r from-sky-500 to-blue-500 text-white px-4 py-2 rounded-md font-semibold shadow-md hover:opacity-90 transition-all">Home</button>
          <button onClick={handleLogout} className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-md font-semibold shadow-md hover:opacity-90 transition-all">Logout</button>
        </div>
      </nav>
      {/* Profile Card */}
      <div className="bg-white py-2 rounded-3xl shadow-xl w-1/2 max-w-auto text-center mt-3 overflow-hidden">
        {user && (
          <>
            <div className="relative inline-block">
              <img src={`http://localhost:4000/uploads/${user.image}`} alt="User" className="w-36 h-36 mx-auto rounded-xl shadow- border-4 border-blue-300" />
            </div>
            <h1 className="text-2xl font-extrabold text-gray-800 mt-3">{user.username}</h1>
            <h2 className="text-gray-700 text-lg mb-2">{user.email}</h2>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
