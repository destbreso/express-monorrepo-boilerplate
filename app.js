// NODE_ENV => production for debug optimization (see <@dabh/diagnostics>)
process.env.NODE_ENV = process.env.STAGE === 'prod'
  ? 'production'
  : process.env.STAGE;
  
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const createError = require('http-errors');
const logger = require('./src/shared/logger/custom-logger').logger //require('morgan');
const expressWinston = require('express-winston');

const users = require('./src/core/api-users');

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');


// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ maxAge: 604800000 }));
app.use(helmet());
// app.use(express.static(path.join(__dirname, 'public')));

expressWinston.requestWhitelist.push('body');
app.use(expressWinston.logger({
  winstonInstance: logger,
  // bodyBlacklist: [],
  responseWhitelist: ['body', 'statusCode'],
  dynamicMeta(req, res) { return { user: req.user, apiGateway: req.apiGateway }; },
  metaField: 'meta',
  meta: true, // optional: control whether you want to log the meta data about the request (default to true)
  colorize: process.env.STAGE === 'dev',
  msg: 'HTTP {{req.method}} {{res.statusCode}} {{res.responseTime}}ms {{req.url}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  statusLevels: false, // default value
  level(req, res) {
    let level = '';
    if (res.statusCode >= 100) { level = 'info'; }
    if (res.statusCode >= 400) { level = 'warn'; }
    if (res.statusCode >= 500) { level = 'error'; }
    // Ops is worried about hacking attempts so make Unauthorized and Forbidden critical
    if (res.statusCode == 401 || res.statusCode == 403) { level = 'alert'; }
    // No one should be using the old path, so always warn for those
    // if (req.path === '/v1' && level === 'info') { level = 'warn'; }
    return level;
  },
}));


app.use('/users', users.router);

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
  res.render('error');
});

module.exports = app;


