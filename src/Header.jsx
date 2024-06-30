import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from './_auth/AuthProvider/AuthProvider';
const Header = () => {
    const { user, logOut } = useContext(AuthContext);
    const handleLogout = () => {
        logOut()
            .then(() => {
                console.log("user logged out successfully");
            })
            .catch(error => { console.log(error); })
    }
    return (
        <div className='shadow-md w-full bg-blue-800'>
            <div className='md:px-8 py-4 flex  justify-around'>
                <h1 className='text-white'><span className='font-bold text-xl text-pink-400'>M</span>y
                <span className='font-bold text-xl text-pink-400'>H</span>ealth</h1>
                <ul className='flex space-x-7 cursor-pointer items-center'>
                    <li className='text-white hover:bg-sky-600 p-1 rounded'><a href="#">Home</a></li>
                    <li className='text-white hover:bg-sky-600 p-1 rounded'><a href="#about">About</a></li>
                    <li className='text-white hover:bg-sky-600 p-1 rounded'><Link to="/service_card">Content</Link></li>
                    <li className='text-white hover:bg-sky-600 p-1 rounded'><a href="#contact">Contact</a></li>
                </ul>
                <div>
                    {user ?
                        <>
                            <span className='text-white'>{user.email}</span>
                            <button onClick={handleLogout} className='bg-sky-600 rounded ml-2 mr-4 px-3 py-1 text-white'><NavLink to='/'>
                                Sign Out</NavLink></button>
                        </>
               : <Link to="/signin" className='bg-sky-600 rounded ml-2 mr-4 px-3 py-2 text-white'>Sign in</Link>}
           </div>
        </div>
      </div >
    );
};

export default Header;