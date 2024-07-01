const { Pool } = require('pg');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser=require('cookie-parser');
const cors = require('cors');
const jwt=require('jsonwebtoken');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs').promises;
const uploadDir = path.join(__dirname, 'uploads');
fs.mkdir(uploadDir, { recursive: true }).catch(console.error);
require('dotenv').config();
const app = express();
const port = process.env.PORT || 4000;
app.use(cookieParser())
app.use(cors({
  origin:['http://localhost:5173','https://myhealth-server.vercel.app'],
  credentials:true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());


const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})
pool.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch(err => console.error('Connection error', err.stack));

app.post('/jwt',async(req,res)=>{
  const user=req.body;
  console.log(user);
  const token=jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1h'})
  res
  .cookie('token',token,{
    httpOnly:true,
    secure:false,
    sameSite:'none'
  })
  .send({success:true});
})
app.get('/content', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM content_read');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching data from the database:', err.message, err.stack);
    res.status(500).send('Server Error');
  }
});

app.post('/createcontent', async (req, res) => {
  const { title, about, symptomps, prevent, medicine, email, imgurl } = req.body;
  try {
    const result = await pool.query(
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
    const result = await pool.query('SELECT * FROM content_read WHERE title = $1', [title]);
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
    const result = await pool.query('SELECT * FROM report_submit');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching data from the database:', err.message);
    res.status(500).send('Server Error');
  }
});

app.put('/reports/:pcode/status', async (req, res) => {
  const { pcode } = req.params;
  const { status } = req.body;

  try {
    const result = await pool.query(
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

  try {
    let result;
    if (pname) {
      result = await pool.query(
        `INSERT INTO users (pname, pcode, pmail) VALUES ($1, nextval('patient_code_seq'), $2) RETURNING *`,
        [pname, pmail]
      );
    } else if (doctorname) {
      result = await pool.query(
        `INSERT INTO users (doctorname, doctorcode, doctormail) VALUES ($1, nextval('doctor_code_seq'), $2) RETURNING *`,
        [doctorname, doctormail]
      );
    }

    console.log('User data inserted:', result.rows[0]);
    res.status(201).send(result.rows[0]);
  } catch (err) {
    console.error('Error inserting user data:', err.message);
    res.status(500).send('Server Error');
  }
});

app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err.message);
    res.status(500).send('Server Error');
  }
});

app.post('/reportsubmit', async (req, res) => {
  const { pname, pcode, doctorcode, reportfile, pmail, date } = req.body;

  console.log("Received report submit data:", { pname, pcode, doctorcode, reportfile, pmail, date });

  if (!pname || !pcode || !doctorcode || !date || !reportfile || !pmail) {
    console.error('Missing required fields');
    return res.status(400).send('Missing required fields');
  }

  try {
    const status = "Unpaid";
    const result = await pool.query(
      'INSERT INTO report_submit(pname, pcode, doctorcode, reportfile, pmail, date, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [pname, pcode, doctorcode, reportfile, pmail, date, status]
    );

    console.log('Report submitted successfully:', result.rows[0]);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error inserting into the database:', err.message);
    res.status(500).send('Server Error');
  }
});

app.post('/appointment', async (req, res) => {
  const { patient_name, dob, gender, yesnoques, phone, appointmentdate, doctorapp, appointmenttime } = req.body;
  try {
    const result = await pool.query(
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
    const result = await pool.query('SELECT * FROM appointment');
    res.json(result.rows);
    console.log(result);
  } catch (err) {
    console.error('Error fetching data from the database:', err.message);
    res.status(500).send('Server Error');
  }
});
app.post('/homeservice', async (req, res) => {
  const { pname, pcode, email, paddress, pphone, service } = req.body;
  const result = await pool.query('INSERT INTO homeservice (pname,pcode,email,paddress,pphone,service) VALUES($1, $2, $3, $4, $5, $6)RETURNING *', [pname, pcode, email, paddress, pphone, service]);
  res.status(200).json(result);
})
app.use('/uploads', express.static(uploadDir));

app.get('/download', async (req, res) => {
  const { file } = req.query;
  const filePath = path.join(uploadDir, file);

  try {
    await fs.access(filePath);
    res.download(filePath, file, (err) => {
      if (err) {
        console.error('Error downloading file:', err);
        res.status(500).send('Server Error');
      }
    });
  } catch (err) {
    console.error('File not found:', err);
    res.status(404).send('File not found');
  }
});

app.get('/', (req, res) => {
  res.send('myhealth server is running');
})
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
