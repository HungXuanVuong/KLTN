const NewsModel = require('../models/NewsModel');

const config = require('../config/db');

const getAllNews = function(req, res){
    NewsModel.find({}, function(err, news){
        if(err){
            res.json({success: false, message: 'Lỗi: ' + err});
        }else{
            if(!news){
                res.json({success: false, message: 'Rỗng'});
            }else{
                var count = 0;
                count = news.length;
                res.json({success: true, countnews: count, listNews: news});
            }
        }
    });
};
const getTop6News = function(req, res){
    NewsModel.find({}).sort({create_date: -1}).limit(6).exec(function(err, news){
        if(err){
            res.json({success: false, message: 'Lỗi: ' + err});
        }else{
            if(!news){
                res.json({success: false, message: 'Rỗng'});
            }else{
                var count = 0;
                count = news.length;
                res.json({success: true, countnews: count, listNews: news});
            }
        }
    });
};

const getSingleNews = function(req, res){
    if (!req.params.id) {
        res.json({ success: false, message: 'No news ID was provided.' });
    } else {
        NewsModel.findOne({ _id: req.params.id }, (err, news) => {
            if (err) {
                res.json({ success: false, message: 'Not a valid news id' }); // Return error message
            } else {
                if (!news) {
                    res.json({ success: false, message: 'news not found.' });
                } else {
                    res.json({ success: true, news: news });
                }
            }
        });
    }
}

module.exports = {
    getAllNews,
    getTop6News,
    getSingleNews
}