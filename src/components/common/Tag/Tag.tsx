import React from 'react';
import { ApiTag } from '../../../api/types/tag';
import styles from './Tag.module.scss';

type OwnProps = {
  tag: ApiTag;
  onClick: VoidFunction;
  isChosen?: boolean;
};

function Tag({
  tag,
  onClick,
  isChosen,
}: OwnProps) {
  return (
    <div className={styles.category} key={tag.id}>
      <input
        type="image"
        onClick={onClick}
        className={
                isChosen
                  ? styles.categoryImageChosen
                  : styles.categoryImage
            }
        src={tag.picture[0].presignedUrl}
        alt={tag.name}
      />
      <button
        onClick={onClick}
        onKeyDown={onClick}
        className={
                isChosen
                  ? styles.chosenCategory
                  : styles.categoriesText
            }
      >
        {tag.name}
      </button>
    </div>
  );
}

export default Tag;
