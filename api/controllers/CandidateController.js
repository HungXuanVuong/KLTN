const CandidateModel = require('../models/CandidateModel');
const config = require('../config/db');
const Custompassword = require('../Util/Custompassword');

const News_CandidateController = require('./New_CandidateController');

News_CandidateModel = require('../models/News_CadidateModel');

const checkEmail = function (req, res) {
    if (!req.params.email) {
        res.json({ success: false, massage: 'E-mail chưa nhập' });
    } else {
        console.log(req.params.email);
        CandidateModel.findOne({ email: req.params.email }, function (err, candidate) {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (candidate) {
                    res.json({ success: false, message: 'E-mail này đã đăng ký' });
                } else {
                    res.json({ success: true, message: 'E-mail này hợp lệ' });
                }
            }
        });
    }
};
const checkExitsEmail = function (req, res) {
    if (!req.params.email) {
        res.json({ success: false, massage: 'Chưa nhập E-mail' });
    } else {
        console.log(req.params.email);
        CandidateModel.findOne({ email: req.params.email }, function (err, candidate) {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (!candidate) {
                    res.json({ success: false, message: 'E-mail không tồn tại trong hệ thống.' });
                } else {
                    res.json({ success: true });
                }
            }
        });
    }
};

const addCandidate = function (req, res) {
    if (!req.body.username) {
        res.json({ success: false, message: 'Vui lòng nhập vào tên ứng viên.' });
    } else {
        if (!req.body.sex) {
            res.json({ success: false, message: 'Bạn chưa chọn giới tính.' });
        } else {
            if (!req.body.email) {
                res.json({ success: false, message: 'Bạn chưa nhập vào mail ứng viên.' });
            } else {
                if (!req.body.phone) {
                    res.json({ success: false, message: 'Bạn chưa nhập số điện thoại ứng viên.' });
                } else {
                    if (!req.body.school) {
                        res.json({ success: false, message: 'Bạn chưa nhập trường ứng viên tốt nghiệp.' });
                    } else {
                        if (!req.body.faculty) {
                            res.json({ success: false, message: 'Bạn chưa nhập khoa ứng viên học.' });
                        }
                        else {
                            if (!req.body.cvFile) {
                                res.json({ success: false, message: 'Bạn cung cấp cvFile ứng viên.' });
                            } else {
                                let candidate = new CandidateModel({
                                    username: req.body.username,
                                    sex: req.body.sex,
                                    email: req.body.email,
                                    phone: req.body.phone,
                                    school: req.body.school,
                                    faculty: req.body.faculty,
                                    cvFile: req.body.cvFile
                                });
                                candidate.save(function (err, candidatenew) {
                                    if (err) {
                                        if (err.errors) {
                                            if (err.errors.email) {
                                                res.json({ success: false, message: err.errors.email.message });
                                            } else {
                                                if (err.errors.password) {
                                                    res.json({ success: false, message: err.errors.password.message });
                                                } else {
                                                    res.json({ success: false, message: err });
                                                }
                                            }
                                        } else {
                                            res.json({ success: false, message: 'Giới thiệu thất bại: ', err });
                                        }
                                    } else {
                                        res.json({ success: true, candidate: candidatenew, message: 'Thông tin ứng viên đã được lưu ! '});
                                    }
                                });
                            }
                        }
                    }
                }
            }
        }
    }
};

const findCandidateById = function (req, res) {
    if (!req.params.id) {
        res.json({ success: false, message: 'id candidate chưa được cung cấp.' });
    } else {
        CandidateModel.findOne({ _id: req.params.id }, (err, candidate) => {
            if (err) {
                res.json({ success: false, message: 'id candidate không hợp lệ' }); // Return error message
            } else {
                if (!candidate) {
                    res.json({ success: false, message: 'Không tìm thấy candidate này' });
                } else {
                    res.json({ success: true, candidate: candidate });
                }
            }
        });
    }
};


const getAllCandidate = function (req, res) {
    CandidateModel.find({}, function (err, candidate) {
        if (err) {
            res.json({ success: false, message: 'Lỗi: ' + err });
        } else {
            if (!candidate) {
                res.json({ success: false, message: ' Danh sach Rỗng' });
            } else {
                var count = 0;
                count = candidate.length;
                res.json({ success: true, countusers: count, listCandidate: candidate });
            }
        }
    });
}


const editCandidate = function (req, res) {
    if (!req.body._id) {
        res.json({ success: false, message: 'Chưa cung cấp id Candidate' });
    } else {
        CandidateModel.findOne({ _id: req.body._id }, (err, candidate) => {
            if (err) {
                res.json({ success: false, message: 'id Candidate không hợp lệ' });
            } else {
                if (!candidate) {
                    res.json({ success: false, message: 'Không tìm thấy Candidate có id này.' });
                } else {
                    candidate.username = req.body.username,
                        candidate.sex = req.body.sex,
                        candidate.email = req.body.email,
                        candidate.phone = req.body.phone,
                        candidate.school = req.body.school,
                        candidate.faculty = req.body.faculty,
                        candidate.cvFile = req.body.cvFile,
                        candidate.save((err) => {
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

const deleteCandidate = function (req, res) {
    if (!req.params.id) {
        res.json({ success: false, message: 'No id provided' });
    } else {
        CandidateModel.findOne({ _id: req.params.id }, (err, candidate) => {
            if (err) {
                res.json({ success: false, message: 'Invalid id' });
            } else {
                if (!candidate) {
                    res.json({ success: false, messasge: 'candidate was not found' });
                } else {
                    candidate.remove((err) => {
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
    checkEmail,
    addCandidate,
    editCandidate,
    deleteCandidate,
    findCandidateById,
    getAllCandidate

}