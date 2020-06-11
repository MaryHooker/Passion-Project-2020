//Dreamers/users routes

//reference express
const express = require('express');
const router = express.Router();
router.use(express.json());

//reference authorizations
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secretKey = require('../config/keys').secretOrKey;

//import schema
let DreamerCollection = require('../models/DreamerSchema');

//sanity
router.get('/test',(req,res)=> {
    console.log('Dreaming');
    res.send('Dreaming');
})

// Register dreamer/user


// Login dreamer/user/admin


// View all dreamers/users


// View specific dreamer by email


// Delete dreamer


// View all Admin


// View admin by email


// Verify token

//Export Routes
module.exports = router;