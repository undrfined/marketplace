import React from 'react';

import Logo from '../../../assets/images/Logo.svg';
import styles from './Page.module.scss';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

type OwnProps = {
  children: React.ReactNode;
};

function Page({
  children,
}: OwnProps) {
  return (
    <div className={styles.root}>
      <div className={styles.headerWrapper}>
        <div className={styles.header}>
          <img src={Logo} alt="Logo" />

          <Input placeholder="Search..." icon="icon-search" className={styles.search} />

          <Button variant="icon-translucent" className={styles.left} badge="3">
            <i className="icon-cart" />
          </Button>

          <Button variant="secondary" buttonSize="small" className={styles.loggedInButton}>
            <i className="icon-menu" />
            <img src={Logo} alt="Avatar" />
          </Button>

          {/* <Button variant="secondary" buttonSize="small" className={styles.button}> */}
          {/*  Log in */}
          {/* </Button> */}
          {/* <Button variant="primary" buttonSize="small" className={styles.button}> */}
          {/*  Sign up */}
          {/* </Button> */}
        </div>
      </div>
      {children}
    </div>
  );
}

export default Page;
