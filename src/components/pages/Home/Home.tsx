import React, { useCallback, useEffect, useState } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './Home.module.scss';
import Page from '../Page/Page';
import { getAllTags } from '../../../store/tags';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { getGoods } from '../../../store/goods';
import Categories from '../Categories/Categories';
import ItemCard from '../../common/ItemCard/ItemCard';
import Loader from '../../common/Loader/Loader';
import { GOODS_PER_PAGE } from '../../../helpers/consts';
import { getAllBases } from '../../../store/bases';
import ImageSlider from '../../common/Slider/Slider';

function Home() {
  const dispatch = useAppDispatch();

  const [activeTagId, setActiveTagId] = useState(0);

  const bases = useAppSelector((state) => state.bases.bases);
  const tags = useAppSelector((state) => state.tags.tags);
  const goods = useAppSelector((state) => state.goods.goodsByTagId[activeTagId]?.goods) || {};
  const isEnd = useAppSelector((state) => state.goods.goodsByTagId[activeTagId]?.isEnd);

  const fetchMore = useCallback(() => {
    dispatch(getGoods({
      category: activeTagId,
      nameFilter: '',
      idOfPreviousGood: Object.keys(goods).length > 0
        ? Math.max(...Object.keys(goods).map(Number)) : 0,
      numOfGoodsToGet: GOODS_PER_PAGE
    }));
  }, [goods, activeTagId]);

  useEffect(() => {
    dispatch(getAllTags());
    dispatch(getAllBases());
  }, []);

  useEffect(() => {
    fetchMore();
  }, [activeTagId]);

  const items = Object.values(goods).map((good) => <ItemCard key={good.id} item={good} />);

  return (
    <Page className={styles.root}>
      <ImageSlider bases={Object.values(bases)} />
      <h1 className={styles.title}>Categories</h1>
      <Categories tags={Object.values(tags)} chosenTag={activeTagId} onSelectTag={setActiveTagId} />
      <h1 className={styles.title}>All products</h1>
      <InfiniteScroll
        className={styles.goods}
        next={fetchMore}
        hasMore={!isEnd}
        loader={<Loader className={styles.loader} />}
        dataLength={items.length}
      >
        {items}
      </InfiniteScroll>
    </Page>
  );
}

export default Home;
