const mongoose = require('mongoose');

const OrchidLeavesSchema = new mongoose.Schema({
    plant_id: {
        type: String,
        required: true
    },
    image_path: {
        type: String, // Store the file path of the image
        required: true
    },
    capture_date: {
        type: String,
        require: true
    },
    capture_Time: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('OrchidLeaves', OrchidLeavesSchema);
