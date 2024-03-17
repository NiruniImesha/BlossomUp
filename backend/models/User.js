const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    User_id: {
        type: String,
        required: true
    },
    User_Name: {
        type: String,
        required: true
    },
    User_Password: {
        type: String,
        require: true
    },
    User_Status: {
        type: String,
        enum:["Admin" , "Researcher","Farmer"],
        require: true
    },
    is_InActive: {
        type: String,
        enum:["Active" , "InActive"],
        require: true
    }
});

module.exports = mongoose.model('User', UserSchema);
