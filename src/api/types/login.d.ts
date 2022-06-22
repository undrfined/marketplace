type Login = {
  type: 'login';
  method: 'POST';
  request: {
    email: string;
    password: string;
  };
  response: {
    token: string;
    refreshToken: string;
  };
};

export type LoginController = Login;
