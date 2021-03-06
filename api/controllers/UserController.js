const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');

const config = require('../config/db');
const Custompassword = require('../Util/Custompassword');

const nodemailer = require('nodemailer');

email = process.env.MAILER_EMAIL_ID || 'devmrhung@gmail.com',
    pass = process.env.MAILER_PASSWORD || 'Hunglv2018';

const client = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: email, // Your email address
        pass: pass // Your password
    },
    tls: { rejectUnauthorized: false }
});

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

const registerWithMail = function (req, res) {
    if (!req.body.email) {
        res.json({ success: false, message: 'cần phải nhập vào e-mail' });
    } else {
        if (!req.body.username) {
            res.json({ success: false, message: 'cần phải nhập vào tên người dùng' });
        } else {
            if (!req.body.phone) {
                res.json({ success: false, message: 'cần phải nhập vào số điện thoại' });
            } else {
                var password = Custompassword.generatorPass();
                let user = new UserModel({
                    email: req.body.email.toLowerCase(),
                    username: req.body.username,
                    phone: req.body.phone,
                    password: password
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
                        // Create e-mail object to send to user
                        var email = {
                            from: 'Admin HKGroup',
                            to: [user.email],
                            subject: '[Phát_sinh_Password]',
                            text: 'Chào bạn: ' + user.username + ', Mật khẩu của bạn là : ' + password
                        };
                        // Function to send e-mail to the user
                        client.sendMail(email, function (err, info) {
                            if (err) {
                                console.log(err); // If error with sending e-mail, log to console/terminal
                                res.json({ success: false, message: 'Kiểm tra lại kết nối mạng ', err });
                            } else {
                                console.log(info); // Log success message to console if sent
                                console.log(user.email); // Display e-mail that it was sent to
                            }
                        });
                        res.json({ success: true, message: 'Đăng ký thành công !, Vui lòng check mail để nhận mật khẩu' });
                        return;
                    }
                });
            }
        }
    }
}

const resetPasswordGmail = function (req, res) {
    if (!req.body.email) {
        res.json({ success: false, message: 'cần phải nhập vào e-mail' });
    } else {
        UserModel.findOne({ email: req.body.email.toLowerCase() }, function (err, user) {
            if (err) {
                res.json({ success: false, message: 'Đây không phải là mail hợp lệ !' });
            } else {
                if (!user) {
                    res.json({ success: false, message: 'Không tìm thấy user này.' }); // Return error message
                } else {
                    var password = Custompassword.generatorPass();
                    user.password = password;
                    user.save((err) => {
                        if (err) {
                            if (err.errors) {
                                res.json({ success: false, message: 'Đảm bảo rằng mail này là đúng' });
                            } else {
                                res.json({ success: false, message: err }); // Return error message
                            }
                        } else {
                            // Create e-mail object to send to user
                            var email = {
                                from: 'Admin HKGroup',
                                to: [user.email],
                                subject: '[Resert_Password]',
                                text: 'Chào bạn: ' + user.username + ', Mật khẩu mới của bạn là : ' + password
                            };
                            // Function to send e-mail to the user
                            client.sendMail(email, function (err, info) {
                                if (err) {
                                    console.log(err);
                                    res.json({ success: false, message: 'Kiểm tra lại kết nối mạng ', err });
                                } else {
                                    console.log(info); 
                                    console.log(user.email); 
                                }
                            });
                            res.json({ success: true, message: 'Reset mật khẩu thành công!, Vui lòng check mail để nhận mật khẩu' });
                            return;
                        }
                    });
                }
            }
        })
    }
}
const checkExitsPass = function (req, res) {
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
                        res.json({ success: true, message: 'Xác nhận mật khẩu thành công!' });
                    }
                }
            }
        });
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
                        if (user.status == 'lock') {
                            res.json({ success: false, message: 'Tài khoản của bạn đã bị khóa, Vui lòng liên hệ admin để được giúp đỡ !' });
                        } else {
                            const validPassword = user.comparePassword(req.body.password);
                            if (!validPassword) {
                                res.json({ success: false, message: 'Mật khẩu không hợp lệ' });
                            } else {
                                const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '24h' });
                                res.json({ success: true, message: 'Đăng nhập thành công !', token: token, user: { username: user.username, role: user.role } });
                            }
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
const checkExitsEmail = function (req, res) {
    if (!req.params.email) {
        res.json({ success: false, massage: 'Chưa nhập E-mail' });
    } else {
        console.log(req.params.email);
        UserModel.findOne({ email: req.params.email }, function (err, user) {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (!user) {
                    res.json({ success: false, message: 'E-mail không tồn tại trong hệ thống.' });
                } else {
                    res.json({ success: true });
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
        UserModel.findOne({ _id: req.body._id }, (err, user) => {
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
const checkToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        res.json({ success: false, message: 'No token provided' });
    } else {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                res.json({ success: false, message: 'Token invalid: ' + err });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    }
};

const getAllUsers = function (req, res) {
    UserModel.find({}, function (err, users) {
        if (err) {
            res.json({ success: false, message: 'Lỗi: ' + err });
        } else {
            if (!users) {
                res.json({ success: false, message: 'Rỗng' });
            } else {
                var count = 0;
                count = users.length;
                res.json({ success: true, countusers: count, listUsers: users });
            }
        }
    });
}

const getTop4Users = function (req, res) {
    UserModel.find({}).sort({ uvNumber: 'desc' }).limit(4).exec(function (err, users) {
        if (err) {
            res.json({ success: false, message: err });
        } else {
            if (!users) {
                res.json({ success: false, message: 'Danh sách rỗng' });
            } else {
                res.json({ success: true, listUsers: users });
            }
        }
    });
};

const get5NewUser = function(req, res){
    UserModel.find({}).sort({'_id':-1}).limit(5).exec(function (err, users) {
        if (err) {
            res.json({ success: false, message: err });
        } else {
            if (!users) {
                res.json({ success: false, message: 'Danh sách rỗng' });
            } else {
                res.json({ success: true, listUsers: users });
            }
        }
    });
};

const editUser = function (req, res) {
    if (!req.body._id) {
        res.json({ success: false, message: 'Chưa cung cấp id user' });
    } else {
        UserModel.findOne({ _id: req.body._id }, (err, user) => {
            if (err) {
                res.json({ success: false, message: 'id user không hợp lệ' });
            } else {
                if (!user) {
                    res.json({ success: false, message: 'Không tìm thấy user có id này.' });
                } else {
                    user.username = req.body.username;
                    user.dateOfBirth = req.body.dateOfBirth;
                    user.sex = req.body.sex;
                    user.address = req.body.address;
                    user.phone = req.body.phone;
                    user.cvFile = req.body.cvFile;
                    user.role = req.body.role;
                    user.save((err) => {
                        if (err) {
                            res.json({ success: false, message: err });
                        } else {
                            res.json({ success: true, message: 'Cập nhật user thành công' });
                        }
                    });
                }
            }
        });
    }
};

const editPointUser = function (req, res) {
    if (!req.body._id) {
        res.json({ success: false, message: 'Chưa cung cấp id user' });
    } else {
        if (!req.body.point) {
            res.json({ success: false, message: 'Chưa có số point cập nhật' });
        } else {
            UserModel.findOne({ _id: req.body._id }, (err, user) => {
                if (err) {
                    res.json({ success: false, message: 'id user không hợp lệ' });
                } else {
                    if (!user) {
                        res.json({ success: false, message: 'Không tìm thấy user có id này.' });
                    } else {
                        user.point = req.body.point,
                            user.save((err) => {
                                if (err) {
                                    res.json({ success: false, message: err });
                                } else {
                                    res.json({ success: true, message: 'Giới thiệu thành công !' });
                                }
                            });
                    }
                }
            });
        }
    }
};

const editPointSignUser = function (req, res) {
    if (!req.body._id) {
        res.json({ success: false, message: 'Chưa cung cấp id user' });
    } else {
        if (!req.body.point) {
            res.json({ success: false, message: 'Chưa có số point cập nhật' });
        } else {
            UserModel.findOne({ _id: req.body._id }, (err, user) => {
                if (err) {
                    res.json({ success: false, message: 'id user không hợp lệ' });
                } else {
                    if (!user) {
                        res.json({ success: false, message: 'Không tìm thấy user có id này.' });
                    } else {
                        user.point = req.body.point,
                        user.uvNumber = req.body.uvNumber
                            user.save((err) => {
                                if (err) {
                                    res.json({ success: false, message: err });
                                } else {
                                    res.json({ success: true, message: 'Cộng point thành công' });
                                }
                            });
                    }
                }
            });
        }
    }
};

const editAvataUser = function (req, res) {
    if (!req.body._id) {
        res.json({ success: false, message: 'Chưa cung cấp id user' });
    } else {
        if (!req.body.urlHinh) {
            res.json({ success: false, message: 'Chưa có hình cập nhật' });
        } else {
            UserModel.findOne({ _id: req.body._id }, (err, user) => {
                if (err) {
                    res.json({ success: false, message: 'id user không hợp lệ' });
                } else {
                    if (!user) {
                        res.json({ success: false, message: 'Không tìm thấy user có id này.' });
                    } else {
                        user.urlHinh = req.body.urlHinh,
                            user.save((err) => {
                                if (err) {
                                    res.json({ success: false, message: err });
                                } else {
                                    res.json({ success: true, message: 'Cập nhật Avatar thành công' });
                                }
                            });
                    }
                }
            });
        }
    }
};

const lockUser = function (req, res) {
    if (!req.body._id) {
        res.json({ success: false, message: 'Chưa cung cấp id user' });
    } else {
        if (!req.body.status) {
            res.json({ success: false, message: 'lock chưa xác định' });
        } else {
            UserModel.findOne({ _id: req.body._id }, (err, user) => {
                if (err) {
                    res.json({ success: false, message: 'id user không hợp lệ' });
                } else {
                    if (!user) {
                        res.json({ success: false, message: 'Không tìm thấy user có id này.' });
                    } else {
                        user.status = req.body.status,
                            user.save((err) => {
                                if (err) {
                                    res.json({ success: false, message: err });
                                } else {
                                    res.json({ success: true, message: 'Đã lock user ' + user.username + ' !' });
                                }
                            });
                    }
                }
            });
        }
    }
};

const unlockUser = function (req, res) {
    if (!req.body._id) {
        res.json({ success: false, message: 'Chưa cung cấp id user' });
    } else {
        if (!req.body.status) {
            res.json({ success: false, message: 'lock chưa xác định' });
        } else {
            UserModel.findOne({ _id: req.body._id }, (err, user) => {
                if (err) {
                    res.json({ success: false, message: 'id user không hợp lệ' });
                } else {
                    if (!user) {
                        res.json({ success: false, message: 'Không tìm thấy user có id này.' });
                    } else {
                        user.status = req.body.status,
                            user.save((err) => {
                                if (err) {
                                    res.json({ success: false, message: err });
                                } else {
                                    res.json({ success: true, message: 'Đã unlock user ' + user.username + ' !' });
                                }
                            });
                    }
                }
            });
        }
    }
};

const editRoleUser = function (req, res) {
    if (!req.body._id) {
        res.json({ success: false, message: 'Chưa cung cấp id user' });
    } else {
        if (!req.body.role) {
            res.json({ success: false, message: 'role user undefined' });
        } else {
            UserModel.findOne({ _id: req.body._id }, (err, user) => {
                if (err) {
                    res.json({ success: false, message: 'id user không hợp lệ' });
                } else {
                    if (!user) {
                        res.json({ success: false, message: 'Không tìm thấy user có id này.' });
                    } else {
                        user.role = req.body.role,
                            user.save((err) => {
                                if (err) {
                                    res.json({ success: false, message: err });
                                } else {
                                    res.json({ success: true, message: 'Cấp quyền thành công' });
                                }
                            });
                    }
                }
            });
        }
    }
};
module.exports = {
    register,
    registerWithMail,
    checkExitsPass,
    login,
    checkEmail,
    getUserProfile,
    updatePasswordUser,
    findUserById,
    checkToken,
    getAllUsers,
    getTop4Users,
    checkExitsEmail,
    resetPasswordGmail,
    editPointUser,
    editUser,
    editAvataUser,
    lockUser,
    unlockUser,
    editPointSignUser,
    editRoleUser,
    get5NewUser

}