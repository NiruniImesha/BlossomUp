const express = require('express')
const { default: mongoose } = require('mongoose')
const router = express.Router()
const UserSchema = require("../models/User")
const User = require("../models/User");

router.get("/get-User" , async(req,res)=>{
    let User = UserSchema.find({} , function(err , User){
        if(err){
            res.json({msg:err})
        }else{
            res.json({User})
        }
    })
})

router.post("/add-User" , async(req,res)=>{
//   console.log(req.body)
var User_id = req.body.User_id;
var User_Name = req.body.User_Name;
var User_Password = req.body.User_Password;
var User_Status = req.body.User_Status;
var is_InActive = req.body.is_InActive;

var newUser = new UserSchema({
    User_id:User_id,
    User_Name:User_Name,
    User_Password:User_Password,
    User_Status:User_Status,
    is_InActive:is_InActive,
    
})

newUser.save(function(err,result){
    if(err){
        res.json({msg:err})
    }else{
        res.json({msg:"Completed"})
    }
})

})

router.post('/login', async (req, res) => {
    const { User_Name, User_Password } = req.body;

    try {
        const user = await User.findOne({ User_Name, User_Password });
        if (user) {
            // If user is found, respond with a success message and user details
            res.json({ msg: 'Login successful', user, User_Status: user.User_Status ,is_InActive: user.is_InActive });
        } else {
            // If user is not found, respond with an error message
            res.status(401).json({ msg: 'Invalid credentials' });
        }
    } catch (error) {
        // If any error occurs during the process, respond with a server error
        res.status(500).json({ msg: 'Server error' });
    }
});


module.exports = router;