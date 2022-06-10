import React from "react";
import { boolean } from "yup";
import "../Styles/loginWindow.scss";
export default function MainPhoto(props: { signUp: boolean }) {
  return (
    <div className={props.signUp ? "RegistryWindowPhoto" : "LoginWindowPhoto"}>
      <img src="images\login_vazonok.png" alt="vazonok" />
    </div>
  );
}

// export default function MainPhoto(props:{signUp:true}) ;
