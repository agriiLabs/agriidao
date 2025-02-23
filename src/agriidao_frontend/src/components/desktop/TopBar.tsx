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
          <button onClick={onToggle} className="btn btn-soft-light">
            <i className="mdi mdi-menu"></i>
          </button>
          <div className="search-bar p-0 d-none d-md-block ms-2">
            <div id="search" className="menu-search mb-0">
              <form
                role="search"
                method="get"
                id="searchform"
                className="searchform"
              >
                <div>
                  <input
                    type="text"
                    className="form-control border rounded"
                    name="s"
                    id="s"
                    placeholder="Ask Yoma..."
                  />
                  <input type="submit" id="searchsubmit" value="Search" />
                </div>
              </form>
            </div>
          </div>
        </div>

        <ul className="list-unstyled mb-0 d-flex">
          <li className="list-inline-item">
            <a href="#" className="btn btn-soft-light">
              <i className="mdi mdi-robot"></i>
            </a>
          </li>
          <li className="list-inline-item">
            <DProfileClick />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DesktopTopBar;
