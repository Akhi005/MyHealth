const { Client } = require('pg');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs').promises;

const uploadDir = path.join(__dirname, 'uploads');
fs.mkdir(uploadDir, { recursive: true }).catch(console.error);

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

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

app.get('/reports', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM report_submit');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching data from the database:', err.message);
    res.status(500).send('Server Error');
  }
});
app.get('/download', async (req, res) => {
  const { file } = req.query;
  const filePath = path.join(uploadDir, file);
  res.download(filePath, file, (err) => {
    if (err) {
      console.error('Error downloading file:', err);
      res.status(500).send('Server Error');
    }
  });
});
app.put('/reports/:pcode/status', async (req, res) => {
  const { pcode } = req.params;
  const { status } = req.body;

  try {
    const result = await client.query(
      'UPDATE report_submit SET status = $1 WHERE pcode = $2 RETURNING *',
      [status, pcode]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Report not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating report status:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.post('/users', async (req, res) => {
  const userData = req.body;
  console.log('User data received:', userData);
  const { pname, doctorname, pmail, doctormail } = userData;
  if (!pname && !doctorname) {
    res.status(400).send('Either patient name or doctor name is required');
    return;
  }
  if (!pmail && !doctormail) {
    res.status(400).send('Either patient email or doctor email is required');
    return;
  }
  const values = {
    pname: pname || '',
    doctorname: doctorname || '',
    pmail: pmail || '',
    doctormail: doctormail || '',
  };
    const result = await client.query(
      `INSERT INTO users (pname, doctorname, pmail, doctormail) VALUES ($1, $2, $3, $4) RETURNING *`,
      [values.pname, values.doctorname, values.pmail, values.doctormail]
    );
    console.log('User data inserted:', result.rows[0]);
    res.status(201).send(result.rows[0]);
});
app.get('/users', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err.message);
    res.status(500).send('Server Error');
  }
});
app.post('/reportsubmit', async (req, res) => {
  const { pname, pcode, doctorcode, date, reportfile } = req.body;
  // const reportfile = req.files.reportfile;
  try {
    // const filePath = path.join(uploadDir, reportfile.name);
    // await fs.writeFile(filePath, reportfile.data);
    const status = "Unpaid";
    const result = await client.query(
      'INSERT INTO Report_Submit(pname, pcode, doctorcode, reportfile, date, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [pname, pcode, doctorcode, reportfile, date, status]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error inserting into the database:', err.stack);
    res.status(500).send('Server Error');
  }
});

app.post('/appointment', async (req, res) => {
  const { patient_name, dob, gender, yesnoques, phone, appointmentdate, doctorapp, appointmenttime } = req.body;
  try {
    const result = await client.query(
      'INSERT INTO appointment (patient_name, dob, gender, yesnoques, phone, appointmentdate, doctorapp, appointmenttime) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [patient_name, dob, gender, yesnoques, phone, appointmentdate, doctorapp, appointmenttime]
    );
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
