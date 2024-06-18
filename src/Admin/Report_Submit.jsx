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
        const formData = new FormData();
        formData.append('pname', e.target.pname.value);
        formData.append('pcode', e.target.pcode.value);
        formData.append('doctorcode', e.target.doctorcode.value);
        formData.append('reportfile', e.target.reportfile.value);
        formData.append('date', currentDate.toISOString().split('T')[0]);
        try {
            const response = await axios.post('http://localhost:4000/reportsubmit', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
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
            <img src="https://i.ibb.co/SypHYjm/download.jpg" alt="Background" className="absolute w-full h-100" />
            <form className="relative ml-16 mr-96 p-12 bg-slate-300 rounded shadow-lg" onSubmit={handleReportSubmit}>
                <h1 className="text-xl font-bold mb-4">Submit Report</h1>
                <label className="block mb-2">Patient Name</label>
                <input type="text" className="w-full mb-4 p-2 rounded border" name="pname" required />
                <label className="block mb-2">Patient Code</label>
                <input type="text" className="w-full mb-4 p-2 rounded border" name="pcode" required />
                <label className="block mb-2">Doctor Code</label>
                <input type="text" className="w-full mb-4 p-2 rounded border" name="doctorcode" required />
                <label className="block mb-2">Report File Link</label>
                <input type="text" className="w-full mb-4 p-2 rounded border" placeholder='ImgUrl' name="reportfile" required />
                <h1 className="mb-4">Date: {currentDate.toLocaleString()}</h1>
                <button type="submit" className="bg-violet-500 p-3 text-white rounded hover:bg-violet-700">Submit</button>
                {statusMessage && <p className="mt-4 text-green-500">{statusMessage}</p>}
            </form>
        </div>
    );
};

export default ReportSubmit;
