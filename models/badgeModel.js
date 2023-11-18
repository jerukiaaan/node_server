const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
    Name: String,
    Description: String,
    Goal: Number,
    Category: String,
  });
  
  // Define a model based on the schema
  const Badge = mongoose.model('Badge', badgeSchema, 'badges');

  module.exports = Badge;