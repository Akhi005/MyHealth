import React, { useContext, useEffect, useState } from 'react'
import { Card, CardBody, Typography, Chip } from '@material-tailwind/react'
import { AuthContext } from '../../auth/AuthProvider'
import { ReportContext } from '/src/context/ReportContext'

const PatientReport = () => {
  const { user } = useContext(AuthContext)
  const { reports, loading, error } = useContext(ReportContext)
  const TABLE_HEAD = ['Patient name', 'Patient Reg code', "Doctor's name", 'Status', 'Date', 'File']
  const [filteredReports, setFilteredReports] = useState([])
  useEffect(() => {
    if (Array.isArray(reports) && user?.email) {
      const filtered = reports.filter((report) => report.pmail?.toLowerCase() === user.email.toLowerCase())
      setFilteredReports(filtered)
    }
  }, [reports, user])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }

  return (
    <div>
      <Card className="h-full w-full">
        <h1 className="my-2 font-bold text-2xl text-center">Patient Report</h1>
        <CardBody className="overflow-scroll px-24">
          <table className="mt-4 w-full min-w-max text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredReports
                ? filteredReports.map((report, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="p-4">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {report.pname || 'N/A'}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography variant="small" color="blue-gray" className="font-normal opacity-70">
                          {report.pcode || 'N/A'}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {report.doctorname || 'N/A'}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Chip
                          value={report.status?.toLowerCase() === 'paid' ? 'Paid' : 'Unpaid'}
                          variant="ghost"
                          size="sm"
                          color={report.status?.toLowerCase() === 'paid' ? 'green' : 'gray'}
                        />
                      </td>
                      <td className="p-4">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {report.date || 'N/A'}
                        </Typography>
                      </td>
                      <td className="p-4">
                        {report.status?.toLowerCase() === 'paid' && (
                          <a href={`${report?.reportfile}`} className="text-blue-500 hover:underline">
                            Show
                          </a>
                        )}
                      </td>
                    </tr>
                  ))
                : 'No report to show'}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  )
}

export default PatientReport
