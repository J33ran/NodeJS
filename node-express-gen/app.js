var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var routes = require('./routes/index');
var users = require('./routes/users');

var dishes = require('./routes/dishes');
var promotions = require('./routes/promotions');
var leaders = require('./routes/leaders');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//app.use(cookieParser());
app.use(cookieParser('12345-67890-09876-54321')); // secret key

// Session
app.use(session({
  name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: true,
  resave: true,
  store: new FileStore()
}));

// Authentication
var auth = require('./routes/auth');
app.use(auth);
// Authentication
//app.use(auth);
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', routes);
// app.use('/users', users);

// app.use('/dishes', dishes);
// app.use('/promotions', promotions);
// app.use('/leaders', leaders);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handlers

// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: err
//     });
//   });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });

app.use(function(err,req,res,next) {
    res.writeHead(err.status || 500, {
    'WWW-Authenticate': 'Basic',
    'Content-Type': 'text/plain'
    });
    res.end(err.message);
});

// // Mongoose connection
// var mongoose = require('mongoose');

// var url = 'mongodb://localhost:27017/conFusion';
// mongoose.connect(url);
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//     // we're connected!
//     console.log("Connected correctly to server");
// });

module.exports = app;
