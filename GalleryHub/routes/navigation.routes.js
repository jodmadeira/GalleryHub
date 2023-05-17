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
    const currentUser = req.session.currentUser._id
  console.log('here')
    async function createCollectionInDb(){
        try{
           const newCollection = await Collection.create({title, shortDescription, coverImgSrc: req.file.path});
            await Collection.findByIdAndUpdate(newCollection._id, { $push: {ownerId: currentUser}})
            await User.findByIdAndUpdate(currentUser, {isCreator: true})
            await User.findByIdAndUpdate(currentUser, {$push: {ownedCollections: newCollection._id}})
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
    const collection = await Collection.findById(id).populate('collectionItems');
    console.log(collection);
    res.render('navigation/items', { collection });
  } catch (error) {
    console.log(error);
  }
});


// GET new Item
router.get('/create/item/:id', async (req,res)=>{
  const {id} = req.params
  try {
    let collection = await Collection.findById(id)
     res.render('navigation/itemscreate', {collection});
  } catch (error) {
    console.log(error)
  }
});

// POST new Item
router.post('/create/item/:id', fileUploader.single('item-image'),(req,res)=>{
    const {title, description} = req.body;
    const {id} = req.params;
    if(req.file){
        async function createItemInDb(){
            try{
                const newItem = await Item.create({title, description, itemSrc: req.file.path});
                await Item.findByIdAndUpdate(newItem._id, { $push: {collectionId: id}})
                await Collection.findByIdAndUpdate(id, {$push: {collectionItems: newItem._id}})
                console.log('Items created successfully');
                res.redirect(`/items/${id}`);
            } 
            catch(error){
                console.log(error);
            }
        }
        createItemInDb();
    } else {
        console.log('No file was uploaded');
        res.redirect('/create/item');
    }
});

// POST route to delete an item from the database

router.post('/delete/item/:id', (req, res) => {
  const {id} = req.params
async function deleteItem(){
  try {
    const item = await Item.findById(id);
    const collectionId = item.collectionId
    
    const deletedItem = await Item.findByIdAndDelete(id);
    if (!deletedItem) {
      res.status(404).send('Item not found');
      return;
    }

    console.log(`Item ${id} deleted`);
    res.redirect(`/items/${collectionId}`);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error');
  }
}
deleteItem();
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