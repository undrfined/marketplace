import React, { useCallback } from 'react';

import { useNavigate } from 'react-router-dom';
import Logo from '../../../assets/images/Logo.svg';
import styles from './Page.module.scss';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { logOut } from '../../../store/auth';

type OwnProps = {
  children: React.ReactNode;
};

function Page({
  children,
}: OwnProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.auth.token);

  const handleClickMenu = useCallback(() => {
    dispatch(logOut());
  }, []);

  const isLoggedIn = Boolean(token);

  return (
    <div className={styles.root}>
      <div className={styles.headerWrapper}>
        <div className={styles.header}>
          <img src={Logo} alt="Logo" />

          <Input placeholder="Search..." icon="icon-search" className={styles.search} />

          <Button variant="icon-translucent" className={styles.left} badge="3">
            <i className="icon-cart" />
          </Button>

          {isLoggedIn && (
            <Button variant="secondary" buttonSize="small" className={styles.loggedInButton} onClick={handleClickMenu}>
              <i className="icon-menu" />
              <img src={Logo} alt="Avatar" />
            </Button>
          )}

          {!isLoggedIn && (
            <>
              <Button variant="secondary" buttonSize="small" className={styles.button} onClick={() => navigate('/login')}>
                Log in
              </Button>
              <Button variant="primary" buttonSize="small" className={styles.button} onClick={() => navigate('/signUp')}>
                Sign up
              </Button>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

export default Page;
