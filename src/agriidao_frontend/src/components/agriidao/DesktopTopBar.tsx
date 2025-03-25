import React from "react";
import imagePath from "../../assets/images/agriidao-logo-white.svg";
import { NavLink } from "react-router-dom";

const DesktopTopBar = () => {
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

  return (
    <header id="topnav" className="defaultscroll sticky">
      <div className="container d-flex justify-content-between align-items-center">
        <a className="logo" href="#">
          <img
            src={imagePath}
            height="30"
            className="logo-light-mode"
            alt="agriiDAO logo"
          />
        </a>

        <nav id="navigation">
          <ul className="navigation-menu d-flex ">
            <li>
              <a
                href="#home"
                onClick={(e) => handleScroll(e, "home")}
                className="sub-menu-item color-white"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#overview"
                onClick={(e) => handleScroll(e, "overview")}
                className="sub-menu-item color-white"
              >
                Overview
              </a>
            </li>
            <li>
              <a
                href="#process"
                onClick={(e) => handleScroll(e, "process")}
                className="sub-menu-item color-white"
              >
                The Process
              </a>
            </li>
            <li>
              <a
                href="#back-a-coop"
                onClick={(e) => handleScroll(e, "back-a-coop")}
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
                  className="btn btn-outline-light text-light mt-3"
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
