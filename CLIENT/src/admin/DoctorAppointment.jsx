import React, { useEffect, useState } from 'react'
import { Card, CardBody, Typography } from '@material-tailwind/react'
import axios from 'axios'

const Doctor_Appoint = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    axios
      .get('https://myhealth-server-side.vercel.app/appointment')
      .then((res) => setData(res.data))
      .catch((err) => console.log(err.message))
  })

  const TABLE_HEAD = ['Patient name', 'DOB', 'Gender', 'PreviousService', 'Phone', 'AppointmentDate', 'Doctor']
  return (
    <div>
      <Card className="h-full w-full ">
        <h1 className="my-2 font-bold text-2xl text-center">Doctor Appointment</h1>
        <CardBody className="overflow-scroll px-24">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th key={index} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((report, index) => (
                  <tr key={index}>
                    <td className="p-4">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {report.patient_name}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography variant="small" color="blue-gray" className="font-normal opacity-70">
                        {report.dob}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {report.gender}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {report.yesnoques}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {report.phone}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {report.appointmentdate}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {report.doctorapp}
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

export default Doctor_Appoint
