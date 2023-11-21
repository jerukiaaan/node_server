
// controllers/studentController.js
const Student = require('../models/studentModel');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const createStudent = async (req, res) => {
    const { fullName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const student = new Student({ fullName, email, password: hashedPassword });
    student.save()
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((error) => {
        res.status(500).json({ error: 'Failed to create student' });
      });
  };
  
  // Get all students
const getAllStudents =  (req, res) => {
    Student.find()
      .then((students) => {
        res.json(students);
      })
      .catch((error) => {
        res.status(500).json({ error: 'Failed to get students'  });
      });
}
  
  // Get a specific student by ID
const getStudentById =  (req, res) => {
    const studentId = req.params.id;
    Student.findById(studentId)
      .then((student) => {
        if (!student) {
          res.status(404).json({ error: 'Student not found' });
        } else {
          res.json(student);
        }
      })
      .catch((error) => {
        res.status(500).json({ error: 'Failed to get student' });
      });
}
  
  // Update a student by ID
const updateStudentById = (req, res) => {
    const studentId = req.params.id;
    const { fullName, email, password } = req.body;
    Student.findByIdAndUpdate(studentId,{ fullName, email, password })
      .then((student) => {
        if (!student) {
          res.status(404).json({ error: 'Student not found' });
        } else {
          res.json({ message: 'Student updated successfully' });
        }
      })
      .catch((error) => {
        res.status(500).json({ error: 'Failed to update student' });
      });
}

const addBadgeIdToObtainedBadges = async (req, res) => {
  try {
    const studentId = req.params.id;
    const { badgeId } = req.body;

    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    student.obtainedBadges.push(badgeId);

    await student.save();

    console.log('Badge added to obtainedBadges successfully');
    return res.status(200).json({ message: 'Badge added to obtainedBadges successfully' });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Failed to add badge to obtainedBadges' });
  }
}
  
  // Delete a student by ID
const deleteStudentById = (req, res) => {
    const studentId = req.params.id;
    Student.findByIdAndDelete(studentId)
      .then((student) => {
        if (!student) {
          res.status(404).json({ error: 'Student not found' });
        } else {
          res.json({ message: 'Student deleted successfully' });
        }
      })
      .catch((error) => {
        res.status(500).json({ error: 'Failed to delete student' });
      });
}

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudentById,
  addBadgeIdToObtainedBadges,
  deleteStudentById
};