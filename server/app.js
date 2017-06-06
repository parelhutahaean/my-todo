const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const index = require('./routes/index');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my-todo');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connection success');
});
app.use(cors());
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', index);
app.listen(app.get('port'), function() {
  console.log('App listen to port ' + app.get('port'));
})
