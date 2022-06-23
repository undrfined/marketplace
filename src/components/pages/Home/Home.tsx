import React, { useEffect } from 'react';

import styles from './Home.module.scss';
import Page from '../Page/Page';
import { getAllTags } from '../../../store/tags';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { getGoods } from '../../../store/goods';
import Categories from '../Categories/Categories';
import ItemCard from '../../common/ItemCard/ItemCard';

function Home() {
  const dispatch = useAppDispatch();

  const tags = useAppSelector((state) => state.tags.tags);
  const goods = useAppSelector((state) => state.goods.goods);

  useEffect(() => {
    dispatch(getAllTags());
    dispatch(getGoods({
      category: 0,
      nameFilter: '',
      idOfPreviousGood: 0,
      numOfGoodsToGet: 10
    }));
  }, []);

  return (
    <Page className={styles.root}>
      {/* <ImageSlider images={images} /> */}
      <Categories tags={Object.values(tags)} />
      <div className={styles.goods}>
        {Object.values(goods).map((good) => <ItemCard key={good.id} item={good} />)}
      </div>
    </Page>
  );
}

export default Home;
