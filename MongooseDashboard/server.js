const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const port = 8000;
const {Schema} = mongoose;
const app = express();
// Setting up the body parser for the interaction with data
app.use(bodyParser.urlencoded({extended:true}));
// Configurations with db
mongoose.connect('mongodb://localhost/mongoose');
mongoose.connection.on('connected', function() {
  console.log("Conneted to the db!");
});
// Data model Schema
const AnimalSchema = new Schema({
  name:String,
  family:String,
  location: String,
  num_of_legs: Number
},{timestamps:true});
const Animal = mongoose.model('Animal',AnimalSchema);

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.get('/', function(request, response){
  Animal.find({})
  .then(function(animals) {
    response.render("index",{animals});
  })
  .catch(function(err){
    throw err;
  });
});
app.get('/animal/new', function(req, res) {
  res.render("new");
});
app.post('/animals', function(req, res) {
    console.log(req.body);
    Animal.create(req.body)
          .then(function() {
            res.redirect('/');
          })
          .catch(function(err) {
            throw err;
          });
});
app.get('/:id', function(req, res) {
  res.render("show");
});
app.get('/animal/edit/:id', function(req, res) {
  var id = req.params.id;
  Animal.findById(id)
  .then(function(animal) {
    res.render("edit",{animal});
  })
  .catch(function(err) {
    throw err;
  });
});
app.post('/animals/:id', function(req, res) {
  var id = req.params.id;
  console.log("Id of params:",id);
  console.log(req.body);
  Animal.update({'_id':id},{$set:{'name':req.body.name, 'family':req.body.family,'location':req.body.location,'num_of_legs':req.body.num_of_legs}})
  .then(function() {
    res.redirect('/');
  })
  .catch(function(err) {
    throw err;
  });
});
app.post('/animal/destroy/:id', function(req, res) {
  var id = req.params.id;
  Animal.remove({'_id':id})
  .then(function() {
    res.redirect('/');
  })
  .catch(function(err) {
    throw err;
  })
});
app.listen(port, function() {
  console.log("Running on ",port);
});
