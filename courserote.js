const express = require('express');
const router = express.Router();
const Courses = require('../Models/coursemodael');
const csvtojson = require('csvtojson');
const multer = require('multer');

//POST
router.post('/', async (req, res) => {
    try {
        const course = new Courses(req.body);
        await course.save();
        res.status(200).json(course);

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});

//GET ALL DATA
router.get('/', async (req, res) => {
    try {
        const course = await Courses.find();
        res.json(course);

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//CUSTOMISE FUNCTION
async function getCourses(req, res, next) {
    let course;
    try {
        course = await Courses.findById(req.params.id);
        if (course == null) {
            return res.status(404).json({ message: "record not found" })
        }
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
    res.course = course;
    next();
}
//GET BY ID
router.get('/:id', getCourses, async (req, res) => {
    res.json(res.course)
})

//UPDATE BY ID
router.put('/:id', getCourses, async (req, res) => {
    if (req.body.coursecode != null) {
        res.course.coursecode = req.body.coursecode;
    }
    if (req.body.coursename != null) {
        res.course.coursename = req.body.coursename;
    }
    if (req.body.year != null) {
        res.course.year = req.body.year;
    }
    try {
        const updatedCourse = await res.course.save();
        res.json(updatedCourse)

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})
//DELTE BY ID
router.delete('/:id', getCourses, async (req, res) => {
    try {
        await res.course.deleteOne();
        res.json({ message: "Course is delete successfully" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})
//bULK uPLOADING 
const storage = multer.memoryStorage();
const upload = multer({ storag: storage.storag })
router.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json('no file uploaded');
    }
    try {
        const jsnarray = await csvtojson().fromString(req.file.buffer.toString());
        await Courses.insertMany(jsnarray);
        res.json({ message: "Csv File Upload Successfully" });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

module.exports = router;