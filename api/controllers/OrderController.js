const OrderModel = require('../models/OrderModel');
const GCodeOrder = require('../Util/GCodeOrder');

const config = require('../config/db');

const getAllOrder = function (req, res) {
    OrderModel.find({}, function (err, order) {
        if (err) {
            res.json({ success: false, message: 'Lỗi: ' + err });
        } else {
            if (!order) {
                res.json({ success: false, message: 'Rỗng' });
            } else {
                var count = 0;
                count = order.length;
                res.json({ success: true, countorder: count, listOrder: order });
            }
        }
    });
};


const getOrderByID = function (req, res) {
    if (!req.params.id) {
        res.json({ success: false, message: 'No order ID was provided.' });
    } else {
        OrderModel.findOne({ _id: req.params.id }, (err, order) => {
            if (err) {
                res.json({ success: false, message: 'Not a valid order id' }); // Return error message
            } else {
                if (!order) {
                    res.json({ success: false, message: 'Order not found.' });
                } else {
                    res.json({ success: true, order: order });
                }
            }
        });
    }
};

const addOrder = function (req, res) {
    
   var codeorder = GCodeOrder.generatorCode();
   let order = new OrderModel({
        codeOrder: codeorder,
        productName: req.body.productName,
        point_qd: req.body.point_qd,
        orderDay: req.body.orderDay,
        receivedDay: req.body.receivedDay,
        placeOfReceipt: req.body.placeOfReceipt,
        employee: req.body.employee,
        status: 'Đang chờ'
    });
    //console.log(order);
    order.save(function (err) {
        if (err) {
            res.json({ success: false, message: err });
        } else {
            res.json({ success: true, order: order ,message: 'Lưu thành công!' });
        }
    });     
};

const editOrder = function (req, res) {
    if (!req.body._id) {
        res.json({ success: false, message: 'No order ID was provided.' });
    } else {
        OrderModel.findOne({ _id: req.body._id }, (err, order) => {
            if (err) {
                res.json({ success: false, message: 'Not a valid order id' });
            } else {
                if (!order) {
                    res.json({ success: false, message: 'Order id was not found.' });
                } else {
                    order.codeOrder = req.body.codeOrder,
                    order.productName = req.body.productName,
                    order.point_qd = req.body.point_qd,
                    order.orderDay = req.body.orderDay,
                    // create_date: Date.now,
                    order.receivedDay = req.body.receivedDate,
                    order.placeOfReceipt = req.body.placeOfReceipt,
                    order.status = req.body.status,
                    order.employee = req.body.employee
                    order.save((err) => {
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

const deleteOrder = function(req, res){
    if (!req.params.id) {
        res.json({ success: false, message: 'No id provided' });
      } else {
        OrderModel.findOne({ _id: req.params.id }, (err, order) => {
          if (err) {
            res.json({ success: false, message: 'Invalid id' }); 
          } else {
            if (!order) {
              res.json({ success: false, messasge: 'order was not found' }); 
            } else {
                order.remove((err) => {
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
const editStatusAndDay = function(req, res){
    if (!req.body._id) {
        res.json({ success: false, message: 'Chưa cung cấp id đơn hàng' });
    }else{
        if(!req.body.status){
            res.json({ success: false, message: 'Chưa có tình trạng cập nhật' });
        }else{
            OrderModel.findOne({ _id: req.body._id }, (err, order) => {
                if (err) {
                    res.json({ success: false, message: 'id đơn hàng không hợp lệ' });
                } else {
                    if (!order) {
                        res.json({ success: false, message: 'Không tìm thấy đơn hàng có id này.' });
                    } else {
                        order.status = req.body.status,
                        order.receivedDay = new Date()
                        console.log(order);
                        order.save((err) => {
                            if (err) {
                                res.json({ success: false, message: err });
                            } else {
                                res.json({ success: true, message: 'Cập nhật point thành công' });
                            }
                        });
                    }
                }
            });
        }
    }
};
module.exports = {
    getAllOrder,
    getOrderByID,
    addOrder,
    editOrder,
    deleteOrder,
    editStatusAndDay
}