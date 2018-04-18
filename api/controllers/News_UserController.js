const News_UserModel = require('../models/News_UserModel');


const addNews_User = function (req, res) {
    if (!req.body.news) {
        res.json({ success: false, message: 'Chưa cung cấp Id news' });
    } else {
        if (!req.body.user) {
            res.json({ success: false, message: 'Chưa cung cấp Id user' });
        } else {
            let newsUser = new News_UserModel({
                news: req.body.news,
                user: req.body.user,
                status: req.body.status
            });
            newsUser.save(function (err) {
                if (err) {
                    res.json({ success: false, message: 'Ứng tuyển thất bại: ', err });
                } else {
                    res.json({ success: true, message: 'Ứng tuyển đã được lưu!' });
                }
            });
            
        }
    }
};

const findNewsUserById = function (req, res) {
    if (!req.params.id) {
        res.json({ success: false, message: 'id news_user chưa được cung cấp.' });
    } else {
        News_UserModel.findOne({ _id: req.params.id }, (err, newsuser) => {
            if (err) {
                res.json({ success: false, message: 'id news_user không hợp lệ' });
            } else {
                if (!newsuser) {
                    res.json({ success: false, message: 'Không tìm thấy news_user này' });
                } else {
                    res.json({ success: true, newsuser: newsuser });
                }
            }
        });
    }
};

const findListUserByIdNews = function (req, res) {
    let newsId = req.params.id;
    if (!req.params.id) {
        res.json({ success: false, message: 'No news ID was provided.' });
    } else {
        News_UserModel.find({ "news": newsId }).populate({ path: 'user' }).exec(function (err, users) {
            if (err) {
                res.json({ success: false, message: 'Not a valid news id' }); // Return error message
            } else {
                if (!users) {
                    res.json({ success: false, message: 'news not found.' });
                } else {
                    var count = 0;
                    count = users.length;
                    res.json({ success: true, countcandidates: count, users: users });
                }
            }
        });
    }
};


const getAllNewsUser = function (req, res) {
    News_UserModel.find({}, function (err, newsuser) {
        if (err) {
            res.json({ success: false, message: 'Lỗi: ' + err });
        } else {
            if (!newsuser) {
                res.json({ success: false, message: ' Danh sach Rỗng' });
            } else {
                var count = 0;
                count = newsuser.length;
                res.json({ success: true, countusers: count, listNewsuser: newsuser });
            }
        }
    });
}


const editNewsUser = function (req, res) {
    if (!req.body._id) {
        res.json({ success: false, message: 'Chưa cung cấp id newsuser' });
    } else {
        News_UserModel.findOne({ _id: req.body._id }, (err, newsuser) => {
            if (err) {
                res.json({ success: false, message: 'id newsuser không hợp lệ' });
            } else {
                if (!newsuser) {
                    res.json({ success: false, message: 'Không tìm thấy newsuser có id này.' });
                } else {
                    // newscandidate.candidate = req.body.candidateId,
                    // newscandidate.news = req.body.newsId,
                    newsuser.status = req.body.status
                    newsuser.save((err) => {
                        if (err) {
                            res.json({ success: false, message: err });
                        } else {
                            res.json({ success: true, message: 'Cập nhật thành công', newsuser: newsuser });
                        }
                    });
                }
            }
        });
    }
};

const editStatus = function (req, res) {
    var id = req.body._id;
    if (!req.body._id) {
        res.json({ success: false, message: 'Chưa cung cấp id newscandidate' });
    } else {
        News_UserModel.findOneAndUpdate({ _id: id }, req.body, { new: true }, function (err, newsuser) {
            if (err) {
                res.json({ success: false, message: err });
            }
            res.json({ success: true, message: 'Cập nhật thành công' });
        });
    }

};

const deleteNewsUser = function (req, res) {
    if (!req.params.id) {
        res.json({ success: false, message: 'No id provided' });
    } else {
        News_UserModel.findOne({ _id: req.params.id }, (err, newsuser) => {
            if (err) {
                res.json({ success: false, message: 'Invalid id' });
            } else {
                if (!newsuser) {
                    res.json({ success: false, messasge: 'newsuser was not found' });
                } else {
                    newsuser.remove((err) => {
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
    addNews_User,
    findListUserByIdNews,
    getAllNewsUser,
    deleteNewsUser,
    editNewsUser,
    findNewsUserById

}