let mongoose = require('mongoose');
let PostSchema = require('./PostSchema')
module.exports = mongoose.model('Post', PostSchema);
