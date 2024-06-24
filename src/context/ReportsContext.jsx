// src/context/ReportsContext.jsx

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ReportsContext = createContext();

export const ReportsProvider = ({ children }) => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/reports')
            .then(response => {
                setReports(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching reports:', error);
            });
    }, []);

    const updateReportStatus = (pcode, status) => {
        setReports(prevReports => prevReports.map(report =>
            report.pcode === pcode ? { ...report, status } : report
        ));
    };
    return (
        <ReportsContext.Provider value={{ reports,setReports, updateReportStatus }}>
            {children}
        </ReportsContext.Provider>
    );
};
