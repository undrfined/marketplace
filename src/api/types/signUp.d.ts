type SignUp = {
  type: 'signUp';
  method: 'POST';
  request: {
    name: string;
    surname: string;
    email: string;
    password: string;
  };
  response: {
    token: string;
    refreshToken: string;
  };
};

export type SignUpController = SignUp;
