
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

const addIdToObtainedList = async (req, res) => {
  try {
    const studentId = req.params.id;
    const { taskId, badgeId, chapterId, actId } = req.body;

    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    if (taskId && !student.obtainedTasks.includes(taskId)) {
      student.obtainedTasks.push(taskId);
    } else if (badgeId && !student.obtainedBadges.includes(badgeId)) {
      student.obtainedBadges.push(badgeId);
    } else if (actId && !student.obtainedActs.includes(actId)) {
      student.obtainedActs.push(actId);
    } else if (chapterId && !student.obtainedChapters.includes(chapterId)) {
      student.obtainedChapters.push(chapterId);
    }

    await student.save();

    console.log('Added successfully');
    return res.status(200).json({ message: 'Added successfully' });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Failed to add' });
  }
}

  //Add ID to friendRequestIds array
const addToFriendRequest = async (req, res) => {
    try {
      const studentId = req.params.id;
      const { targetId } = req.body;

      const student = await Student.findById(targetId);
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }

      if (!student.friendRequestIds.includes(studentId)) {
        student.friendRequestIds.push(studentId);
      }
      student.save();

      return res.status(200).json({ message: 'Added successfully' });
    }  catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Failed to add' });
    }
}

const acceptFriendRequest = async (req, res) => {
  try {
    const studentId = req.params.id;
    const { targetId } = req.body;

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    if (!student.friendIds.includes(targetId)) {
      student.friendIds.push(targetId);
      //remove targetId from friendRequestIds
      student.friendRequestIds = student.friendRequestIds.filter(id => id !== targetId);
    }
    student.save();

    return res.status(200).json({ message: 'Accepted successfully' });
  }  catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Failed to Accept' });
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

const updateScreenTimes = async (req, res) => {
  const studentId = req.params.id;
  const { 
    screenTimeLeaderboard,
    screenTimeProfile,
    screenTimeRoadmap,
    screenTimeAchievements,
    screenTimeMastery
   } = req.body;
  try {
    Student.findByIdAndUpdate(studentId, { 
      'analyticsData.leaderboard': screenTimeLeaderboard,
      'analyticsData.roadmap': screenTimeRoadmap,
      'analyticsData.achievements': screenTimeAchievements,
      'analyticsData.profile': screenTimeProfile,
      'analyticsData.mastery': screenTimeMastery
    }).then((student) => {
      if (!student) {
        res.status(404).json({ error: 'Student not found' });
      } else {
        console.log(
          screenTimeLeaderboard
          );
        res.json({ message: 'Screen time updated successfully' });
      }
    })
  } catch {

  }
}

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudentById,
  addIdToObtainedList,
  deleteStudentById,
  addToFriendRequest,
  acceptFriendRequest,
  updateScreenTimes,
};