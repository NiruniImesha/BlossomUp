const express = require('express')
const { default: mongoose } = require('mongoose')
const router = express.Router()
const DiseaseIdentificationSchema = require("../models/DiseaseIdentification")
const OrchidDiseaseSchema = require("../models/OrchidDisease")
// router.get("/get-Disease-Identification" , async(req,res)=>{
//     let DiseaseI = await DiseaseIdentificationSchema.find({}.populate('PredictedClass'),function(err , DiseaseI){
//     //let DiseaseI = DiseaseIdentificationSchema.find({} , function(err , DiseaseI){
//         if(err){
//             res.json({msg:err})
//         }else{
//             res.json({DiseaseI})
//         }
//     })
// })
router.get("/get-Disease-Identification", async (req, res) => {
    try {
      let DiseaseI = await DiseaseIdentificationSchema.find({}).populate('disease_Name');
      res.json({ DiseaseI });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  });

//   router.get("/get-Disease-Identification" , async(req,res)=>{
//     // let employees = EmploeeSchema.find({} , function(err , result){
//     //     if(err){
//     //         res.json({msg:err})
//     //     }else{
//     //         res.json({result})
//     //     }
//     // })
//     let DiseaseI = await DiseaseIdentificationSchema.find({}).populate('disease_Name')
//     res.json({DiseaseI})
// })

// router.get("/get-Disease-Identification", async (req, res) => {
//     try {
//       let DiseaseI = await DiseaseIdentificationSchema.find({})
//         .populate({
//           path: 'PredictedClass',
//           model: OrchidDiseaseSchema, // Specify the OrchidDisease model
//           select: 'Fertilizer_01', // Select only the Fertilizer_01 field
//         });
  
//       res.json({ DiseaseI });
//     } catch (err) {
//       res.status(500).json({ msg: err.message });
//     }
//   });
  

router.post("/add-Disease-Identification" , async(req,res)=>{
//   console.log(req.body)
var plant_id = req.body.plant_id;
var image_path = req.body.image_path;
var identification_date = req.body.identification_date;
var identification_Time = req.body.identification_Time;
var selected_desise = req.body.selected_desise;
var PredictedClass = req.body.PredictedClass;
var Confidence = req.body.Confidence;

var newDiseaseIdentification = new DiseaseIdentificationSchema({
    plant_id:plant_id,
    image_path:image_path,
    identification_date:identification_date,
    identification_Time:identification_Time,
    selected_desise:selected_desise,
    PredictedClass:PredictedClass,
    Confidence:Confidence,
    
})

newDiseaseIdentification.save(function(err,result){
    if(err){
        res.json({msg:err})
    }else{
        res.json({msg:"Completed"})
    }
})

})

module.exports = router;