import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
connectDB();

app.get('/', (req, res) => {
    res.send({ message: 'Server is working!!!' });
});


app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});