const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderModelSchema = new Schema({
    codeOrder: {type: String, required: true},
    productName: {type: String, required: true},    
    point_qd: {type: Number},
    orderDay: {type: Date, default: Date.now},
    receivedDay: {type: Date},
    placeOfReceipt: {type: String, required: true},
    status: {type: String},
    employee: {type: Schema.ObjectId, ref: 'UserModel'}

});

const OrderModel = mongoose.model('OrderModel', orderModelSchema);

module.exports = OrderModel;