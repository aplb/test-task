const winston = require('winston');
const { logs } = require('config');

const last2 = numb => `0${numb}`.slice(-2);

const transports = [
  new winston.transports.Console({
    json: true,
    colorize: true,
    level: logs.logConsoleLevel,
    timestamp: () => {
      const date = new Date();
      return `${last2(date.getHours())}:${last2(date.getMinutes())}:${last2(
        date.getSeconds()
      )}`;
    },
  }),
];

module.exports = winston.createLogger({ transports });
