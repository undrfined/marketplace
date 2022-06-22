type RefreshToken = {
  type: 'refreshtoken';
  method: 'POST';
  request: {
    accessToken: string;
    refreshToken: string;
  };
  response: {
    token: string;
    refreshToken: string;
  };
};

type Revoke = {
  type: 'revoke';
  method: 'POST';
  request: null;
  response: {
    message: string;
  };
};

export type TokenController = RefreshToken | Revoke;
