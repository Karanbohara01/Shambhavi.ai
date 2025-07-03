const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');



dotenv.config();

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

// Rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests, try again later.',
});
app.use(limiter);

app.get('/', (req, res) => {
    res.send('API is working ✅');
});

// DB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection failed:', err.message));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
