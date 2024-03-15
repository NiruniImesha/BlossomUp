const mongoose = require("mongoose");

const PlantDiseaseSchema = new mongoose.Schema({

    plant_id:{
        type:String,
        required:true
    },
    Checked_start_date:{
        type:String,
        require:true,
    },
    Checked_Current_date:{
        type:String,
        require:true,
    },

    // first_Day_Disease_affected_area:{
    //     type:String,
    //     required:true
    // },
    // Current_Day_Disease_affected_area:{
    //     type:String,
    //     required:true
    // },
    first_disease_affected_percentage:{
        type:String,
        required:true
    },
    Current_disease_affected_percentage:{
        type:String,
        required:true
    },
    disease_Name:{
        type:String,
        required:true,
    },
    
})

module.exports=mongoose.model('PlantDisease',PlantDiseaseSchema)
