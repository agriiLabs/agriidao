import React from "react";

const DesktopBottomBar = () => {
  return (
    <footer className="footer">
      <div className="footer-py-10 ">
        <div className="container text-center">
          <div className="row align-items-center">
            <div className="col-sm-6">
              <div className="text-sm-start">
                <p className="mb-0">
                  © <script> document.write(new Date().getFullYear());</script>
                  agriiDAO by agriiLabs.
                </p>
              </div>
            </div>

            <div className="col-sm-6 mt-4 mt-sm-0 pt-2 pt-sm-0">
              <ul className="list-unstyled text-sm-end mb-0">
                <li className="list-inline-item">
                  <a href="https://internetcomputer.org" target="_blank">
                    <img
                      src="/images/icp-logo.png"
                      className="avatar avatar-ex-sm"
                      title="ICP"
                      alt="ICP logo"
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DesktopBottomBar;
