const Todo = require('../models/todo');

var methods = {};

methods.insert = function(req, res) {
  req.body.user = req.user._id;
  Todo.create(req.body, function(err, result) {
    if (err) res.send({err});
    res.send(result);
  })
}

methods.getAll = function(req, res) {
  Todo.find({})
  .populate('user')
  .exec(function(err, result) {
    if (err) res.send({err});
    res.send(result);
  })
}

methods.getById = function(req, res) {
  Todo.findById(req.params.id)
  .populate('user')
  .exec(function(err, result) {
    if (err) res.send({err});
    res.send(result);
  })
}

methods.getByUserId = function(req, res) {
  Todo.find({ user: req.params.id })
  .populate('user')
  .exec(function(err, result) {
    if (err) res.send({err});
    res.send(result);
  })
}

methods.update = function(req, res) {
  Todo.update({ _id: req.params.id }, {
    $set: req.body
  }, function(err, result) {
    if (err) res.send({err});
    res.send(result);
  })
}

methods.delete = function(req, res) {
  Todo.remove({ _id: req.params.id }, function(err, result) {
    if (err) res.send({err});
    res.send(result);
  })
}

module.exports = methods;
