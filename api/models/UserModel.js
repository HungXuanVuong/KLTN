const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

let emailLengthChecker = function (email) {
    if (!email) {
        return false;
    } else {
        if (email.length < 5 || email.length > 30) {
            return false;
        } else {
            return true;    
        }
    }
};

let validEmailChecker = function (email) {
    if (!email) {
        return false;
    } else {
        const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regExp.test(email);
    }
};

// Array of Email Validators
const emailValidators = [
    // First Email Validator
    {
        validator: emailLengthChecker,
        message: 'E-mail must be at least 5 characters but no more than 30'
    },
    // Second Email Validator
    {
        validator: validEmailChecker,
        message: 'Must be a valid e-mail'
    }
];
//validator password
let passwordLengthChecker = function (password) {
    if (!password) {
        return false;
    } else {
        if (password.length < 8 || password.length > 30) {
            return false;
        } else {
            return true;
        }
    }
};

let validPassword = function (password) {
    if (!password) {
        return false;
    } else {
        const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
        return regExp.test(password);
    }
}
// Array validator password
const passwordValidators = [
    {
        validator: passwordLengthChecker,
        message: 'password must be at least 8 character but no more than 30'
    },
    {
        validator: validPassword,
        message: 'Must have at least one uppercase, lowercase, special character, and number'
    }
];

const userModelSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true, validate: emailValidators },
    password: { type: String, required: true }, //, required: true, validate: passwordValidators
    username: {type: String},
    dateOfBirth: {type: Date},
    sex: {type: String},
    address: {type: String},
    phone: {type: String},
    urlHinh: {type: String, default: "4.png"},
    cvFile: {type: String},
    point: {type: Number},
    uvNumber: {type: Number, default: 0},
    role: {type: String, default: 'user'},
    register_date: {type: Date, default: Date.now}
});

userModelSchema.pre('save', function (next) {
    if (!this.isModified('password'))
        return next();

    bcrypt.hash(this.password, null, null, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
    });
});

userModelSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

const UserModel = mongoose.model('UserModel', userModelSchema);

module.exports = UserModel;