import winston from 'winston';

enum LogLevel {
  Error = 'error',
  Warn = 'warn',
  Info = 'info',
  Verbose = 'verbose',
  Debug = 'debug',
  Silly = 'silly',
}

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? LogLevel.Info : LogLevel.Debug,
  format: winston.format.json(),
  defaultMeta: { service: 'session-management' },
  transports: [new winston.transports.Console()],
});

export { logger };
