const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    coursecode: String,
    coursename: String,
    year: Number
});

module.exports = mongoose.model('courseSchema', CourseSchema)