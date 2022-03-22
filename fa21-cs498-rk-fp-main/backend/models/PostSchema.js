// Load required packages
let mongoose = require('mongoose');

// Define our user schema
let PostSchema = new mongoose.Schema({
    hostID: mongoose.Types.ObjectId,
    title: String,
    category: String,
    price: Number,
    unitWeight: String,
    description: String,
    dateCreated: Date,
    photo: String,
});

// Export the Mongoose model
// module.exports = mongoose.model('Post', PostSchema);
module.exports = PostSchema;
