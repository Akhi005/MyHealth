import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ReportSubmit = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [statusMessage, setStatusMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setCurrentDate(new Date());
    }, []);

    const handleReportSubmit = async (e) => {
        e.preventDefault();
        const pname = e.target.pname.value;
        const pcode = e.target.pcode.value;
        const pmail = e.target.pmail.value;
        const reportfile = e.target.reportfile.value;
        const doctorcode = e.target.doctorcode.value;
        const doctorname = e.target.doctorname.value;
        const date = currentDate.toISOString().split('T')[0];
        console.log("Submitting report:", { pname, pcode, doctorcode, reportfile, pmail, doctorname,date });
        try {
            const response = await axios.post('http://localhost:4000/reportsubmit', { pname, pcode, doctorcode,doctorname, reportfile, pmail, date }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setStatusMessage('Report submitted successfully.');
            console.log('Report submitted successfully:', response.data);
            navigate('/dashboard');
        } catch (error) {
            alert('Error submitting report. Please try again.');
            console.error('Error submitting report:', error);
        }
    };
    return (
        <div className="relative w-full flex justify-center h-full items-center text-xl ">
            <img src="https://i.ibb.co/SypHYjm/download.jpg" alt="Background" className="absolute w-full h-[100vh]" />
            <form className="relative ml-16 p-8 bg-slate-400 rounded shadow-lg" onSubmit={handleReportSubmit}>
                <h1 className="text-2xl font-bold mb-2 text-center">Submit Report</h1>
                <label className="block mb-2">Patient Name</label>
                <input type="text" className="w-full mb-2 p-2 rounded-xl border" name="pname" required />
                <label className="block mb-2">Patient Code</label>
                <input type="text" className="w-full mb-2 p-2 rounded-xl border" name="pcode" required />
                <label className="block mb-2">Patient email</label>
                <input type="text" className="w-full mb-2 p-2 rounded-xl border" name="pmail" required />
                <label className="block mb-2">Doctor Code</label>
                <input type="text" className="w-full mb-2 p-2 rounded-xl border" name="doctorcode" required />
                <label className="block mb-2">Doctor Name</label>
                <input type="text" className="w-full mb-2 p-2 rounded-xl border" name="doctorname" required />
                <label className="block mb-2">Report File Link</label>
                <input type="text" className="w-full mb-2 p-2 rounded-xl border" placeholder='ImgUrl' name="reportfile" required />
                Date: {currentDate.toLocaleString()}
                <button type="submit" className="bg-blue-800 mt-5 px-5 py-2 ml-4 text-white rounded-2xl hover:bg-blue-500">Submit</button>
                {statusMessage && <p className="mt-4 text-green-500">{statusMessage}</p>}
            </form>
        </div>
    );
};

export default ReportSubmit;
