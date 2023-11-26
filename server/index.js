const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

dotenv.config();
mongoose.connect(process.env.MONGO_URL);
const jwtSecret = process.env.JWT_SECRET;
const bcryptSalt = bcrypt.genSaltSync(10);
const ADMIN_CODE = process.env.ADMIN_CODE;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
}));

app.get('/test', (req, res) => {
    res.json('testing');
});

app.get('/profile', (req, res) => {
    const token = req.cookies?.token;
    if (token) {
        jwt.verify(token, jwtSecret, {}, (err, userData) => {
            if (err) throw err;
            res.json(userData);
        });
    } else {
        res.status(401).json('no token');
    }
});

app.post('/register', async (req, res) => {
    const { username, password, code } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already taken' });
        }
        
        let role = 'user';

        if (code === ADMIN_CODE) {
            role = 'admin';
        }

        const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
        const createdUser = await User.create({ username, password: hashedPassword, code, role });

        jwt.sign({ userId: createdUser._id, username, role }, jwtSecret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token, { sameSite: 'none', secure: true }).status(201).json({
                id: createdUser._id,
                role: role,
            });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/login', async (req,res) => {
    const { username, password, code } = req.body;
    const foundUser = await User.findOne({ username });

    if (!foundUser) {
        return res.status(401).json({ error: 'Username not found/Incorrect password' });
    }
    const passOk = bcrypt.compareSync(password, foundUser.password);
    if (!passOk) {
        return res.status(401).json({ error: 'Username not found/Incorrect password' });
    }
    jwt.sign({ userId: foundUser._id, username }, jwtSecret, {}, (err, token) => {
        res.cookie('token', token, { sameSite: 'none', secure: true }).json({
            id: foundUser._id,
        });
    });
});

app.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Log-out successful'});
});

/* 
/validate-secret-code
API endpoint to validate the secret code which users will enter. 
Upon entering the correct code defined in the .env file, the user's privilege will change from 'Regular' to 'Special'.
This endpoint is created to handle the feature of changing user's privilege on the messaging app's main page.
This is so users can change their account privilege even after they've signed up. 
*/
app.post('/validate-secret-code', (req, res) => {
    const { secretCode } = req.body;

    try {
        // Fetch the user based on the current token
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({ error: 'Invalid cookie token session' });
        }

        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) {
                return res.status(401).json({ error: 'Invalid token' });
            }

            const { userId } = userData;

            // Fetch user from database
            const user = await User.findById(userId);

            // Check if the user exists in the database
            if (!user) {
                return res.status(401).json({ error: 'User not found' });
            }

            // Validate the secret code that the user will enter
            if (secretCode === ADMIN_CODE) {
                user.role = 'admin';
            } else {
                user.role = 'user';
            }

            // Save the changes
            await user.save();

            // Respond with the updated role
            res.json({ role: user.role });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal sever error' });
    }
});

app.listen(3000);