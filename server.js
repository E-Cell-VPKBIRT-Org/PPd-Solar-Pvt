import 'dotenv/config';
import express from 'express';
import { Pool } from 'pg';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));


app.post('/api/request-callback', async (req, res) => {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Please fill out all required fields.' });
    }

    const query = `
        INSERT INTO callback_requests (name, email, phone, message)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;
    const values = [name, email, phone, message];

    try {
        const result = await pool.query(query, values);
        console.log('Database insert successful:', result.rows[0]);
        res.status(201).json({ success: true, message: 'Your request has been sent successfully!' });
    } catch (error) {
        console.error('Error executing query', error.stack);
        res.status(500).json({ success: false, message: 'An error occurred on the server. Please try again later.' });
    }
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});