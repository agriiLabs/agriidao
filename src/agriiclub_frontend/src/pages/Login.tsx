import imagePath from "../assets/images/agriiclub-logo.svg";
import { useEffect } from "react";
import { useAuth } from "../hooks/Context";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();
  const { login, logout, isAuthenticated } = useAuth();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate, logout]); 
  

  return (
    <div className="authentication-bg authentication-bg-pattern">
      <div className="account-pages mt-5 mb-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-pattern">
                <div className="card-body p-4">
                  <div className="text-center w-75 m-auto" style={{ paddingBottom: '30px' }}>
                  <img
                    src={imagePath}
                    width="120"
                    alt="Default Profile"
                  />
                  </div>


                  <div className="text-center m-auto">
                  
                    <button className="btn bg-blue-dark" onClick={() => {
                      login();
                      }}>
                      
                      Login with Internet ID
                    </button>
                  </div>

                  <div className="text-center w-75 m-auto">
                    {/* {isAuthenticated === false && (
                      <div>You are not authorised to access this DApp.</div>
                    )} */}

                    {isAuthenticated === null && (
                      <h3>Checking authorization</h3>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
