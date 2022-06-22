import React, { useState } from 'react';
import Slider from 'react-slick';
import styles from './Categories.module.scss';
import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.css';

export default function Categories({ categories }: any) {
  const [activeItem, setActiveItem] = useState(0);
  const settings = {
    infinite: true,
    slidesToShow: 9,
    slidesToScroll: 5,
    variableWidth: true,
  };
  return (
    <div className={styles.allCategories}>
      <p className={styles.title}>Categories</p>
      <div className={styles.flexCategories}>
        <Slider {...settings}>
          {categories.map((value: any, index: number) => (
            <div className={styles.category} key={`${value.Name}`}>
              <input
                type="image"
                onClick={() => setActiveItem(index)}
                className={
                  activeItem === index
                    ? styles.categoryImageСhosen
                    : styles.categoryImage
                }
                src={value.Image}
                alt={value.Name}
              />
              <br />
              <text
                onClick={() => setActiveItem(index)}
                onKeyDown={() => {
                  setActiveItem(index);
                }}
                className={
                  activeItem === index
                    ? styles.choosenCategory
                    : styles.categoriesText
                }
              >
                {value.Name}
              </text>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
