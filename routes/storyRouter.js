const express = require('express');
const storyController = require('../controllers/storyController');

const router = express.Router();

// Create a new badge
router.post('/', storyController.createStory);
router.post('/:storyID', storyController.createChapter);
router.post('/:storyID/:chapterID', storyController.createAct);
router.post('/:storyID/:chapterID/:actID', storyController.createTask);

module.exports = router;