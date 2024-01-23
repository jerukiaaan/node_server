const mongoose = require('mongoose');


const analyticsSchema = new mongoose.Schema({
  roadmap: Number,
  achievements: Number,
  leaderboard: Number,
  profile: Number,
  mastery: Number,
})

const studentSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    obtainedBadges: Array,
    obtainedTasks: Array,
    obtainedActs: Array,
    obtainedChapters: Array,
    friendIds: Array,
    friendRequestIds: Array,
    likedByIds: Array,
    analyticsData: [analyticsSchema]
  });
  
  // Define a model based on the schema
  const Student = mongoose.model('Student', studentSchema, 'students');

  module.exports = Student;