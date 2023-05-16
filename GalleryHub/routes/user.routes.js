const express = require("express");
const router = express.Router();
//Require Mongoose
const mongoose = require('mongoose')
//Connect to the Database
const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/GalleryHub";


const User = require("../models/User.model");

// GET /profile/
router.get("/profile/:id", (req, res) => {
    const {id} = req.params.id
    console.log('req.session',req.session)
    async function getUserDetails (){
        try {
            const user = await User.findById({id})
            console.log('user',user)
            res.render("user/user-profile", {user});
        }
        catch(error){
            console.log(error);
            res.redirect('/auth/signup')
        }

    }
    getUserDetails();
    
  
});



module.exports = router;