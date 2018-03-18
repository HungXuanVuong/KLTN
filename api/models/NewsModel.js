const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsModelSchema = new Schema({
    title: {type: String, required: true},
    urlHinh: {type: String, required: true},
    place: {type: String, required: true},
    salary: {type: String, required: true},
    position: {type: String, required: true},
    create_date: {type: Date},
    create_date: {type: Date, default: Date.now},
    exp_date: {type: Date},
    point_uv: {type: Number}
});

const NewsModel = mongoose.model('NewsModel', newsModelSchema);

module.exports = NewsModel;