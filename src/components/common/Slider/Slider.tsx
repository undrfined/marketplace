import Slider from 'react-slick';
import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';
import React from 'react';
import styles from './Slider.module.scss';

function ImageSlider({ images }: any) {
  return (
    <div className={styles.root}>
      <Slider
        dots
        slidesToShow={1}
        slidesToScroll={1}
        variableWidth
      >
        {images.map((item: any) => (
          <div className={styles.slide} key={item.id}>
            <img className={styles.img} src={item.src} alt={item.src} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ImageSlider;
