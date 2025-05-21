import React, { useContext, useState } from 'react';
import CreateContent from './CreateContent';
import ReportSubmit from './ReportSubmit';
import UserList from './UserList';
import { AuthContext } from '/src/auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import DoctorAppoint from './DoctorAppointment';
import ReportShow from './Report_show';
import ReportShow_admin from './ReportShow';
const Dashboard = () => {
    const navigate=useNavigate();
    const {logOut}=useContext(AuthContext);
    const [activeComponent, setActiveComponent] = useState(null);
    const handleLogout=()=>{
       logOut()
       .then(()=>navigate('/signin'))
    }
    const renderComponent = () => {
        switch (activeComponent) {
            case 'CreateContent':
                return <CreateContent />;
            case 'ReportSubmit':
                return <ReportSubmit />;
            case 'UserList':
                return <UserList />;
             case 'DoctorAppoint':
                 return <DoctorAppoint />;
             case 'ReportShow':
                 return <ReportShow_admin/>;
            default:
                return   <div className="relative h-full w-full">
                <img 
                    src="https://i.ibb.co/CpjSV8R0/filling-medical-record-1098-18239.jpg" 
                    className="absolute top-0 left-0 h-full w-full object-cover" />
                <div className="flex items-center justify-center h-full ">
                    <h1 className="text-center text-white text-4xl font-bold relative">
                        <span className="bg-black bg-opacity-50 p-4 m-2">M</span>
                        <span className="bg-black bg-opacity-50 p-4 m-2">Y</span>
                        <span className="bg-black bg-opacity-50 p-4 m-2">H</span>
                        <span className="bg-black bg-opacity-50 p-4 m-2">E</span>
                        <span className="bg-black bg-opacity-50 p-4 m-2">A</span>
                        <span className="bg-black bg-opacity-50 p-4 m-2">L</span>
                        <span className="bg-black bg-opacity-50 p-4 m-2">T</span>
                        <span className="bg-black bg-opacity-50 p-4 m-2">H</span>
                    </h1>
                </div>
            </div>
        }
    };

    return (
        <div className='flex'>
            <div className='w-1/5 p-4 bg-[#021e3b] text-white h-[100vh] text-lg'>
                <h1 className='font-bold text-2xl mb-4'>Dashboard</h1>
                <li onClick={() => setActiveComponent('Home')} className='my-2 p-2 hover:bg-blue-500 cursor-pointer'>Home</li>
                <hr />
                <ul className='my-4'>
                    <li onClick={() => setActiveComponent('CreateContent')} 
                    className='my-2 p-2 hover:bg-blue-500 cursor-pointer'>
                        Create Content
                    </li>
                    <li onClick={() => setActiveComponent('ReportSubmit')} className='p-2 my-2 hover:bg-blue-500 cursor-pointer'>
                        Report Submit
                    </li>
                    <li onClick={() => setActiveComponent('UserList')} className='p-2 my-2 hover:bg-blue-500 cursor-pointer'>
                        Users List
                    </li>
                    <li onClick={() => setActiveComponent('DoctorAppoint')} className='p-2 my-2 hover:bg-blue-500 cursor-pointer'>
                        Doctor's Appointment
                    </li>
                    <li onClick={() => setActiveComponent('ReportShow')} className='p-2 my-2 hover:bg-blue-500 cursor-pointer'>
                    Report Show
                    </li>
                 
                <hr />
                <button className='my-4 p-2 hover:bg-blue-500 text-xl w-full flex justify-start' onClick={handleLogout}>Sign Out</button>
                </ul>
            </div>
            <div className="flex-grow ">
                {renderComponent()}
            </div>
        </div>
    );
};

export default Dashboard;
