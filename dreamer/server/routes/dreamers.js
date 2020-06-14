//Dreamers/users routes

//reference express
const express = require('express');
const router = express.Router();
// router.use(express.json());

//reference authorizations
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secretKey = require('../config/keys').secretOrKey;

//import schema
const DreamerCollection = require('../models/DreamerSchema');

/////////////////////////////////////////////////////////////////////
//    Register/Login
/////////////////////////////////////////////////////////////////////

// Register dreamer/user
router.post('/register', (req, res) => {
  console.log(`Registering New User!`);
  // res.send(`Registering New User`);
  //check that email does not already exist in database
  DreamerCollection.findOne({
    email: req.body.email
  })
    .then((user) => {
      if (user) {
        //send message that user already exists
        res.json({
          error: `User with ${req.body.email} already exists`
        });

      } //else if user does not exist/ add new user
      else {
        //define new user from User Model
        let newUser = new DreamerCollection({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          role: req.body.role
        });
        //encrypt New Users password
        bcrypt.genSalt(10, (error, salt) => {
          bcrypt.hash(newUser.password, salt, (error, hash) => {
            //if hash has errors then send the error message
            if (error) {
              console.log(`Password has not been hashed`);
              res.status(500).json({
                error: error
              });
            } // else if hash does not contain any errors
            else {
              //set password of new user to hash password
              newUser.password = hash
              //save the new user
              newUser.save()
                //send New User to database
                .then(user => res.json(user));
            }
          })
        })
      }
    })
})

// Login dreamer/user/admin
router.post("/login", (req, res) => {
  DreamerCollection.findOne({
    email: req.body.email
  }).then((user) => {
    if (!user) {
      res.status(404).json({
        error: "Email/Password is incorrect"
      });
    } else {
      bcrypt.compare(req.body.password, user.password).then((isMatched) => {
        if (isMatched) {
          const payload = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
          jwt.sign(payload, secretKey, {
            expiresIn: 3600
          }, (error, token) => {
            error
              ? res.status(404).json({
                error: error
              })
              : res.json({
                token: `bearer ${token}`
              });
          });
        } else {
          res.status(500).json({
            error: "Email/Password is incorrect"
          });
        }
      });
    }
  });
});

/////////////////////////////////////////////////////////////////////
//    Admin
/////////////////////////////////////////////////////////////////////

// View all dreamers/customers
router.get('/customers', (req, res) => {
  console.log('Viewing all customers');
  // res.send(`Viewing all customers`);
  DreamerCollection.find({
    role: "Customer"
  }, (errors, results) => {
    errors ? res.send(errors) : res.send(results);
  })
})

// View specific dreamer by email
router.get('/customer/view/:email', (req, res) => {
  console.log('Viewing specific customer');
  // res.send(`Viewing specific customer`);
  DreamerCollection.findOne({
    email: req.params.email
  }, (errors, results) => {
    errors ? res.send(errors) : res.send(results);
  })
})

// Delete dreamer by email
router.delete('/customer/:email', (req, res) => {
  console.log('Deleting customer');
  // res.send(`Deleting customer`);
  DreamerCollection.findOneAndDelete({
    email: req.params.email
  }, (errors, results) => {
    errors ? res.send(errors) : res.send(results);
  })
})

// View all admin
router.get('/admin', (req, res) => {
  console.log('Viewing all admin');
  // res.send(`Viewing all admin`);
  DreamerCollection.find({
    role: "Admin"
  }, (errors, results) => {
    errors ? res.send(errors) : res.send(results);
  })
})

// View specific admin by email
router.get('/admin/view/:email', (req, res) => {
  console.log('Viewing specific customer');
  // res.send(`Viewing specific customer`);
  DreamerCollection.findOne({
    email: req.params.email
  }, (errors, results) => {
    errors ? res.send(errors) : res.send(results);
  })
})

// Delete admin by email
router.delete('/admin/:email', (req, res) => {
  console.log('Deleting customer');
  // res.send(`Deleting customer`);
  DreamerCollection.findOneAndDelete({
    email: req.params.email
  }, (errors, results) => {
    errors ? res.send(errors) : res.send(results);
  })
})

/////////////////////////////////////////////////////////////////////
//    Customer
/////////////////////////////////////////////////////////////////////

//Edit customer/dreamer by email
router.put('/customer/:email', (req, res) => {
  console.log('Deleting customer');
  // res.send(`Deleting customer`);
  DreamerCollection.findOneAndUpdate({
    email: req.params.email
  }, req.body, {
    new: true
  }, (errors, results) => {
    errors ? res.send(errors) : res.send(results);
  })
})

/////////////////////////////////////////////////////////////////////
//    Verify Route
/////////////////////////////////////////////////////////////////////

// POST: verify user
router.post("/verify", verifyToken, (req, res) => {
    jwt.verify(req.token, secretKey, (error, results) => {
      error
        ? res.status(500).json({ error: "verificaiton error!!!" })
        : res.json({ message: results });
    });
  });
  
  // verify user token
  function verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (bearerHeader) {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    } else {
      res.status(403).json({ error: "Fobbiden" });
    }
  }

//Export Routes
module.exports = router;