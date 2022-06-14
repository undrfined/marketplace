import React from 'react';

import styles from './Input.module.scss';

type OwnProps = {
  error?: string | false;
} & React.HTMLProps<HTMLInputElement>;

function Input({
  className,
  error,
  ...otherProps
}: OwnProps) {
  return (
    <div className={className}>
      <input {...otherProps} className={styles.root} />
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}

export default Input;
