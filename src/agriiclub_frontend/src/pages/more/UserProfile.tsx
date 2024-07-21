import imagePath from "../../assets/images/default-user-profile.png";
import { formatDate } from "../../utils/Utils";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/Context";
import { setProfile } from "../../redux/slices/app";

export interface Response {
  err?: any;
  ok?: any;
}

const UserProfile = () => {
  const { user, profile } = useSelector((state: RootState) => state.app);
  const [profileExists, setProfileExists] = useState(false);
  const navigate = useNavigate();

  // go back
  const handleBack = () => {
    navigate(`/more`);
  };



  useEffect(() => {
    if (profile) {
      setProfileExists(true);
    }
  }, [profile]);

  return (
    <>
      {user && (
        <>
          <div className="header header-fixed header-logo-center">
            <a href="#" className="header-title">
              My Profile
            </a>
            <button
              onClick={handleBack}
              data-back-button
              className="header-icon header-icon-1"
            >
              <i className="fas fa-arrow-left"></i>
            </button>
            {/* <a href="#" data-toggle-theme className="header-icon header-icon-4">
              <i className="fas fa-lightbulb"></i>
            </a> */}
          </div>

          <div className="page-content header-clear-medium">
            <div className="card card-style">
              <div className="d-flex content">
                <div className="flex-grow-1">
                  <div>
                    <p className="font-16 mb-1">
                      <strong>Wallet ID:</strong> {user.id.toString()}
                    </p>
                    <p className="mb-0 pb-1 pr-3">
                      Member since{" "}
                      {formatDate(Number(user.dapp.agriiclub.timeStamp))
                        ? formatDate(Number(user.dapp.agriiclub.timeStamp))
                        : ""}{" "}
                    </p>
                  </div>
                </div>
                <div>
                  <img
                    className="rounded-xl me-3"
                    src={imagePath}
                    data-src={"#"}
                    width="80"
                    height="80"
                    alt={"Default user profile pic"}
                  />
                </div>
              </div>
            </div>

            <div className="card card-style">
              <div className="content">
                <div className="row mb-0">
                  <div className="col-6">
                    <p className="font-15 mt-1">First name</p>
                  </div>
                  <div className="col-6">
                    <p className="font-15 text-end mt-1">
                      {profile && profile.firstName ? profile.firstName : "-"}
                    </p>
                  </div>
                  <div className="divider divider-margins w-100 mt-2 mb-2"></div>
                  <div className="col-6">
                    <p className="font-15 mt-1">Last name</p>
                  </div>
                  <div className="col-6">
                    <p className="font-15 text-end mt-1">
                      {profile && profile.lastName ? profile.lastName : "-"}
                    </p>
                  </div>
                  <div className="divider divider-margins w-100 mt-2 mb-2"></div>
                  <div className="col-6">
                    <p className="font-15 mt-1">DOB</p>
                  </div>
                  <div className="col-6">
                    <p className="font-15 text-end mt-1">
                      {profile && profile.dob
                        ? profile.dob
                        : "-"}
                    </p>
                  </div>
                  <div className="divider divider-margins w-100 mt-2 mb-2"></div>
                  <div className="col-6">
                    <p className="font-15 mt-1">Email</p>
                  </div>
                  <div className="col-6">
                    <p className="font-15 text-end mt-1">
                      {profile && profile.email ? profile.email : "-"}
                    </p>
                  </div>
                  <div className="divider divider-margins w-100 mt-2 mb-2"></div>
                  <div className="col-6">
                    <p className="font-15 mt-1">Mobile</p>
                  </div>
                  <div className="col-6">
                    <p className="font-15 text-end mt-1">
                      {profile && profile.mobile ? profile.mobile : "-"}
                    </p>
                  </div>
                  <div className="divider divider-margins w-100 mt-2 mb-2"></div>
                  <div className="col-6">
                    <p className="font-15 mt-1">Country</p>
                  </div>
                  <div className="col-6">
                    <p className="font-15 text-end mt-1">
                      {profile && profile.countryId ? "" : "-"}
                    </p>
                  </div>
                  <div className="divider divider-margins w-100 mt-2 mb-3"></div>
                  {/* <div className="col-6"><p className="font-15 mt-1">Currency</p></div>
                <div className="col-6"><p className="font-15 text-end mt-1">ZAR</p></div>
                <div className="divider divider-margins w-100 mt-2 mb-3"></div> */}

                  <div className="col-12">
                    {profileExists ? (
                      <Link
                        to={"/profile-update/"}
                        className="btn btn-full btn-m bg-blue-dark rounded-sm text-uppercase font-800"
                      >
                        Update Profile
                      </Link>
                    ) : (
                      <Link
                        to={"/profile-create/"}
                        className="btn btn-full btn-m bg-blue-dark rounded-sm text-uppercase font-800"
                      >
                        Create Profile
                      </Link>
                    )}

                    {/* <Link
                  to={"/profile-create/"}
                  className="btn btn-full btn-m bg-blue-dark rounded-sm text-uppercase font-800 mt-3"
                >
                  Create Profile
                </Link> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserProfile;
