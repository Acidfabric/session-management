import axios from 'axios';

import { AUTH_ISSUER, AUTH_TOKEN_ENDPOINT } from 'constants/auth';
import { IRefreshTokenArgument, ITokenArgument } from 'interfaces';
import { AccessTokenResp } from 'types';

const api = axios.create({
  baseURL: AUTH_ISSUER,
  headers: { 'Content-Type': 'application/json' },
});

async function getToken(tokenArgs: ITokenArgument) {
  const response = await api.post<AccessTokenResp>(AUTH_TOKEN_ENDPOINT, tokenArgs);

  return response.data;
}

async function getRefreshToken(tokenArgs: IRefreshTokenArgument) {
  const response = await api.post<AccessTokenResp>(AUTH_TOKEN_ENDPOINT, tokenArgs);

  return response.data;
}

export { getToken, getRefreshToken };
