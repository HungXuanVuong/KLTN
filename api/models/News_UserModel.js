const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const news_UserModelSchema = new Schema({
    news: {type: Schema.ObjectId, ref: 'NewsModel'},
    user: {type: Schema.ObjectId, ref: 'UserModel'},
    status: {type: String, default:'Hồ sơ'},
    create_date: {type:Date, default: Date.now}
});

const News_UserModel = mongoose.model('News_UserModel', news_UserModelSchema);

module.exports = News_UserModel;