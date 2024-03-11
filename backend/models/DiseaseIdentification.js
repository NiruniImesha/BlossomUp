const mongoose = require("mongoose");

const DiseaseIdentificationSchema = new mongoose.Schema({

    plant_id:{
        type:String,
        required:true
    },
    image_path:{
        type:String,
        required:true,
    },
    identification_date:{
        type:String,
        require:true,
    },
    identification_Time:{
        type:String,
        require:true,
    },
    selected_desise:{
        type:String,
        enum:["Selected" , "NotSelected"],
        required:true,
    },
    PredictedClass:{
        type:String,
        required:true
    },
    disease_Name: {
        type:mongoose.Schema.Types.ObjectId,
         ref:"OrchidDisease" 
        
    },
    Confidence:{
        type:String,
        required:true,
    },
    
})

module.exports=mongoose.model('DiseaseIdentification',DiseaseIdentificationSchema)
