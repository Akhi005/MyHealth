import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

const Ambulance = () => {
    return (
        <div className='my-4 text-center'>
            <h1 className="text-4xl my-2">Hotline Number to get Ambulance Service</h1>
           <div className='flex mt-10'>
           <img src="https://i.ibb.co/FxqdKt1/Capture.png" alt="" />
            <ul className='p-8 w-[600px] text-4xl'>
                <div className='shadow-2xl flex flex-col p-4'>
                    <li className=' my-4'><FontAwesomeIcon icon={faPhone} /> 01845269444</li>
                    <li className='my-4'><FontAwesomeIcon icon={faPhone} /> 01856555520</li>
                    <li className='my-4'><FontAwesomeIcon icon={faPhone} /> 01856505520</li>
                    <li className='my-4'><FontAwesomeIcon icon={faPhone} /> 01856575520</li>
                </div>
            </ul>
           </div>
        </div>
    );
};

export default Ambulance;
