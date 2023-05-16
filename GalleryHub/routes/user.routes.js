const express = require("express");
const router = express.Router();
//Require Mongoose
const mongoose = require('mongoose')
//Connect to the Database
const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/GalleryHub";


const User = require("../models/User.model");

// GET /profile/
router.get("/profile", (req, res) => {
    const userId = req.session.currentUser._id
    
    
    console.log({userId});
     
    //console.log(userId);
    //console.log('REQ.PARAMS',req.params);
    //console.log('req.session',req.session);
    async function getUserDetails (){
        try {
            const user = await User.findById(userId)
            console.log('user',user)
            res.render("user/userProfile", {user});
        }
        catch(error){
            console.log(error);
            res.redirect('/auth/signup')
        }

    }
    getUserDetails();
    
  
});



router.get("/profile/update", (req, res) => {
    const userId = req.session.currentUser._id;

    async function getUserDetails (){
        try {
            const user = await User.findById(userId)
            //console.log('user',user)
            res.render("user/userUpdate", {user});
        }
        catch(error){
            console.log(error);
            res.redirect('/profile')}}
    getUserDetails();
})

router.post("/profile/update", (req, res) => {
    
    async function updateUser() {
    try {
        
        res.redirect('/')       
    } catch (error) {
        console.log(error)        
    }
    };
    updateUser();
})

module.exports = router;