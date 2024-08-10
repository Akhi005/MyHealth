import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
const FindConsultant = () => {
  const [DoctorList, setDoctorList] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMeetingTime, setIsMeetingTime] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/users')
      .then(res => {
        const filtered = res.data.filter(d => d.doctorname != null);
        setDoctorList(filtered);
        setFilteredData(filtered);
        console.log(res.data);
      })
      .catch(err => console.log(err.stack));
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => {
      const newTime = new Date();
      setCurrentTime(newTime);
      const currentHour = newTime.getHours();
      const currentMinutes = newTime.getMinutes();
      if ((currentHour >= 20 && currentMinutes >= 0) && (currentHour <= 22 && currentMinutes === 0)) {
        setIsMeetingTime(true);
      } else {
        setIsMeetingTime(false);
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filtered = DoctorList.filter(doctor => doctor.doctorname.toLowerCase().includes(searchValue));
    setFilteredData(filtered);
    console.log("Filtered Data:", filtered);
  };

  return (
    <div>
      <div className="h-full w-full">
        <h1 className='my-2 font-bold text-2xl text-center'>Find a Consultant</h1>
        <p className='text-center'>Set Meeting button will be enabled from 8:00 PM to 10:00 PM except Friday</p>
        <div className='flex ml-2'>
        <FaSearch  className='ml-1 mt-3 pt-1 text-xl absolute'/><input 
            type="search" 
            name="doctorname" 
            onChange={handleSearch} 
            className="pl-7 py-2 border rounded w-96 mt-2 bg-orange-300" 
            placeholder="Search by doctor name" 
          />
        </div>
        <div className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">Doctor Name</th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">Email</th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">Code</th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">Specialization</th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">Set Meeting</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((doctor, index) => (
                  <tr key={index}>
                    <td className="p-4">{doctor.doctorname}</td>
                    <td className="p-4">{doctor.doctormail}</td>
                    <td className="p-4">{doctor.doctorcode}</td>
                    <td className="p-4">{doctor.specialization}</td>
                    <td className="p-4">
                      <a href="https://meet.google.com/">
                        <button disabled={!isMeetingTime} className='bg-orange-400 p-2 rounded'>Set Meeting</button>
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-4 text-center">No doctors found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FindConsultant;
