const mongoose = require('mongoose');
var Animal = mongoose.model('Animal');
module.exports = {
  // show finds just one animal
  show:function(req, res) {
    Animal.findById(req.params.id)
    .then(function(animal) {
      res.render("show", {animal});
    })
    .catch(function(err) {
      throw err;
    })
  },
  new:function(req, res) {
    res.render("new");
  },
  create: function(req, res) {
    Animal.create(req.body)
    .then(function() {
      res.redirect("/animals");
    })
    .catch(function(err) {
      throw err;
    })
  },
  // finds all animals
  index: function(req, res) {
    Animal.find({})
    .then(function(animals) {
      res.render("index",{animals});
    })
    .catch(function(err) {
      throw err;
    });
  },
  update: function(req, res) {
    Animal.update({'_id':req.params.id},{$set: req.body})
    .then(function() {
      res.redirect('/animals');
    })
    .catch(function(err) {
      throw err;
    });
  },
  edit: function(req, res) {
    Animal.findById(req.params.id)
    .then(function(animal) {
      res.render("edit",{animal});
    })
    .catch(function(err) {
      throw err;
    });
  },
  delete: function(req, res) {
    Animal.remove({'_id':req.params.id})
    .then(function() {
      res.redirect('/animals');
    })
    .catch(function(err) {
      throw err;
    })
  }
}
