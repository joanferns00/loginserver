var User = require('../../app/user');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');
var router = require('express').Router();
//config file
var config = require('../../config/config');

//Get user information
//GET method to decode a JWT
/*
curl -H "X-Auth: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImNoZXJ5bCJ9.R7T7vnTbcqk5ljDhzNVE_yUtXVeWKBIAW9fJuzi0QJA" localhost:8080/user
*/
router.get('/', function(req, res, next){
    console.log('Getting user info for' );
    console.log(req.auth);
    // var token = req.headers['x-auth'];
    //var auth = jwt.decode(token, config.secret);
    // var auth = req.auth.username;
    User.findOne({username: req.auth.username}, function(err, user){
        //if theres an error, return it
        if(err){console.log("Error GET user: "+err); return next(err);}
            res.json(user);
    });

});
//Add a new user
router.post('/', function(req, res, next){

    var user = new User({username: req.body.username});
    bcrypt.hash(req.body.password, null, null, function(err, hash) {
        user.password = hash;
        user.save(function(err, user){
            if(err) {throw next(err);}
            res.send(201);
        });
    });
});
/*
curl -X POST -d "{\"username\":\"cheryl\", \"password\": \"pass\"}" -H "Content-Type: application/json" localhost:8080/session
*/
//Validate the user
router.post('/session', function(req, res, next){

    //Find user by username
    User.findOne({'username': req.body.username})
    .select("password")
    .select("username")
    .exec(function(err, user){
        //If theres an error, return it
        if(err){ console.log("Error username: "+err); return next(err);}
        //If user doesnt exist, send 401
        if(!user){console.log("401 Error"); return res.send(401);}
        //If user exists, initiate password comparison
        bcrypt.compare(req.body.password, user.password, function(err, valid){
            //if theres an error, return it
            if(err){console.log("Error password: "+err); return next(err);}
            //if passwords dont match, send 401
            if(!valid){console.log("401 Error"); return res.send(401);}
            //If password matches, send back the JWT
            var token = jwt.encode({username: user.username}, config.secret);
            res.json(token);
        });
    });
});

module.exports = router;
