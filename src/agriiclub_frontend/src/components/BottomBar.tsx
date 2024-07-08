import imagePath from "../assets/images/agriiclub-icon-black.svg";
import { NavLink } from "react-router-dom";

const BottomBar = () => {
  return (
    <div id="footer-bar" className="footer-bar-1">
      <NavLink to="/home" id="home-nav-bottom">
      <img
        src={imagePath}
        width="19"
        alt="agriiClub icon"
      />
        <span>Home</span>
      </NavLink>
      {/* <NavLink to="/" id="funds-nav-bottom">
        <i className="fa fa-handshake"></i>
        <span>Stokvels</span>
      </NavLink>
      <NavLink to="/" id="portfolio-nav-bottom">
        <i className="fa fa-chart-pie"></i>
        <span>Portfolio</span>
      </NavLink>
      <NavLink to="/" id="cgc-nav-bottom">
        <i className="fa fa-users"></i>
        <span>CoOp</span>
      </NavLink> */}
      <NavLink to="/reward-summary" id="bounty-nav-bottom">
        <i className="fa fa-award"></i>
        <span>Rewards</span>
      </NavLink>
      <NavLink to="/" id="funds-nav-bottom">
        <i className="fa fa-handshake"></i>
        <span>Stokvels</span>
      </NavLink>
      {/* <NavLink to="/reward-summary" id="bounty-nav-bottom">
        <i className="fa fa-award"></i>
        <span>agriiPay</span>
      </NavLink> */}
      <NavLink to="/more" id="more-nav-bottom">
        <i className="fa fa-bars"></i>
        <span>More</span>
      </NavLink>
    </div>
  );
};

export default BottomBar;

