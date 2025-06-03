import pg from 'pg';
const { Pool } = pg;
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import fileUpload from 'express-fileupload';
import { GoogleGenerativeAI } from '@google/generative-ai';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { promises as fs } from 'fs';
import dotenv from 'dotenv';
dotenv.config();
import admin from 'firebase-admin';
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
});

app.post('/jwt', (req, res) => {
  const user = req.body;
  console.log("Generating token for:", user);
  console.log("Using secret:", process.env.ACCESS_TOKEN_SECRET);
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
  console.log("Generated token:", token);
  res.cookie('token', token, {
    secure: process.env.NODE_ENV === 'production', 
    sameSite: 'none',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  }).send({ success: true });
});

const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;
  console.log("verify ", token);
  if (!token)
    return res.status(403).send({
      message: "Token Missing",
    });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
    if (err || (decode && req.headers?.authorization !== decode?.email)) {
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
  console.log("ppppp ", userData);
  const { pname, doctorname, pmail, doctormail } = userData;
  console.log(pname, doctorname);
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

async function getYoutube(topic) {
  const apikey = process.env.YOUTUBE_API_KEY
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${topic}&type=video&key=${apikey}`
  const response = await axios.get(url)
  return response.data.items
}

async function getWikipedia(topic) {
  const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
    topic
  )}&utf8=&format=json`
  try {
    const searchResponse = await axios.get(searchUrl)
    const searchResults = searchResponse.data.query.search
    if (searchResults.length === 0) {
      return [{ message: 'No results found for this topic on wikipedia' }]
    }
    const pageContents = []
    for (const result of searchResults) {
      const title = encodeURIComponent(result.title)
      const pageUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&explaintext&titles=${title}`
      const pageResponse = await axios.get(pageUrl)
      const pages = pageResponse.data.query.pages
      const pageId = Object.keys(pages)[0]
      const contentText = pages[pageId].extract
      pageContents.push({ title: result.title, content: contentText })
    }
    return pageContents
  } catch (error) {
    console.error('Error fetching Wikipedia content:', error)
    return 'Failed to fetch Wikipedia content'
  }
}
async function getMDNContent(topic) {
  const url = `https://developer.mozilla.org/api/v1/search?q=${encodeURIComponent(topic)}&locale=en-US`
  try {
    const response = await axios.get(url)
    const documents = response.data.documents
    if (!documents || documents.length === 0) {
      return [{ message: 'No results found for this topic on MDN' }]
    }
    const mdnContents = []
    for (const document of documents) {
      const { title, summary, slug } = document
      const mdnUrl = `https://developer.mozilla.org/en-US/docs/${slug}`
      mdnContents.push({ title, summary, url: mdnUrl })
    }
    console.log(mdnContents)
    return mdnContents
  } catch (error) {
    console.error('Error fetching MDN content:', error)
    return 'Failed to fetch MDN content'
  }
}
app.get('/fetch-content', async (req, res) => {
  const topic = req.query.topic
  console.log('Topic received:', topic)

  try {
    const wikipediaContent = await getWikipedia(topic)
    const youtubeContent = await getYoutube(topic)
    const MDNContent = await getMDNContent(topic)
    await storeArticleInFirebase(topic, { wikipediaContent, youtubeContent, MDNContent })
    res.json({ topic, wikipediaContent, youtubeContent, MDNContent })
  } catch (error) {
    console.error('Error while fetching content:', error)
    res.status(500).json({ error: 'Failed to fetch content' })
  }
})

admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), 
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
  }),
  databaseURL: 'https://myhealth-792e7-default-rtdb.firebaseio.com',
})
const db = admin.firestore()
async function storeArticleInFirebase(articleTitle, content) {
  try {
    const sanitizedId = articleTitle
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-');

    const docRef = db.collection('articles').doc(sanitizedId);

    await docRef.set({
      originalSearchTerm: articleTitle,
      content: {
        wikipediaContent: content.wikipediaContent,
        MDNContent: content.MDNContent,
        youtubeContent: content.youtubeContent
      },
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });
    console.log(`Document ${sanitizedId} stored successfully`);
  } catch (error) {
    console.error('Error storing article:', error);
    throw error;
  }
}
const genAI = new GoogleGenerativeAI(process.env.API_KEY)
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
async function generateQuestionsFromText(content) {
  try {
    const generationConfig = {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
    };

    const chat = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [{ text: "Generate 5-7 short assessment questions and answers based on the following text. Format each as: 'Question: ...? Answer: ...'. Avoid markdown." }],
        },
      ],
    });

    const result = await chat.sendMessage(content);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating questions:", error);
    throw new Error("Question generation failed");
  }
}
app.post('/generate-questions', async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    const questions = await generateQuestionsFromText(content);
    res.json({ questions });
  } catch (error) {
    console.error('Error generating questions:', error.message);
    res.status(500).json({
      error: error.message || 'Error generating questions'
    })
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});