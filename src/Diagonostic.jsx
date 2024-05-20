import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';


const Diagonostic = () => {
    return (
        <div className='bg-yellow-600 relative text-center mt-2 py-4'>
            <h1 className=' text-3xl font-bold text-white font-serif'>Diagnostic centre</h1>
            <div className='flex flex-wrap shadow-3xl text-center justify-center p-4'>
            <div className='shadow-xl rounded-2xl bg-white p-3 m-2 w-1/3'>
                <h1 className='font-bold text-xl'>City Care Diagnostic Center</h1>
                <div>
                    <p>Location: Chittagong</p>
                    <FontAwesomeIcon icon={faPhone} /> 01810-116667
                </div>
            </div>
            <div className='shadow-xl rounded-2xl bg-white p-3 m-2 w-1/3'>
                <h1 className='font-bold text-xl'>My LAB Diagnostic Centre</h1>
                <div >
                    <p>Location: Dhaka</p>
                    <FontAwesomeIcon icon={faPhone} /> 01810-116667
                </div>
            </div>
            <div className='shadow-xl rounded-2xl bg-white p-3 m-2 w-1/3'>
                <h1 className='font-bold text-xl'> Health Aid Diagnostic Centre</h1>
                <div >
                    <p>Location: Rajshahi</p>
                    <FontAwesomeIcon icon={faPhone} /> 01880-116887
                </div>
            </div>
            <div className='shadow-xl rounded-2xl bg-white p-3 m-2 w-1/3'>
            <h1 className='font-bold text-xl'> Health Aid Diagnostic Centre</h1>
                <div>
                    <p>Location: Chittagong</p>
                    <FontAwesomeIcon icon={faPhone} /> 01811-114464
                </div>
            </div>
            
            </div>
             
            <button className='w-fit px-3 py-2 rounded bg-yellow-300 ml-54'>Read More</button>
        </div>
    );
};

export default Diagonostic;