import React, { useState } from 'react';
import Create_Content from './Create_Content';
import Report_Submit from './Report_Submit';
import Patient_List from './Patient_List';
// import Doctor_Appoint from './Doctor_Appoint';
// import Test_Booked from './Test_Booked';

const Dashboard = () => {
    const [activeComponent, setActiveComponent] = useState(null);

    const renderComponent = () => {
        switch (activeComponent) {
            case 'Home': return <div className="relative h-full w-full">
            <img 
                src="https://i.ibb.co/DrGhY1t/download-3.jpg" 
                className="absolute top-0 left-0 h-full w-full object-cover" />
            <div className="flex items-center justify-center h-full ">
                <h1 className="text-center text-white text-4xl font-bold relative">
                    <span className="bg-black bg-opacity-50 p-2 m-1">M</span>
                    <span className="bg-black bg-opacity-50 p-2 m-1">Y</span>
                    <span className="bg-black bg-opacity-50 p-2 m-1">H</span>
                    <span className="bg-black bg-opacity-50 p-2 m-1">E</span>
                    <span className="bg-black bg-opacity-50 p-2 m-1">A</span>
                    <span className="bg-black bg-opacity-50 p-2 m-1">L</span>
                    <span className="bg-black bg-opacity-50 p-2 m-1">T</span>
                    <span className="bg-black bg-opacity-50 p-2 m-1">H</span>
                </h1>
            </div>
        </div>;
            case 'CreateContent':
                return <Create_Content />;
            case 'ReportSubmit':
                return <Report_Submit />;
            case 'PatientList':
                return <Patient_List />;
             case 'DoctorAppoint':
                 return <Doctor_Appoint />;
            case 'TestBooked':
                return <Test_Booked />;
            default:
                return   <div className="relative h-full w-full">
                <img 
                    src="https://i.ibb.co/DrGhY1t/download-3.jpg" 
                    className="absolute top-0 left-0 h-full w-full object-cover" />
                <div className="flex items-center justify-center h-full ">
                    <h1 className="text-center text-white text-4xl font-bold relative">
                        <span className="bg-black bg-opacity-50 p-2 m-1">M</span>
                        <span className="bg-black bg-opacity-50 p-2 m-1">Y</span>
                        <span className="bg-black bg-opacity-50 p-2 m-1">H</span>
                        <span className="bg-black bg-opacity-50 p-2 m-1">E</span>
                        <span className="bg-black bg-opacity-50 p-2 m-1">A</span>
                        <span className="bg-black bg-opacity-50 p-2 m-1">L</span>
                        <span className="bg-black bg-opacity-50 p-2 m-1">T</span>
                        <span className="bg-black bg-opacity-50 p-2 m-1">H</span>
                    </h1>
                </div>
            </div>
        }
    };

    return (
        <div className='flex h-screen'>
            <div className='w-1/5 p-4 bg-pink-500 text-white'>
                <h1 className='font-bold text-2xl mb-4'>Dashboard</h1>
                <li onClick={() => setActiveComponent('Home')} 
                    className='my-2 hover:bg-blue-500 cursor-pointer'>
                        Home
                    </li>
                <hr />
                <ul className='my-4'>
                    <li onClick={() => setActiveComponent('CreateContent')} 
                    className='my-2 hover:bg-blue-500 cursor-pointer'>
                        Create Content
                    </li>
                    <li onClick={() => setActiveComponent('ReportSubmit')} className='my-2 hover:bg-blue-500 cursor-pointer'>
                        Report Submit
                    </li>
                    <li onClick={() => setActiveComponent('PatientList')} className='my-2 hover:bg-blue-500 cursor-pointer'>
                        Patient's List
                    </li>
                    <li onClick={() => setActiveComponent('DoctorAppoint')} className='my-2 hover:bg-blue-500 cursor-pointer'>
                        Doctor's Appointment
                    </li>
                    <li onClick={() => setActiveComponent('TestBooked')} className='my-2 hover:bg-blue-500 cursor-pointer'>
                        Test Booking
                    </li> 
                </ul>
                <hr />
                <button className='my-4 btn btn-primary'>Sign Out</button>
            </div>
            <div className="flex-grow ">
                {renderComponent()}
            </div>
        </div>
    );
};

export default Dashboard;
