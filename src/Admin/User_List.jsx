import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
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
        console.log(res.data);
        setAllUser(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err.message);
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
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="All Users" {...a11yProps(0)} />
          <Tab label="Doctor List" {...a11yProps(1)} />
          <Tab label="Patient List" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ul>
          {alluser.length > 0 ? (
            alluser.map(user => (
              <li key={user.pcode || user.doctorcode}>
                {user.pname || user.doctorname} - {user.pmail || user.doctormail}
              </li>
            ))
          ) : (
            <li>No users found</li>
          )}
        </ul>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ul>
          {doctorlist.length > 0 ? (
            doctorlist.map(doctor => (
              <li key={doctor.doctorcode}>
                {doctor.doctorname} - {doctor.doctormail}
              </li>
            ))
          ) : (
            <li>No doctors found</li>
          )}
        </ul>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <ul>
          {patientlist.length > 0 ? (
            patientlist.map(patient => (
              <li key={patient.pcode}>
                {patient.pname} - {patient.pmail}
              </li>
            ))
          ) : (
            <li>No patients found</li>
          )}
        </ul>
      </CustomTabPanel>
    </Box>
  );
}
