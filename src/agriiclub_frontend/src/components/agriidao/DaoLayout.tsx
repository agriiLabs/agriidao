import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Loader from './Loader';
import DaoBottombar from './DaoBottomBar';
import DesktopBottomBar from './DesktopBottomBar';

const Layout = () => {
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); 

    return () => clearTimeout(timer);
  }, [location.pathname]); 

  useEffect(() => {
    // Device detection logic
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobileDevice = /android|iphone|ipad|mobile|ipod/.test(userAgent);
    setIsMobile(isMobileDevice);
  }, []);

  return (
    <div id="wrapper">
        {loading && <Loader />}
        <div className="content-page">          
          <Outlet />        
        </div>
        
        {isMobile ? <DaoBottombar /> : <DesktopBottomBar />}
    </div>
  );
};

export default Layout;
