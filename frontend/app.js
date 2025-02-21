var createError = require('http-errors'); // Module to handle HTTP errors
var express = require('express'); // Web framework for Node.js
var path = require('path'); // Utility for handling file and directory paths
var cookieParser = require('cookie-parser'); // Middleware to parse cookies
var logger = require('morgan'); // HTTP request logger middleware

var indexRouter = require('./routes'); // Router for the root ("/") route
var usersRouter = require('./routes/users'); // Router for the "/users" route

var app = express(); // Create an Express application

// view engine setup
app.set('views', path.join(__dirname, 'views')); // Set the views directory
app.set('view engine', 'pug'); // Set Pug as the templating engine

// Middleware setup
app.use(logger('dev')); // Log HTTP requests
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({extended: false})); // Parse URL-encoded request bodies
app.use(cookieParser()); // Parse cookies attached to client requests
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the "public" directory

// Route handlers
app.use('/', indexRouter); // Use indexRouter for the root ("/") route
app.use('/users', usersRouter); // Use usersRouter for the "/users" route

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404)); // Create a 404 error and forward to the error handler
});

// error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error details in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500); // Default to 500 status if no status is set
  res.render('error'); // Render the "error" view
});

module.exports = app; // Export the app instance
