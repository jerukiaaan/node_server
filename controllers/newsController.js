const News = require('../models/newsModel');


const createNews = async (req, res) => {
    const { title, description, date } = req.body;
    const newNews = new News({ title, description, date });

    newNews.save()
        .then((result) => {
            res.status(201).json(result);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Failed to create news' });
        })
}

const getAllNews = async (req, res) => {
    try {
        const news = await News.find();
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get news' });
    }
}

module.exports = {
    createNews, 
    getAllNews
};