const mongoose = require('mongoose');
const {Schema} = mongoose;
const AnimalSchema = new Schema({
  name:String,
  family:String,
  location: String,
  num_of_legs: Number
},{timestamps:true});
module.exports = mongoose.model('Animal', AnimalSchema);
