import { TokenErrorCode } from 'constants/tokenErrorCode';

export interface ITokenErrorCode {
  name: TokenErrorCode;
  message: string;
  expiredAt?: number;
  date?: Date;
}
