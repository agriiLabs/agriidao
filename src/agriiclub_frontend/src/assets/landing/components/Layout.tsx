import React from "react";
import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";
import BottomBar from "./DesktopBottomBar";


const Layout = () => {
  return (
    <div id="wrapper">    
        <TopBar />
        <div className="content-page">
          <div className="content">
              <Outlet />
            </div>
        </div>
        
        <BottomBar />
    </div>
  );
};

export default Layout;