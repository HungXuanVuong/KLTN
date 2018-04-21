const Type_giftModel = require('../models/Type_giftModel');

const config = require('../config/db');

const getAllTypeGift = function(req, res){
    Type_giftModel.find({}, function(err, typegift){
        if(err){
            res.json({success: false, message: 'Lỗi: ' + err});
        }else{
            if(!typegift){
                res.json({success: false, message: 'Rỗng'});
            }else{
                var count = 0;
                count = typegift.length;
                res.json({success: true, counttypegift: count, listTypegift: typegift});
            }
        }
    });
};
var editTypeGift = function (req, res) {
    if (!req.body._id) {
        res.json({ success: false, message: 'No Typegift id provided' });
    } else {
        Type_giftModel.findOne({ _id: req.body._id }, (err, typegift) => {
            if (err) {
                res.json({ success: false, message: 'Not a valid typegift id' });
            } else {
                if (!typegift) {
                    res.json({ success: false, message: 'typegift id was not found.' });
                } else {
                    typegift.type_name = req.body.type_name;
                    typegift.type_infor = req.body.type_infor;
                    typegift.save((err) => {
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


var deleteTypeGift = function (req, res) {
    if (!req.params.id) {
        res.json({ success: false, message: 'No id provided' });
    } else {
        Type_giftModel.findOne({ _id: req.params.id }, (err, type_giftmodel) => {
            if (err) {
                res.json({ success: false, message: 'Invalid id' });
            } else {
                if (!type_giftmodel) {
                    res.json({ success: false, messasge: 'không tìm thấy loại quà này' });
                } else {
                    type_giftmodel.remove((err) => {
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
};

var insertTypeGift = function (req, res) {
    if (!req.body.type_name) {
        res.json({ success: false, message: 'Bạn cần bổ sung tên loại quà quy đổi' });
    } else {
        if (!req.body.type_infor) {
            res.json({ success: false, message: 'Bạn cần bổ sung thông tin loại quà quy đổi' });
        } else {
                        let type_giftmodel = new Type_giftModel({
                            
                            type_name: req.body.type_name,
                            type_infor: req.body.type_infor
                        });
                        console.log(type_giftmodel);
                        type_giftmodel.save(function (err) {
                            if (err) {
                                res.json({ success: false, message: err });
                            } else {
                                res.json({ success: true, message: 'Lưu thành công !' });
                            }
                        });
                    }
                }
    
};
var typeGiftById = function (req, res) {
    if (!req.params.id) {
        res.json({ success: false, message: 'No ID was provided.' });
    } else {
        Type_giftModel.findOne({ _id: req.params.id }, (err, typegift) => {
            if (err) {
                res.json({ success: false, message: 'Not a valid id' }); // Return error message
            } else {
                if (!typegift) {
                    res.json({ success: false, message: 'type gift not found.' });
                } else {
                    res.json({ success: true, typegift: typegift });
                }
            }
        });
    }
};
module.exports = {
    getAllTypeGift,
    editTypeGift,
    deleteTypeGift,
    insertTypeGift,
    typeGiftById
}