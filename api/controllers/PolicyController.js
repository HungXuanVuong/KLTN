const PolicyModel = require('../models/PolicyModel');

const getAllPolicy = function(req, res){
    PolicyModel.find({}, function(err, policys){
        if(err){
            res.json({success: false, message: 'Lỗi: ' + err});
        }else{
            if(!policys){
                res.json({success: false, message: 'Rỗng'});
            }else{
                var count = 0;
                count = policys.length;
                res.json({success: true, countpolicy: count, listPolicy: policys});
            }
        }
    });
};

const getSinglePolicy = function (req, res) {
    if (!req.params.id) {
        res.json({ success: false, message: 'No policy ID was provided.' });
    } else {
        PolicyModel.findOne({ _id: req.params.id }, (err, policy) => {
            if (err) {
                res.json({ success: false, message: 'Not a valid policy id' }); // Return error message
            } else {
                if (!policy) {
                    res.json({ success: false, message: 'news not found.' });
                } else {
                    res.json({ success: true, policy: policy });
                }
            }
        });
    }
}

const addPolicy = function(req, res){

    if(!req.body.pName){
        res.json({ success: false, message: 'Bạn phải nhập vào tên chính sách' });
    }else{
        if(!req.body.pointFile){
            res.json({success: false, message: 'Bạn phải nhập vào điểm cho vòng hồ sơ'});
        }else{
            if(!req.body.pointInterview){
                res.json({success: false, message: 'Bạn phải nhập vào điểm cho vòng phỏng vấn'});
            }else{
                if(!req.body.pointSign){
                    res.json({success: false, message: 'Bạn phải nhập vào điểm cho vòng ký hợp đồng'});
                }else{
                    let policy = new PolicyModel({
                        pName: req.body.pName,
                        pointFile: req.body.pointFile,
                        pointInterview: req.body.pointInterview,
                        pointSign: req.body.pointSign
                    });
                    policy.save(function(err){
                        if(err){
                            if(err.code === 11000){
                                res.json({ success: false, message: 'Tên chính sách này đã tồn tại' });
                            }else{
                                if(err.errors){
                                    if(err.errors.pName){
                                        res.json({ success: false, message: err.errors.pName.message });
                                    }else{
                                        if(err.errors.pointFile){
                                            res.json({ success: false, message: err.errors.pointFile.message });
                                        }else{
                                            if(err.errors.pointInterview){
                                                res.json({ success: false, message: err.errors.pointInterview.message });
                                            }else{
                                                if(err.errors.pointSign){
                                                    res.json({ success: false, message: err.errors.pointSign.message });
                                                }
                                            }
                                        }
                                    }
                                }else{
                                    res.json({ success: false, message: 'Lưu thất thông tin chính sách thất bại, Lỗi: ', err });
                                }
                            }
                        }else{
                            res.json({ success: true, message: 'Lưu thành công!' });
                        }
                    });
                }
            }
        }
    }
};

const deletePolicy = function (req, res) {
    if (!req.params.id) {
        res.json({ success: false, message: 'Chưa cung cấp id' });
    } else {
        PolicyModel.findOne({ _id: req.params.id }, (err, policy) => {
            if (err) {
                res.json({ success: false, message: 'id không hợp lệ' });
            } else {
                if (!policy) {
                    res.json({ success: false, messasge: 'Không tìm thấy chính sách này trong database' });
                } else {
                    policy.remove((err) => {
                        if (err) {
                            res.json({ success: false, message: err }); 
                        } else {
                            res.json({ success: true, message: 'Xóa thành công' }); 
                        }
                    });
                }
            }
        });
    }
};

const editPolicy = function (req, res) {
    if (!req.body._id) {
        res.json({ success: false, message: 'Chưa cung cấp id' });
    } else {
        PolicyModel.findOne({ _id: req.body._id }, (err, policy) => {
            if (err) {
                res.json({ success: false, message: 'Id không hợp lệ' });
            } else {
                if (!policy) {
                    res.json({ success: false, message: 'Không tìm thấy chính sách này' });
                } else {
                    policy.pName = req.body.pName;
                    policy.pointFile = req.body.pointFile;
                    policy.pointInterview = req.body.pointInterview;
                    policy.pointSign = req.body.pointSign;
                    policy.save((err) => {
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

module.exports = {
    addPolicy,
    deletePolicy,
    editPolicy,
    getAllPolicy,
    getSinglePolicy
}