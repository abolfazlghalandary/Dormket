import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './Home';
import Trade from './Trade';

const Main = () => {
  return (
    <Routes> {/* The Switch decides which component to show based on the current URL.*/}
      <Route path='/' element={<Home />}></Route>
      <Route path='/trade' element={<Trade />}></Route>
    </Routes>
  );
}

export default Main;