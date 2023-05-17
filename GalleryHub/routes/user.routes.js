const express = require("express");
const router = express.Router();
//Require Mongoose
const mongoose = require('mongoose')
//Connect to the Database
const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/GalleryHub";

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

const User = require("../models/User.model");
const Collection = require("../models/Collection.model");
const fileUploader = require('../config/cloudinary.config.js');


// GET /profile/
router.get("/profile", isLoggedIn,(req, res) => {
    
    async function getUserDetails (){
        try {
            const userId = req.session.currentUser._id
            const user = await User.findById(userId)
            const userCollectionsId = user.ownedCollections
            if(userCollectionsId==undefined){
                let collectionTitles=['No collections yet']
                res.render("user/userProfile", {user, collectionTitles});
            }
            else{
            let collectionTitles=[];
            for(let i=0;i<userCollectionsId.length;i++){
                let collection = await Collection.findById(userCollectionsId[i])
                collectionTitles.push(collection.title)
            }
            res.render("user/userProfile", {user, collectionTitles});
            }
        }
        catch(error){
            console.log(error);
            res.redirect('/auth/signup')
        }
    }
    getUserDetails();
});



router.get("/profile/update", isLoggedIn, (req, res) => {
    const userId = req.session.currentUser._id;

    async function getUserDetails (){
        try {
            const user = await User.findById(userId)
            res.render("user/userUpdate", {user});
        }
        catch(error){
            console.log(error);
            res.redirect('/profile')}}
    getUserDetails();
})

router.post("/profile/update", fileUploader.single('imgSrc') ,(req, res) => {
    const userId = req.session.currentUser._id
    const {name, email, bio} = req.body

    async function updateUser() {
    try {
        const updateUserInfo = await User.findByIdAndUpdate(userId,{name, email, imgSrc:req.file.path, bio})
        
        res.redirect('/profile')       
    } catch (error) {
        console.log(error)        
    }
    };
    updateUser();
})

module.exports = router;