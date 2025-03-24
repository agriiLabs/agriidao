import imagePath from "../../assets/images/default-user-profile.png";
import imagePath1 from "../../assets/images/ecosystem/agriicoop-icon.svg";
import imagePath2 from "../../assets/images/ecosystem/agriiprice-icon.svg";
import imagePath3 from "../../assets/images/ecosystem/agriimarket-icon.svg";
import imagePath4 from "../../assets/images/ecosystem/agriitrace-icon.svg";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { formatDate, toastError, toastSuccess } from "../../utils/Utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/Context";
import {
  Profile as ProfileType,
  WalletAddress,
  WalletAddressRequest,
} from "../../../../declarations/user/user.did";
import { BountyPoint } from "../../../../declarations/bounty/bounty.did";
import ConnectWallet from "./ConnectWallet";
import { ProfilePicModal } from "./component/UpdateProfile";
import { CiEdit } from "react-icons/ci";
import { deleteAsset, uploadFile } from "../../hooks/storage-config/functions";
import { setProfile } from "../../redux/slices/app";
// declare global {
//   interface Window {
//     ethereum: any;
//   }
// }

export interface Response {
  err?: any;
  ok?: any;
}

const Profile = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, userActor, storageActor, bountyActor } = useAuth();
  const { user, profile } = useSelector((state: RootState) => state.app);
  const [profileExists, setProfileExists] = useState(false);
  const navigate = useNavigate();
  const [copySuccess, setCopySuccess] = useState("");
  const [isRevealed, setIsRevealed] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [bountyPoint, setBountyPoint] = useState<BountyPoint | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [updatingProfile, setUpdatingProfile] = useState(false);

  const userTypeChips = {
    member: "Member",
    agent: "Agent",
    farmer: "Farmer",
    trader: "Trader",
  };

  const agent = user?.userType?.agent;

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
        navigate("/profile");
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
      console.log("Error retrieving bounty points : ", res.err);
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
    setIsRevealed((prev) => !prev);
  };


  const uploadAsset = async (file: File) => {
    if (!storageActor) return;
    const file_path = location.pathname;
    try {
      const assetUrl = await uploadFile(file, file_path, storageActor);
      return assetUrl;
    } catch (error) {
      console.error("Error uploading file:", file.name, error);
    }
  };

  const handleImageUpdate = async (file: File) => {
    try {
      if (!storageActor || !profile) {
        console.error("storageActor or profile is null");
        return;
      }
      setUpdatingProfile(true);
        const oldImage = profile.profilePic[0];
        if (oldImage) {
          await deleteAsset(oldImage, storageActor);
        }
        const imageUrl = await uploadAsset(file);
        if (imageUrl) {
          let updatedProfile: ProfileType = {
            ...profile,
            profilePic: [imageUrl],
          }
          await userActor?.updateProfile(updatedProfile);
           dispatch(setProfile(updatedProfile));
          toastSuccess("Profile pic updated successfully");
        }
    } catch (error) {
      console.error("Error updating profile pic", error);
      toastError("Error updating profile pic");
    } finally {
      setUpdatingProfile(false);
      setIsModalOpen(false);
    }
  };


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
        <div className="">
          <div className="d-flex content mb-1">
            <div className="flex-grow-1"
            >
              <div>
                <h1 className="font-700">{user?.username}</h1>
                <p className="mb-1">
                  PID:{" "}
                  {user?.id
                    ? isRevealed
                      ? user.id.toString()
                      : formatUserId({ id: user.id.toString() })
                    : "No ID available"}{" "}
                  {user?.id && (
                    <>
                      <button
                        onClick={toggleReveal}
                        style={{ marginRight: "10px", cursor: "pointer" }}
                      >
                        {isRevealed ? (
                          <>
                            <i
                              className="fa fa-eye-slash"
                              aria-hidden="true"
                            ></i>
                          </>
                        ) : (
                          <>
                            <i className="fa fa-eye" aria-hidden="true"></i>
                          </>
                        )}
                      </button>

                      <button
                        onClick={handleCopy}
                        style={{ marginLeft: "10px", cursor: "pointer" }}
                      >
                        <i className="fa fa-clipboard" aria-hidden="true"></i>
                      </button>
                    </>
                  )}
                  {copySuccess && (
                    <p style={{ color: "green" }}>{copySuccess}</p>
                  )}
                </p>

                <p className="mb-0 pb-1 pr-3 mb-2">
                  Joined:{" "}
                  {formatDate(Number(user?.timeStamp))
                    ? formatDate(Number(user?.timeStamp))
                    : ""}{" "}
                </p>

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
            </div>

            <div className="position-relative d-inline-block">
              {isModalOpen && <ProfilePicModal
                imagePath={imagePath}
                onClose={() => setIsModalOpen(false)}
                loading={updatingProfile}
                onImageUpdate={handleImageUpdate}
              />}
              <img
                className="rounded-xl me-3"
                src={profile?.profilePic[0] || imagePath}
                data-src={"#"}
                width="65"
                height="65"
                alt={"Default user profile pic"}
              />
              <button
                className="btn btn-sm  position-absolute bottom-0 end-0 me-1 mb-1"
                type="button"
                onClick={() => setIsModalOpen(true)}
              >
                <CiEdit size={18} />
              </button>
            </div>
          </div>
          <div className="divider mb-0"></div>
          <div className="content ">
            {profileExists ? (
              <Link
                to={"profile-update/"}
                className="btn btn-sm rounded-sm text-uppercase font-900 border-dark color-dark bg-theme"
              >
                Manage Profile
              </Link>
            ) : (
              <Link
                to={"profile-create/"}
                className="btn btn-sm rounded-sm text-uppercase font-900 border-dark color-dark bg-theme"
              >
                Complete Profile
              </Link>
            )}
          </div>
        </div>

        {agent && (
          <div className="card card-style">
            <div className="content">

              <NavLink
                to={`/market-agents/${user?.id}`}
                id="nav-bottom"
                className="font-15 color-dark d-flex "
              >
                <div className="align-self-center ">
                  <p className="font-15 mb-0">My Markets</p>
                </div>
                <i className="fa fa-angle-right ms-auto text-end mt-2" />



              </NavLink>


            </div>
          </div>
        )}

        {bountyPoint && (
          <div className="card card-style">
            <div className="content">
              <div className="row mb-2 mt-n2">
                <div className="col-6 text-start">
                  <h4 className="font-700 text-uppercase font-12 opacity-50">
                    My Rewards
                  </h4>
                </div>
                <div className="col-6 text-end">
                  <NavLink
                    to="/reward-summary"
                    id="nav-bottom"
                    className="font-12 color-dark"
                  >
                    View More
                  </NavLink>
                </div>
              </div>
              <div className="divider mb-3"></div>
              <div className="row mb-0">
                <div className="col-6">
                  <p className="font-15 mb-0">Total Points</p>
                  <p className="font-12">4 Points = 1 AGRII</p>
                </div>
                <div className="col-6">
                  <p className="font-15 text-end mb-0">
                    {" "}
                    {bountyPoint.balance}{" "}
                  </p>
                  <p className="font-12 opacity-50 text-end">
                    {bountyPoint.balance / 4} AGRII
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* <div className="card card-style">
          <div className="content mb-0">
            <div className="row mb-2 mt-n2">
              <div className="col-6 text-start">
                <h4 className="font-700 text-uppercase font-12 opacity-50">
                  My DApps
                </h4>
              </div>
            </div>
            <div className="divider mb-3"></div>

            <a href="#" className="item">
              <div className="d-flex mb-4 align-items-start">
                <div className="pe-3">
                  <img
                    src={imagePath1}
                    className="icon icon-xs rounded-sm"
                    width="50"
                  />
                </div>
                <div>
                  <p className="font-16 font-400 mb-0">agriiCOOP</p>
                  <p className="font-12 text-muted mt-0">
                    Activated: Not activated
                  </p>
                </div>
              </div>
            </a>
            <a href="#" className="item">
              <div className="d-flex mb-4 align-items-start">
                <div className="pe-3">
                  <img
                    src={imagePath2}
                    className="icon icon-xs rounded-sm"
                    width="50"
                  />
                </div>
                <div>
                  <p className="font-16 font-400 mb-0">agriiPrice</p>
                  <p className="font-12 text-muted mt-0">
                    Activated: Not activated
                  </p>
                </div>
              </div>
            </a>
            <a href="#" className="item">
              <div className="d-flex mb-4 align-items-start">
                <div className="pe-3">
                  <img
                    src={imagePath3}
                    className="icon icon-xs rounded-sm"
                    width="50"
                  />
                </div>
                <div>
                  <p className="font-16 font-400 mb-0">agriiMarket</p>
                  <p className="font-12 text-muted mt-0">
                    Activated: Not activated
                  </p>
                </div>
              </div>
            </a>
            <a href="#" className="item">
              <div className="d-flex mb-4 align-items-start">
                <div className="pe-3">
                  <img
                    src={imagePath4}
                    className="icon icon-xs rounded-sm"
                    width="50"
                  />
                </div>
                <div>
                  <p className="font-16 font-400 mb-0">agriiTrace</p>
                  <p className="font-12 text-muted mt-0">
                    Activated: Not activated
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Profile;
