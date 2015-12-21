var User = require('./app/user');
var Post = require('./app/post');
var express= require('express');
var fs = require('fs');
var app = express();
var jwt = require('jwt-simple');
var _ = require('lodash');
var https = require('https');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt-nodejs');
var methodOverride = require('method-override');
//serving static files using nodejs
app.use(express.static(__dirname+'/public'));

//config file
var config = require('./config/config');

app.use(require('./controller/auth/auth'));

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
 app.use(methodOverride('X-HTTP-Method-Override'));

//Welcome page
app.get('/', function(req, res, next){
res.sendfile('./public/app.html'); // load our public/index.html file
});

 //Posts end-points
 app.use('/api/posts', require('./controller/api/posts'));

 //User login, add user, validation end-points
 app.use('/api/user', require('./controller/api/users'));

//FIDO actions
app.use('/api/fido', require('./controller/api/fidoactions'));

// set our port
var port = process.env.PORT || 48181;
//Create an HTTPS server
https.createServer({
  key: fs.readFileSync('cf-key.pem'),
  cert: fs.readFileSync('cf-cert.pem')
}, app).listen(port, function(){
    console.log('Listening on port '+port);
});
