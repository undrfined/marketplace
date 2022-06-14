import React from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/index.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Registry from './Registry';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<Registry />} />
    </Routes>
  </BrowserRouter>,
);
