const express = require('express')
const { default: mongoose } = require('mongoose')
const router = express.Router()
const OrchidDiseaseSchema = require("../models/OrchidDisease")

router.get("/get-OrchidDisease" , async(req,res)=>{
    let OrchidD = OrchidDiseaseSchema.find({} , function(err , OrchidD){
        if(err){
            res.json({msg:err})
        }else{
            res.json({OrchidD})
        }
    })
})

router.post("/add-OrchidDisease" , async(req,res)=>{
//   console.log(req.body)
var disease_Name = req.body.disease_Name;
var Medicine_01 = req.body.Medicine_01;
var Medicine_02 = req.body.Medicine_02;
var description = req.body.description;
var Create_date = req.body.Create_date;
var create_user = req.body.create_user;

var newOrchidDisease = new OrchidDiseaseSchema({
    disease_Name:disease_Name,
    Medicine_01:Medicine_01,
    Medicine_02:Medicine_02,
    description:description,
    Create_date:Create_date,
    create_user:create_user,
    
})

newOrchidDisease.save(function(err,result){
    if(err){
        res.json({msg:err})
    }else{
        res.json({msg:"Completed"})
    }
})

})

module.exports = router;