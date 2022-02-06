export interface ITokenArgument {
  code: string;
  grant_type: string;
  client_id: string;
  redirect_uri: string;
  code_verifier?: string;
  client_secret?: string;
}

export interface IRefreshTokenArgument {
  grant_type: string;
  client_id: string;
  client_secret: string;
  refresh_token: string;
}
