//Require Mongoose
const mongoose = require('mongoose')

//Require Models
const User = require("../models/User.model");
const Collection = require("../models/Collection.model");
const Item = require("../models/Item.model");

//Connect to the Database
const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/GalleryHub";


const users = [
    {
        name: 'Nicolas Cage',
        email: 'nicolas@cage.com',
        password: 'Username1!',
        id:'Nicolas#0001',
        isCreator:true,
        bio: 'Most successful actor of our lifetime',
        imgSrc: 'https://th.bing.com/th/id/R.15efd14af5178d109451151b22a9fb2c?rik=ATqM1tdEzdMQEQ&riu=http%3a%2f%2flistabuzz.com%2fwp-content%2fuploads%2f2015%2f09%2fnicolas-cage-con-air-1024x545.png&ehk=XnY7lYmI2jxtLfy%2fwz%2bCEti9lJ%2bLS%2bnCBkICanZ7op0%3d&risl=&pid=ImgRaw&r=0',
        ownedCollections:['Coll#0001','Coll#0003'],
        follows: [], //The user follows
        favourites: ['Coll#0002'],
        following: ['Joao#0002',] 
    },
    {
        name: 'Joao Madeira',
        email: 'joao@madeira.com',
        password: 'Username1!',
        id:'Joao#0002',
        isCreator:false,
        bio: 'Ironhack student, climber and gamer',
        ownedCollections:[],
        follows: ['Nicolas#0001','Joao#0004'], //The user follows
        favourites: ['Coll#0001','Coll#0002','Coll#0003'],
        following: [] 
    },
    {
        name: 'Bernardo Melo',
        email: 'bernardo@melo.com',
        password: 'Username1!',
        id:'Bernardo#0003',
        isCreator:false,
        bio: 'Ironhack teacher, dev God and cinema guru',
        ownedCollections:[],
        follows: ['Joao#0004'], //The user follows
        favourites: ['Coll#0001'],
        following: [] 
    },
    {
        name: 'Joao Gonçalves',
        email: 'joao@goncalves.com',
        password: 'Username1!',
        id:'Joao#0004',
        isCreator:true,
        bio: 'Tesla car designer, gaming tattoos collector',
        ownedCollections:['Coll#0002'],
        follows: [], //The user follows
        favourites: [],
        following: ['Bernardo#0003', 'Joao#0002'] 
    }];

const collections = [
    {
        ownerId: 'Nicolas#0001',
        id: 'Coll#0001',
        title: 'Nicolas Cage Best Movies',
        coverImgSrc: 'https://th.bing.com/th/id/OIP.0B1aSUtekHUtHCRSU1IOTwHaE7?w=236&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',
        shortDescription: 'A collection of some of the best Nicolas Cage movies, that show us his true capabilities as an actor',
        collectionItems:['item#0001','item#0002','item#0003'],
        favourites:['Nicolas#0001','Joao#0002','Bernardo#0003'],
    },
    {
        ownerId: 'Joao#0004',
        id: 'Coll#0002',
        title: 'Car Blueprints',
        coverImgSrc: 'https://th.bing.com/th/id/R.67b12538bbf629909f7a3c57cad15f45?rik=DKtCTd4g0mfaTw&riu=http%3a%2f%2fclipart-library.com%2fnewhp%2f289-2895282_blueprints-clipart-transparent-background.png&ehk=%2f1Yadof%2bI6fV2CAOMZ5SkBdnr7%2bwNSSqleZ5hYR7Ff0%3d&risl=&pid=ImgRaw&r=0',
        shortDescription: 'A collection of some of the best Nicolas Cage movies, that show us his true capabilities as an actor',
        collectionItems:['item#0004','item#0005'],
        favourites:['Nicolas#0001','Bernardo#0003'],
    },
    {
        ownerId: 'Nicolas#0001',
        id: 'Coll#0003',
        title: 'Nicolas Cage Worst Movies',
        coverImgSrc: 'https://th.bing.com/th/id/OIP.0B1aSUtekHUtHCRSU1IOTwHaE7?w=236&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',
        shortDescription: 'A collection of some of the best Nicolas Cage movies, that show us his true capabilities as an actor',
        collectionItems:['item#0006','item#0007'],
        favourites:['Joao#0002'],
    },
];

const items = [
    {
        collectionId:'Coll#0001',
        id: 'item#0001',
        title: 'National Treasure',
        itemSrc: 'https://upload.wikimedia.org/wikipedia/en/1/12/Movie_national_treasure.JPG',
        description: 'National Treasure is a 2004 American action-adventure heist film released by Walt Disney Pictures'
    },
    {
        collectionId:'Coll#0001',
        id: 'item#0002',
        title: 'National Treasure: Book of Secrets',
        itemSrc: 'https://upload.wikimedia.org/wikipedia/en/8/80/Book_of_secrets_post.jpg',
        description: 'National Treasure: Book of Secrets is a 2007 American action-adventure film directed by Jon Turteltaub and produced by Jerry Bruckheimer. It is a sequel to the 2004 film National Treasure and is the second film of the National Treasure franchise.'
    },
    {
        collectionId:'Coll#0001',
        id: 'item#0003',
        title: 'National Treasure: Book of Secrets',
        itemSrc: 'https://upload.wikimedia.org/wikipedia/en/8/87/The_Unbearable_Weight_of_Massive_Talent.jpg',
        description: 'National Treasure: Book of Secrets is a 2007 American action-adventure film directed by Jon Turteltaub and produced by Jerry Bruckheimer. It is a sequel to the 2004 film National Treasure and is the second film of the National Treasure franchise.'
    
    },
    {
        collectionId:'Coll#0002',
        id: 'item#0004',
        title: 'RedBull F1 Rocketship',
        itemSrc: 'https://getoutlines.com/blueprints/car/dallara/dallara-gp208.png',
        description: 'The blueprint for the 2023 season RedBull F1 car. May have leaked it to Aston MArtin too.'
    },
    {
        collectionId:'Coll#0002',
        id: 'item#0005',
        title: 'Mars Weekend Getaway',
        itemSrc: 'https://i.pinimg.com/originals/41/41/de/4141de6b46a63245eddecc6a764ec92b.jpg',
        description: 'Schematics for my new projet that Im building in my garage, so that I can go to Mars for the weekend.'
    },
    {
        collectionId:'Coll#0003',
        id: 'item#0006',
        title: 'Kill Chain',
        itemSrc: 'https://upload.wikimedia.org/wikipedia/en/8/88/Kill_Chain_%28film%29_poster.jpg',
        description: 'Kill Chain is a 2019 American neo-noir crime thriller film written and directed by Ken Sanzel. The film stars Nicolas Cage.'
    },
    {
        collectionId:'Coll#0003',
        id: 'item#0007',
        title: 'Mom and Dad',
        itemSrc: 'https://upload.wikimedia.org/wikipedia/en/1/18/Mom_and_Dad_%282017_film%29.png',
        description: 'Mom and Dad is a 2017 comedy horror film written and directed by Brian Taylor. Starring Nicolas Cage and Selma Blair, the film premiered at the 2017 Toronto International Film Festival, and was theatrically released on January 19, 2018 by Momentum Pictures'
    }
];

async function seeds() {
    try {
        const x = await mongoose.connect(MONGO_URI);
        console.log(`Connected to: ${x.connections[0].name}`);
    
        const createdUsers = await User.create(users);
        //const createdCollections = await Collection.create(collections);
        //const createdItems = await Item.create(items);

    
        console.log(`Successfuly created ${createdUsers.length} users`);
    
        x.disconnect();
    } catch (error) {
        console.log(error);
    }
};

//Call the function to create the users
seeds();