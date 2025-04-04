import React from 'react';
import { Outlet } from 'react-router';

import Header from '../components/Header';

const Layout: React.FC = () => {
  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
