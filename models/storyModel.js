
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String },
  dueDate: { type: String, required: true },
  completed: { type: Boolean, default: false }
});

const actSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  title: { type: String, required: true },
  dailyTasks: [taskSchema],
  weeklyTasks: [taskSchema]
});

const chapterSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  title: { type: String, required: true },
  acts: [actSchema]
});

const storySchema = new mongoose.Schema({
  title: { type: String, required: true },
  chapters: [chapterSchema]
});

const Story = mongoose.model('Story', storySchema);
const Chapter = mongoose.model('Chapter', chapterSchema);
const Act = mongoose.model('Act', actSchema);
const Task = mongoose.model('Task', taskSchema);

module.exports = {
  Story,
  Chapter,
  Act,
  Task
};