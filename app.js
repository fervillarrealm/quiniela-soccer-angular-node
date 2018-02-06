var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var book = require('./routes/book');
var usuario = require('./routes/usuario');
var posiciones = require('./routes/posiciones');

var app = express();

mongoose.connect('mongodb://quiniela:quiniela@ds023303.mlab.com:23303/laquinielasoccer', { useMongoClient: true, promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/auth/login', express.static(path.join(__dirname, 'dist')));
app.use('/auth/register', express.static(path.join(__dirname, 'dist')));
app.use('/home/posiciones', express.static(path.join(__dirname, 'dist')));

app.use('/books', express.static(path.join(__dirname, 'dist')));
app.use('/book', book);
app.use('/usuario', usuario);
app.use('/posicion', posiciones);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  console.log(err.message);
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err.message);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;