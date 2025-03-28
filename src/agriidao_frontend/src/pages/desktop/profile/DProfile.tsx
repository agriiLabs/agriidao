import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/Context";
import ProfileCard from "../components/DProfileCard";

export interface Response {
  err?: any;
  ok?: any;
}

const DProfile = () => {
  const { isAuthenticated } = useAuth();
  const { user, profile } = useSelector((state: RootState) => state.app);
  const [profileExists, setProfileExists] = useState(false);
  const navigate = useNavigate();
  const [copySuccess, setCopySuccess] = useState("");
  const [isRevealed, setIsRevealed] = useState(false);

  const userTypeChips = {
    member: "Member",
    agent: "Agent",
    farmer: "Farmer",
    trader: "Trader",
  };

  useEffect(() => {
    if (profile) {
      setProfileExists(true);
    }
  }, [profile]);

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.username.length === 0) {
        navigate("/d/update-username");
      } else {
        navigate("/d/profile");
      }
    }
  }, [isAuthenticated, user]);

  

  const handleCopy = () => {
    if (user?.id) {
      navigator.clipboard
        .writeText(user.id.toString())
        .then(() => setCopySuccess("Copied!"))
        .catch(() => setCopySuccess("Failed to copy!"));
      setTimeout(() => setCopySuccess(""), 2000);
    }
  };

  const toggleReveal = () => {
    setIsRevealed((prev) => !prev);
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h5 className="mb-0">My Profile</h5>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-4"> 
          <div className="col-xl-12 mt-4">
            <div className="rounded shadow border-0 p-4">
            <ProfileCard user={user} userTypeChips={userTypeChips} profileExists={profileExists} />            </div>
            
          </div>
        </div>
        <div className="col-xl-8">
          <div className="col-xl-12 mt-4">
            <div className="card rounded shadow border-0 p-4">
              <div className="d-flex justify-content-between mb-4">
                <h5 className="mb-0">Account Details</h5>
              </div>
              <dl className="row">
                  <dt className="col-sm-3">Principal ID</dt>
                  <dd className="col-sm-9 text-end">{user?.id.toString()
                      ? user?.id.toString()
                    : "No ID available"}{" "}</dd>
                </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="col-xl-8 mt-4">
        <div className="card border-0"></div>
      </div>
    </>
  );
};

export default DProfile;
