import React from 'react';
import { ApiGood } from '../../../api/types/goods';
import styles from './SearchItem.module.scss';
import formatCurrency from '../../../helpers/formatCurrency';

type OwnProps = {
  item: ApiGood;
  onClick: VoidFunction;
};

function SearchItem({
  item,
  onClick,
}: OwnProps) {
  return (
    <div className={styles.root} onClick={onClick}>
      <img src={item.picture[0].presignedUrl} alt="" className={styles.image} />
      <div className={styles.info}>
        <div className={styles.name}>{item.name}</div>
        <div className={styles.price}>{formatCurrency(item.price)}</div>
      </div>
    </div>
  );
}

export default SearchItem;
