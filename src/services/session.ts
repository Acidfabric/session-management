import { randomBytes } from 'crypto';
import jwt from 'jsonwebtoken';

import { AUTH_SECRET } from 'constants/auth';
import { getSessionData, saveSession, updateSession } from 'data';
import {
  buildRefreshTokenOptions,
  buildTokenOptions,
  encrypt,
  getRefreshToken,
  getSessionHash,
  getToken,
} from 'lib';

async function createNewSession(code: string) {
  const tokenArgs = buildTokenOptions(code);
  const token = await getToken(tokenArgs);

  const sessionId = randomBytes(16).toString('base64');
  const hashedSessionId = getSessionHash(sessionId);
  const encryptedIdToken = encrypt(token.id_token);

  await saveSession({
    sessionId: hashedSessionId,
    accessToken: token.access_token,
    initVector: encryptedIdToken.initVector,
    idToken: encryptedIdToken.content,
    refreshToken: token.refresh_token,
    createdAt: new Date(),
  });

  return sessionId;
}

async function authorize(sessionId: string) {
  const hashedSessionId = getSessionHash(sessionId);
  const sessionData = await getSessionData(hashedSessionId);

  if (!sessionData) throw new Error('session is not found');

  try {
    jwt.verify(sessionData.accessToken, AUTH_SECRET);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      const refreshToken = buildRefreshTokenOptions(sessionData.refreshToken);
      const token = await getRefreshToken(refreshToken);
      const encryptedIdToken = encrypt(token.id_token);

      await updateSession({
        sessionId: hashedSessionId,
        accessToken: token.access_token,
        initVector: encryptedIdToken.initVector,
        idToken: encryptedIdToken.content,
        refreshToken: token.refresh_token,
        createdAt: new Date(),
      });

      return token.access_token;
    }

    throw error;
  }

  return sessionData.accessToken;
}

export { createNewSession, authorize };
