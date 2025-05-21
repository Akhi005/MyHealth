import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function User_List() {
  const [value, setValue] = useState(0);
  const [alluser, setAllUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:4000/users')
      .then(res => {
        console.log("user  ",res.data);
        setAllUser(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch users');
        setLoading(false);
      });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const doctorlist = alluser.filter(user => user.doctorname && user.doctorcode);
  const patientlist = alluser.filter(user => user.pname && user.pcode);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Box sx={{ width: '100%', fontSize: '1.1rem', fontWeight: 600 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="All Users" {...a11yProps(0)} />
          <Tab label="Doctor List" {...a11yProps(1)} />
          <Tab label="Patient List" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="all users table">
            <TableHead className=' bg-gray-300'>
              <TableRow >
                <TableCell  sx={{ fontSize: '1.1rem', fontWeight: 600 }}>Patient Code</TableCell>
                <TableCell sx={{ fontSize: '1.1rem', fontWeight: 600 }}>Patient Name</TableCell>
                <TableCell sx={{ fontSize: '1.1rem', fontWeight: 600 }}>Patient Email</TableCell>
                <TableCell sx={{ fontSize: '1.1rem', fontWeight: 600 }}>Doctor Code</TableCell>
                <TableCell sx={{ fontSize: '1.1rem', fontWeight: 600 }}>Doctor Name</TableCell>
                <TableCell sx={{ fontSize: '1.1rem', fontWeight: 600 }}>Doctor Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alluser.length > 0 ? (
                alluser.map(user => (
                  <TableRow key={user.pcode || user.doctorcode}>
                    <TableCell sx={{ fontSize: '1.1rem', fontWeight: 400 }}>{user.pcode || '---'}</TableCell>
                    <TableCell sx={{ fontSize: '1.1rem', fontWeight: 400 }}>{user.pname || '---'}</TableCell>
                    <TableCell sx={{ fontSize: '1.1rem', fontWeight: 400 }}>{user.pmail || '---'}</TableCell>
                    <TableCell sx={{ fontSize: '1.1rem', fontWeight: 400 }}>{user.doctorcode || '---'}</TableCell>
                    <TableCell sx={{ fontSize: '1.1rem', fontWeight: 400 }}>{user.doctorname || '---'}</TableCell>
                    <TableCell sx={{ fontSize: '1.1rem', fontWeight: 400 }}>{user.doctormail || '---'}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6}>No users found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="doctor list table">
            <TableHead className=' bg-gray-300'>
              <TableRow>
                <TableCell sx={{ fontSize: '1.1rem', fontWeight: 600 }}>Doctor Code</TableCell>
                <TableCell sx={{ fontSize: '1.1rem', fontWeight: 600 }}>Doctor Name</TableCell>
                <TableCell sx={{ fontSize: '1.1rem', fontWeight: 600 }}>Doctor Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doctorlist.length > 0 ? (
                doctorlist.map(doctor => (
                  <TableRow key={doctor.doctorcode}>
                    <TableCell sx={{ fontSize: '1.1rem', fontWeight: 400 }}>{doctor.doctorcode}</TableCell>
                    <TableCell sx={{ fontSize: '1.1rem', fontWeight: 400 }}>{doctor.doctorname}</TableCell>
                    <TableCell sx={{ fontSize: '1.1rem', fontWeight: 400 }}>{doctor.doctormail}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3}>No doctors found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="patient list table">
            <TableHead className=' bg-gray-300'>
              <TableRow>
                <TableCell sx={{ fontSize: '1.1rem', fontWeight: 600 }}>Patient Code</TableCell>
                <TableCell sx={{ fontSize: '1.1rem', fontWeight: 600 }}>Patient Name</TableCell>
                <TableCell sx={{ fontSize: '1.1rem', fontWeight: 600 }}>Patient Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patientlist.length > 0 ? (
                patientlist.map(patient => (
                  <TableRow key={patient.pcode}>
                    <TableCell sx={{ fontSize: '1.1rem', fontWeight: 400 }}>{patient.pcode}</TableCell>
                    <TableCell sx={{ fontSize: '1.1rem', fontWeight: 400 }}>{patient.pname}</TableCell>
                    <TableCell sx={{ fontSize: '1.1rem', fontWeight: 400 }}>{patient.pmail}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3}>No patients found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CustomTabPanel>
    </Box>
  );
}
