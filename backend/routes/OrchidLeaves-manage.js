const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const moment = require('moment'); // Import moment.js
const OrchidLeavesSchema = require('../models/OrchidLeaves');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'E:/final_project/final_test_01/BlossomUp_system/front-end/src/images/');
        
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/add-OrchidLeaves', upload.single('image'), async (req, res) => {
    try {
        const { plant_id } = req.body;
        const image_path = req.file.path; 
        const capture_date = moment().format('YYYY-MM-DD');
        const capture_Time = moment().format('HH:mm:ss');
        const newOrchidLeaves = new OrchidLeavesSchema({
            plant_id,
            image_path,
            capture_date,
            capture_Time
        });
        await newOrchidLeaves.save();
        res.json({ msg: 'Completed' });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

module.exports = router;

