const GiftModel = require('../models/GiftModel');
const Type_giftModel= require('../models/Type_giftModel');

const config = require('../config/db');

const getAllGift = function(req, res){
    GiftModel.find({}).populate({path: 'type_giftID'}).populate({path: 'employee'}).exec(function(err, gift){
        if(err){
            res.json({success: false, message: 'Lỗi: ' + err});
        }else{
            if(!gift){
                res.json({success: false, message: 'Rỗng'});
            }else{
                var count = 0;
                count = gift.length;
                res.json({success: true, countgift: count, listGift: gift});
            }
        }
    });
};
var insertGift = function (req, res) {
    if (!req.body.product_name) {
        res.json({ success: false, message: 'Bạn cần bổ xung tên sản phẩm' });
    } else {
        if (!req.body.urlHinh) {
            res.json({ success: false, message: 'Bạn cần bổ xung hình ảnh' });
        } else {
            if (!req.body.trademark) {
                res.json({ success: false, message: 'Bạn cần bổ xung thương hiệu quà' });
            } else {
                if (!req.body.amount) {
                    res.json({ success: false, message: 'Bạn cần bổ xung số lượng quà tồn' });
                } else {
                if (!req.body.create_date) {
                    res.json({ success: false, message: 'Bạn cần bổ xung ngày nhập kho quà' });
                }else{
                    if (!req.body.point_sp) {
                        res.json({ success: false, message: 'Bạn cần bổ xung điểm quy đổi quà tương ứng' });
                    } else {
                       if (!req.body.product_infor) {
                           res.json({ success: false, message: 'Bạn cần bổ sung thông tin sản phẩm tương ứng' });
                      }else {
                          if (!req.body.type_giftID) {
                        res.json({ success: false, message: 'Bạn cần bổ sung loại quà cho sản phẩm tương ứng' });
                    }else {
                        if (!req.body.employee) {
                      res.json({ success: false, message: 'Bạn cần bổ sung người nhập quà cho sản phẩm tương ứng' });
                  } else {
                        let giftmodel = new GiftModel({
                            
                            product_name: req.body.product_name,
                            urlHinh: req.body.urlHinh,
                            trademark: req.body.trademark,
                            amount: req.body.amount,
                            create_date: req.body.create_date,
                            point_sp: req.body.point_sp,
                            product_infor: req.body.product_infor,
                            type_giftID: req.body.type_giftID,
                            employee: req.body.employee
                        });
                        console.log(giftmodel);
                        giftmodel.save(function (err) {
                            if (err) {
                                res.json({ success: false, message: err });
                            } else {
                                res.json({ success: true, message: 'Lưu thành công !' });
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
    }
};
var editGift = function (req, res) {
    if (!req.body._id) {
        res.json({ success: false, message: 'No gift id provided' });
    } else {
        GiftModel.findOne({ _id: req.body._id }, (err, gift) => {
            if (err) {
                res.json({ success: false, message: 'Not a valid gift id' });
            } else {
                if (!gift) {
                    res.json({ success: false, message: 'Gift id was not found.' });
                } else {
                    gift.product_name = req.body.product_name;
                    gift.urlHinh = req.body.urlHinh;
                    gift.trademark=req.body.trademark;
                    gift.amount=req.body.amount;
                    gift.create_date=req.body.create_date;
                    gift.point_sp=req.body.point_sp;
                    gift.product_infor=req.body.product_infor;
                    gift.type_giftID=req.body.type_giftID;
                    gift.employee=req.body.employee;
                    gift.save((err) => {
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


var deleteGift = function (req, res) {
    if (!req.params.id) {
        res.json({ success: false, message: 'No id provided' });
    } else {
        GiftModel.findOne({ _id: req.params.id }, (err, gift) => {
            if (err) {
                res.json({ success: false, message: 'Invalid id' });
            } else {
                if (!gift) {
                    res.json({ success: false, messasge: 'không tìm thấy sản phẩm này' });
                } else {
                    gift.remove((err) => {
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
var giftById = function (req, res) {
    if (!req.params.id) {
        res.json({ success: false, message: 'No ID was provided.' });
    } else {
        GiftModel.findOne({ _id: req.params.id }, (err, gift) => {
            if (err) {
                res.json({ success: false, message: 'Not a valid id' }); // Return error message
            } else {
                if (!gift) {
                    res.json({ success: false, message: 'Gift not found.' });
                } else {
                    res.json({ success: true, gift: gift });
                }
            }
        });
    }
};
var giftListByTypeofGift = function (req, res) {
    var type_giftID = req.param('type_giftID');

    Type_giftModel.findById(type_giftID, function (err, type_gift) {
        if (err) res.send(err);
        GiftModel.find({ "type_giftID": type_gift._id }, function (err, gift) {
            if (err) {
                res.json({ success: false, message: 'Not a valid id' }); // Return error message
            } else {
                if (!gift) {
                    res.json({ success: false, message: 'type gift not found.' });
                } else {
                    res.json({ success: true, gift: gift });
                }
            }
        });
    });
};
const updateNumberOfGift = function(req, res){
    if (!req.body._id) {
        res.json({ success: false, message: 'Chưa cung cấp id quà' });
    }else{
        if(!req.body.amount){
            res.json({ success: false, message: 'Chưa có số lượng quà cập nhật' });
        }else{
            GiftModel.findOne({ _id: req.body._id }, (err, gift) => {
                if (err) {
                    res.json({ success: false, message: 'id quà không hợp lệ' });
                } else {
                    if (!gift) {
                        res.json({ success: false, message: 'Không tìm thấy quà có id này.' });
                    } else {
                        gift.amount = req.body.amount,
                        console.log(req.body.amount);
                        gift.save((err) => {
                            if (err) {
                                res.json({ success: false, message: err });
                            } else {
                                res.json({ success: true, message: 'Cập nhật số lượng quà thành công' });
                            }
                        });
                    }
                }
            });
        }
    }
};
module.exports = {
    getAllGift,
    insertGift,
    deleteGift,
    editGift,
    giftById,
    giftListByTypeofGift,
    updateNumberOfGift
}