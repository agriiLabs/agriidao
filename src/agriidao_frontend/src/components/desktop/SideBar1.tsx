import { useState } from "react";
import imagePath from "../../assets/images/agriidao-logo.svg";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (menu: string) => {
    setActiveSubmenu(activeSubmenu === menu ? null : menu);
  };

  return (
    <nav id="sidebar" className="sidebar-wrapper">
      <div
        className="sidebar-content"
        data-simplebar
        style={{ height: "calc(100% - 60px)" }}
      >
        <div className="sidebar-brand">
          <a href="/">
            <img src={imagePath} height="24" alt="Logo" />
          </a>
        </div>
        <ul className="sidebar-menu">
        
          

          <li
            className={`sidebar-dropdown ${
              location.pathname === "/d/markets" ? "active" : ""
            }`}
          >
            <NavLink to="/d/markets" className="nav-item">
              <i className="mdi mdi-chart-line me-2"></i>Market Prices
            </NavLink>
          </li>

          <li
            className={`sidebar-dropdown ${
              activeSubmenu === "social-rewards" ? "active" : ""
            }`}
          >
            <a href="#" onClick={() => toggleSubmenu("social-rewards")}>
              <i className="mdi mdi-trophy me-2"></i>Social Rewards
            </a>
            <div
              className={`sidebar-submenu ${
                activeSubmenu === "social-rewards" ? "show" : ""
              }`}
            >
              <ul>
                <li>
                  <NavLink to="/d/rewards" className="sub-menu-item">
                    My Rewards
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/d/leaderboard" className="sub-menu-item">
                    Leaderboard
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/d/campaigns" className="sub-menu-item">
                    Campaigns
                  </NavLink>
                </li>
              </ul>
            </div>
          </li>

        </ul>
      </div>
    </nav>
  );
};

export default SideBar;
