import React, { useContext, useEffect, useState } from 'react'
import { Card, CardBody, Typography } from '@material-tailwind/react'
import { AuthContext } from '/src/auth/AuthProvider'
import { ReportContext } from '/src/context/ReportContext'
import axios from 'axios'
const ReportShow = () => {
  const { user } = useContext(AuthContext)
  const { reports, setReports, error } = useContext(ReportContext)
  const handleStatusChange = async (pcode) => {
    try {
      const response = await axios.put(`http://localhost:4000/reports/${pcode}/status`, { status: 'Paid' })
      const updatedReport = response.data
      setReports((prevReports) =>
        prevReports.map((report) =>
          report.pcode === updatedReport.pcode ? { ...report, status: updatedReport.status } : report
        )
      )
      console.log('Report status updated successfully:', updatedReport)
    } catch (error) {
      console.error('Error updating report status:', error)
    }
  }
  const TABLE_HEAD = ['Patient name', 'Patient Reg code', "Doctor's code", 'Status', 'Date (MM/DD/YYYY)']
  const FormatDateTime = (utcDate) => {
    const bdDate = new Date(utcDate)
    bdDate.setHours(bdDate.getUTCHours() + 6)
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }
    const bdFormatted = bdDate.toLocaleString('en-BD', options)
    return bdFormatted
  }
  return (
    <div>
      <Card className="h-full w-full text-xl">
        <h1 className="my-2 font-bold text-3xl text-center">Patient Report</h1>
        <CardBody className="overflow-scroll px-24 text-xl">
          {error && <p className="text-red-500">{error}</p>}
          <table className="mt-4 w-full min-w-max table-auto text-center text-xl">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="border-y text-2xl border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    <Typography variant="paragraph" color="blue-gray" className="font-normal text-xl font-semibold opacity-90">
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
                    <Typography variant="paragraph" color="blue-gray" className="font-normal text-left ml-12 text-xl">
                      {report.pname}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="paragraph" color="blue-gray" className="font-normal text-xl opacity-70">
                      {report.pcode}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="paragraph" color="blue-gray" className="font-normal text-xl">
                      {report.doctorcode}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleStatusChange(report.pcode)}
                      disabled={report.status === 'Paid'}
                      className={`w-full px-2 py-1 text-xl font-medium rounded ${
                        report.status === 'Paid' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
                      }`}
                    >
                      {report.status === 'Paid' ? 'Paid' : 'Mark as Paid'}
                    </button>
                  </td>
                  <td className="p-4">
                    <Typography variant="paragraph" color="blue-gray" className="font-normal text-xl">
                      {FormatDateTime(report.date)}
                    </Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  )
}

export default ReportShow
