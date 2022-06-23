import {
  ApiMethod, ApiMethodHttpType, ApiMethodNames, ApiMethodResponse
} from './types';

export default function makeRequest<T extends ApiMethodNames>(
  method: T,
  params: ApiMethod[T],
  httpMethod: ApiMethodHttpType[T],
  token?: string,
): Promise<ApiMethodResponse[T]> {
  const getParams = httpMethod === 'GET' && params
    ? `?${Object.keys(params).reduce((acc, key) => {
      acc.append(key, (params as any)[key]);
      return acc;
    }, new URLSearchParams()).toString()}`
    : '';

  return fetch(`${process.env.REACT_APP_API_ENDPOINT}${method}${getParams}`, {
    method: httpMethod === 'FILE' ? 'PUT' : httpMethod,
    headers: {
      ...(httpMethod !== 'GET' && httpMethod !== 'FILE' && { 'Content-Type': 'application/json' }),
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...(httpMethod !== 'GET' && httpMethod !== 'FILE' && { body: JSON.stringify(params) }),
    ...(httpMethod === 'FILE' && params && {
      body: Object.keys(params).reduce((formData, key) => {
        formData.append(key, (params as any)[key]);
        return formData;
      }, new FormData())
    }),
  }).then(async (response) => {
    if (response.ok) {
      const clone = response.clone();
      try {
        return await response.json();
      } catch (e) {
        return URL.createObjectURL(await clone.blob());
      }
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
