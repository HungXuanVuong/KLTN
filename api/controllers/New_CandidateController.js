const News_CandidateModel = require('../models/News_CadidateModel');


const addNew_Candidate = function (req, res) {
    if (!req.body.newsId) {
        res.json({ success: false, message: 'Chưa cung cấp Id news' });
    } else {
        if (!req.body.candidateId) {
            res.json({ success: false, message: 'Chưa cung cấp Id candidate' });
        } else {
            if (!req.body.userId) {
                res.json({ success: false, message: 'Chưa cung cấp Id user' });
            } else {
                let newCandidate = new News_CandidateModel({
                    news: req.body.newsId,
                    candidate: req.body.candidateId,
                    status: req.body.status
                });
                newCandidate.save(function (err) {
                    if (err) {
                        res.json({ success: false, message: 'Giới thiệu thất bại: ', err });
                    } else {
                        res.json({ success: true, message: 'Lưu thành công  !' });
                    }
                });
            }
        }
    }
};

const findNewsCandidateById = function (req, res) {
    if (!req.params.id) {
        res.json({ success: false, message: 'id news_candidate chưa được cung cấp.' });
    } else {
        News_CandidateModel.findOne({ _id: req.params.id }, (err, newscandidate) => {
            if (err) {
                res.json({ success: false, message: 'id candidate không hợp lệ' });
            } else {
                if (!newscandidate) {
                    res.json({ success: false, message: 'Không tìm thấy news_candidate này' });
                } else {
                    res.json({ success: true, newscandidate: newscandidate });
                }
            }
        });
    }
};

const findListCandidateByIdNews = function (req, res) {
    let newsId = req.params.id;
    if (!req.params.id) {
        res.json({ success: false, message: 'No news ID was provided.' });
    } else {
        News_CandidateModel.find({ "news": newsId }).populate({ path: 'user' }).populate({ path: 'candidate' }).exec(function (err, candidates) {
            if (err) {
                res.json({ success: false, message: 'Not a valid news id' }); // Return error message
            } else {
                if (!candidates) {
                    res.json({ success: false, message: 'news not found.' });
                } else {
                    var count = 0;
                    count = candidates.length;
                    res.json({ success: true, countcandidates: count, candidates: candidates });
                }
            }
        });
    }
};

const findListCandidateByIdUser = function (req, res) {
    let userId = req.params.id;
    if (!req.params.id) {
        res.json({ success: false, message: 'No user ID was provided.' });
    } else {
        News_CandidateModel.find({ "user": userId }).populate({ path: 'user' }).populate({ path: 'candidate' }).exec(function (err, candidates) {
            if (err) {
                res.json({ success: false, message: 'Not a valid user id' }); // Return error message
            } else {
                if (!candidates) {
                    res.json({ success: false, message: 'user not found.' });
                } else {
                    var count = 0;
                    count = candidates.length;
                    res.json({ success: true, countcandidates: count, candidates: candidates });
                }
            }
        });
    }
};


const getAllNewsCandidate = function (req, res) {
    News_CandidateModel.find({}, function (err, newscandidate) {
        if (err) {
            res.json({ success: false, message: 'Lỗi: ' + err });
        } else {
            if (!newscandidate) {
                res.json({ success: false, message: ' Danh sach Rỗng' });
            } else {
                var count = 0;
                count = newscandidate.length;
                res.json({ success: true, countusers: count, listNewscandidate: newscandidate });
            }
        }
    });
}


const editNewsCandidate = function (req, res) {
    if (!req.body._id) {
        res.json({ success: false, message: 'Chưa cung cấp id newscandidate' });
    } else {
        News_CandidateModel.findOne({ _id: req.body._id }, (err, newscandidate) => {
            if (err) {
                res.json({ success: false, message: 'id newscandidate không hợp lệ' });
            } else {
                if (!newscandidate) {
                    res.json({ success: false, message: 'Không tìm thấy newscandidate có id này.' });
                } else {
                    // newscandidate.candidate = req.body.candidateId,
                    // newscandidate.news = req.body.newsId,
                    newscandidate.status = req.body.status
                    newscandidate.save((err) => {
                        if (err) {
                            res.json({ success: false, message: err });
                        } else {
                            res.json({ success: true, message: 'Cập nhật thành công', newscandidate: newscandidate });
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
        News_CandidateModel.findOneAndUpdate({ _id: id }, req.body, { new: true }, function (err, newscandidate) {
            if (err) {
                res.json({ success: false, message: err });
            }
            res.json({ success: true, message: 'Cập nhật thành công' });
        });
    }

};

const deleteNewsCandidate = function (req, res) {
    if (!req.params.id) {
        res.json({ success: false, message: 'No id provided' });
    } else {
        News_CandidateModel.findOne({ _id: req.params.id }, (err, newscandidate) => {
            if (err) {
                res.json({ success: false, message: 'Invalid id' });
            } else {
                if (!newscandidate) {
                    res.json({ success: false, messasge: 'newscandidate was not found' });
                } else {
                    newscandidate.remove((err) => {
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
    addNew_Candidate,
    editNewsCandidate,
    deleteNewsCandidate,
    getAllNewsCandidate,
    findNewsCandidateById,
    findListCandidateByIdNews,
    findListCandidateByIdUser
}