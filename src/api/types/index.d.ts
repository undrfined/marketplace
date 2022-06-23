import type { LoginController } from './login';
import type { UserController } from './user';
import type { SignUpController } from './signUp';
import type { TokenController } from './token';
import type { TagController } from './tag';
import type { GoodsController } from './goods';

type ApiDefaultMethodField = {
  status: 'Error' | 'Success';
};

type All = (
    LoginController | SignUpController | UserController | TokenController | TagController |
    GoodsController
);

export type ApiMethod = { [T in All as T['type']]: T['request'] };
export type ApiMethodHttpType = { [T in All as T['type']]: T['method'] };
export type ApiMethodResponse = { [T in All as T['type']]: T['response'] & ApiDefaultMethodField };
export type ApiMethodNames = All['type'];

export type ApiImage = {
  name: string;
  presignedUrl: string;
};

export type ApiJwtPayload = {
  exp: number;
  aud: string;
  iss: string;
  jti: string;
};

export type ApiJwtRefreshPayload = {
  exp: number;
  aud: string;
  iss: string;
};
