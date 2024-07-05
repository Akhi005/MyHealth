import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home_Services = () => {
    const [service, setService] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showMedicineInput, setShowMedicineInput] = useState(false);
    const navigate=useNavigate();
    const handleHomeService = (e) => {
        e.preventDefault();
        const pname = e.target.pname.value;
        const pcode = e.target.pcode.value;
        const email = e.target.email.value;
        const paddress = e.target.paddress.value;
        const pphone = e.target.pphone.value;
        const service = e.target.service.value;
        const medicineName = e.target.medicineName ? e.target.medicineName.value : '';
        axios.post("https://myhealth-server-side.vercel.app/homeservice", { pname, pcode, email, paddress, pphone, service, medicineName })
            .then(() => {
                setShowModal(true);
                navigate('/');
            })
            .catch(error => {
                console.error("There was an error processing your request!", error);
            });
    };
    const handleServiceChange = (e) => {
        const selectedService = e.target.value;
        setService(selectedService);
        setShowMedicineInput(selectedService === "Medicine");
    };
    return (
        <div>
            <div className='flex mx-24 font-bold'>
                <form onSubmit={handleHomeService}>
                     <h1 className='text-center text-3xl my-3 '>Home Service</h1>
                    <div className='flex flex-col w-[600px] bg-gray-300 p-5 space-y-3'>
                        <label>Patient Name</label>
                        <input type="text" name="pname" required />
                        <label>Patient Code</label>
                        <input type="text" name="pcode" required />
                        <label>Email</label>
                        <input type="email" name="email" required />
                        <label>Address</label>
                        <input type="text" name="paddress" required />
                        <label>Phone number</label>
                        <input type="tel" name="pphone" required />
                        <label>Service</label>
                        <select name="service" value={service} onChange={handleServiceChange} required>
                            <option value="" disabled>Select Service</option>
                            <option value="Report Delivery">Report Delivery</option>
                            <option value="Medicine">Medicine</option>
                            <option value="Nursing Home Care">Nursing Home Care</option>
                        </select>
                        {showMedicineInput && (
                            <>
                                <label>Medicine Name</label>
                                <input type="text" name="medicineName" required />
                            </>
                        )}
                        <input type="submit" className='bg-yellow-500' value="Submit" />
                    </div>
                </form>
                <img className='ml-16' src="https://i.ibb.co/Mn3K2LL/Capture.png" alt="" />
            </div>

            {showModal && (
                <dialog id="my_modal_1" className="modal" open>
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Congratulations !!</h3>
                        <p className="py-4">Your service request has been taken... You will get your service soon.</p>
                        <div className="modal-action">
                            <button className="btn" onClick={() => setShowModal(false)}>Close</button>
                        </div>
                    </div>
                </dialog>
               
            )}
        </div>
    );
};

export default Home_Services;
