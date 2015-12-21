var rest = require("../../restcall");
var router = require('express').Router();

//POST preregister method
router.post('/preregister', function(req, res, next){
    //encodeURIComponent(JSON.stringify({"a" : "b"}))
console.log("Inside pre-register");
console.log("Received req.auth.username = "+req.auth.username);
    var options = {
      host: 'fidodemo.strongauth.com',
      path: '/skfe/restfido/preregister?did=1&protocol=U2F_V2&payload=%7B%22username%22%3A%22'+req.auth.username+'%22%7D'
    };
      //https.request(options, callback).end();
      //http://stackoverflow.com/questions/9577611/http-get-request-in-node-js-express
      rest.getJSON(options,
          function(statusCode, result)
          {
              console.log("onResult: (" + statusCode + ")" + JSON.stringify(result));
              res.statusCode = statusCode;
              res.send(result);
          });
});
//POST pre-authenticate
router.post('/preauthenticate', function(req, res, next){
    console.log("Inside pre-authenticate");
    console.log("Received req.auth.username = "+req.auth.username);

    var options = {
        host: 'fidodemo.strongauth.com',
        path: '/skfe/restfido/preauthenticate?did=1&protocol=U2F_V2&payload=%7B%22username%22%3A%22'+req.auth.username+'%22%7D'
    };
    //http://stackoverflow.com/questions/9577611/http-get-request-in-node-js-express
    rest.getJSON(options,
        function(statusCode, result)
        {
            console.log("onResult: (" + statusCode + ")" + JSON.stringify(result));
            res.statusCode = statusCode;
            res.send(result);
        });

});

//POST register method
router.post('/register', function(req, res, next){
    //console.log(req.body.Adata);
var Adata = {"metadata":{"version":"1.0","create_location":"unknown"},"response":req.body.Adata};

    var options = {
      host: 'fidodemo.strongauth.com',
      path: '/skfe/restfido/register?did=1',
      method: 'POST',
      headers: {
          'Content-Type' : 'application/json'
      }
    };
    rest.postJSON(options, Adata,
        function(statusCode, result)
        {
            console.log("onResult: (" + statusCode + ")" + JSON.stringify(result));
            res.statusCode = statusCode;
            res.send(result);
        });
});

//POST register method
router.post('/authenticate', function(req, res, next){
    //console.log(req.body.Adata);
var Adata = {"metadata":{"version":"1.0","last_used_location":"unknown"},"response":req.body.Adata};

    var options = {
      host: 'fidodemo.strongauth.com',
      path: '/skfe/restfido/authenticate?did=1',
      method: 'POST',
      headers: {
          'Content-Type' : 'application/json'
      }
    };
    rest.postJSON(options, Adata,
        function(statusCode, result)
        {
            console.log("onResult: (" + statusCode + ")" + JSON.stringify(result));
            res.statusCode = statusCode;
            res.send(result);
        });
});

module.exports = router;
