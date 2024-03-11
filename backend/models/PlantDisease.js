const mongoose = require("mongoose");

const PlantDiseaseSchema = new mongoose.Schema({

    plant_id:{
        type:String,
        required:true
    },
    Checked_date:{
        type:Date,
        require:true,
    },
    Disease_affected_area:{
        type:String,
        required:true
    },
    Last_disease_affected_percentage:{
        type:String,
        required:true
    },
    Current_disease_affected_percentage:{
        type:String,
        required:true
    },
    Disease_affected_area:{
        type:String,
        required:true
    },
    disease_Name:{
        type:String,
        required:true,
    },
    
})

module.exports=mongoose.model('PlantDisease',PlantDiseaseSchema)
