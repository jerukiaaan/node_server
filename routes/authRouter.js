// routes/badgeRouter.js
const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Create a new badge
router.post('/signIn', authController.signIn);
router.post('/register', authController.register);
router.post('/changePass', authController.changePass);

module.exports = router;