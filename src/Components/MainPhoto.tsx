import React from 'react';
import '../Styles/loginWindow.scss';

export default function MainPhoto({ signUp }: { signUp: boolean }) {
  return (
    <div className={signUp ? 'RegistryWindowPhoto' : 'LoginWindowPhoto'}>
      <img src="images\login_vazonok.png" alt="vazonok" />
    </div>
  );
}
