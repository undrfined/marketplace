import type { ApiImage } from './index';

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
  }
};

export type GoodsController = GetGoods;
