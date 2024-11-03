import { useDispatch } from "react-redux";
import { useAuth } from "../../hooks/Context";
import { Link, useNavigate } from "react-router-dom";
import ProfileClick from "../profile/component/ProfileClick";

function More() {
  const { logout } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    localStorage.removeItem("user");
    navigate("/");
  };


  return (
    <>
      <div className="header header-fixed header-logo-center">
        <a className="header-title">More Options</a>
        <button
          onClick={() => window.history.back()}
          data-back-button
          className="header-icon header-icon-1"
        >
          <i className="fas fa-arrow-left"></i>
        </button>

        <ProfileClick />
      </div>

      <div className="page-content header-clear-medium">
        <div className="card card-style">
            <div className="content my-0">
                <div className="list-group list-custom-small">
                    <Link to={`/african-food-systems-challenges`}>
                        <i className="fa fa-exclamation-circle color-dark"></i>
                        <span className="opacity-70">Why Food Systems Need Change</span>
                        <i className="fa fa-angle-right"></i>
                    </Link>
                    <a href="#">
                        
                    </a>
                    <Link to={`/how-it-works`}>
                        <i className="fa fa-cogs color-dark"></i>
                        <span className="opacity-70">How agriiDAO Works</span>
                        <i className="fa fa-angle-right"></i>
                    </Link>
                    <Link to={`/ecosystem`}>
                        <i className="fa fa-network-wired color-dark"></i>
                        <span className="opacity-70">Our Ecosystem</span>
                        <i className="fa fa-angle-right"></i>
                    </Link>
                    <Link to={`/esg`}>
                        <i className="fa fa-globe color-dark"></i>
                        <span className="opacity-70">Environmental, Social and Governance</span>
                        <i className="fa fa-angle-right"></i>
                    </Link>
                    {/* <a href="#">
                        <i className="fa fa-road color-dark"></i>
                        <span className="opacity-70">Roadmap</span>
                        <i className="fa fa-angle-right"></i>
                    </a> */}
                </div>
            </div>
        </div>
        
            
        <div className="card card-style">
            <div className="content my-0">
                <div className="list-group list-custom-small">
                    {/* <a href="/agriidao/home">
                        <i className="fa fa-info color-dark"></i>
                        <span className="opacity-70">FAQs</span>
                        <i className="fa fa-angle-right"></i>
                    </a>
                    <a href="/agriidao/home">
                        <i className="fa fa-copyright color-dark"></i>
                        <span className="opacity-70">Terms and Conditions</span>
                        <i className="fa fa-angle-right"></i>
                    </a> */}
                    <a href="/home">
                        <i className="fa fa-comment color-dark"></i>
                        <span className="opacity-70">Get in touch</span>
                        <i className="fa fa-angle-right"></i>
                    </a>
                </div>
            </div>
        </div>
        
        <div className="content my-0">
            <div className="list-group list-custom-small">
              <div className="list-group list-custom-small">
                <button className="btn btn-full btn-m bg-dark color-white rounded-sm text-uppercase font-800 mt-3" onClick={handleLogout}>
                  Logout
                </button>

                    

              </div>
            </div>
          </div>
        
      </div>
    </>
  );
}

export default More;
