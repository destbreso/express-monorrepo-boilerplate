const winston = require('winston');
const transports = require('./custom-logger-transports');

const isOffline = process.env.IS_OFFLINE || process.env.IS_LOCAL;
const prettifyLogs = isOffline || process.env.LOG_CLI_MODE;

const custom = {
  levels: {
    track: 0,
    crit: 1,
    alert: 2,
    error: 3,
    warn: 4,
    info: 5,
    trace: 6,
    debug: 7,
  },
  colors: {
    track: 'bold white cyanBG',
    crit: 'yellow redBG',
    alert: 'black redBG',
    error: 'red',
    warn: 'yellow',
    info: 'green',
    trace: 'green',
    debug: 'bold white greeBG',
  },
};

// create logger instance
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  levels: custom.levels,
  exitOnError: false,
  handleExceptions: true,
  format: winston.format.combine(
    winston.format.json(),
    winston.format.timestamp(),
  ),
  exceptionHandlers: transports.jsonConsole,
});

winston.addColors(custom.colors);

if (prettifyLogs) {
  logger.add(transports.cliConsole);
  if (isOffline) {
    logger.add(transports.file('debug'));
  }
} else {
  logger.add(transports.jsonConsole);
}

module.exports = {
  colors: custom.colors,
  levels: custom.levels,
  logger,
};
