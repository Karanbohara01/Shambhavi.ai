const Course = require('../models/Course');

// @desc    Create a new course
// @route   POST /api/courses
exports.createCourse = async (req, res) => {
    try {
        if (req.user.role !== 'instructor') {
            return res.status(403).json({ error: 'Only instructors can create courses' });
        }

        const { title, description, level, language } = req.body;

        const course = await Course.create({
            title,
            description,
            level,
            language,
            instructorId: req.user._id,
        });

        res.status(201).json(course);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create course' });
    }
};


// @desc    Get all courses
// @route   GET /api/courses
exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find().sort({ createdAt: -1 });
        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch courses' });
    }
};
