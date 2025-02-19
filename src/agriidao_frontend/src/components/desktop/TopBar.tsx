import React from 'react'
import imagePath from "../../assets/images/agriidao-logo.svg";

const DesktopTopBar = () => {
  return (
    <header id="topnav" className="defaultscroll sticky">
        <div className="container d-flex justify-content-between align-items-center">
            <a className="logo" href="">
                <img src={imagePath} height="30" className="logo-light-mode" alt="agriiDAO logo" />
            </a>


            <div id="navigation">
                <ul className="navigation-menu">
                    <li><a href="#" className="sub-menu-item">Home</a></li>
                    <li><a href="https://docsend.com/v/qt6yy/agriidao-whitepaper" target='_blank' className="sub-menu-item">White Paper</a></li>
                </ul>
            </div>
        </div>
    </header>
  )
}

export default DesktopTopBar