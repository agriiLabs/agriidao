import React from "react";
import DProfileClick from "../../pages/desktop/profile/DProfileClick";

interface DesktopTopBarProps {

    onToggle: () => void;
  
  }

  const DesktopTopBar: React.FC<DesktopTopBarProps> = ({ onToggle }) => {
    return (
        <div className="top-header">
          <div className="header-bar d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <a href="#" className="logo-icon me-3">
                <img src="assets/images/logo-icon.png" height="30" alt="Logo" />
              </a>
              <button onClick={onToggle} className="btn btn-soft-light"><i className="mdi mdi-menu"></i></button>

            </div>
    
            <ul className="list-unstyled mb-0 d-flex">
              <li className="list-inline-item">
                <a href="#" className="btn btn-icon btn-soft-light">
                  <i className="ti ti-bell"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="btn btn-soft-light">
                  {/* <img src="assets/images/client/05.jpg" className="" alt="User" /> */}
                  <DProfileClick/>
                </a>
              </li>
            </ul>
          </div>
        </div>
      );
};

export default DesktopTopBar;
