import React, { useCallback } from 'react';

import { useNavigate } from 'react-router-dom';
import Logo from '../../../assets/images/Logo.svg';
import styles from './Page.module.scss';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { logOut } from '../../../store/auth';
import { updateAvatar } from '../../../store/user';

type OwnProps = {
  children: React.ReactNode;
};

function Page({
  children,
}: OwnProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.auth.token);
  const avatarUrl = useAppSelector((state) => state.user.avatarUrl);

  const handleClickMenu = useCallback(() => {
    dispatch(logOut());
  }, []);

  const handleChangeAvatar = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    dispatch(updateAvatar({
      picture: file,
    }));
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
              <img src={avatarUrl || Logo} alt="Avatar" />
            </Button>
          )}

          <input type="file" accept="image/*" onChange={handleChangeAvatar} />

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
