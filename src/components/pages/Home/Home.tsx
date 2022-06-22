import React from 'react';

import styles from './Home.module.scss';
import Page from '../Page/Page';
import Categories from '../Categories/Categories';
import ImageSlider from '../../common/Slider/Slider';

function Home() {
  const [allCategories, setAllCategories] = React.useState([]);
  const [images, setImages] = React.useState([]);
  React.useEffect(() => {
    fetch('http://localhost:3000/db.json')
      .then((res) => res.json())
      .then((json) => setAllCategories(json.allCategories));
  }, []);
  React.useEffect(() => {
    fetch('http://localhost:3000/db.json')
      .then((res) => res.json())
      .then((json) => setImages(json.images));
  }, []);
  return (
    <Page>
      <div className={styles.root}>
        <ImageSlider images={images} />
        <Categories categories={allCategories} />
      </div>
    </Page>
  );
}

export default Home;
