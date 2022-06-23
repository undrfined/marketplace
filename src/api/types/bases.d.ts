import type { ApiImage } from './index';

type Route<T> = `bases/${T}`;

export type ApiBase = {
  id: number;
  name: string;
  description: string;
  picture: ApiImage[];
};

type GetAllBases = {
  type: Route<'getallbases'>;
  method: 'GET';
  request: null;
  response: {
    bases: ApiBase[];
  }
};

export type BasesController = GetAllBases;
