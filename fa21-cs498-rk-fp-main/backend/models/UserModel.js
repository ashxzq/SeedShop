// Load required packages
let mongoose = require('mongoose');

// Define our user schema
let UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    firstName: String,
    lastName: String,
    address: String,
    phoneNumber: String,

    city: String,
    state: String,
    country: String,
    zipCode: Number,

    posts: [{
        type: mongoose.Types.ObjectId,
        ref: "Post",
    }],
    orders: [{
        type: mongoose.Types.ObjectId,
        ref: "Order",
    }],
    dateCreated: Date,

    avatar: String,
});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);
