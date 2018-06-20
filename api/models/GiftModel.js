const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const giftModelSchema = new Schema({
    product_name: {type: String},
    urlHinh: {type: String},
    trademark: {type: String},
    amount: {type: Number}, 
    create_date: {type: Date, default: Date.now},   
    point_sp: {type: Number},
    product_infor: {type: String},
    type_giftID : {
         type:Schema.ObjectId, ref: 'Type_giftModel'
    },
    employee: {type: Schema.ObjectId, ref: 'UserModel'}
});

const GiftModel = mongoose.model('GiftModel', giftModelSchema);

module.exports = GiftModel;