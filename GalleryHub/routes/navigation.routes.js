const express = require("express");
const router = express.Router();

// GET /navigations/collections
router.get("/collections", (req, res) => {
  res.render("navigation/collections");
});

// GET /navigation/creators
router.get("/creators", (req, res) => {
    console.log('here')
  res.render("navigation/creators");
});


// GET /navigation/favourites
router.get("/favourites", (req, res) => {
  res.render("navigation/favourites");
});


// GET /navigation/follows
router.get("/follows", (req, res) => {
  res.render("navigation/follows");
});



module.exports = router;