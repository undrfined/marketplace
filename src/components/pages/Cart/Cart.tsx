import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import formatCurrency from '../../../helpers/formatCurrency';
import { useAppSelector } from '../../../store/store';
import Button from '../../common/Button/Button';
import CartCard from '../../common/cartCard/CartCard';
import Loader from '../../common/Loader/Loader';
import styles from './Cart.module.scss';

export default function Cart() {
  const [Checkout, SetCheckout] = useState(false);
  const [activeTagId] = useState(0);
  const goods = useAppSelector((state) => state.goods.goodsByTagId[activeTagId]?.goods)
    || {};

  const cart = useAppSelector((state) => state.cart.items) || {};

  const items = Object.values(goods)
    .filter((value) => cart[value.id] > 0)
    .map((value) => <CartCard key={value.id} item={value} />);
  const sum = Object.values(goods)
    .filter((value) => cart[value.id] > 0)
    .map((value) => cart[value.id] * value.price)
    .reduce((a, b) => a + b);
  //   .map((good) => <ItemCard key={good.id} item={good} />);
  return (
    <div className={styles.cart}>
      <h1 className={styles.title}>My Cart</h1>
      <InfiniteScroll
        className={styles.goods}
        next={() => {
          console.log(items);
        }}
        hasMore={false}
        loader={<Loader className={styles.loader} />}
        dataLength={items.length}
      >
        {items}
      </InfiniteScroll>
      <div className={styles.total}>
        <p className={styles.title}>{formatCurrency(sum)}</p>
        <p className={styles.subtitle}>Total price</p>
        <Button
          variant="primary"
          buttonSize="small"
          className={styles.button}
          onClick={() => {
            SetCheckout(!Checkout);
          }}
        >
          Checkout
        </Button>
        {' '}
      </div>
    </div>
  );
}
