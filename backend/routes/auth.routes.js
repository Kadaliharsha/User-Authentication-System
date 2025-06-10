const express = require('express');
const router = express.Router();
const { registerUser, verifyOTP, loginUser, deleteUser } = require('../controllers/auth.controller');
const upload = require('../upload');
const rateLimit = require('express-rate-limit');

// Rate limiter for OTP requests
const otpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: { error: 'Too many OTP requests. Please try again later.' }
});

router.post('/register', upload.single('profileImage'), registerUser);
router.post('/verify-otp', verifyOTP);
router.post('/login', otpLimiter, loginUser);

const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

// Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/me', verifyToken, deleteUser);

module.exports = router;