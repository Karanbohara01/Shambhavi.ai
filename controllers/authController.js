// controllers/authController.js

const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


exports.register = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please include name, email, and password');
    }

    // Optional: Validate role (only allow specific values)
    const allowedRoles = ['student', 'instructor', 'admin'];
    if (role && !allowedRoles.includes(role)) {
        res.status(400);
        throw new Error('Invalid role provided');
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user with role (defaults to student if not provided)
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: role || 'student',
    });

    // Respond with user data
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
    });
});


// @desc    Login user
// @route   POST /api/auth/login
exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid credentials');
    }
});


// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
});

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};
