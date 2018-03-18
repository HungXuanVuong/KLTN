const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const type_giftModelSchema = new Schema({
    type_name: {type: String, required: true},
    type_infor: {type: String, required: true}
});

const Type_giftModel = mongoose.model('Type_giftModel', type_giftModelSchema);

module.exports = Type_giftModel;