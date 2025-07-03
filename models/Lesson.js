const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    videoUrl: String,
    content: String, // Markdown or HTML
    order: Number,
    duration: String, // e.g., "12:35"
}, { timestamps: true });

module.exports = mongoose.model('Lesson', lessonSchema);
