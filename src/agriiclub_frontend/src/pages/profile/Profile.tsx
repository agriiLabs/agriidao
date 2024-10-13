import imagePath from "../../assets/images/default-user-profile.png";
import imagePath1 from "../../assets/images/ecosystem/agriiclub-icon.svg";
import imagePath2 from "../../assets/images/ecosystem/agriiprice-icon.svg";
import imagePath3 from "../../assets/images/ecosystem/agriimarket-icon.svg";
import imagePath4 from "../../assets/images/ecosystem/agriitrace-icon.svg";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();

  return (
    <>
      <div className="header header-fixed header-logo-center">
        <a href="#" className="header-title">
          My Profile
        </a>
        <button
          onClick={() => window.history.back()}
          data-back-button
          className="header-icon header-icon-1"
        >
          <i className="fas fa-arrow-left"></i>
        </button>
      </div>

      <div className="page-content header-clear-medium">
        <div className="card card-style">
          <div className="d-flex content mb-1">
            <div className="flex-grow-1">
              <div>
                <h1 className="font-700">Terry</h1>
                <p className=" mb-1">
                  Principal ID:
                  npm43-jsx6f-bwi3w-c33sl-5jf9r-j3vcx-6zfz5-c4uhw-zy6yc-xrxuy-xae
                </p>
                <p className="mb-0 pb-1 pr-3 mb-2">
                  Joined: 29 Sept 2024
                  {/* Member since{" "} */}
                  {/* {formatDate(Number(user.dapp.agriiclub.timeStamp))
                        ? formatDate(Number(user.dapp.agriiclub.timeStamp))
                        : ""}{" "} */}
                </p>

                <div className="chip chip-small bg-gray-light">
                  <span
                    className="color-dark text-center w-100 d-block"
                    style={{
                      marginLeft: "7px",
                    }}
                  >
                    Member
                  </span>
                </div>
                <div className="chip chip-small bg-gray-light">
                  <span
                    className="color-dark text-center w-100 d-block"
                    style={{
                      marginLeft: "7px",
                    }}
                  >
                    Agent
                  </span>
                </div>
                <div className="chip chip-small bg-gray-light">
                  <span
                    className="color-dark text-center w-100 d-block"
                    style={{
                      marginLeft: "7px",
                    }}
                  >
                    Farmer
                  </span>
                </div>
              </div>
            </div>

            <div>
              <img
                className="rounded-xl me-3"
                src={imagePath}
                data-src={"#"}
                width="65"
                height="65"
                alt={"Default user profile pic"}
              />
            </div>
          </div>
          <div className="divider mb-0"></div>
          <div className="content ">
            <a
              href="#"
              className="btn btn-sm rounded-sm text-uppercase font-900 border-dark color-dark bg-theme"
            >
              Edit Profile
            </a>
          </div>
        </div>
        

        <div className="card card-style">
            <div className="content mb-0">
                <div className="row mb-2 mt-n2">
                    <div className="col-6 text-start">
                        <h4 className="font-700 text-uppercase font-12 opacity-50">My DApps</h4>
                    </div>
                    {/* <div className="col-6 text-end">
                        <a href="#" className="font-12">View All</a>
                    </div> */}
                </div>
                <div className="divider mb-3"></div>

                <a href="#" className="item">
                    <div className="d-flex mb-4 align-items-start">
                        <div className="pe-3">
                        <img src={imagePath1} className="icon icon-xs rounded-sm" width="50"/>
                        </div>
                        <div >
                            <p className="font-16 font-400 mb-0">agriiClub</p>
                            <p className="font-12 text-muted mt-0">Activated: 29 Sept 2024</p>
                            
                        </div>
                        
                    </div>
                </a>
                <a href="#" className="item">
                    <div className="d-flex mb-4 align-items-start">
                        <div className="pe-3">
                        <img src={imagePath2} className="icon icon-xs rounded-sm" width="50"/>
                        </div>
                        <div >
                            <p className="font-16 font-400 mb-0">agriiPrice</p>
                            <p className="font-12 text-muted mt-0">Activated: Not activated</p>
                            
                        </div>
                        
                    </div>
                </a>
                <a href="#" className="item">
                    <div className="d-flex mb-4 align-items-start">
                        <div className="pe-3">
                        <img src={imagePath3} className="icon icon-xs rounded-sm" width="50"/>
                        </div>
                        <div >
                            <p className="font-16 font-400 mb-0">agriiMarket</p>
                            <p className="font-12 text-muted mt-0">Activated: Not activated</p>
                            
                        </div>
                        
                    </div>
                </a>
                <a href="#" className="item">
                    <div className="d-flex mb-4 align-items-start">
                        <div className="pe-3">
                        <img src={imagePath4} className="icon icon-xs rounded-sm" width="50"/>
                        </div>
                        <div >
                            <p className="font-16 font-400 mb-0">agriiTrace</p>
                            <p className="font-12 text-muted mt-0">Activated: Not activated</p>
                            
                        </div>
                        
                    </div>
                </a>

                
            </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
