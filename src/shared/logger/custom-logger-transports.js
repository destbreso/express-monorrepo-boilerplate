/* eslint-disable no-underscore-dangle */
const { transports, format } = require('winston');

const cliConsole = new transports.Console({
  format: format.combine(
    format.colorize(),
    format.printf((info) => {
      let msg = `${info.level} ${info.message}`;
      if (info.sessionId) msg = `${info.sessionId} ${msg}`;
      return msg;
    }),
  ),
});

const jsonConsole = new transports.Console({
  format: format.combine(
    format.json(),
  ),
});

const getFileTransporter = (level) => {
  // eslint-disable-next-line global-requirerequire('dotenv').config(); // import and configure dotenv as early as possible !!!

  require('winston-daily-rotate-file');
  return new transports.DailyRotateFile({
    // handleExceptions: true,
    filename: `logs/%DATE%-${level}.log`,
    // auditFile: 'logs/%DATE%-audit.json',
    level,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '32m',
    maxFiles: '24h',
    stream: null,
    format: format.combine(
      format.json(),
    ),
  });
};

module.exports = {
  cliConsole,
  jsonConsole,
  file: (level) => getFileTransporter(level),
};
