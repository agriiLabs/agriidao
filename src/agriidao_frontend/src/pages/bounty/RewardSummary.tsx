import{ useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/Context";
import { BountyPoint, CampaignUser } from "../../../../declarations/bounty/bounty.did";
import Count from "./count/Count";
import CountPending from "./count/CountPending";
import CountRejected from "./count/CountRejected";
import CountAccepted from "./count/CountAccepted";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import imagePath2 from "../../assets/images/default-user-profile.png";
// import handleProfileClick from "../profile/component/ProfileClick";

const RewardSummary = () => {
  const { bountyActor } = useAuth();
  const { user } = useSelector((state: RootState) => state.app);
  const navigate = useNavigate();
  const [campaignSubs, setCampaignSubs] = useState<CampaignUser[]>([]);
  const [campaignPending, setCampaignPending] = useState<CampaignUser[]>([]);
  const [campaignRejected, setCampaignRejected] = useState<CampaignUser[]>([]);
  const [campaignAccepted, setCampaignAccepted] = useState<CampaignUser[]>([]);
  const [bountyPoint, setBountyPoint] = useState<BountyPoint | null>(null);
  

  useEffect(() => {
    if (bountyActor) {
      getAllCampaignSubs();
      getPendingCampaignSubs();
      getRejectedCampaignSubs();
      getAcceptedCampaignSubs();
      getBountyPoints();
    }
  }, [bountyActor]);

  // get total submissions
  const getAllCampaignSubs = async () => {
    if (!bountyActor) {
      console.error("caller or bountyActor is null");
      return;
    }
    const res = await bountyActor.getUserCampaignsByUserId();
    setCampaignSubs(res);
  };

  // get pending submissions
  const getPendingCampaignSubs = async () => {
    if (!bountyActor) {
      console.error("caller or bountyActor is null");
      return;
    }
    const res = await bountyActor.getUserCampaignsPending();
    setCampaignPending(res);
  };

  // get rejected submissions
  const getRejectedCampaignSubs = async () => {
    if (!bountyActor) {
      console.error("caller or bountyActor is null");
      return;
    }
    const res = await bountyActor.getUserCampaignsRejected();
    setCampaignRejected(res);
  };

  // get accepted submissions
  const getAcceptedCampaignSubs = async () => {
    if (!bountyActor) {
      console.error("caller or bountyActor is null");
      return;
    }
    const res = await bountyActor.getUserCampaignsAccepted();
    setCampaignAccepted(res);
  };

  // get user bountyPoints
  const getBountyPoints = async () => {
    if (!bountyActor) {
      console.error("caller or bountyActor is null");
      return;
    }
    const res = await bountyActor.getBountyPointByUserId();
    if ('ok' in res) {
      setBountyPoint(res.ok);
      console.log("Bounty Points: ", res.ok);
    } else {
      console.error("Error retrieving bounty points");
    }
  }

  const handleProfileClick = () => {
    
    if (!user){
      navigate("/login");
    } else if (!user?.username) {
      // Redirect to update username page if the user is logged in but no username is set
      navigate("/update-username");
    } else {
      // Redirect to profile page if the user is logged in and has a username
      navigate("/profile");
    }
  };


  return (
    <>
      {/* header */}
      <div className="header header-fixed header-logo-center">
        <a className="header-title">My Rewards</a>
        <button
          onClick={() => window.history.back()}
          data-back-button
          className="header-icon header-icon-1"
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        <button onClick={handleProfileClick} className="header-icon header-icon-4">
          <div>
            <img
              className="rounded-xl me-3"
              src={imagePath2}
              data-src={"#"}
              width="25"
              height="25"
              alt={"Default user profile pic"}
            />
          </div>
        </button>
      </div>

      {/* body */}
      <div className="page-content header-clear-medium">

      {bountyPoint && <div className="card card-style">
          <div className="content">
            <div className="row mb-0">
              <div className="col-6">
                <p className="font-15 mb-0">Total Points</p>
                <p className="font-12">4 Points = 1 AGRII</p>
              </div>
              <div className="col-6">
                <p className="font-15 text-end mb-0"> {bountyPoint.balance} </p>
                <p className="font-12 opacity-50 text-end">{bountyPoint.balance / 4 } AGRII</p>
              </div>
            </div>
          </div>
        </div>}

        <div className="card card-style">
          <div className="content">
          <h4 className="font-700 text-uppercase font-12 opacity-50">
            Social Rewards Summary
          </h4>
          <div className="divider mb-3" />
            <Link to={"/total-submissions"} className="d-flex mb-3">
              <div className="align-self-center">
                <p className="font-15 mb-n2">Total Submissions</p>
              </div>
              <div className="align-self-center ms-auto">
                <p className="font-15 mb-n2 align-items-center d-flex">
                  <Count {...{ campaignSubs }} /> <i className="fas fa-chevron-right ms-2"></i>
                </p> 
              </div>
            </Link>
            {/* <div className="divider divider-margins w-100 mt-2 mb-3"></div> */}
            <Link to={"/total-pending"} className="d-flex mb-3">
              <div className="align-self-center">
                <p className="font-15 mb-n2">Total Pending</p>
              </div>
              <div className="align-self-center ms-auto">
                <p className="font-15 mb-0 align-items-center d-flex"><CountPending {...{ campaignPending }} /> <i className="fas fa-chevron-right ms-2"></i></p>
              </div>
            </Link>
            {/* <div className="divider divider-margins w-100 mt-2 mb-3"></div> */}
            <Link to={"/total-accepted"} className="d-flex mb-3">
              <div className="align-self-center">
                <p className="font-15 mb-n2">Total Accepted</p>
              </div>
              <div className="align-self-center ms-auto">
                <p className="font-15 mb-0 align-items-center d-flex"><CountAccepted {...{ campaignAccepted }} /> <i className="fas fa-chevron-right ms-2"></i></p>
              </div>
            </Link>
            {/* <div className="divider divider-margins w-100 mt-2 mb-3"></div> */}
            <Link to={"/total-rejected"} className="d-flex mb-3">
              <div className="align-self-center">
                <p className="font-15 mb-n2">Total Rejected</p>
              </div>
              <div className="align-self-center ms-auto">
                <p className="font-15 mb-0 align-items-center d-flex"> <CountRejected {...{ campaignRejected }} /> <i className="fas fa-chevron-right ms-2"></i></p>
              </div>
            </Link>
          </div>
        </div>

        

        <div className="card card-style">
          <div className="content">
          <h4 className="font-700 text-uppercase font-12 opacity-50">
            Campaigns
          </h4>
          <div className="divider mb-3" />
          <Link to={"/reward-campaigns"} className="d-flex mb-2">
              <div className="align-self-center">
                <p className="font-15">Active Campiagns</p>
              </div>
              <div className="align-self-center ms-auto">
               <p><i className="fas fa-chevron-right" /></p>
              </div>
          </Link>
          <Link to={"/rewards-leaderboard"} className="d-flex mb-2">
              <div className="align-self-center">
                <p className="font-15">Leaderboard</p>
              </div>
              <div className="align-self-center ms-auto">
              <p><i className="fas fa-chevron-right" /></p>
              </div>
          </Link>
            
          </div>
        </div>

        
      </div>
    </>
  );
};
export default RewardSummary;
