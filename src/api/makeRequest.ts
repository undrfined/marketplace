type ApiDefaultMethodField = {
  status: 'Error' | 'Success';
};

type ApiMethodResponseWithoutStatus = {
  login: {
    token: string;
    refreshToken: string;
  };
  signUp: {
    message: string;
  };
  api: {
    message: string;
  };
};

export type ApiMethodResponse = {
  [P in keyof ApiMethodResponseWithoutStatus]: (
    ApiMethodResponseWithoutStatus[P] & ApiDefaultMethodField
  )
};

export type ApiMethod = {
  login: {
    email: string;
    password: string;
  };
  signUp: {
    name: string;
    surname: string;
    email: string;
    password: string;
  };
  api: null;
};

type ApiMethodNames = keyof ApiMethod;

export default function makeRequest<T extends ApiMethodNames>(
  method: T,
  params: ApiMethod[T],
  httpMethod: 'POST' | 'GET' = 'POST',
  token?: string,
): Promise<ApiMethodResponse[T]> {
  return fetch(`${process.env.REACT_APP_API_ENDPOINT}${method}`, {
    method: httpMethod,
    headers: {
      ...(httpMethod !== 'GET' && { 'Content-Type': 'application/json' }),
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...(httpMethod !== 'GET' && { body: JSON.stringify(params) }),
  }).then(async (response) => {
    if (response.ok) {
      return response.json();
    }

    let result: string;
    try {
      result = (await response.json()).message;
    } catch (e) {
      result = 'Request failed';
    }

    throw Error(result);
  });
}
