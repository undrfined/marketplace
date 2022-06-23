import type { ApiImage } from './index';
import type { ApiTag } from './tag';

type Route<T> = `goods/${T}`;

export type ApiGood = {
  id: number;
  name: string;
  price: number;
  picture: ApiImage[];
};

type GetGoods = {
  type: Route<'getgoods'>;
  method: 'POST';
  request: {
    numOfGoodsToGet: number;
    idOfPreviousGood: number;
    category: number;
    nameFilter: string;
  };
  response: {
    goods: ApiGood[];
    tags: ApiTag[];
  }
};

export type GoodsController = GetGoods;
