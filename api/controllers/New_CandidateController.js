const News_CandidateModel = require('../models/News_CadidateModel');
const CandidateModel = require('../models/CandidateModel');

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');


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
                    user: req.body.userId,
                    status: req.body.status,
                    point: req.body.point
                });
                newCandidate.save(function (err) {
                    if (err) {
                        res.json({ success: false, message: 'Giới thiệu thất bại: ', err });
                    } else {
                        res.json({ success: true, message: 'Giới thiệu thành công  !' });
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
        News_CandidateModel.findOne({ _id: req.params.id }).populate({path: 'candidate'}).populate({path: 'news'}).exec(function (err, newscandidate) {
            if (err) {
                res.json({ success: false, message: 'id news_candidate không hợp lệ' });
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
        News_CandidateModel.find({ "news": newsId }).populate({ path: 'user' }).populate({ path: 'candidate' }).populate({ path: 'news' }).exec(function (err, candidates) {
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
        News_CandidateModel.find({ "user": userId }).populate({ path: 'user' }).populate({ path: 'candidate' }).populate({ path: 'news' }).exec(function (err, candidates) {
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
                    newscandidate.status = req.body.status;
                    newscandidate.point = req.body.point;
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

const checkEmail = function (req, res, next) {
    var id_news = req.param('news');
    var email = req.param('email');
    if (!id_news) {
        res.json({ success: false, massage: 'Chưa nhận được id news !' });
    } else {
        if (!email) {
            res.json({ success: false, massage: 'Chưa nhận được E-mail' });
        } else {
            CandidateModel.findOne({ email: email }, function (err, candidate) {
                if (err) {
                    res.json({ success: false, message: err });
                } else {
                    if(candidate){
                        News_CandidateModel.find({ news: id_news }, function (err, news) {
                            // console.log(candidate._id);
                            var id_candidate = candidate._id +"";
                            if (err) {
                                res.json({ success: false, message: err });
                            } else {
                                for (var u in news) {
                                    if (news[u].candidate == id_candidate) {
                                        res.json({ success: false, message: 'Có vẻ email của ứng viên đã được giới thiệu ở tin này !' });
                                        return;
                                    }
                                }
                                res.json({ success: true, message: 'Ok!' });
                            }
                        });
                    }else{
                        res.json({ success: true, message: 'Ok!' });
                    }
                    
                }
            });
        }
    }

}

const checkPhone = function (req, res, next) {
    var id_news = req.param('news');
    var phone = req.param('phone');
    if (!id_news) {
        res.json({ success: false, massage: 'Chưa nhận được id news !' });
    } else {
        if (!phone) {
            res.json({ success: false, massage: 'Chưa nhận được phone' });
        } else {
            CandidateModel.findOne({ phone: phone }, function (err, candidate) {
                if (err) {
                    res.json({ success: false, message: err });
                } else {
                    if(candidate){
                        News_CandidateModel.find({ news: id_news }, function (err, news) {
                            // console.log(candidate._id);
                            var id_candidate = candidate._id +"";
                            if (err) {
                                res.json({ success: false, message: err });
                            } else {
                                for (var u in news) {
                                    if (news[u].candidate == id_candidate) {
                                        res.json({ success: false, message: 'Có vẻ số điện thoại của ứng viên đã được giới thiệu ở tin này !' });
                                        return;
                                    }
                                }
                                res.json({ success: true, message: 'Ok!' });
                            }
                        });
                    }else{
                        res.json({ success: true, message: 'Ok!' });
                    }
                    
                }
            });
        }
    }

}

module.exports = {
    addNew_Candidate,
    editNewsCandidate,
    deleteNewsCandidate,
    getAllNewsCandidate,
    findNewsCandidateById,
    findListCandidateByIdNews,
    findListCandidateByIdUser,
    checkEmail,
    checkPhone
}