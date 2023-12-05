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

        if (newTask.type == 'daily') {
            act.dailyTasks.push(newTask);
            await story.save().then((result) => {

                const lastAct = act;
                const lastDailyTask = lastAct.dailyTasks[lastAct.dailyTasks.length - 1];
                res.status(201).json(lastDailyTask);

            }).catch((error) => {
                res.status(500).json({ error: 'Failed to create task' });
            });
        } else if (newTask.type == 'weekly') {
            act.weeklyTasks.push(newTask);
            await story.save().then((result) => {

                const lastAct = act;
                const lastWeeklyTasks = lastAct.weeklyTasks[lastAct.weeklyTasks.length - 1];

                res.status(201).json(lastWeeklyTasks);

            }).catch((error) => {
                res.status(500).json({ error: 'Failed to create task' });
            });
        }
};

//patch
const patchById = async (req, res) => {
    const { chapterId, actId, taskId, field, value } = req.body;

    const story = await Story.findOne();

    if (!story) {
        return res.status(404).json({ error: 'Story not found' });
    }

    let document;

    if(chapterId){
        document = story.chapters.id(chapterId);
        document[field] = value;

        await story.save().then((result) => {
            res.status(200).json(result);
        }).catch((error) => {
            res.status(500).json({ error: 'Failed to patch document' });
        });
    } else if (actId){
        const chapter = story.chapters.find(chapter => chapter.acts.some(act => act._id.equals(actId)));
        document = chapter.acts.id(actId);
        document[field] = value;

        await story.save().then((result) => {
            res.status(200).json(document);
        }).catch((error) => {
            res.status(500).json({ error: 'Failed to patch document' });
        });
    } else if (taskId){
        const chapter = story.chapters.find(chapter => chapter.acts.some(act => act.dailyTasks.some(task => task._id.equals(taskId))));

        if (act.dailyTasks.some(task => task.id === taskId)){
            const act = chapter.acts.find(act => act.dailyTasks.some(task => task._id.equals(taskId)));
            document = act.dailyTasks.id(taskId);
            document[field] = value;

            await story.save().then((result) => {
                res.status(200).json(result);
            }).catch((error) => {
                res.status(500).json({ error: 'Failed to patch document' });
            });
        } else if (act.weeklyTasks.some(task => task.id === taskId)){
            const act = chapter.acts.find(act => act.weeklyTasks.some(task => task._id.equals(taskId)));
            document = act.weeklyTasks.id(taskId);
            document[field] = value;

            await story.save().then((result) => {
                res.status(200).json(result);
            }).catch((error) => {
                res.status(500).json({ error: 'Failed to patch document' });
            });
        }
    }
}

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
    patchById,
    getStory
};