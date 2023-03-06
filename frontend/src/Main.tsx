import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './Home';
import Trade from './Trade';
import Register from './Register';

const Main = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/trade' element={<Trade />}></Route>
      <Route path='/register' element={<Register />}></Route>
    </Routes>
  );
}

export default Main;