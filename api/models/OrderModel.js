const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderModelSchema = new Schema({
    codeOrder: {type: String, required: true},
    orderDay: {type: Date, default: Date.now},
    receivedDay: {type: Date},
    placeOfReceipt: {type: String, required: true},
    status: {type: String},
    product_id: {type: Schema.ObjectId, ref: 'GiftModel'},
    employee: {type: Schema.ObjectId, ref: 'UserModel'},
    employeeSetStatus: {type: String}
});

const OrderModel = mongoose.model('OrderModel', orderModelSchema);

module.exports = OrderModel;