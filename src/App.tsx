import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import FullBook from './components/FullBook/FullBook';
import Payment from './pages/Payment';

import './scss/app.scss';
import Layout from './pages/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="book/:id" element={<FullBook />} />
        <Route path="payment" element={<Payment />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
