import { HOST, PORT } from './uri';

export const AUTH_IS_PKCE = process.env.OIDC_IS_PKCE || false;
export const AUTH_ISSUER = process.env.OIDC_ISSUER || '';
export const AUTH_AUTHORIZE_ENDPOINT = process.env.OIDC_AUTHORIZE_ENDPOINT || '/authorize';
export const AUTH_TOKEN_ENDPOINT = process.env.OIDC_TOKEN_ENDPOINT || '/oauth/token';
export const AUTH_CLIENT_ID = process.env.OIDC_CLIENT_ID || '';
export const AUTH_SCOPE = process.env.OIDC_SCOPE || 'openid offline_access';
export const AUTH_RESPONSE_TYPE = process.env.OIDC_RESPONSE_TYPE || 'code';
export const AUTH_CHALANGE_CODE = process.env.OIDC_CHALANGE_CODE || 'S256';
export const AUTH_CALLBACK_URI = process.env.OIDC_CALLBACK_URI || `${HOST}:${PORT}/callback`;
export const AUTH_GRANT_TYPE = process.env.OIDC_GRANT_TYPE || 'authorization_code';
export const AUTH_REFRESH_GRANT_TYPE = process.env.OIDC_REFRESH_GRANT_TYPE || 'refresh_token';
export const AUTH_SECRET = process.env.OIDC_CLIENT_SECRET || '';
