import React, { useContext } from 'react';
import { NavLink ,useNavigate } from 'react-router-dom';
import { AuthContext } from '../../src/auth/AuthProvider';

const Header = () => {
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        logOut()
            .then(() => {
                console.log("user logged out successfully");
                navigate('/');
            })
            .catch(error => { console.log(error); })
    }
   return (
    <div className='w-full bg-blue-800 min-h-[90px] flex items-center py-2'>
      <div className='flex flex-col md:flex-row w-full justify-around items-center gap-4 text-xl'>
        <h1 className='text-white text-2xl md:text-3xl'>
          <span className='font-bold text-blue-400'>M</span>y
          <span className='font-bold text-blue-400'>H</span>ealth
        </h1>
        <div className='flex flex-wrap justify-center gap-3'>
          <a className='text-white hover:bg-sky-600 p-2 rounded cursor-pointer' >Home</a>
          <a className='text-white hover:bg-sky-600 p-2 rounded cursor-pointer' href="#about">About</a>
          <NavLink className='text-white hover:bg-sky-600 p-2 rounded cursor-pointer' to="/service_card">
            Content
          </NavLink>
          <a className='text-white hover:bg-sky-600 p-2 rounded cursor-pointer' href="#contact">Contact</a>
        </div>
        <div className='flex items-center gap-3'>
          {user ? (
            <>
              <span className='text-white text-sm md:text-base'>{user.email}</span>
              <button onClick={handleLogout} className='bg-sky-600 px-3 py-1 text-white rounded'>
                Sign Out
              </button>
            </>
          ) : (
            <NavLink to="/signin" className='bg-sky-600 px-3 py-2 text-white rounded'>
              Sign in
            </NavLink>
          )}
        </div>
      </div>
    </div>
  )
};

export default Header;