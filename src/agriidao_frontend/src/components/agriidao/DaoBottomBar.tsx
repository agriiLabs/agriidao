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
          alt="agriiClub icon"
          className="nav-icon"
        />
        <span>Home</span>
      </NavLink>
      <NavLink to="/coop" 
        id="funds-nav-bottom"
        className={({ isActive }) =>
          isActive ? "nav-item active-nav" : "nav-item"
        }>
        <i className="fa fa-handshake"></i>
        <span>Co-ops</span>
      </NavLink>
      <NavLink
        to="/projects"
        id="bounty-nav-bottom"
        className={({ isActive }) =>
          isActive ? "nav-item active-nav" : "nav-item"
        }
      >
        <i className="fa fa-tractor active"></i>
        <span>Projects</span>
      </NavLink>
      {/* <NavLink to="/" id="portfolio-nav-bottom">
        <i className="fa fa-chart-pie"></i>
        <span>Portfolio</span>
      </NavLink>*/}
      <NavLink to="/markets" 
      id="portfolio-nav-bottom"
      className={({ isActive }) =>
        isActive ? "nav-item active-nav" : "nav-item"
      }>
        <i className="fa fa-chart-line"></i>
        <span>Markets</span>
      </NavLink>
      <NavLink 
        to="/reward-campaigns" 
        id="cgc-nav-bottom"
        className={({ isActive }) =>
          isActive ? "nav-item active-nav" : "nav-item"
        }>
        <i className="fa fa-trophy"></i>
        <span>Rewards</span>
      </NavLink>
      
      {/* <NavLink
        to="/ecosystem"
        id="funds-nav-bottom"
        className={({ isActive }) =>
          isActive ? "nav-item active-nav" : "nav-item"
        }
      >
        <i className="fa fa-trophy"></i>
        <span>Rewards</span>
      </NavLink> */}
      {/* <NavLink to="/reward-summary" id="bounty-nav-bottom">
        <i className="fa fa-award"></i>
        <span>agriiPay</span>
      </NavLink> */}
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
