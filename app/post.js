//var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/mydb');

var db = require('./db');
var Post = db.model('Post', {
    //username: {type: String, default: ''},
    username: {type: String, required: true},
    body: {type: String, select: true},
    date: {type: Date, required: true, default: Date.now}
});

module.exports = Post;
