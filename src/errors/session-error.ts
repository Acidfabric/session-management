import { logger } from 'lib';

class SessionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
    logger.error(message);
  }
}

export default SessionError;
