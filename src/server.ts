import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import { PORT } from 'constants/uri';
import { authorize, createNewSession } from 'services';
import { buildAuthorizationLink, logger } from 'lib';

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', async (_req, res) => {
  res.redirect(buildAuthorizationLink());
});

app.get('/callback', async (req, res) => {
  if (!req.query.code) throw new Error('code is not defined');

  try {
    const sessionId = createNewSession(req.query.code as string);

    res.cookie('sessionId', sessionId);
    res.send('ok');
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

    res.send('ok');
  } catch (error) {
    logger.error(error);

    res.status(500);
  }
});

app.listen(PORT, () => {
  logger.info(`Express is listening at http://localhost:${PORT}`);
});
