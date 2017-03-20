require('dotenv').load();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = 8000;
const {Schema} = mongoose; // destructuring
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect('mongodb://localhost/quotingDojo');
mongoose.connection.on('connected', function() {
  console.log("Conneted to the db!");
});
const QuoteSchema = new Schema({
  name:String,
  quote:String
},{timestamps:true});
const Quote = mongoose.model('Quote', QuoteSchema);

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.get('/', function(req, res) {
  res.render('index');
});
app.post('/quotes', function(req,res) {
    console.log(req.body);
    Quote.create(req.body)
    .then(function(user) {
      res.redirect('/quotes')
    })
    .catch(function(err) {
      throw err;
    });
});
app.get('/quotes', function(req,res) {
  Quote.find({})
  .then(function(users){
    res.render('quotes',{users:users});
  })
  .catch(function(error) {
    throw error;
  });
});
app.listen(port, function() {
  console.log("Listening on port: ",port);
});
