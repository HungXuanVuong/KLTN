const GiftModel = require('../models/GiftModel');
const Type_giftModel= require('../models/Type_giftModel');

const config = require('../config/db');

const getAllGift = function(req, res){
    GiftModel.find({}, function(err, gift){
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
var themGift = function (req, res) {
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
                    if (!req.body.point_sp) {
                        res.json({ success: false, message: 'Bạn cần bổ xung điểm quy đổi quà tương ứng' });
                    } else {
                       if (!req.body.product_infor) {
                           res.json({ success: false, message: 'Bạn cần bổ sung thông tin sản phẩm tương ứng' });
                      }else {
                          if (!req.body.type_giftID) {
                        res.json({ success: false, message: 'Bạn cần bổ sung loại quà cho sản phẩm tương ứng' });
                    } else {
                        let giftmodel = new GiftModel({
                            
                            product_name: req.body.product_name,
                            urlHinh: req.body.urlHinh,
                            trademark: req.body.trademark,
                            amount: req.body.amount,
                            point_sp: req.body.point_sp,
                            product_infor: req.body.product_infor,
                            type_giftID: req.body.type_giftID
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
};

module.exports = {
    getAllGift,
    themGift
}