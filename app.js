var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var multer = require('multer');
var cookieParser = require('cookie-parser');
var apiRouter = require('./routes/book');
var storeRouter = require('./routes/store');
var userRouter = require('./routes/user');
var orderRouter = require('./routes/order');
var fileRouter = require('./routes/file');

// var router = require('./src/app/app.component');
var app = express();
var router = require('express').Router();
var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('./swagger.json');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/InfyInsightsShop', { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'dist/mean-angular6')));
// app.use('/', express.static(path.join(__dirname, 'dist/mean-angular6')));
// app.use(express.static('InfyInsightsShop'))
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/', express.static(path.join(__dirname, 'dist')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// router.use('/', swaggerUi.serve);
// router.get('/', swaggerUi.setup(swaggerDocument));
// apiRouter.use('/', swaggerUi.serve);
// apiRouter.get('/', swaggerUi.setup(swaggerDocument));

// app.use('/', router);

app.use('/api/books', apiRouter);
app.use('/api/stores', storeRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/files', fileRouter)

// Declares the initial angular module "meanMapApp". Module grabs other controllers and services.

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.sendStatus(err.status);
});

module.exports = app;