export type ApiMethodResponse = {
  login: {
    ok: boolean;
  };
  signUp: never;
};

export type ApiMethod = {
  login: {
    email: string;
    password: string;
  };
  signUp: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }
};

type ApiMethodNames = keyof ApiMethod;

export default function makeRequest<T extends ApiMethodNames>(
  method: T,
  params: ApiMethod[T],
): Promise<ApiMethodResponse[T]> {
  return fetch(process.env.REACT_APP_API_ENDPOINT + method, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  }).then((response) => response.json());
}
