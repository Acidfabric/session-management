import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import helmet from 'helmet';

import { HOST, PORT } from 'constants/uri';
import { SERVICE_NAME } from 'constants/config';
import { authorize, createNewSession, removeSession } from 'services';
import { buildAuthorizationLink, logger } from 'lib';
import { SessionError } from 'errors';

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', async (_req, res) => {
  res.redirect(buildAuthorizationLink());
});

app.get('/callback', async (req, res) => {
  if (!req.query.code) throw new SessionError('code is not defined');
  if (typeof req.query.code !== 'string') throw new SessionError('code is not a string');

  try {
    const sessionId = await createNewSession(req.query.code);

    res.cookie('sessionId', sessionId);
    res.status(200);
  } catch (error) {
    logger.error(error);
    res.status(500);
  }
});

app.get('/authorize', async (req, res) => {
  const { sessionId } = req.cookies;

  if (!sessionId) {
    res.status(401);
  }

  try {
    await authorize(sessionId);

    res.status(200);
  } catch (error) {
    logger.error(error);
    res.status(500);
  }
});

app.get('/logout', async (req, res) => {
  const { sessionId } = req.cookies;

  if (!sessionId) {
    logger.debug('sessionId is not defined');
    res.status(200);
  }

  try {
    await removeSession(sessionId);

    res.status(200);
  } catch (error) {
    logger.error(error);
    res.status(500);
  }
});

app.listen(PORT, () => {
  logger.info(`${SERVICE_NAME} is listening at http://${HOST}:${PORT}`);
});
