import { URL } from 'url';
import { randomBytes, createHash } from 'crypto';

import { ITokenArgument } from 'interfaces';
import {
  AUTH_CLIENT_ID,
  AUTH_SECRET,
  AUTH_SCOPE,
  AUTH_RESPONSE_TYPE,
  AUTH_CHALANGE_CODE,
  AUTH_CALLBACK_URI,
  AUTH_AUTHORIZE_ENDPOINT,
  AUTH_IS_PKCE,
  AUTH_GRANT_TYPE,
  AUTH_ISSUER,
  AUTH_REFRESH_GRANT_TYPE,
} from 'constants/auth';

import { base64URLEncode } from './helpers';

const ALGORITHM = 'sha256';
const ENCODING = 'hex';

function getSessionHash(sessionId: string) {
  return createHash(ALGORITHM).update(sessionId).digest(ENCODING);
}

function generateCodeVerifier() {
  return base64URLEncode(randomBytes(32));
}

function generateCodeChallange(codeVerifier: string) {
  const sha256 = createHash(ALGORITHM).update(codeVerifier).digest();

  return base64URLEncode(sha256);
}

function buildAuthorizationLink(codeVerifier?: string) {
  const authorizationEndpoint = new URL(AUTH_AUTHORIZE_ENDPOINT, AUTH_ISSUER);

  authorizationEndpoint.searchParams.append('response_type', AUTH_RESPONSE_TYPE);
  authorizationEndpoint.searchParams.append('client_id', AUTH_CLIENT_ID);
  authorizationEndpoint.searchParams.append('redirect_uri', AUTH_CALLBACK_URI);
  authorizationEndpoint.searchParams.append('scope', AUTH_SCOPE);

  if (AUTH_IS_PKCE) {
    if (!codeVerifier) throw new Error('code_verifier is not defined');

    authorizationEndpoint.searchParams.append('code_challenge_method', AUTH_CHALANGE_CODE);
    authorizationEndpoint.searchParams.append(
      'code_challenge',
      generateCodeChallange(codeVerifier)
    );
  }

  return authorizationEndpoint.href;
}

function buildTokenOptions(code: string, codeVerifier?: string) {
  const options: ITokenArgument = {
    code,
    grant_type: AUTH_GRANT_TYPE,
    client_id: AUTH_CLIENT_ID,
    redirect_uri: AUTH_CALLBACK_URI,
  };

  if (AUTH_IS_PKCE) {
    if (!codeVerifier) throw new Error('code_verifier is not defined');

    options.code_verifier = codeVerifier;
  } else {
    options.client_secret = AUTH_SECRET;
  }

  return options;
}

function buildRefreshTokenOptions(refreshToken: string) {
  return {
    grant_type: AUTH_REFRESH_GRANT_TYPE,
    client_id: AUTH_CLIENT_ID,
    client_secret: AUTH_SECRET,
    refresh_token: refreshToken,
  };
}

export {
  generateCodeVerifier,
  generateCodeChallange,
  buildAuthorizationLink,
  buildTokenOptions,
  buildRefreshTokenOptions,
  getSessionHash,
};
