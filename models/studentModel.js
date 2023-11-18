const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    obtainedBadges: Array
  });
  
  // Define a model based on the schema
  const Student = mongoose.model('Student', studentSchema, 'students');

  module.exports = Student;