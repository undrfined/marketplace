import React from 'react';

import cn from 'classnames';
import styles from './Input.module.scss';

type OwnProps = {
  error?: string | false;
  icon?: string;
} & React.HTMLProps<HTMLInputElement>;

function Input({
  className,
  error,
  icon,
  ...otherProps
}: OwnProps) {
  return (
    <div className={cn(styles.root, className)}>
      {icon && <i className={cn(styles.icon, icon)} />}
      <input {...otherProps} className={cn(styles.input, icon && styles.iconPadding)} />
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}

export default Input;
