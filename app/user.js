var db = require('./db');
var User = db.model('User', {
    //username: {type: String, default: ''},
    username: String,
    password: {type: String, select: false}
});

module.exports = User;
/*var mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost/mydb');

module.exports = mongoose.model('User', {
    //username: {type: String, default: ''},
    username: String,
    password: {type: String, select: false}
});*/
