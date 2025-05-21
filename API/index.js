const { Pool } = require('pg');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs').promises;
require('dotenv').config();
const uploadDir = path.join(__dirname, 'uploads');
fs.mkdir(uploadDir, { recursive: true }).catch(console.error);

const app = express();
const port = process.env.PORT || 4000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cors({
  origin: ['http://localhost:5173', 'https://myhealth-792e7.web.app'],
  credentials: true
}));
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client:', err);
  process.exit(-1);
});

module.exports = pool;
app.post('/jwt', (req, res) => {
    const user = req.body;
    console.log("Generating token for:", user);
    console.log("Using secret:", process.env.ACCESS_TOKEN_SECRET);
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    console.log("Generated token:", token);
    res.cookie('token', token, {
      secure: false,
      sameSite: 'none',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    }).send({ success: true });
});
const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;
  console.log("verify ",token);
  if (!token)
    return res.status(403).send({
      message: "Token Missing",
    });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
    if (err || req.headers?.authorization !== decode?.email) {
      return res.status(401).send({
        message: "Unauthorize access",
      });
    }
    req.user = decode?.email;
    next();
  });
};

app.get('/content', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM content_read');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching data from the database:', err.message);
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

app.post('/reportsubmit', async (req, res) => {
  const { pname, pcode, doctorcode, doctorname, reportfile, pmail, date } = req.body;
  if (!pname || !pcode || !doctorcode || !date || !reportfile || !pmail) {
    return res.status(400).send('Missing required fields');
  }
  try {
    const status = "Unpaid";
    const result = await pool.query(
      'INSERT INTO report_submit(pname, pcode, doctorcode, doctorname, reportfile, pmail, date, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [pname, pcode, doctorcode, doctorname, reportfile, pmail, date, status]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error inserting into the database:', err.message);
    res.status(500).send('Server Error');
  }
});

app.post('/users', async (req, res) => {
  const userData = req.body;
  console.log("ppppp ",userData);
  const { pname, doctorname, pmail, doctormail } = userData;
  console.log(pname,doctorname);
  if (!pname && !doctorname) {
    return res.status(400).send('Either patient name or doctor name is required');
  }
  if (!pmail && !doctormail) {
    return res.status(400).send('Either patient email or doctor email is required');
  }
  try {
    let result;
    if (pname) {
      result = await pool.query(`INSERT INTO users (pname, pcode, pmail) VALUES ($1, nextval('patient_code_seq'), $2) RETURNING *`,
        [pname, pmail]
      );
    } else if (doctorname) {
      result = await pool.query(
        `INSERT INTO users (doctorname, doctorcode, doctormail) VALUES ($1, nextval('doctor_code_seq'), $2) RETURNING *`,
        [doctorname, doctormail]
      );
    }
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

app.post('/appointment', verifyToken, async (req, res) => {
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

app.get('/appointment', verifyToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM appointment');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching data from the database:', err.message);
    res.status(500).send('Server Error');
  }
});

app.post('/homeservice', verifyToken, async (req, res) => {
  const { pname, pcode, email, paddress, pphone, service } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO homeservice (pname, pcode, email, paddress, pphone, service) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
      [pname, pcode, email, paddress, pphone, service]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error inserting into the database:', err.message);
    res.status(500).send('Server Error');
  }
});

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
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
