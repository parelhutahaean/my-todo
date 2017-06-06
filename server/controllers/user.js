const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

var methods = {};

methods.register = function(req, res) {
  User.findOne({ email: req.body.email }, function(err, result) {
    if (err) res.send({err});
    if(!result) {
      var hash = bcrypt.hashSync(req.body.password, parseInt(process.env.SALT_ROUNDS));
      req.body.password = hash;
      User.create(req.body, function(err, result) {
        if (err) res.send({err});
        res.send(result);
      })
    } else {
      res.send({message: 'The email address has been used'});
    }
  })
}

methods.login = function(req, res) {
  User.findOne({ email: req.body.email }, function(err, result) {
    if (err) res.send({err});
    if (result) {
      if (bcrypt.compareSync(req.body.password, result.password)) {
        var user = result._doc;
        delete user.password;
        var token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '3h' });
        res.send({token, user});
      } else {
        res.send({message: "Password not matched"});
      }
    } else {
      res.send({message: "User not found"});
    }
  })
}

methods.loginFB = function(req, res) {
  console.log(req.body);
  User.findOne({ fb_id: req.body.id }, function(err, result) {
    if (err) res.send({err});
    if (!result) { // User FB baru
      req.body.fb_id = req.body.id;
      User.create(req.body, function(err, result2) {
        if (err) res.send({err});
        var token = jwt.sign(result2._doc, process.env.JWT_SECRET, { expiresIn: '3h' });
        console.log(token);
        res.send({token, user: result2});
      })
    } else {
      var token = jwt.sign(result._doc, process.env.JWT_SECRET, { expiresIn: '3h' });
      console.log(token);
      res.send({token, user: result});
    }
  })
}

methods.getAll = function(req, res) {
  User.find({}, function(err, result) {
    if (err) res.send({err});
    res.send(result);
  })
}

methods.getById = function(req, res) {
  User.findById(req.params.id, function(err, result) {
    if (err) res.send({err});
    res.send(result);
  })
}

methods.update = function(req, res) {
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, parseInt(process.env.SALT_ROUNDS));
  }
  User.update({ _id: req.params.id }, {
    $set: req.body
  }, function(err, result) {
    if (err) res.send({err});
    res.send(result);
  })
}

methods.delete = function(req, res) {
  User.remove({ _id: req.params.id}, function(err, result) {
    if (err) res.send({err});
    res.send(result);
  })
}

methods.appId = function(req, res) {
  res.send({appId: process.env.APP_ID});
}

module.exports = methods;
