import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Loader from '../Loader';
import DesktopBottomBar from './BottomBar';
import DesktopTopBar from './TopBar';

const Layout = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); 

    return () => clearTimeout(timer);
  }, [location.pathname]); 

  return (
    <div id="wrapper">
        {loading && <Loader />}
        <DesktopTopBar />
        <div className="content-page">
          <Outlet />
        </div>
        
        <DesktopBottomBar />
    </div>
  );
};

export default Layout;
