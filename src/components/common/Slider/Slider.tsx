import Slider from 'react-slick';
import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';
import React from 'react';
import styles from './Slider.module.scss';

function ImageSlider({ images }: any) {
  const settings = {
    // infinite: true,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
  };
  return (
    <div className={styles.imgslider}>
      <Slider {...settings}>
        {images.map((item: any) => (
          <div className={styles.image} key={item.id}>
            <img className={styles.img} src={item.src} alt={item.src} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
export default ImageSlider;
