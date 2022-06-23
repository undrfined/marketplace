import React, { useState } from 'react';
import styles from './Categories.module.scss';
import { ApiTag } from '../../../api/types/tag';

type OwnProps = {
  tags?: ApiTag[];
};

function Categories({ tags }: OwnProps) {
  const [activeItem, setActiveItem] = useState(0);

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Categories</h1>
      <div className={styles.flexCategories}>

        {tags?.map((tag: ApiTag, index: number) => (
          <div className={styles.category} key={tag.id}>
            <input
              type="image"
              onClick={() => setActiveItem(index)}
              className={
                  activeItem === index
                    ? styles.categoryImageChosen
                    : styles.categoryImage
                }
              src={tag.picture[0].presignedUrl}
              alt={tag.name}
            />
            <br />
            <button
              onClick={() => setActiveItem(index)}
              onKeyDown={() => {
                setActiveItem(index);
              }}
              className={
                  activeItem === index
                    ? styles.chosenCategory
                    : styles.categoriesText
                }
            >
              {tag.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
