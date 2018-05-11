const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const news_CandidateModelSchema = new Schema({
    candidate: {type: Schema.ObjectId, ref: 'CandidateModel'},
    news: {type: Schema.ObjectId, ref: 'NewsModel'},
    user: {type: Schema.ObjectId, ref: 'UserModel'},
    status: {type: String, default:'Hồ sơ'},
    create_date: {type:Date, default: Date.now}
});

const News_CandidateModel = mongoose.model('News_CandidateModel', news_CandidateModelSchema);

module.exports = News_CandidateModel;