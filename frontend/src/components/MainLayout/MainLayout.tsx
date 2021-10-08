import React, { Children } from 'react';
import MainMenu from './MainMenu';

const MainLayout = ({ children }) => {
  return (
    <div>
      <MainMenu />
      {children}
    </div>
  );
};

export default MainLayout;
