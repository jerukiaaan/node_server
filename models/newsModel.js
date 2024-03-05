const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date
  });
  
  // Define a model based on the schema
  const News = mongoose.model('News', newsSchema, 'news');

  module.exports = News;