const { Story } = require('../models/storyModel');
const { Chapter } = require('../models/storyModel');
const { Act } = require('../models/storyModel');
const { Task } = require('../models/storyModel');

const createStory = (req, res) => {
    const { story } = req.body;
    const newStory = new Story(story);
    newStory.save()
        .then((result) => {
            res.status(201).json(result);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Failed to create story' });
        });
};

//Create Chapter
const createChapter = async (req, res) => {
    try {    
    const storyID = req.params.storyID;
    const { chapter } = req.body;
    const newChapter = new Chapter(chapter);
    
    const story = await Story.findById(storyID);

    if (!story) {
        return res.status(404).json({ error: 'Story not found' });
    }

    story.chapters.push(newChapter);
    await story.save();
    res.status(201).json({ message: 'Chapter added to Story successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create chapter' });
    }
};

// Create Act
const createAct = async (req, res) => {
    try {
        const storyID = req.params.storyID;
        const chapterID = req.params.chapterID;
        const { act } = req.body;
        const newAct = new Act(act);

        const story = await Story.findById(storyID);
        const chapter = story.chapters.id(chapterID);

        console.log(chapter);



        if (!chapter) {
            console.log('Chapter not found');
            return res.status(404).json({ error: 'Chapter not found' });
        }

        chapter.acts.push(newAct);
        await story.save();
        
        console.log('Act added to Chapter successfully');
        res.status(201).json({ message: 'Act added to Chapter successfully' });

    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ error: error });
    }
};

const createTask = async (req, res) => {
    try {
        const storyID = req.params.storyID;
        const chapterID = req.params.chapterID;
        const actID = req.params.actID;
        const { task } = req.body;
        const newTask = new Task(task);

        const story = await Story.findById(storyID);
        const chapter = story.chapters.id(chapterID);
        const act = chapter.acts.id(actID);

        if (!act) {
            return res.status(404).json({ error: 'Act not found' });
        }
        console.log(task.type);
        if (task.type === 'daily') {
            act.dailyTasks.push(newTask);
        } else if (task.type === 'weekly') {
            act.weeklyTasks.push(newTask);
        }
        await story.save();
        res.status(201).json({ message: 'Task added to Act successfully' });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

module.exports = {
    createStory,
    createChapter,
    createAct,
    createTask
};