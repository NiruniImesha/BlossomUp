const mongoose = require("mongoose");

const OrchidDiseaseSchema = new mongoose.Schema({

    disease_Name:{
        type:String,
        required:true
    },
    Medicine_01:{
        type:String,
        required:true,
    },
    Medicine_02:{
        type:String,
    },
    description:{
        type:String,
        required:true,
    },
    Create_date:{
        type:Date,
        require:true,
    },
    create_user:{
        type:String,
        required:true
    },
    
})

module.exports=mongoose.model('OrchidDisease',OrchidDiseaseSchema)
