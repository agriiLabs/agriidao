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
                  <div
                    className="text-center w-75 m-auto"
                    style={{ paddingBottom: "30px" }}
                  >
                    <img src={imagePath} width="120" alt="Default Profile" />
                  </div>

                  <div className="text-center m-auto">
                    <button
                      className="btn bg-blue-dark"
                      onClick={() => {
                        login();
                      }}
                    >
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

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-pattern">
                <div className="card-body p-4">
                  <p className="font-700 color-highlight font-15 opacity-90 mb-3 mt-n2">
                    Creating Your Internet Identity
                  </p>
                  <p className="font-15">
                    To log into agriiClub, you need to create an Internet
                    Identity. An Internet ID is a secure and private way to
                    access web3 applications. It is a decentralised identity
                    controlled by you, allowing you to sign in to web3
                    applications and interact with smart contracts. This ensures
                    your privacy and protects your data, providing a seamless
                    and secure login experience. Welcome to a new era of secure
                    and decentralised access!
                  </p>
                  <div className="text-center m-auto">
                    <button
                      className="btn bg-blue-dark"
                      onClick={() => {
                        login();
                      }}
                    >
                      Create Your Internet ID
                    </button>
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
