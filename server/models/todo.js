const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var todoSchema = new Schema({
  task: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: false
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
})

var Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;
