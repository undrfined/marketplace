import React, { useState } from 'react';
import styles from './Categories.module.scss';
import { ApiTag } from '../../../api/types/tag';
import Tag from '../../common/Tag/Tag';
import { CATEGORY_ALL } from '../../../helpers/consts';

type OwnProps = {
  tags?: ApiTag[];
};

function Categories({ tags }: OwnProps) {
  const [activeItem, setActiveItem] = useState(0);

  return (
    <div className={styles.root}>
      <Tag
        tag={CATEGORY_ALL}
        onClick={() => setActiveItem(0)}
        isChosen={activeItem === 0}
      />

      {tags?.map((tag: ApiTag) => (
        <Tag
          key={tag.id}
          tag={tag}
          onClick={() => setActiveItem(tag.id)}
          isChosen={activeItem === tag.id}
        />
      ))}
    </div>
  );
}

export default Categories;
