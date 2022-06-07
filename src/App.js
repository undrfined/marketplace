import React from 'react';
import './loginWindow.css';

function App() {
  return (
    <div className='mainWindow'>
          <div className='flexForPhotoAndLogin'>
                <div className='mainWindowPhoto'>
                        <img  src='images\login_vazonok.png' alt='vazonok'/>
                </div>
          <div className='loginMenu'>
          <a href='#'>  <img className='cancel' src='images\vector.png' alt='cancel'></img></a>
            <p className='welcomeField'>Welcome</p>
            <p className='textField'>Enter information below for login</p>
            <div className='loginForm'>
              <form method='Post' onSubmit={()=>{alert("Vitalik !lox");}}>
                 <input className='inputGroup' id='email' type='email' placeholder='Email'></input>
                 <br/>
                 <input className='inputGroup' id='password' type='password' minLength='8' placeholder='Password'></input>
                 <br/>
                 <button type='submit' className='submitBtn'>Login</button>
              </form>
              <p className='textField' id='signUp'>New user?<a className='signUp' href='#'>Sign up</a></p>
             </div>
          </div>
          </div>
   </div>
  );
}

export default App;
 