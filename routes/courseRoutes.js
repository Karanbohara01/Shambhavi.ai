const express = require('express');
const router = express.Router();
const { createCourse, getCourses } = require('../controllers/courseController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', protect, createCourse);
router.get('/', getCourses);

module.exports = router;
