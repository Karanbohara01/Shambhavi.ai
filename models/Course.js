const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    language: {
        type: String,
        default: 'English',
    },
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        default: 'Beginner',
    },
    thumbnail: String,
    tags: [String],
    instructorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
