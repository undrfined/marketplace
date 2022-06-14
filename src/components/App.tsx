import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
