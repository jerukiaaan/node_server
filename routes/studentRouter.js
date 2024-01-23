// routes/studentRouter.js
const express = require('express');
const studentController = require('../controllers/studentController');

const router = express.Router();

// Create a new student
router.post('/', studentController.createStudent);

// Get all students
router.get('/', studentController.getAllStudents);

// Get a specific student by ID
router.get('/:id', studentController.getStudentById);

// Update a student by ID
router.put('/:id', studentController.updateStudentById);

// Add badgeId to obtainedBadges array
router.patch('/:id', studentController.addIdToObtainedList);

// Update a student's field by ID
router.patch('/friendRequest/:id', studentController.addToFriendRequest);

// Update a student's field by ID
router.patch('/accept/:id', studentController.acceptFriendRequest);

router.patch('/screentime/:id', studentController.updateScreenTimes);

// Update a student's field by ID
// router.patch('/decline/:id', studentController.declineFriendRequest);

// Delete a student by ID
router.delete('/:id', studentController.deleteStudentById);

module.exports = router;