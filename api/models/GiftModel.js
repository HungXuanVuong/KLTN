const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const giftModelSchema = new Schema({
    product_name: {type: String, required: true},
    urlHinh: {type: String, required: true},
    trademark: {type: String, required: true},
    amount: {type: Number},    
    point_sp: {type: Number},
    product_infor: {type: String, required: true},
    type_giftID : {
         type:Schema.ObjectId, ref: 'Type_giftModel'
    }
});

const GiftModel = mongoose.model('GiftModel', giftModelSchema);

module.exports = GiftModel;