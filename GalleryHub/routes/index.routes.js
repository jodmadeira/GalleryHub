const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* GET Collections page */
router.get("/collections", (req, res, next) => {
  res.render("user/collections");
});

/* GET Creators page */
router.get("/creators", (req, res, next) => {
  res.render("user/creators");
});



module.exports = router;
