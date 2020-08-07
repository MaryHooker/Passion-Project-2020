//Dreamer Application

//reference express
const express = require('express');
const app = express();
app.use(express.json());


//import routes
const dreamers = require('./routes/dreamers');
const api = require('./routes/api');
app.use('/dreamers',dreamers);
app.use('/api', api);


// CONNECTING TO A MONGO DATABASE
// reference the mongoose module
let mongoose = require('mongoose');
mongoose.set('useCreateIndex',true)
// connect to database
let mongoDB = require('./config/keys').mongoURI
mongoose.connect(process.env.MONGODB_URI ||mongoDB, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
// connection error message
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


//When build is in production environment 
if (process.env.NODE_ENV === 'production') {           
    app.use(express.static('../dreamer/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dreamer', 'build', 'index.html'));
    });
  }


// listen to server
const port = require('./config/keys').port;
// const host = 'localhost';
app.listen(port, () => {
    console.log(`listening to port ${port}`);
})
