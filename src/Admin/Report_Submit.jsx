import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ReportSubmit = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [statusMessage, setStatusMessage] = useState('');

    useEffect(() => {
        setCurrentDate(new Date());
    }, []);
    const navigate=useNavigate();
    const handleReportSubmit = async (e) => {
        e.preventDefault();
       
        const pname = e.target.pname.value;
        const pcode = e.target.pcode.value;
        const pmail = e.target.pmail.value;
        const doctorcode = e.target.doctorcode.value;
        const reportfile = e.target.reportfile.value;
        const date = currentDate.toISOString().split('T')[0];

        console.log("Submitting report:", { pname, pcode, doctorcode, reportfile, pmail, date });
    
        try {
            const response = await axios.post('https://myhealth-server.vercel.app/reportsubmit', {  pname, pcode, doctorcode, reportfile, pmail, date}, {
                headers: {
                    'Content-Type': 'application/json',  
                },
            });
    
            setStatusMessage('Report submitted successfully.');
            console.log('Report submitted successfully:', response.data);
            navigate('/reportshow');
        } catch (error) {
            alert('Error submitting report. Please try again.');
            console.error('Error submitting report:', error);
        }
    };
    return (
        <div className="relative">
            <img src="https://i.ibb.co/SypHYjm/download.jpg" alt="Background" className="absolute w-full h-[641px]" />
            <form className="relative ml-16 mr-96 p-8 bg-slate-300 rounded shadow-lg" onSubmit={handleReportSubmit}>
                <h1 className="text-xl font-bold mb-2">Submit Report</h1>
                <label className="block mb-2">Patient Name</label>
                <input type="text" className="w-full mb-2 p-2 rounded border" name="pname" required />
                <label className="block mb-2">Patient Code</label>
                <input type="text" className="w-full mb-2 p-2 rounded border" name="pcode" required />
                <label className="block mb-2">Patient email</label>
                <input type="text" className="w-full mb-2 p-2 rounded border" name="pmail" required />
                <label className="block mb-2">Doctor Code</label>
                <input type="text" className="w-full mb-2 p-2 rounded border" name="doctorcode" required />
                <label className="block mb-2">Report File Link</label>
                <input type="text" className="w-full mb-2 p-2 rounded border" placeholder='ImgUrl' name="reportfile" required />
                <h1 className="mb-2">Date: {currentDate.toLocaleString()}</h1>
                <button type="submit" className="bg-violet-500 p-3 text-white rounded hover:bg-violet-700">Submit</button>
                {statusMessage && <p className="mt-4 text-green-500">{statusMessage}</p>}
            </form>
        </div>
    );
};

export default ReportSubmit;
