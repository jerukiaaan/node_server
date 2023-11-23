const express = require('express');
const storyController = require('../controllers/storyController');

const router = express.Router();

// Create
router.post('/', storyController.createStory);
router.post('/:storyID', storyController.createChapter);
router.post('/:storyID/:chapterID', storyController.createAct);
router.post('/:storyID/:chapterID/:actID', storyController.createTask);

// Get
router.get('/', storyController.getStory);

module.exports = router;