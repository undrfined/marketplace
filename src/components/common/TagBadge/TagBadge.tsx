import React from 'react';
import cn from 'classnames';
import styles from './TagBadge.module.scss';
import { ApiTag } from '../../../api/types/tag';

type OwnProps = {
  tag: ApiTag;
  isSelected?: boolean;
  onClick: VoidFunction;
};

function TagBadge({
  tag,
  isSelected,
  onClick,
}: OwnProps) {
  return (
    <div className={cn(styles.root, isSelected && styles.selected)} onClick={onClick}>
      <img src={tag.picture[0].presignedUrl} alt="" className={styles.image} />
      <div className={styles.name}>{tag.name}</div>
    </div>
  );
}

export default TagBadge;
