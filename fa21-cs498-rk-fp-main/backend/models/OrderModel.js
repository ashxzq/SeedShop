let mongoose = require('mongoose');
let OrderSchema = require('./OrderSchema')
module.exports = mongoose.model('Order', OrderSchema);
