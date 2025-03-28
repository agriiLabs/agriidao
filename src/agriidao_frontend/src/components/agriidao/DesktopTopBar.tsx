import React, { useState } from "react";
import imagePath from "../../assets/images/agriidao-logo-white.svg";
import { Link, NavLink } from "react-router-dom";

const DesktopTopBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleScroll = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    sectionId: string
  ) => {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleLine = () => {
    setIsOpen((prevState) => !prevState);
  };


  return (
    <header id="topnav" className="defaultscroll sticky bg-dark">
      <div className="container d-flex justify-content-between align-items-center">
        <a className="logo" href="#">
          <img
            src={imagePath}
            height="30"
            className="logo-light-mode"
            alt="agriiDAO logo"
          />
        </a>

        <div className="menu-extras">
            <div className="menu-item">
            <button
                onClick={toggleLine}
                className={isOpen ? "navbar-toggle open" : "navbar-toggle"}
              >
                <div className="lines">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </button>
            </div>
        </div>


        <nav id="navigation" className={`mobile-nav ${isOpen ? "open" : ""} bg-dark`}>
          <ul className="navigation-menu d-flex flex-column flex-md-row">
            <li>
              <a
                href="#home"
                onClick={(e) => {handleScroll(e, "home"); setIsOpen(false);}}
                className="sub-menu-item color-white"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#overview"
                onClick={(e) => {handleScroll(e, "overview"); setIsOpen(false);}}
                className="sub-menu-item color-white"
              >
                Overview
              </a>
            </li>
            <li>
              <a
                href="#process"
                onClick={(e) => {handleScroll(e, "process"); setIsOpen(false);}}
                className="sub-menu-item color-white"
              >
                The Process
              </a>
            </li>
            <li>
              <a
                href="#back-a-coop"
                onClick={(e) => {handleScroll(e, "back-a-coop"); setIsOpen(false);}}
                className="sub-menu-item color-white"
              >
                Back a Co-op
              </a>
            </li>
            <li>
              <a
                href="https://docsend.com/view/2jsbhp2hxinuu83b"
                target="_blank"
                className="sub-menu-item color-white"
              >
                SNS Deck
              </a>
            </li>
            <li>
              <div>
                <NavLink
                  to="/d/markets/"
                  id="nav-bottom"
                  className="btn btn-outline-light text-light mt-3 mb-2"
                >
                  Launch App
                </NavLink>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default DesktopTopBar;
