import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useEffect } from 'react';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import { useAppDispatch, useAppSelector } from '../store/store';
import Home from './pages/Home/Home';
import { startTokenCheck } from '../store/auth';
import { getAvatar, getInfo } from '../store/user';
import Product from './pages/Product/Product';

function App() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token) return;
    dispatch(startTokenCheck(token)).then(() => {
      dispatch(getInfo());
      dispatch(getAvatar());
    });
  }, [token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/goods/:id" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
