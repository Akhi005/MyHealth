const { Client } = require('pg');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "Myhealth-Content",
  password: "rootnewpassword",
  port: 5432,
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch(err => console.error('Connection error', err.stack));

app.get('/content', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM content_read');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching data from the database:', err.message);
    res.status(500).send('Server Error');
  }
});

app.post('/createcontent', async (req, res) => {
  const { title, about, symptomps, prevent, medicine, email, imgurl } = req.body;
  try {
    const result = await client.query(
      'INSERT INTO content_read (title, about, symptomps, prevent, medicine, email, imgurl) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [title, about, symptomps, prevent, medicine, email, imgurl]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error inserting into the database:', err.message);
    res.status(500).send('Server Error');
  }
});

app.post('/appointment', async (req, res) => {
  const patient_name = 'Test Name';
  const dob = '2024-05-09';
  const gender = 'Female';
  const yesnoques = 'no';
  const phone = '01871888788';
  const appointmentdate = '2024-06-08';
  const doctorapp = 'hhh0212';
  const appointmenttime = '7.30';

  console.log('Inserting:', patient_name, dob, gender, yesnoques, phone, appointmentdate, doctorapp, appointmenttime);
  
  try {
    const result = await client.query(
      'INSERT INTO appointment (patient_name, dob, gender, yesnoques, phone, appointmentdate, doctorapp, appointmenttime) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [patient_name, dob, gender, yesnoques, phone, appointmentdate, doctorapp, appointmenttime]
    );
    console.log('Database response:', result);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error inserting into the database:', err.stack);
    res.status(500).send('Server Error');
  }
});


app.get('/appointment', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM appointment');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching data from the database:', err.message);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
