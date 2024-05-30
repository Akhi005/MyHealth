import axios from 'axios';
import React, { useState } from 'react';

const Appointment = () => {
    const [answer, setAnswer] = useState('');
    const [gender, setGender] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');
    const [message, setMessage] = useState('');

    const handleAppointmentTime = (time) => {
        setAppointmentTime(time);
    };

    const handleAppointment = async (e) => {
        e.preventDefault();
        const formData = {
            patient_name: e.target.patient_name.value,
            dob: e.target.dob.value,
            gender: e.target.gender.value,
            yesnoques: answer,
            phone: e.target.phone.value,
            appointmentdate: e.target.appointmentdate.value,
            doctorapp: e.target.doctorapp.value,
            appointmenttime: appointmentTime
        };

        try {
            const response = await axios.post('http://localhost:4000/appointment', formData);
            setMessage('Appointment successfully booked!');
            console.log('User saved:', response.data);
        } catch (error) {
            setMessage('There was an error booking the appointment.');
            console.error('There was an error creating the content:', error);
        }
    };

    return (
        <div className='my-4'>
            <h1 className='text-2xl text-center'>Doctor Appointment Request Form</h1>
            <p className='text-center'>
                Fill the form below and we will get back to you soon for more updates and to plan your appointment.
            </p>
            {message && <p className="text-center my-4">{message}</p>}
            <form className="shadow-2xl bg-gray-200 mx-44 px-36" onSubmit={handleAppointment}>
                <div className='py-2 flex items-center mt-3 pt-4'>
                    <h1>Patient's Name</h1>
                    <input
                        type="text"
                        className='w-[530px] p-1 ml-4 rounded'
                        name='patient_name'
                        required
                    />
                </div>
                <div className='flex items-center my-2'>
                    <h1>Date of Birth</h1>
                    <input
                        type="date"
                        className='p-2 ml-4 rounded w-[550px]'
                        name="dob"
                        required
                    />
                </div>
                <div className='flex items-center'>
                    <h1>Gender</h1>
                    <select
                        name="gender"
                        className='p-2 rounded-xl ml-4 my-2 w-[550px]'
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
                <div className='my-2'>
                    <h1>Have you ever applied to our facility before?</h1>
                    <label className="ml-12 text-lg">
                        <input
                            type="radio"
                            value="yes"
                            checked={answer === 'yes'}
                            onChange={e => setAnswer(e.target.value)}
                            required
                        />
                        Yes
                    </label>
                    <label className='ml-8 text-lg'>
                        <input
                            type="radio"
                            value="no"
                            checked={answer === 'no'}
                            onChange={e => setAnswer(e.target.value)}
                            required
                        />
                        No
                    </label>
                </div>
                <div className='my-2 flex items-center'>
                    <h1>Phone Number</h1>
                    <input
                        className='w-[500px] rounded p-1 ml-3'
                        type="tel"
                        name="phone"
                        required
                    />
                </div>
                <div className='my-2'>
                    <h1>Which Doctor's appointment you want to get?</h1>
                    <input
                        className='w-[500px] rounded p-1 ml-3 my-1'
                        placeholder='Write Doctor code'
                        type="text"
                        name="doctorapp"
                        required
                    />
                </div>
                <div className=''>
                    <h1>Preferred Appointment Date</h1>
                    <input
                        type="date"
                        className='w-[500px] my-2 p-1'
                        name="appointmentdate"
                        required
                    />
                </div>
                <div className='pb-4'>
                    <h1>Preferred Appointment Time</h1>
                    <div className='my-2'>
                        {['7.00', '7.30', '8.00', '8.30'].map(time => (
                            <button
                                key={time}
                                type="button"
                                onClick={() => handleAppointmentTime(time)}
                                className={`border-2 border-blue-500 py-1 px-3 m-1 rounded ${appointmentTime === time ? 'bg-blue-500 text-white' : ''}`}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                </div>
                <input type="submit" value="Submit" className='ml-80 bg-violet-600 text-white px-12 py-2 rounded mb-4' />
            </form>
        </div>
    );
};

export default Appointment;
