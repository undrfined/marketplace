import React from 'react';
import cn from 'classnames';

import styles from './Button.module.scss';

type ButtonVariant = 'primary' | 'secondary' | 'icon-translucent' | 'icon-primary' | 'icon-secondary';

type OwnProps = React.HTMLProps<HTMLButtonElement> & {
  children: React.ReactNode;
  variant: ButtonVariant;
  type?: 'submit' | 'reset' | 'button';
  buttonSize?: 'small' | 'big';
  badge?: string;
};

function Button({
  children,
  variant = 'primary',
  type = 'button',
  className,
  buttonSize = 'big',
  badge,
  ...otherProps
}: OwnProps) {
  return (
    <button
      {...otherProps}
      className={cn(styles.root, styles[variant], styles[buttonSize], className)}
      type={type}
    >
      {children}
      {badge && <div className={styles.badge}>{badge}</div>}
    </button>
  );
}

export default Button;
