const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');

const config = require('../config/db');

const register = function (req, res) {
    if (!req.body.email) {
        res.json({ success: false, message: 'cần phải nhập vào e-mail' });
    } else {
        if (!req.body.password) {
            res.json({ success: false, message: 'cần phải nhập vào password' });
        } else {
            if (!req.body.username) {
                res.json({ success: false, message: 'cần phải nhập vào tên người dùng' });
            } else {
                let user = new UserModel({
                    email: req.body.email.toLowerCase(),
                    username: req.body.username,
                    password: req.body.password,
                    dateOfBirth: req.body.dateOfBirth,
                    sex: req.body.sex,
                    address: req.body.address,
                    phone: req.body.phone
                });
                user.save(function (err) {
                    if (err) {
                        if (err.code === 11000) {
                            res.json({ success: false, message: 'Email đã được đăng ký.' });
                        } else {
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
                                res.json({ success: false, message: 'đăng ký thất bại, lỗi: ', err });
                            }
                        }
                    } else {
                        res.json({ success: true, message: 'Đăng ký thành công !' });
                    }
                });
            }
        }
    }
}

const login = function (req, res) {
    if (!req.body.email) {
        res.json({ success: false, message: 'Bạn chưa nhập email' });
    } else {
        if (!req.body.password) {
            res.json({ success: false, message: 'Bạn chưa nhập vào password' });
        } else {
            UserModel.findOne({ email: req.body.email.toLowerCase() }, function (err, user) {
                if (err) {
                    res.json({ success: false, message: err });
                } else {
                    if (!user) {
                        res.json({ success: false, message: 'Email không tồn tại' });
                    } else {
                        const validPassword = user.comparePassword(req.body.password);
                        if (!validPassword) {
                            res.json({ success: false, message: 'Mật khẩu không hợp lệ' });
                        } else {
                            const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '24h' });
                            res.json({ success: true, message: 'Đăng nhập thành công !', token: token, user: { username: user.username } });
                        }
                    }
                }
            });
        }
    }
};

const checkEmail = function (req, res) {
    if (!req.params.email) {
        res.json({ success: false, massage: 'E-mail chưa nhập' });
    } else {
        console.log(req.params.email);
        UserModel.findOne({ email: req.params.email }, function (err, user) {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (user) {
                    res.json({ success: false, message: 'E-mail này đã đăng ký' });
                } else {
                    res.json({ success: true, message: 'E-mail này hợp lệ' });
                }
            }
        });
    }
};
const findUserById = function (req, res) {
    if (!req.params.id) {
        res.json({ success: false, message: 'id user chưa được cung cấp.' });
    } else {
        UserModel.findOne({ _id: req.params.id }, (err, user) => {
            if (err) {
                res.json({ success: false, message: 'id user không hợp lệ' }); // Return error message
            } else {
                if (!user) {
                    res.json({ success: false, message: 'Không tìm thấy user này' });
                } else {
                    res.json({ success: true, user: user });
                }
            }
        });
    }
};
const getUserProfile = function (req, res) {
    UserModel.findOne({ _id: req.decoded.userId }).exec((err, user) => {
        if (err) {
            res.json({ success: false, message: err });
        } else {
            if (!user) {
                res.json({ success: false, message: 'User không tìm thấy' });
            } else {
                res.json({ success: true, user: user });
            }
        }
    });
};

const updatePasswordUser = function (req, res) {
    if (!req.body._id) {
        res.json({ success: false, message: 'id user chưa được cung cấp' });
    } else {
        User.findOne({ _id: req.body._id }, (err, user) => {
            if (err) {
                res.json({ success: false, message: 'id user không hợp lệ' });
            } else {
                if (!user) {
                    res.json({ success: false, message: 'không tìm thấy user với id này' });
                } else {
                    user.password = req.body.password;
                    user.save((err) => {
                        if (err) {
                            res.json({ success: false, message: err });
                        } else {
                            res.json({ success: true, message: 'Thay đổi thông tin thành công !' });
                        }
                    });
                }
            }
        });
    }
};
const checkToken = (req, res, next) =>{
    const token = req.headers['authorization'];
    if(!token){
        res.json({success: false, message: 'No token provided'});
    }else{
        jwt.verify(token, config.secret, (err, decoded) =>{
            if(err){
                res.json({success: false, message: 'Token invalid: ' + err});
            }else{
                req.decoded = decoded; 
                next();
            }
        });
    }
};

const getAllUsers = function(req, res){
    UserModel.find({}, function(err, users){
        if(err){
            res.json({success: false, message: 'Lỗi: ' + err});
        }else{
            if(!users){
                res.json({success: false, message: 'Rỗng'});
            }else{
                var count = 0;
                count = users.length;
                res.json({success: true, countusers: count, listUsers: users});
            }
        }
    });
}

const getTop4Users = function(req, res){
    UserModel.find({}).sort({uvNumber: 'desc'}).limit(4).exec(function(err, users){
        if(err){
            res.json({success: false, message: err});
        }else{
            if(!users){
                res.json({success: false, message: 'Danh sách rỗng'});
            }else{
                res.json({success: true, listUsers: users});
            }
        }
    });
};

module.exports = {
    register,
    login,
    checkEmail,
    getUserProfile,
    updatePasswordUser,
    findUserById,
    checkToken,
    getAllUsers,
    getTop4Users
}