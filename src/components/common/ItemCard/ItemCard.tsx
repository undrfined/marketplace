import React from 'react';
import { ApiGood } from '../../../api/types/goods';

import styles from './ItemCard.module.scss';
import formatCurrency from '../../../helpers/formatCurrency';
import Button from '../Button/Button';

type OwnProps = {
  item: ApiGood;
};

function ItemCard({
  item
}: OwnProps) {
  return (
    <div className={styles.root}>
      <img className={styles.image} src={item.picture[0].presignedUrl} alt={item.name} />
      <div className={styles.inCartBadge}>
        <i className="icon-cart" />
        In cart
      </div>
      <div className={styles.info}>
        <div className={styles.title}>{item.name}</div>
        <div className={styles.soldCount}>234 sold</div>
        <div className={styles.price}>{formatCurrency(item.price)}</div>
      </div>

      <div className={styles.buttons}>
        <Button variant="icon-secondary" className={styles.button}>
          <i className="icon-minus" />
        </Button>
        <div className={styles.count}>5</div>
        <Button variant="icon-primary" className={styles.button}>
          <i className="icon-plus" />
        </Button>
      </div>
    </div>
  );
}

export default ItemCard;
