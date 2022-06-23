import Slider from 'react-slick';
import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';
import React from 'react';
import styles from './Slider.module.scss';
import { ApiBase } from '../../../api/types/bases';

type OwnProps = {
  bases: ApiBase[];
};

function ImageSlider({ bases }: OwnProps) {
  return (
    <div className={styles.root}>
      <Slider
        dots
        slidesToShow={1}
        slidesToScroll={1}
      >
        {bases.map((item) => (
          <div className={styles.slide} key={item.id}>
            <img className={styles.img} src={item.picture[0].presignedUrl} alt={item.name} />
            <div className={styles.description}>{item.description}</div>
            <div className={styles.name}>{item.name}</div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ImageSlider;
