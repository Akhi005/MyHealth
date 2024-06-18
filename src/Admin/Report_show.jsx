import React, { useContext, useEffect } from 'react';
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { AuthContext } from '../_auth/AuthProvider/AuthProvider';
import { ReportsContext } from '../context/ReportsContext';
import axios from 'axios';

const Report_show = () => {
    const { user } = useContext(AuthContext);
    const { reports, setReports } = useContext(ReportsContext);

    const handleStatusChange = async (pcode) => {
        try {
            const response = await axios.put(`http://localhost:4000/reports/${pcode}/status`, { status: 'Paid' });
            const updatedReport = response.data;
            setReports(prevReports =>
                prevReports.map(report =>
                    report.pcode === updatedReport.pcode ? { ...report, status: updatedReport.status } : report
                )
            );

            console.log('Report status updated successfully:', updatedReport);
        } catch (error) {
            console.error('Error updating report status:', error);
        }
    };

    const TABLE_HEAD = ["Patient name", "Patient Reg code", "Doctor's name", "Status", "Date"];

    return (
        <div>
            <Card className="h-full w-full">
                <h1 className='my-2 font-bold text-2xl text-center'>Patient Report</h1>
                <CardBody className="overflow-scroll px-0">
                    <table className="mt-4 w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th
                                        key={head}
                                        className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70">
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((report, index) => (
                                <tr key={index}>
                                    <td className="p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {user ? user.displayName : "Unknown"}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal opacity-70"
                                        >
                                            {report.pcode}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {report.doctorcode}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <button
                                            onClick={() => handleStatusChange(report.pcode)}  
                                            disabled={report.status === 'Paid'}
                                            className={`px-2 py-1 text-sm font-medium rounded ${report.status === 'Paid' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}
                                        >
                                            {report.status === 'Paid' ? 'Paid' : 'Mark as Paid'}
                                        </button>
                                    </td>
                                    <td className="p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {report.date}
                                        </Typography>
                                    </td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardBody>
            </Card>
        </div>
    );
};

export default Report_show;
