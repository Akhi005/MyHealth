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

app.get('/content/:title', async (req, res) => {
  const { title } = req.params;
  console.log(title);
  try {
    const result = await client.query('SELECT * FROM content_read WHERE title = $1', [title]);
    if (result.rows.length === 0) {
      return res.status(404).send('Content not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching data from the database:', err.message);
    res.status(500).send('Server Error');
  }
});

app.post('/appointment', async (req, res) => {
  const { patient_name, dob, gender, yesnoques, phone, appointmentdate, doctorapp, appointmenttime } = req.body;

  console.log('Inserting:', patient_name, dob, gender, yesnoques, phone, appointmentdate, doctorapp, appointmenttime);
  
  try {
    const result = await client.query(
      'INSERT INTO appointment (patient_name, dob, gender, yesnoques, phone, appointmentdate, doctorapp, appointmenttime) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [patient_name, dob, gender, yesnoques, phone, appointmentdate, doctorapp, appointmenttime]
    );
    console.log('Database response:', result.rows[0]);
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
