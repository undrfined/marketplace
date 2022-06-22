type Route<T> = `user/${T}`;

type GetInfo = {
  type: Route<'getinfo'>;
  method: 'GET';
  request: null;
  response: {
    email: string;
    name: string;
    surname: string;
  };
};

type GetAvatar = {
  type: Route<'getavatar'>;
  method: 'GET';
  request: null;
  response: string;
};

type UpdateInfo = {
  type: Route<'updateinfo'>;
  method: 'PUT';
  request: null;
  response: null;
};

type UpdateAvatar = {
  type: Route<'updateavatar'>;
  method: 'FILE';
  request: {
    picture: File,
  };
  response: {
    message: string;
  };
};

export type UserController = GetInfo | GetAvatar | UpdateInfo | UpdateAvatar;
