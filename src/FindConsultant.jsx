import axios from 'axios';
import React, { useEffect ,useState} from 'react';

const FindConsultant = () => {
    const [DoctorList,setDoctorList]=useState();
    useEffect=()=>{
        axios.get('http://localhost/4000/users')
        .then(res=>setDoctorList(res))
        .catch(err=>console.log(err.messeage))
    }
    const [time,setTime]=useState(false);
    useEffect=()=>{
       
    }
    return (
        <div>
            <Card className="h-full w-full">
                <h1 className='my-2 font-bold text-2xl text-center'></h1>
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
                            {DoctorList.map((report, index) => (
                                <tr key={index}>
                                    <td className="p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {report.doctorname}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal opacity-70"
                                        >
                                            {report.doctormail}
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
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {report.specialization}
                                        </Typography>
                                    </td>
                                    <td className="p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                       <a href="https://meet.google.com/"> <button disabled={time}>Set Meeting</button></a>
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

export default FindConsultant;