const express = require("express");
const router = express.Router();

//Require models
const User = require("../models/User.model");
const Collection = require("../models/Collection.model");
const Item = require("../models/Item.model");
const fileUploader = require('../config/cloudinary.config.js');
const isLoggedIn = require("../middleware/isLoggedIn");

// GET /navigations/collections
router.get('/collections', async (req, res) => {
  try {
    const foundCollections = await Collection.find();
    if (req.session.currentUser){
      res.render('navigation/collections', {user: req.session.currentUser, collections: foundCollections });
    }else{
      res.render('navigation/collections', { collections: foundCollections });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});


// GET new collection
router.get('/create', (req,res)=>{
    res.render('navigation/collectionscreate');
});

// POST new collection
router.post('/create', isLoggedIn, fileUploader.single('collection-image'),(req,res)=>{
    const {title, shortDescription} = req.body;
    const currentUser = req.session.currentUser._id
    async function createCollectionInDb(){
        try{
           const newCollection = await Collection.create({title, shortDescription, coverImgSrc: req.file.path, ownerId:currentUser });
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

// POST route to delete an collection from the database

router.post('/delete/collection/:id', isLoggedIn, (req, res) => {
  const {id} = req.params

async function deleteCollection(){
  try {
    //Find Items Ids that belong to the collection and use for loop to delete them
    //Save userId to update user status if necessary later
    const collection = await Collection.findById(id);
    const userId = collection.ownerId;
    
    const itemsId = collection.collectionItems;
    for(let i=0;i<itemsId.length;i++){
      await Item.findByIdAndDelete(itemsId[i])
    };
   
    // Delete collection after respective items have been deleted
    const deletedCollection = await Collection.findByIdAndDelete(id);
    
    // Delete collection ID from user ownedCollections array
    let user = await User.findById(userId);
    const userCollections = user.ownedCollections;
    userCollections.splice(userCollections.indexOf(id),1);
    user = await User.findByIdAndUpdate(userId, {ownedCollections: userCollections});
    
    // Now we'll check if there are collections remaining for the Creator. If not, we'll change the isCreator to FALSE
    user = await User.findById(userId);
    const currentCollections = user.ownedCollections
    if(!currentCollections.length){
      await User.findByIdAndUpdate(userId,{isCreator: false})
    };
    
    if (!deletedCollection) {
      res.status(404).send('Collection not found');
      return;
    }
    console.log(`Collection ${id} deleted`);
    res.redirect("/collections");
  } catch (error) {
    console.log(error);
    res.status(500).send('Error');
  }
}
deleteCollection();
});

// GET route to display the form for updating a specific collection
router.get("/edit/collection/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const collection = await Collection.findById(id);
    res.render("navigation/collectionsedit", { collection });
  } catch (error) {
    console.log(error);
    res.redirect('/collection');
  }
});

// POST route to actually update a specific collection
router.post('/edit/collection/:id', isLoggedIn, async (req, res)=>{
    const id = req.params.id;
    const {title, shortDescription, coverImgSrc} = req.body;

    try {
        const updatedCollection = await Collection.findByIdAndUpdate(id, {title, shortDescription, coverImgSrc}, {new: true});
        res.redirect(`/collection/${id}`);
    } catch(error) {
        console.log(error);
        res.redirect(`/collection/${id}`);
    }
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
      foundCollections.push(foundCollection[0]);
    }
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
    let updatedCreators =[];
   
    for (const creator of foundCreators) {
      try {
        let creatorCollections = creator.ownedCollections;
        let newArr=[];
        
                  for (let i = 0; i < creatorCollections.length; i++) {
                    try {
                      const collectionId = creatorCollections[i];
                      const collection = await Collection.findById(collectionId);
                      newArr.push(collection.title);
                    } 
                    catch (error) {console.log('Erro no alteração de Id por title',error)}
                  } 
        creatorCollections = newArr;
        console.log(creatorCollections)
        console.log('before',creator.ownedCollections);
        creator.ownedCollections = creatorCollections
        console.log('after',creator.ownedCollections);
        updatedCreators.push(creator)
        //console.log('creator after change', creatorCollections);
      } catch (error) {
        console.log(error);
      }
    }
    console.log(updatedCreators)
    res.render('navigation/creators', { creators: foundCreators });
    }
    catch(error){
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
router.post('/create/item/:id', isLoggedIn, fileUploader.single('item-image'),(req,res)=>{
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

router.post('/delete/item/:id', isLoggedIn, (req, res) => {
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


// GET new favourite
router.get('/favourites', isLoggedIn ,async (req, res) => {
  const currentUser = req.session.currentUser._id;

  try {
    // Buscar a lista de favoritos do usuário atual e renderizar a página de favoritos
    const user = await User.findById(currentUser).populate('favourites');

    res.render('navigation/favourites', { favourites: user.favourites });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching favourites');
  }
});

// POST new favourites
router.post('/favourites/:id', isLoggedIn, async (req, res) => {
  const currentUser = req.session.currentUser._id;
  const collectionId = req.params.id;
  try {
    user = await User.findById(currentUser);
    collection = await Collection.findById(collectionId);

    // Adicionar o ID da coleção aos favoritos do usuário atual
    if(user.favourites.indexOf(collectionId)<0){
      await User.findByIdAndUpdate(currentUser, { $push: { favourites: collectionId } });
    } // Remover o ID da coleção dos favoritos do usuário atual
    else if(user.favourites.indexOf(collectionId)>=0){
      await User.findByIdAndUpdate(currentUser, { $pull: { favourites: collectionId } });
    }

    // Adicionar o ID do usuário aos favoritos da coleção
    if(collection.favourites.indexOf(currentUser)<0){
      await Collection.findByIdAndUpdate(collectionId, { $push: { favourites: currentUser } });
    } // Remover o ID do usuário dos favoritos da coleção
    else if(collection.favourites.indexOf(currentUser)>=0){
      await Collection.findByIdAndUpdate(collectionId, { $pull: { favourites: currentUser } });
    }
    res.redirect('/collections');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error creating favourite');
  }
});

module.exports = router;