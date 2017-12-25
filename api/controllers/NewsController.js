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

module.exports = {
    getAllNews
}