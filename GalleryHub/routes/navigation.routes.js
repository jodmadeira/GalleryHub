const express = require("express");
const router = express.Router();

//Require models
const User = require("../models/User.model");
const Collection = require("../models/Collection.model");
const Item = require("../models/Item.model");
const fileUploader = require('../config/cloudinary.config.js');

// GET /navigations/collections
router.get('/collections', async (req, res) => {
  try {
    const foundCollections = await Collection.find();
    res.render('navigation/collections', { collections: foundCollections });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

// GET new collection
router.get('/create', (req,res)=>{
  console.log('there')
    res.render('navigation/collectionscreate');
});

// POST new collection
router.post('/create', fileUploader.single('collection-image'),(req,res)=>{
    const {title, shortDescription} = req.body;
  console.log('here')
    async function createCollectionInDb(){
        try{
            await Collection.create({title, shortDescription, coverImgSrc: req.file.path});
            console.log('Collection created successfully');
            res.redirect('/collections');
        } 
        catch(error){
            console.log(error);
        }
    }

    createCollectionInDb();
});

// GET /collections by creator ID
router.get('/collections/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const creator = await User.findById(id);
    let ownedCollections = creator.ownedCollections;
    let foundCollections = [];
    for (const collection of ownedCollections) {

      let foundCollection = await Collection.find({_id: collection});
      console.log(foundCollection);
      foundCollections.push(foundCollection[0]);
    }
    console.log(foundCollections);
    res.render('navigation/collections', { collections: foundCollections });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

// GET /navigation/creators
router.get('/creators', async (req, res) => {
  try {
    const foundCreators = await User.find({isCreator:true});
    res.render('navigation/creators', { creators: foundCreators });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

// GET /navigation/Items
router.get('/items/:id', async (req, res) => {
  const {id} = req.params;
  //console.log(id);
  try {
    const collection = await Collection.findById(id);
    //console.log(collection);
    let collectionItems = collection.collectionItems;
    let foundItems = [];
    for (const item of collectionItems) {
      let foundItem = await Item.find({id: item});
      foundItems.push(foundItem[0]);
    }
    console.log(foundItems);
    res.render('navigation/items', { items: foundItems });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});


// GET new Item
router.get('/create/item', (req,res)=>{
  console.log('there')
    res.render('navigation/itemscreate');
});

// POST new Item
router.post('/create/item', fileUploader.single('item-image'),(req,res)=>{
    const {title, description} = req.body;
  console.log('here')
    async function createItemInDb(){
        try{
            await User.create({title, description, itemSrc: req.file.path});
            console.log('Items created successfully');
            res.redirect('/items');
        } 
        catch(error){
            console.log(error);
        }
    }

    createItemInDb();
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