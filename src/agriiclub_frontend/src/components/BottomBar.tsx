import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/Context";

const BottomBar = () => {
  return (
    <div id="footer-bar" className="footer-bar-1">
      {/* <NavLink to="/overvie w" id="home-nav-bottom">
        <i className="fa fa-home"></i>
        <span>Home</span>
      </NavLink>
      <NavLink to="/" id="funds-nav-bottom">
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
      <NavLink to="/reward-summary" id="bounty-nav-bottom">
        <i className="fa fa-award"></i>
        <span>agriiPay</span>
      </NavLink>
      <NavLink to="/more" id="more-nav-bottom">
        <i className="fa fa-bars"></i>
        <span>More</span>
      </NavLink>
    </div>
  );
};

export default BottomBar;

