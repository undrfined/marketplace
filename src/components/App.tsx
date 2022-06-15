import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import store from '../store/store';
import Home from './pages/Home/Home';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
