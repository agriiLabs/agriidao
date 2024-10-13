import React from "react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const TopBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const tageLine = true;
  const [hasDarkTopBar, setHasDarkTopBar ] = useState(true);
  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };
  const toggleLine = () => {
    setIsOpen((prevState) => !prevState);
  };
  
  useEffect(() => { 
    const handleScroll = () => { 
     console.log("scoll position", window.scrollY)
      const scrollThreshold = 0; 
      if (window.scrollY > scrollThreshold) { 
        setHasDarkTopBar(true); 
      } else { 
        setHasDarkTopBar(false); 
      } 
    }; 
   
    window.addEventListener('scroll', handleScroll); 
    return () => { 
      window.removeEventListener('scroll', handleScroll); 
    }; 
  }, []);

  const navbarRef = useRef<HTMLDivElement>(null);

  const windowScroll = () => {
      const navbar = navbarRef.current;
      if (navbar != null) {
          if (
              document.body.scrollTop >= 50 ||
              document.documentElement.scrollTop >= 50
          ) {
              navbar.classList.add("nav-sticky");
          } else {
              navbar.classList.remove("nav-sticky");
          }
      }
  };

  useEffect(() => {
      const handleScroll = () => {
          windowScroll();
      };

      window.addEventListener('scroll', handleScroll);
      
      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, []);


    console.log("topbar", hasDarkTopBar)
    return (
      <React.Fragment>
      {tageLine ? tageLine : null}

      <header ref={navbarRef} id="topnav" className="defaultscroll sticky">
        
          <div className="container">
            {/* logo */}
            {hasDarkTopBar ? (
              <Link className="logo" to="/">
                <img
                  src="/images/logo-dark.svg"
                  height="24"
                  className="logo-light-mode"
                  alt=""
                />
                
              </Link>
            ) : (
              <Link className="logo" to="/">
                <span className="logo-light-mode">
                  <img
                    src="/images/logo-light.svg"
                    className="l-dark"
                    height="24"
                    alt=""
                  />
                  
                </span>
                
              </Link>
            )}
          </div>

          <div className="menu-extras">
            <div className="menu-item">
              <Link
                to="#"
                onClick={toggleLine}
                className={isOpen ? "navbar-toggle open" : "navbar-toggle"}
              >
                <div className="lines">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </Link>
            </div>
          </div>


          <div id="navigation" style={{ display: isOpen ? "block" : "none" }}>
            {/* Menu Dropdown */}
            <ul className="navigation-menu nav-light" id="top-menu">

              {/* DigiFarmers */}
              <li>
                <Link 
                onClick={toggleLine}
                to="/home" className="sub-menu-item">
                   Home
                </Link>
              </li>

              <li>
                <a href="https://agriiclub.com" target="_blank">agriiclub</a>
              </li>
              
              {/* white paper */}
              <li>
                <a href="https://paper.agriidao.org" target="_blank">White Paper</a>
              </li>

              {/* roadmap */}
              <li>
                <Link 
                onClick={toggleLine}
                to="/roadmap" className="sub-menu-item">
                  Roadmap
                </Link>
              </li>
              {/* roadmap */}
              {/* <li>
                <Link 
                onClick={toggleLine}
                to="/agriiclub" className="sub-menu-item">
                  agriiClub
                </Link>
              </li> */}
               
            </ul>

          </div>
      </header>
    </React.Fragment>
    );
};

export default TopBar;