const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('./models/User');

dotenv.config();

const jwtSecret = process.env.JWTKEY;
const mongoKey = process.env.MONGO_URL;
const app = express();

const connectToMongo = async () => {
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(mongoKey)
        console.log('Mongo connected')
    }
    catch (error) {
        console.log(error)
        process.exit()
    }
}

connectToMongo();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
}));

app.get('/test', (req, res) => {
    res.json('testing');
});

app.post('/register', async (req, res) => {
    const { username, password, code } = req.body;
    try {
        const newUser = await User.create({ username, password, code });
        jwt.sign({ userId: newUser._id, username }, jwtSecret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).status(201).json({
                id: newUser._id,
            });
        });
    } catch (err) {
        if (err) throw err;
        res.status(500).json('error');
    }
});

app.listen(3000);