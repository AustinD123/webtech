const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = 5000;

// Connect to MongoDB
mongoose
    .connect('mongodb://localhost:27017/userdb', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));

// Define User Schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    userData: {
        name: String,
        phone: String,
        address: String,
        preferences: {
            type: Map,
            of: String,
            default: new Map(),
        },
        lastLogin: {
            type: Date,
            default: Date.now,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model('User', userSchema);

// Route: Register a new user
app.post('/api/register', async (req, res) => {
    try {
        const { email, password, userData } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            email,
            password: hashedPassword,
            userData: userData || {}, // Optional userData
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
});

// Route: Login
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Update last login time
        user.userData = user.userData || {};
        user.userData.lastLogin = new Date();
        await user.save();

        // Return user data (excluding password)
        const userData = user.toObject();
        delete userData.password;

        res.json({
            message: 'Login successful',
            user: userData,
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
});

// Route: Update user data
app.post('/api/update-user-data', async (req, res) => {
    try {
        const { email, userData } = req.body;

        // Validate input
        if (!email || !userData) {
            return res.status(400).json({ message: 'Email and userData are required' });
        }

        // Find and update user
        const updatedUser = await User.findOneAndUpdate(
            { email },
            {
                $set: {
                    userData: userData,
                    'userData.lastLogin': new Date(),
                },
            },
            { new: true, select: '-password' } // Return updated document, exclude password
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            message: 'User data updated successfully',
            user: updatedUser,
        });
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ message: 'Error updating user data' });
    }
});

// Route: Get user data
app.get('/api/user-data/:email', async (req, res) => {
    try {
        const { email } = req.params;

        // Validate input
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        // Find user
        const user = await User.findOne({ email }, '-password'); // Exclude password
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Fetch error:', error);
        res.status(500).json({ message: 'Error fetching user data' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
