import React from 'react';
import './services.css'
import { Link } from 'react-router-dom';

const Services = () => {

    return (
        <div className="my-6 text-center">
            <h1 className='font-bold text-3xl'>Our Services</h1>
            <div className='flex my-8 text-center p-4'>
                <div className="card w-72 shadow-2xl main-container flex justify-center items-center">
                    <figure><img className='w-[40px] h-[40px]' src="https://i.ibb.co/F3vChM4/service-1.png" alt="Find Consultant" /></figure>
                    <h2 className="card-title">Find Consultant</h2>
                    <div className="overlay card-actions justify-end">
                        <button className="btn bg-yellow-600 text-white p-2 rounded mt-10"><Link to="/findconsultant">Get the service</Link></button>
                    </div>
                </div>
                <div className="card w-72 shadow-2xl main-container flex justify-center items-center">
                    <figure><img className='w-[50px] h-[50px]' src="https://i.ibb.co/1Q8vz6S/appointment.jpg" alt="Make Appointment" /></figure>
                    <h2 className="card-title">Make Appointment</h2>
                    <div className="overlay card-actions justify-end">
                        <button className="btn bg-yellow-600 text-white p-2 rounded mt-10">
                            <Link to="/appointment">Get the service</Link>
                        </button>
                    </div>
                </div>
                <div className="card w-72 shadow-2xl main-container flex justify-center items-center">
                    <figure><img className='w-[50px] h-[50px]' src="https://i.ibb.co/jM0Dqfm/report.jpg" alt="Online Report" /></figure>
                    <h2 className="card-title">Online Report</h2>
                    <div className="overlay card-actions justify-end">
                        <button className="btn bg-yellow-600 text-white p-2 rounded mt-10">
                            <Link to="/onlinereport">Get the service</Link>
                        </button>
                    </div>
                </div>
                <div className="card w-72 shadow-2xl main-container flex justify-center items-center">
                    <figure><img className='w-[50px] h-[50px]' src="https://i.ibb.co/YB9DwqS/home.jpg" alt="Home Service" /></figure>
                    <h2 className="card-title">Home Service</h2>
                    <div className="overlay card-actions justify-end">
                        <button className="btn bg-yellow-600 text-white p-2 rounded mt-10" >
                           <Link to="/homeservicess">Get the service</Link> 
                        </button>
                    </div>
                </div>
                <div className="card py-6 w-72 shadow-2xl main-container flex justify-center items-center">
                    <figure><img className='w-[80px] h-[60px]' src="https://i.ibb.co/MPT5b6p/ambulance.png" alt="Call For Ambulances" /></figure>
                    <h2 className="card-title">Call For Ambulances</h2>
                    <div className="overlay card-actions justify-end">
                        <button className="btn bg-yellow-600 text-white p-2 rounded mt-10">
                            <Link to='/ambulance'>Get the service</Link>
                        </button>
                    </div>
                </div>
               
            </div>
        </div>
    );
};

export default Services;
