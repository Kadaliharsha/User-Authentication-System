const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const generateOTP = require('../utils/otp.utils');
const fs = require('fs');
const path = require('path');

// Register User
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, company, age, dob } = req.body;
    const profileImage = req.file?.filename;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = generateOTP(); // e.g. '827761'
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    const user = new User({
      name,
      email,
      password: hashedPassword,
      company,
      age,
      dob,
      profileImage,
      otp: {
        code: otp,
        expiresAt: otpExpiry
      }
    });

    await user.save();

    // Log OTP to terminal
    console.log(`Generated OTP for ${email}: ${otp}`);

    return res.status(201).json({ message: 'User registered. OTP sent.' });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Registration failed' });
  }
};

// Login User (Step 1: Send OTP)
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid password' });

    const otp = generateOTP(); // 6-digit OTP
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    user.otp = { code: otp, expiresAt: otpExpiry };
    await user.save();

    // Log OTP to terminal
    console.log(`Generated OTP for ${email}: ${otp}`);

    return res.status(200).json({ message: 'OTP sent to your email/phone.' });

  } catch (err) {
    console.error('Login Error:', err);
    return res.status(500).json({ error: 'Login failed' });
  }
};

// OTP Verification (Step 2)
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!user.otp || user.otp.code !== otp.toString()) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (Date.now() > new Date(user.otp.expiresAt)) {
      return res.status(400).json({ message: 'OTP expired' });
    }

    // OTP success - clear it
    user.otp = null;
    await user.save();

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    return res.status(200).json({
      message: 'OTP verified. Login successful.',
      token
    });

  } catch (err) {
    console.error('OTP verification error:', err);
    return res.status(500).json({ message: 'Server error during OTP verification' });
  }
};

// Delete User and associated image
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Remove profile image if exists
    if (user.profileImage) {
      const imagePath = path.join(__dirname, '../uploads', user.profileImage);
      fs.unlink(imagePath, (err) => {
        if (err && err.code !== 'ENOENT') {
          console.error('Error deleting image:', err);
        }
      });
    }

    await User.deleteOne({ _id: req.userId });
    res.json({ message: 'Account and associated image deleted.' });
  } catch (err) {
    console.error('Delete user error:', err);
    res.status(500).json({ message: 'Server error during account deletion' });
  }
};
