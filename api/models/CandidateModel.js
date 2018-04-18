const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

const candidateModelSchema = new Schema({
    username: {type: String},
    sex: {type: String},
    email: { type: String,lowercase: true, validate: emailValidators },
    phone: {type: String},
    school: {type: String},
    faculty: {type: String},
    cvFile: {type: String},
    create_date: {type: Date, default: Date.now}
});

const CandiateModel = mongoose.model('CandidateModel', candidateModelSchema);
module.exports = CandiateModel;