//Dreams & Meaning routes

//reference express
const express = require('express');
const router = express.Router();
// router.use(express.json());

//reference authorizations
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secretKey = require('../config/keys').secretOrKey;

//import schemas/models
const DreamCollection = require('../models/DreamSchema');
const DreamerCollection = require('../models/DreamerSchema');
const MeaningCollection = require('../models/MeaningSchema');
const LinkCollection = require('../models/LinkSchema');

/////////////////////////////////////////////////////////////////////
//    Dreams
/////////////////////////////////////////////////////////////////////

//Create a dream & relate to dreamer
router.put('/dream/relate/:email', async (req, res) => {

  let dream,
    dreamer;

  await DreamCollection.create(req.body, (errors, results1) => {
    errors ? res.json(errors) : dream = results1;

    DreamerCollection.findOne({
      email: req.params.email
    }, (errors, results2) => {
      errors ? res.json(errors) : dreamer = results2;

      dream.dreamer.push(dreamer._id)
      dream.save();
      dreamer.dreams.push(dream._id);
      dreamer.save();
      res.send(dream);
    });
  })
})

// Create a dream
router.post('/dream', (req, res) => {
  DreamCollection.create(req.body, (errors, results) => {
    errors ? res.send(errors) : res.send(results);
  })
})

//View one dream by id
router.get('/dream/view/:id', (req, res) => {
  console.log(`Viewing Dream`);
  // res.send(`Viewing Dream`);
  DreamCollection.findOne({
    _id: req.params.id
  }, (errors, results) => {
    errors ? res.json(errors) : res.send(results);
  }).populate("dreamer");
})

//Edit dream by id
router.put('/dream/:id', (req, res) => {
  console.log(`Editing Dream`);
  // res.send(`Editing Dream`);
  DreamCollection.findOneAndUpdate({
    _id: req.params.id
  }, req.body, {
    new: true
  }, (errors, results) => {
    errors ? res.send(errors) : res.send(results);
  })
})

//Delete dream by id from dream collection & then find the dream inside of the dreamers collection and delete it from their dream array
router.delete('/dream/:id', async(req, res) => {
  console.log(`Deleting Dream`);
  // res.send(`Deleting Dream`);
  let dream,dreamer;
   await DreamCollection.findOneAndDelete({
    _id: req.params.id
  }, (errors, results) => {
    errors ? res.send(errors) : dream=results;
  })
  DreamerCollection.findOne({dreams: req.params.id},(errors,results) => {
    errors ? res.send(errors): dreamer = results;

    dreamer.dreams.splice(dreamer.dreams.indexOf(req.params.id), 1);
    res.send(dreamer);
  })
})

//View all dreams
router.get('/dreams', (req, res) => {
  console.log(`Viewing all Dreams`);
  // res.send(`Viewing all Dreams`);
  DreamCollection.find({}, (errors, results) => {
    errors ? res.send(errors) : res.send(results);
  }).populate('dreamer')
})

//View all dreams by dreamers id
router.get('/dreams/:id', (req, res) => {
  console.log(`Viewing all Dreams`);
  // res.send(`Viewing all Dreams`);
  DreamCollection.find({
    dreamer: req.params.id
  }, (errors, results) => {
    errors ? res.send(errors) : res.send(results);
  }).populate('dreams')
    .populate('dreamer')
})

/////////////////////////////////////////////////////////////////////
//    Meanings
/////////////////////////////////////////////////////////////////////

// Create a meaning
router.post('/meanings',(req,res) => {
  console.log(`Meaning created!`);
  // res.send(`Meaning created!`);
  MeaningCollection.create(req.body,(errors,results) => {
    errors ? res.send(errors) : res.send(results);
  })
})

// View one meaning by id
router.get('/meanings/one/:id',(req,res) => {
  console.log(`Viewing one meaning!`);
  // res.send(`Viewing one meaning!`);
  MeaningCollection.findOne({_id:req.params.id},(errors,results) => {
    errors ? res.send(errors) : res.send(results);
  })
})

// Update one meaning by id
router.put('/meanings/:id',(req,res) => {
  console.log(`Updating one meaning!`);
  // res.send(`Updating one Meaning!`);
  MeaningCollection.findOneAndUpdate({_id:req.params.id},req.body, {new:true}, (errors,results) => {
    errors ? res.send(errors) : res.send(results);
  })
})

// Delete one meaning
router.delete('/meanings/:id',(req,res) => {
  console.log(`Deleting one meaning!`);
  // res.send(`Deleting one Meaning!`);
  MeaningCollection.findOneAndDelete({_id:req.params.id}, (errors,results) => {
    errors ? res.send(errors) : res.send(results);
  })
})

// View all meanings
router.get('/meanings',(req,res) => {
  console.log(`Viewing all meanings!`);
  // res.send(`Viewing all meanings!`);
  MeaningCollection.find({},(errors,results) => {
    errors ? res.send(errors) : res.send(results);
  })
})

// View all meanings by letter
router.get('/meanings/view/:letter',(req,res) => {
  console.log(`Viewing all meanings by letter!`);
  // res.send(`Viewing all meanings by letter!`);
  MeaningCollection.find({letter:req.params.letter},(errors,results) => {
    errors ? res.send(errors) : res.send(results);
  })
})

// View one meaning by name/ for customer searchbar
router.get('/meanings/word/:word',(req,res) => {
  console.log(`Viewing all meanings by letter!`);
  // res.send(`Viewing all meanings by letter!`);
  MeaningCollection.findOne({word:req.params.word},(errors,results) => {
    errors ? res.send(errors) : res.send(results);
  })
})


/////////////////////////////////////////////////////////////////////
//      Tips, Tricks, & Tellings / Links
/////////////////////////////////////////////////////////////////////

//Create a link
router.post('/links',(req,res) => {
  console.log('Link created');
  // res.send('Link created');
  LinkCollection.create(req.body, (errors,results) => {
    errors ? res.send(errors) : res.send(results);
  })
})

//Read one link bgy id
router.get('/links/:id',(req,res) => {
  console.log('Viewing one link');
  // res.send('Viewing one link');
  LinkCollection.findOne({_id:req.params.id}, (errors,results) => {
    errors ? res.send(errors) : res.send(results);
  })
})

//Update a link by id
router.put('/links/:id',(req,res) => {
  console.log('Updating one link');
  // res.send('Updating one link');
  LinkCollection.findOneAndUpdate({_id:req.params.id}, req.body, {new:true}, (errors,results) => {
    errors ? res.send(errors) : res.send(results);
  })
})

//Delete a link by id
router.delete('/links/:id',(req,res) => {
  console.log('Deleting link');
  // res.send('Deleting link');
  LinkCollection.findOneAndDelete({_id:req.params.id}, (errors,results) => {
    errors ? res.send(errors) : res.send(results);
  })
})

//View all links
router.get('/links',(req,res) => {
  console.log('Viewing all links');
  // res.send('Viewing all links');
  LinkCollection.find({}, (errors,results) => {
    errors ? res.send(errors) : res.send(results);
  })
})

/////////////////////////////////////////////////////////////////////
//      Platfrom
/////////////////////////////////////////////////////////////////////
//View all dreams with a flagged platform
router.get('/dreams/all/true', (req, res) => {
  console.log(`Viewing all posted Dreams`);
  res.send(`Viewing all posted Dreams`);
  // DreamCollection.find({
  //   platform: "true"
  // }, (errors, results) => {
  //   errors ? res.send(errors) : res.send(results);
  // }).populate('dreams')
  //   .populate('dreamer')
})


/////////////////////////////////////////////////////////////////////
//      Spotlight
/////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////
//      Authentication Token Route
/////////////////////////////////////////////////////////////////////

//AUthorize route middleware
function authenticateToken(req,res,next){
  //pull encrypted token from header
  let header = req.heqaders["authorization"];
  //if token passed in to header
  if(header){
    //pull encrypted token from bearer token
    token = header.split(" ")[1];
    //decrypt and verify token is valid
    jwt.verify(token,secretKey, (errors,results) => {
      //if errors 
      if(errors){
        //send errors
        res.status(500).json({
          error:errorsa
        });
      } //if there are no errors
      else {
        //set property of request to decrypted token
        req.user = results;
        //continue with functionality of route calling
        next();
      }
    })
  }
  //if token is not passed into the header
  else{
    //send forbidden message
    res.status(403).json({
      error: "PLease sign in to access this page",
    });
  }
}


//Export Routes
module.exports = router;