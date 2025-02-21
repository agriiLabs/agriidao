import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { formatDate, toastSuccess } from "../../../utils/Utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/Context";
import { BountyPoint } from "../../../../../declarations/bounty/bounty.did";

export interface Response {
  err?: any;
  ok?: any;
}

const DProfileCreate = () => {
  const { isAuthenticated, userActor, bountyActor } = useAuth();
  const { user, profile } = useSelector((state: RootState) => state.app);
  const [profileExists, setProfileExists] = useState(false);
  const navigate = useNavigate();
  const [copySuccess, setCopySuccess] = useState("");
  const [isRevealed, setIsRevealed] = useState(false);
  const [bountyPoint, setBountyPoint] = useState<BountyPoint | null>(null);

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
        navigate("/update-username");
      } else {
        navigate("/d/profile");
      }
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (bountyActor) {
      getBountyPoints();
    }
  }, [bountyActor]);

  const getBountyPoints = async () => {
    if (!bountyActor) {
      console.error("caller or bountyActor is null");
      return;
    }
    const res = await bountyActor.getBountyPointByUserId();
    if ("ok" in res) {
      setBountyPoint(res.ok);
    } else {
      console.error("Error retrieving bounty points");
    }
  };

  const formatUserId = (user: { id: string }) => {
    if (!user.id || user.id.length <= 8) {
      return user.id;
    }
    const firstPart = user.id.substring(0, 6);
    const lastPart = user.id.substring(user.id.length - 6);
    return `${firstPart}...${lastPart}`;
  };

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
    setIsRevealed((prev) => !prev); // Toggle reveal state
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
            <div className="card rounded shadow border-0 p-4">
              <div className="d-flex justify-content-between ">
                <h5 className="mb-0">{user?.username}</h5>
              </div>
              <div className="mt-4">
                <dl className="row">
                  <dt className="col-sm-5">Joined</dt>
                  <dd className="col-sm-7 text-end">{formatDate(Number(user?.timeStamp))
                    ? formatDate(Number(user?.timeStamp))
                    : ""}{" "}</dd>
                </dl>
                {user?.userType &&
                  Object.entries(user.userType).map(([key, value]) => {
                    return value &&
                      userTypeChips[key as keyof typeof userTypeChips] ? (
                      <div key={key} className="chip chip-small bg-gray-light">
                        <span
                          className="color-dark text-center w-100 d-block"
                          style={{ marginLeft: "7px" }}
                        >
                          {userTypeChips[key as keyof typeof userTypeChips]}
                        </span>
                      </div>
                    ) : null;
                  })}
              </div>
              <div className="mt-4">
              <a href="#" className="btn btn-outline-dark col-sm-12"> Personal Details </a>
              </div>
              <div className="mt-2">
              <a href="#" className="btn btn-outline-dark col-sm-12"> Account Details </a>
              </div>
              <div className="mt-2">
              <a href="#" className="btn btn-outline-dark col-sm-12"> Socials </a>
              </div>
            </div>
            
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

export default DProfileCreate;
