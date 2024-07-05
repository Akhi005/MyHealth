import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ReportsContext = createContext();

export const ReportsProvider = ({ children }) => {
    const [reports, setReports] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://myhealth-server-side.vercel.app/reports',{ withCredentials: true })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          if (error.response) {
            console.error('Error data:', error.response.data);
            console.error('Error status:', error.response.status);
            console.error('Error headers:', error.response.headers);
          } else if (error.request) {
            console.error('No response received:', error.request);
          } else {
            console.error('Error message:', error.message);
          }
          console.error('Error config:', error.config);
        });
            

    }, []);

    const updateReportStatus = (pcode, status) => {
        setReports(prevReports => prevReports.map(report =>
            report.pcode === pcode ? { ...report, status } : report
        ));
    };

    return (
        <ReportsContext.Provider value={{ reports, setReports, updateReportStatus, error }}>
            {children}
        </ReportsContext.Provider>
    );
};
