// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    category:Date,
    price:mongoose.Decimal128,
    unitWeight: mongoose.Decimal128,
    host: String,
    dateCreated: Date
});

// Export the Mongoose model
module.exports = mongoose.model('Task', TaskSchema);