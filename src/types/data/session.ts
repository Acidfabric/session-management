export type SessionData = {
  sessionId: string;
  accessToken: string;
  refreshToken: string;
  idToken: string;
  initVector: string;
  createdAt: Date;
};

export type UpdateSessionData = {
  accessToken: string;
  refreshToken: string;
  idToken?: string;
  initVector?: string;
  createdAt?: Date;
};
