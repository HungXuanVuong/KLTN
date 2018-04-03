const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PolicySchema = new Schema({
    pName: {type:String, require:true, unique:true},
    pointFile: Number,
    pointInterview: Number,
    pointSign: Number
});

const PolicyModel = mongoose.model('PolicyModel', PolicySchema);

module.exports = PolicyModel;