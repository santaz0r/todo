import { TUser } from './User.type';

type TAuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: TUser;
};

export type { TAuthResponse };
