const NewsModel = require('../models/NewsModel');

const config = require('../config/db');

const getAllNews = function (req, res) {
    NewsModel.find({}, function (err, news) {
        if (err) {
            res.json({ success: false, message: 'Lỗi: ' + err });
        } else {
            if (!news) {
                res.json({ success: false, message: 'Rỗng' });
            } else {
                var count = 0;
                count = news.length;
                res.json({ success: true, countnews: count, listNews: news });
            }
        }
    });
};

const getTop6News = function (req, res) {
    NewsModel.find({}).populate({path: 'newsPolicy'}).populate({path: 'employee'}).sort({ create_date: -1 }).exec(function (err, news) {
        if (err) {
            res.json({ success: false, message: 'Lỗi: ' + err });
        } else {
            if (!news) {
                res.json({ success: false, message: 'Rỗng' });
            } else {
                var count = 0;
                count = news.length;
                res.json({ success: true, countnews: count, listNews: news });
            }
        }
    });
};

const getSingleNews = function (req, res) {
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
};

const addNews = function (req, res) {
    if (!req.body.urlHinh) {
        res.json({ success: false, message: 'Chưa có hình đại diện' });
    } else {
        if (!req.body.title) {
            res.json({ success: false, message: 'Bạn phải nhập vào tiêu đề' });
        } else {
            if (!req.body.place) {
                res.json({ success: false, message: 'Bạn phải nhập vào địa điểm' });
            } else {
                if (!req.body.salary) {
                    res.json({ success: false, message: 'Bạn phải nhập Lương' });
                } else {
                    if (!req.body.position) {
                        res.json({ success: false, message: 'Bạn phải nhập vào vị trí cần tuyển' });
                    } else {
                        if (!req.body.exp_date) {
                            res.json({ success: false, message: 'Bạn phải nhập vào ngày hết hạn tin' });
                        } else {
                            if (!req.body.numberOf) {
                                res.json({ success: false, message: 'Bạn phải nhập vào số lượng cần tuyển' });
                            } else {
                                if (!req.body.content) {
                                    res.json({ success: false, message: 'Bạn phải nhập vào nội dung chi tiết tin tuyển dụng' });
                                } else {
                                    let news = new NewsModel({
                                        urlHinh: req.body.urlHinh,
                                        title: req.body.title,
                                        place: req.body.place,
                                        salary: req.body.salary,
                                        // create_date: Date.now,
                                        exp_date: req.body.exp_date,
                                        position: req.body.position,
                                        numberOf: req.body.numberOf,
                                        content: req.body.content,
                                        newsPolicy: req.body.newsPolicy,
                                        employee: req.body.employee,
                                        point_uv: req.body.point_uv,
                                        status: 'Hoạt động'
                                    });
                                    news.save(function (err) {
                                        if (err) {
                                            res.json({ success: false, message: err });
                                        } else {
                                            res.json({ success: true, message: 'Lưu thành công!' });
                                        }
                                    });
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

const editNews = function (req, res) {
    if (!req.body._id) {
        res.json({ success: false, message: 'Chưa có id tin' });
    } else {
        NewsModel.findOne({ _id: req.body._id }, (err, news) => {
            if (err) {
                res.json({ success: false, message: 'Not a valid news id' });
            } else {
                if (!news) {
                    res.json({ success: false, message: 'news id was not found.' });
                } else {
                    news.urlHinh = req.body.urlHinh;
                    news.title = req.body.title;
                    news.place = req.body.place;
                    news.salary = req.body.salary;
                    // news.create_date = new.create_date,
                    news.exp_date = req.body.exp_date;
                    news.position = req.body.position;
                    news.numberOf = req.body.numberOf;
                    news.content = req.body.content;
                    news.newsPolicy = req.body.newsPolicy;
                    news.status = req.body.status;
                    news.employee = req.body.employee;
                    news.point_uv = req.body.point_uv;
                    news.save((err) => {
                        if (err) {
                            res.json({ success: false, message: err });
                        } else {
                            res.json({ success: true, message: 'Cập nhật thành công' });
                        }
                    });
                }
            }
        });
    }
};

const deleteNews = function(req, res){
    if (!req.params.id) {
        res.json({ success: false, message: 'No id provided' });
      } else {
        NewsModel.findOne({ _id: req.params.id }, (err, news) => {
          if (err) {
            res.json({ success: false, message: 'Invalid id' }); 
          } else {
            if (!news) {
              res.json({ success: false, messasge: 'news was not found' }); 
            } else {
                news.remove((err) => {
                if (err) {
                  res.json({ success: false, message: err }); 
                } else {
                  res.json({ success: true, message: 'Xóa thành công!' }); 
                }
              });
            }
          }
        });
      }
}

module.exports = {
    getAllNews,
    getTop6News,
    getSingleNews,
    addNews,
    editNews,
    deleteNews
}