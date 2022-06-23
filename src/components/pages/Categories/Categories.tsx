import React from 'react';
import styles from './Categories.module.scss';
import { ApiTag } from '../../../api/types/tag';
import Tag from '../../common/Tag/Tag';
import { CATEGORY_ALL } from '../../../helpers/consts';

type OwnProps = {
  tags?: ApiTag[];
  onSelectTag: (tagId: number) => void;
  chosenTag: number;
};

function Categories({ tags, onSelectTag, chosenTag }: OwnProps) {
  return (
    <div className={styles.root}>
      <Tag
        tag={CATEGORY_ALL}
        onClick={() => onSelectTag(0)}
        isChosen={chosenTag === 0}
      />

      {tags?.map((tag: ApiTag) => (
        <Tag
          key={tag.id}
          tag={tag}
          onClick={() => onSelectTag(tag.id)}
          isChosen={chosenTag === tag.id}
        />
      ))}
    </div>
  );
}

export default Categories;
