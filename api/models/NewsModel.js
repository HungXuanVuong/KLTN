const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsModelSchema = new Schema({
    title: {type: String, required: true},
    urlHinh: {type: String, required: true},
    place: {type: String, required: true},
    salary: {type: String, required: true},
    position: {type: String, required: true},
    create_date: {type: Date, default: Date.now},
    exp_date: {type: Date},
    point_uv: {type: Number},
    content: {type: String},
    numberOf: {type: Number},
    status: {type: String, default: 'Hoạt động'},
    newsPolicy: {type: Schema.ObjectId, ref: 'PolicyModel'},
    employee: {type: Schema.ObjectId, ref: 'UserModel'}

});

const NewsModel = mongoose.model('NewsModel', newsModelSchema);

module.exports = NewsModel;