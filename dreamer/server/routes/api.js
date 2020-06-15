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

//Delete dream by id
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

//View all dreams by dreamer
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

//Export Routes
module.exports = router;