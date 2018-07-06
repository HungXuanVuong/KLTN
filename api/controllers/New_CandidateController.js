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
        News_CandidateModel.findOne({ _id: req.params.id }).populate({ path: 'candidate' }).populate({ path: 'news' }).exec(function (err, newscandidate) {
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
    News_CandidateModel.find({}).populate({ path: 'news' }).populate({ path: 'user' }).sort({ create_date: -1 }).exec(function (err, newsCandidate) {
        if (err) {
            res.json({ success: false, message: 'Lỗi: ' + err });
        } else {
            if (!newsCandidate) {
                res.json({ success: false, message: 'Rỗng' });
            } else {
                var count = 0;
                count = newsCandidate.length;
                res.json({ success: true, countnewsCandidate: count, listnewsCandidate: newsCandidate });
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
                    if (candidate) {
                        News_CandidateModel.find({ news: id_news }, function (err, news) {
                            // console.log(candidate._id);
                            var id_candidate = candidate._id + "";
                            if (err) {
                                res.json({ success: false, message: err });
                            } else {
                                for (var u in news) {
                                    if (news[u].candidate == id_candidate) {
                                        res.json({ success: false, message: 'Có vẻ email của ứng viên đã được giới thiệu ở tin này !' });
                                        return;
                                    }
                                }
                                res.json({ success: true, message: 'Email hợp lệ !' });
                            }
                        });
                    } else {
                        res.json({ success: true, message: 'Email hợp lệ !!' });
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
                    if (candidate) {
                        News_CandidateModel.find({ news: id_news }, function (err, news) {
                            // console.log(candidate._id);
                            var id_candidate = candidate._id + "";
                            if (err) {
                                res.json({ success: false, message: err });
                            } else {
                                for (var u in news) {
                                    if (news[u].candidate == id_candidate) {
                                        res.json({ success: false, message: 'Có vẻ số điện thoại của ứng viên đã được giới thiệu ở tin này !' });
                                        return;
                                    }
                                }
                                res.json({ success: true, message: 'Số điện thoại hợp lệ !' });
                            }
                        });
                    } else {
                        res.json({ success: true, message: 'Số điện thoại hợp lệ !' });
                    }

                }
            });
        }
    }
}

const get5NewCandidate = function (req, res) {
    CandidateModel.find({}).sort({ '_id': -1 }).limit(5).exec(function (err, candiates) {
        if (err) {
            res.json({ success: false, message: err });
        } else {
            if (!users) {
                res.json({ success: false, message: 'Danh sách rỗng' });
            } else {
                res.json({ success: true, listCandidate: candiates });
            }
        }
    });
};

const countNewsCandidate = function (req, res) {
    if (!req.params.status) {
        res.json({ success: false, message: 'No status newscandidate provided' });
    } else {
        News_CandidateModel.find({ "status": req.params.status }, (err, newsCandidates) => {
            if (err) {
                res.json({ success: false, message: 'Invalid status' });
            } else {
                if (!newsCandidates) {
                    res.json({ success: false, messasge: 'newsCandidates was not found' });
                } else {
                    var count = 0;
                    count = newsCandidates.length;
                    res.json({ success: true, counterCandidate: count, newsCandidates: newsCandidates });
                }
            }
        });
    }
};

const countCandidateInNewsByStatus = function (req, res) {
    if (!req.params.id) {
        res.json({ success: false, message: 'No newsId provided' });
    } else {
        if (!req.body.status) {
            res.json({ success: false, message: 'No status newscandidate provided' });
        } else {
            News_CandidateModel.find({ news: req.params.id, status: req.body.status }, (err, newsCandidates) => {
                if (err) {
                    res.json({ success: false, message: 'Invalid status' });
                } else {
                    if (!newsCandidates) {
                        res.json({ success: false, messasge: 'newsCandidates was not found' });
                    } else {
                        var count = 0;
                        count = newsCandidates.length;
                        res.json({ success: true, counterCandidate: count, newsCandidates: newsCandidates });
                    }
                }
            });
        }
    }
};

module.exports = {
    addNew_Candidate,
    editNewsCandidate,
    deleteNewsCandidate,
    getAllNewsCandidate,
    findNewsCandidateById,
    findListCandidateByIdNews,
    findListCandidateByIdUser,
    checkEmail,
    checkPhone,
    get5NewCandidate,
    countNewsCandidate,
    countCandidateInNewsByStatus
}