import React from 'react';
import { Outlet } from 'react-router';

import Header from '../components/Header';

const Layout: React.FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
