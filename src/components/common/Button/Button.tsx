import React from 'react';
import cn from 'classnames';

import styles from './Button.module.scss';

type ButtonVariant = 'primary' | 'secondary' | 'icon-translucent' | 'icon-primary' | 'icon-secondary';

type OwnProps = React.HTMLProps<HTMLButtonElement> & {
  children: React.ReactNode;
  variant: ButtonVariant;
  type?: 'submit' | 'reset' | 'button';
};

function Button({
  children,
  variant = 'primary',
  type = 'button',
  className,
  ...otherProps
}: OwnProps) {
  return (
    <button
      {...otherProps}
      className={cn(styles.root, styles[variant], className)}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
