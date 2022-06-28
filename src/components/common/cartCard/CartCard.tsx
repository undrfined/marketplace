import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiGood } from '../../../api/types/goods';

import styles from './CartCard.module.scss';
import formatCurrency from '../../../helpers/formatCurrency';
import Button from '../Button/Button';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { addToCart, removeFromCart, removeAll } from '../../../store/cart';

type OwnProps = {
  item: ApiGood;
};

function ItemCard({ item }: OwnProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const countInCart = useAppSelector((state) => state.cart.items[item.id]);

  const handleAdd = useCallback((e: React.UIEvent) => {
    dispatch(addToCart(item.id));
    e.stopPropagation();
  }, []);

  const handleRemove = useCallback((e: React.UIEvent) => {
    dispatch(removeFromCart(item.id));
    e.stopPropagation();
  }, []);

  const handleRemoveAll = useCallback((e: React.UIEvent) => {
    dispatch(removeAll(item.id));
    e.stopPropagation();
  }, []);

  const handleClick = useCallback(() => {
    navigate(`/goods/${item.id}`);
  }, []);

  return (
    <div className={styles.root} onClick={handleClick}>
      <div className={styles.icon}>
        <img
          className={styles.image}
          src={item.picture[0].presignedUrl}
          alt={item.name}
        />
      </div>
      <div className={styles.info}>
        <div className={styles.title}>{item.name}</div>
        <div className={styles.soldCount}>234 sold</div>
        <div className={styles.price}>{formatCurrency(item.price)}</div>
      </div>

      <div className={styles.buttons}>
        <Button
          variant="icon-secondary"
          className={styles.button}
          onClick={handleRemove}
        >
          <i className="icon-minus" />
        </Button>
        <div className={styles.count}>{countInCart}</div>

        <Button
          variant="icon-primary"
          className={styles.button}
          onClick={handleAdd}
        >
          <i className="icon-plus" />
        </Button>
      </div>
      <div>
        <Button
          variant="icon-translucent"
          className={styles.cancelBtn}
          onClick={handleRemoveAll}
          buttonSize="small"
        >
          <i className="icon-close" />
        </Button>
      </div>
    </div>
  );
}

export default ItemCard;
