const express = require('express')
const { default: mongoose } = require('mongoose')
const router = express.Router()
const PlantDiseaseSchema = require("../models/PlantDisease")

router.get("/get-PlantDisease" , async(req,res)=>{
    let PDisease = PlantDiseaseSchema.find({} , function(err , PDisease){
        if(err){
            res.json({msg:err})
        }else{
            res.json({PDisease})
        }
    })
})

router.post("/add-PlantDisease" , async(req,res)=>{
//   console.log(req.body)
var plant_id = req.body.plant_id;
var Checked_date = req.body.Checked_date;
var Disease_affected_area = req.body.Disease_affected_area;
var Last_disease_affected_percentage = req.body.Last_disease_affected_percentage;
var Current_disease_affected_percentage = req.body.Current_disease_affected_percentage;
var Disease_affected_area = req.body.Disease_affected_area;
var disease_Name = req.body.disease_Name;

var newPlantDisease = new PlantDiseaseSchema({
    plant_id:plant_id,
    Checked_date:Checked_date,
    Disease_affected_area:Disease_affected_area,
    Last_disease_affected_percentage:Last_disease_affected_percentage,
    Current_disease_affected_percentage:Current_disease_affected_percentage,
    Disease_affected_area:Disease_affected_area,
    disease_Name:disease_Name,
    
})

newPlantDisease.save(function(err,result){
    if(err){
        res.json({msg:err})
    }else{
        res.json({msg:"Completed"})
    }
})

})


module.exports = router;