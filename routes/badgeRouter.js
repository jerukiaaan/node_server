// routes/badgeRouter.js
const express = require('express');
const badgeController = require('../controllers/badgeController');

const router = express.Router();

// Create a new badge
router.post('/', badgeController.createBadge);

// Get all badges
router.get('/', badgeController.getAllBadges);

// Get a specific badge by ID
router.get('/:id', badgeController.getBadgeById);

// Update a badge by ID
router.put('/:id', badgeController.updateBadgeById);

// Update a badge's field by ID
router.patch('/:id', badgeController.patchBadgeById);

// Delete a badge by ID
router.delete('/:id', badgeController.deleteBadgeById);

module.exports = router;