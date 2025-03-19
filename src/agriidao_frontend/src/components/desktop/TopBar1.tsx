import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import imagePath2 from "../../assets/images/default-profile-pic.png";
import { useAuth } from "../../hooks/Context";



interface DesktopTopBarProps {
  onToggle: () => void;
}

const DesktopTopBar: React.FC<DesktopTopBarProps> = ({ onToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user } = useSelector((state: RootState) => state.app);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleProfileClick = () => {
    if (!user) {
      navigate("/login");
    } else if (!user?.username) {
      navigate("/d/update-username");
    } else {
      navigate("/d/profile");
    }
  };

  const handleLogout = () => {
    logout(); 
    localStorage.removeItem("user");
    navigate("/d/coops");
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="top-header">
      <div className="header-bar d-flex justify-content-between">
        <div className="d-flex align-items-center">
          <button onClick={onToggle} className="btn btn-soft-light">
            <i className="mdi mdi-menu"></i>
          </button>
          
        </div>

        <ul className="list-unstyled mb-0 d-flex">
          
          <li className="list-inline-item">
            <div className="dropdown dropdown-primary" ref={dropdownRef}>
              <button
                type="button"
                className="btn btn-soft-light dropdown-toggle p-0"
                onClick={() => setIsOpen(!isOpen)} 
              >
                <img
                  src={imagePath2}
                  className="avatar avatar-ex-small rounded"
                  alt=""
                />
              </button>
              <div
                className={`dropdown-menu dd-menu dropdown-menu-end shadow border-0 mt-3 py-3  ${
                  isOpen ? "show" : ""
                }`}
                style={{ 
                  minWidth: "200px", 
                  right: 0, 
                  left: "auto", 
                }}
              >
                
                <button 
                  className="dropdown-item text-dark" 
                  onClick={handleProfileClick}>
                  <i className="mdi mdi-account me-1"></i> Profile
                </button>
                <button className="dropdown-item text-dark" 
                onClick={handleLogout}>
                  <i className="mdi mdi-logout me-1"></i> Logout
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DesktopTopBar;
