import type { ApiImage } from './index';

type Route<T> = `tags/${T}`;

export type ApiTag = {
  id: number;
  name: string;
  picture: ApiImage[];
};

type CreateTag = {
  type: Route<'create'>;
  method: 'POST';
  request: {
    name: string;
  };
  response: null;
};

type GetTag = {
  type: Route<'gettag'>;
  method: 'GET';
  request: {
    id: number;
  };
  response: {
    tag: ApiTag;
  };
};

type UpdateTag = {
  type: Route<'updatetag'>;
  method: 'PUT';
  request: {
    id: number;
    name: string;
  };
  response: null;
};

type GetAllTags = {
  type: Route<'getalltags'>;
  method: 'GET';
  request: null;
  response: {
    tags: ApiTag[];
  };
};

export type TagController = CreateTag | GetTag | UpdateTag | GetAllTags;
