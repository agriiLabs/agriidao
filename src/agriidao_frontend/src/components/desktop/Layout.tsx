import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Loader from "../Loader";
import DesktopBottomBar from "./DesktopBottomBar.tsx";
import DesktopTopBar from "./TopBar";
import Sidebar from "./SideBar";

const Layout = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className={`page-wrapper ${isSidebarOpen ? "toggled" : ""}`}>
      <Sidebar />
      {loading && <Loader />}
      <main className="page-content bg-light">
        <DesktopTopBar onToggle={toggleSidebar} />
        <div className="container-fluid">
          <div className="layout-specing">
            <Outlet />
          </div>
        </div>
        <DesktopBottomBar />
      </main>
    </div>
  );
};

export default Layout;
