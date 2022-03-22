// Load required packages
let mongoose = require('mongoose');

// Define our user schema
let OrderSchema = new mongoose.Schema({
    buyerID: mongoose.Types.ObjectId,
    sellerID: mongoose.Types.ObjectId,
    postID: mongoose.Types.ObjectId,
    price: Number,
    // unitWeight: Number,
});

// Export the Mongoose model
// module.exports = mongoose.model('Order', OrderSchema);
module.exports = OrderSchema;
