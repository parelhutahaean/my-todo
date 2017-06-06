const jwt = require('jsonwebtoken');
require('dotenv').config();
var methods = {};

methods.authenticate = function(req, res, next) {
  jwt.verify(req.headers.token, process.env.JWT_SECRET, function(err, decoded) {
    if (decoded) {
      req.user = decoded;
      next();
    } else {
      res.send({message: 'User not authenticated'});
    }
  });
}


module.exports = methods;
