import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../hooks/Context";
import { CampaignUser } from "../../../declarations/bounty/bounty.did";

import Count from "../pages/bounty/count/Count";
import CountPending from "../pages/bounty/count/CountPending";
import CountRejected from "../pages/bounty/count/CountRejected";
import CountAccepted from "../pages/bounty/count/CountAccepted";

const Home = () => {
  const {logout} = useAuth()

  const { bountyActor } = useAuth();
  const { id } = useParams();
  const [campaignSubs, setCampaignSubs] = useState<CampaignUser[]>([]);
  const [campaignPending, setCampaignPending] = useState<CampaignUser[]>([]);
  const [campaignRejected, setCampaignRejected] = useState<CampaignUser[]>([]);
  const [campaignAccepted, setCampaignAccepted] = useState<CampaignUser[]>([]);

  useEffect(() => {
    if (bountyActor) {
      getAllCampaignSubs();
      getPendingCampaignSubs();
      getRejectedCampaignSubs();
      getAcceptedCampaignSubs();
    }
  }, [bountyActor]);

  // get total submissions
  const getAllCampaignSubs = async () => {
    if (!bountyActor) {
      console.error("caller or bountyActor is null");
      return;
    }
    const res = await bountyActor.getAllLatestCampaignUsers();
    setCampaignSubs(res);
  };

  // get pending submissions
  const getPendingCampaignSubs = async () => {
    if (!bountyActor) {
      console.error("caller or bountyActor is null");
      return;
    }
    const res = await bountyActor.getAllLatestCampaignUsersPending();
    console.log("pending tasks", res)
    setCampaignPending(res);
  };

  // get rejected submissions
  const getRejectedCampaignSubs = async () => {
    if (!bountyActor) {
      console.error("caller or bountyActor is null");
      return;
    }
    const res = await bountyActor.getAllLatestCampaignUsersRejected();
    console.log("rejected tasks", res)
    setCampaignRejected(res);
  };

  // get accepted submissions
  const getAcceptedCampaignSubs = async () => {
    if (!bountyActor) {
      console.error("caller or bountyActor is null");
      return;
    }
    const res = await bountyActor.getAllLatestCampaignUsersAccepted();
    console.log("rejected tasks", res)
    setCampaignAccepted(res);
  };

  return (
    <>
      {/* header */}
      <div className="header header-fixed header-logo-center">
        <a className="header-title">Reward Summary</a>
        {/* <a href="#" data-back-button className="header-icon header-icon-1">
          <i className="fas fa-arrow-left"></i>
        </a> */}
        <a href="#" data-toggle-theme className="header-icon header-icon-4">
          <i className="fas fa-lightbulb"></i>
        </a>
      </div>

      {/* body */}
      <div className="page-content header-clear-medium">
        <div className="card card-style">
          <div className="content">
            <p className="font-700 text-uppercase color-highlight font-12 opacity-70 mb-3 mt-n2">
              Submission Summary
            </p>
            <Link to={"/total-submissions"} className="d-flex">
              <div className="align-self-center">
                <p className="font-15 mb-n2">Total Submissions</p>
              </div>
              <div className="align-self-center ms-auto">
                <p className="font-15 mb-n2">
                  <Count {...{ campaignSubs }} />
                </p>
              </div>
            </Link>
            <div className="divider divider-margins w-100 mt-2 mb-3"></div>
            <Link to={"/total-pending"} className="d-flex">
              <div className="align-self-center">
                <p className="font-15 mb-n2">Total Pending</p>
              </div>
              <div className="align-self-center ms-auto">
                <p className="font-15 mb-0"><CountPending {...{ campaignPending }} /></p>
              </div>
            </Link>
            <div className="divider divider-margins w-100 mt-2 mb-3"></div>
            <Link to={"/total-accepted"} className="d-flex">
              <div className="align-self-center">
                <p className="font-15 mb-n2">Total Accepted</p>
              </div>
              <div className="align-self-center ms-auto">
                <p className="font-15 mb-0"><CountAccepted {...{ campaignAccepted }} /></p>
              </div>
            </Link>
            <div className="divider divider-margins w-100 mt-2 mb-3"></div>
            <Link to={"/total-rejected"} className="d-flex">
              <div className="align-self-center">
                <p className="font-15 mb-n2">Total Rejected</p>
              </div>
              <div className="align-self-center ms-auto">
                <p className="font-15 mb-0"><CountRejected {...{ campaignRejected }} /></p>
              </div>
            </Link>
          </div>
        </div>

        <div className="card card-style">
          <div className="content">
            <p className="font-700 text-uppercase color-highlight font-12 opacity-70 mb-3 mt-n2">
              Payments Summary
            </p>
            <div className="row mb-0">
              <div className="col-6">
                <p className="font-15">Total Payments</p>
              </div>
              <div className="col-6">
                <p className="font-15 text-end mb-0"> 20 AGRII</p>
                <p className="font-12 opacity-50 text-end">10 USD</p>
              </div>
            </div>
          </div>
        </div>

        <div className="content">
          <a
            href="{% url 'public_user:leaderboard' %}"
            className="btn btn-full btn-m bg-blue-dark rounded-sm text-uppercase font-800 mt-3"
          >
            View Leaderboard
          </a>
        </div>

        <div className="content">
          <Link
            to={"/reward-campaigns"}
            className="btn btn-full btn-m bg-blue-dark rounded-sm text-uppercase font-800 mt-3"
          >
            View Campaigns
          </Link>
        </div>
        {/* <button onClick={logout}>Logout</button> */}
      </div>
    </>
  );
};

//   return (
//     <div>Testing

//   <button onClick={logout}>Logout</button>
//     </div>

//   )
// }

export default Home