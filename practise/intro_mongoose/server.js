// Require the Express Module
const express = require('express');
// Create an Express App
const app = express();
// Require body-parser (to receive post data from clients)
const bodyParser = require('body-parser');
// Require path
const path = require('path');
// Require mongoose
const mongoose = require('mongoose');
// connecting to the database
mongoose.connect('mongodb://localhost/basic_mongoose_app');
mongoose.Promise = global.Promise;

// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
// Routes
// Root Request
app.get('/', function(req, res) {
    // This is where we will retrieve the users from the database and include
    //them in the view page we will be rendering.
    res.render('index');
})
// Add User Request
app.post('/users', function(req, res) {
  console.log("POST DATA", req.body);
  // create a new User with the name and age corresponding to those from req.body
  var user = new User({name: req.body.name, age: req.body.age});
  // Try to save that new user to the database (this is the method that actually
  // inserts into the db) and run a callback function with an error (if any) from the operation.
  user.save(function(err) {
    if(err) {
      console.log('something went wrong');
    } else {
      console.log('successfully added a user!');
      res.redirect('/');
    }
  });
});

var UserSchema = new mongoose.Schema({
 name: String,
 age: Number
});
mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'User'
var User = mongoose.model('User') // We are retrieving this Schema from our Models, named 'User'

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})
