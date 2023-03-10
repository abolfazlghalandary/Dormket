import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './Home';
import Trade from './Trade';
import Register from './Register';
import Login from './Login';
import Profile from './Profile';

const Main = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/trade' element={<Trade />}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/profile' element={<Profile />}></Route>
    </Routes>
  );
}

export default Main;