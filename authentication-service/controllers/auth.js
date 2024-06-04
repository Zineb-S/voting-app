const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Role = require('../models/role');
const isauth = require('../middleware/isAuth');

require('dotenv').config();

const router = express.Router();

// Get the authenticated user's details
router.get('/me', isauth, async (req, res) => {
  try {
    console.log('Authenticated user:', req.user);
    const user = await User.findById(req.user.userId).populate('role');
    res.json(user);
  } catch (err) {
    console.log('Error fetching user:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, dateOfBirth, phoneNumber } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: 'User already exists' });

    // Find the default role
    const role = await Role.findOne({ IsAdmin: false });
    console.log('Default Role:', role);
    if (!role) return res.status(500).json({ msg: 'Default role not found' });

    // Create a new user with the default role
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      dateOfBirth,
      phoneNumber,
      role: role._id, // Use the default role's ID
    });

    await newUser.save();

    // Create a JWT token with the default role
    const payload = { userId: newUser._id, role: role.IsAdmin };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3h' });

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Login a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).populate('role');
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const payload = { userId: user._id, role: user.role.IsAdmin };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3h' });

    res.status(200).json({ refresh_token: token });
  } catch (err) {
    console.error('Error logging in user:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
