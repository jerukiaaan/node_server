const { Story } = require('../models/storyModel');
const { Chapter } = require('../models/storyModel');
const { Act } = require('../models/storyModel');
const { Task } = require('../models/storyModel');

const createStory = (req, res) => {
    const { title, description, chapters } = req.body;
    const newStory = new Story({title, description, chapters});
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
    const storyID = req.params.storyID;
    const { title, description, acts } = req.body;
    const newChapter = new Chapter({title, description, acts});
    
    const story = await Story.findById(storyID);

    if (!story) {
        return res.status(404).json({ error: 'Story not found' });
    }

    story.chapters.push(newChapter);
    await story.save()
    .then((result) => {
        res.status(201).json(result.chapters[result.chapters.length - 1]);
    })
    .catch((error) => {
        res.status(500).json({ error: 'Failed to create story' });
    });
};

// Create Act
const createAct = async (req, res) => {
        const storyID = req.params.storyID;
        const chapterID = req.params.chapterID;
        const { title, description, dailyTasks, weeklyTasks } = req.body;
        const newAct = new Act({title, description, dailyTasks, weeklyTasks});

        const story = await Story.findById(storyID);
        const chapter = story.chapters.id(chapterID);

        if (!chapter) {
            console.log('Chapter not found');
            return res.status(404).json({ error: 'Chapter not found' });
        }

        chapter.acts.push(newAct);
        await story.save().then((result) => {
            res.status(201).json(result.chapters[result.chapters.length - 1].acts[result.chapters[result.chapters.length - 1].acts.length - 1]);
        }).catch((error) => {
            res.status(500).json({ error: 'Failed to create act' });
        });
};

const createTask = async (req, res) => {
        const storyID = req.params.storyID;
        const chapterID = req.params.chapterID;
        const actID = req.params.actID;

        const { title, description, type, dueDate, goal } = req.body;
        const newTask = new Task({title, type, description, dueDate, goal});

        const story = await Story.findById(storyID);
        const chapter = story.chapters.id(chapterID);
        const act = chapter.acts.id(actID);

        if (!act) {
            return res.status(404).json({ error: 'Act not found' });
        }

        console.log(newTask.type);
        if (newTask.type == 'daily') {
            act.dailyTasks.push(newTask);
            await story.save().then((result) => {

                const lastChapter = result.chapters[result.chapters.length - 1];
                const lastAct = lastChapter.acts[lastChapter.acts.length - 1];
                const lastDailyTask = lastAct.dailyTasks[lastAct.dailyTasks.length - 1];

                res.status(201).json(lastDailyTask);

            }).catch((error) => {
                res.status(500).json({ error: 'Failed to create task' });
            });
        } else if (newTask.type == 'weekly') {
            act.weeklyTasks.push(newTask);
            await story.save().then((result) => {

                const lastChapter = result.chapters[result.chapters.length - 1];
                const lastAct = lastChapter.acts[lastChapter.acts.length - 1];
                const lastWeeklyTasks = lastAct.weeklyTasks[lastAct.weeklyTasks.length - 1];

                res.status(201).json(lastWeeklyTasks);

            }).catch((error) => {
                res.status(500).json({ error: 'Failed to create task' });
            });
        }
};

//get story

const getStory = async (req, res) => {
    const story = await Story.findOne();
    if (!story) {
        return res.status(404).json({ error: 'Story not found' });
    }
    res.status(200).json(story);
};


module.exports = {
    createStory,
    createChapter,
    createAct,
    createTask,
    getStory
};