var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BlogSchema = new Schema({
    title: String,
    author: String,
    category: String
});

module.exports = mongoose.model('blog', BlogSchema, 'blog');
