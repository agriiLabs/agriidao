import imagePath from "../../assets/images/agriiclub-icon-black.svg";
import { NavLink } from "react-router-dom";

const BottomBar = () => {
  return (
    <div id="footer-bar" className="footer-bar-3">
      <NavLink
        to="/home"
        id="home-nav-bottom"
        className={({ isActive }) =>
          isActive ? "nav-item active-nav" : "nav-item"
        }
      >
        <img
          src={imagePath}
          width="19"
          alt="agriiDAO icon"
          className="nav-icon"
        />
        <span>Home</span>
      </NavLink>
      <NavLink 
        to="/coops" 
        id="campaigns-nav-bottom"
        className={({ isActive }) =>
          isActive ? "nav-item active-nav" : "nav-item"
        }>
        <i className="fa fa-handshake"></i>
        <span>Co-ops</span>
      </NavLink>
      <NavLink 
        to="/projects" 
        id="campaigns-nav-bottom"
        className={({ isActive }) =>
          isActive ? "nav-item active-nav" : "nav-item"
        }>
        <i className="fa fa-tractor"></i>
        <span>Projects</span>
      </NavLink>
      
      <NavLink to="/markets" 
      id="markets-nav-bottom"
      className={({ isActive }) =>
        isActive ? "nav-item active-nav" : "nav-item"
      }>
        <i className="fa fa-chart-line"></i>
        <span>Markets</span>
      </NavLink>
      <NavLink 
        to="/reward-campaigns" 
        id="campaigns-nav-bottom"
        className={({ isActive }) =>
          isActive ? "nav-item active-nav" : "nav-item"
        }>
        <i className="fa fa-trophy"></i>
        <span>Rewards</span>
      </NavLink>
      
      
     
      <NavLink
        to="/more"
        id="more-nav-bottom"
        className={({ isActive }) =>
          isActive ? "nav-item active-nav" : "nav-item"
        }
      >
        <i className="fa fa-bars"></i>
        <span>More</span>
      </NavLink>
    </div>
  );
};

export default BottomBar;
