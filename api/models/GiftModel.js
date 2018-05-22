const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const giftModelSchema = new Schema({
    product_name: {type: String},
    urlHinh: {type: String},
    trademark: {type: String},
    amount: {type: Number},    
    point_sp: {type: Number},
    product_infor: {type: String},
    type_giftID : {
         type:Schema.ObjectId, ref: 'Type_giftModel'
    }
});

const GiftModel = mongoose.model('GiftModel', giftModelSchema);

module.exports = GiftModel;