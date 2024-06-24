import React, { useContext, useEffect, useState } from 'react';
import { Card, CardBody, Typography, Chip } from "@material-tailwind/react";
import { AuthContext } from '../_auth/AuthProvider/AuthProvider';
import { ReportsContext } from '../context/ReportsContext';

const Patient_Report = () => {
    const { user } = useContext(AuthContext);
    const { reports, loading, error } = useContext(ReportsContext);
    const TABLE_HEAD = ["Patient name", "Patient Reg code", "Doctor's name", "Status", "Date", "File"];
    const [filteredReports, setFilteredReports] = useState([]);

    useEffect(() => {
        if (reports && user) {
            const filtered = reports.filter(report => report.pmail === user.email);
            setFilteredReports(filtered);
            console.log(filtered);
        }
    }, [reports, user]);

    if (loading) {
        return <p>Loading...</p>; 
    }

    if (error) {
        return <p>Error: {error.message}</p>; 
    }

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
                            {filteredReports.map((report, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal">
                                            {report.pname || 'N/A'}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal opacity-70">
                                            {report.pcode || 'N/A'}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal">
                                            {report.doctorname || 'N/A'}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Chip
                                            value={report.status === 'Paid' ? 'Paid' : 'Unpaid'}
                                            variant="ghost"
                                            size="sm"
                                            color={report.status === 'Paid' ? "green" : "gray"}
                                        />
                                    </td>
                                    <td className="p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal">
                                            {report.date || 'N/A'}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <a href={`${(report.reportfile)}`} className="text-blue-500 hover:underline">
                                            Download
                                        </a>
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

export default Patient_Report;
