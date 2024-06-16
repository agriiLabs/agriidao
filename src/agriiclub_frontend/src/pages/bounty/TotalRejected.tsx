import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/Context";
import { CampaignUser } from "../../../../declarations/bounty/bounty.did";

const TotalRejected = () => {
  const { bountyActor } = useAuth();
  const [campaignRejected, setCampaignRejected] = useState<CampaignUser[]>([]);

  type Status = { pending: null } | { rejected: null } | { accepted: null };

  const getStatus = (status: Status): string => {
    if ("pending" in status) {
      return "Pending";
    } else if ("rejected" in status) {
      return "Rejected";
    } else if ("accepted" in status) {
      return "Accepted";
    } else {
      return "Unknown Status";
    }
  };

  //formatting the date
  const formatDate = (timestamp: bigint): string => {
    const date = new Date(Number(timestamp));
    const options = { month: "long", day: "numeric", year: "numeric" };
    return date.toLocaleDateString();
  };

  const getRejectedCampaignSubs = async () => {
    if (!bountyActor) {
      console.error("caller or bountyActor is null");
      return;
    }
    const res = await bountyActor.getAllLatestCampaignUsersRejected();
    setCampaignRejected(res);
  };

  useEffect(() => {
    getRejectedCampaignSubs();
  }, [bountyActor]);

  return (
    <>
      <div className="header header-fixed header-logo-center">
        <a href="#" className="header-title">
          Rejected Submissions
        </a>
        <a href="#" data-back-button className="header-icon header-icon-1">
          <i className="fas fa-arrow-left"></i>
        </a>
        <a href="#" data-toggle-theme className="header-icon header-icon-4">
          <i className="fas fa-lightbulb"></i>
        </a>
      </div>

      <div className="page-content header-clear-medium">
        <div className="card card-style">
          <div className="content mb-0">
            {campaignRejected && campaignRejected.length > 0 ? (
              campaignRejected.map((campaignRejected, index) => (
                <Link
                  to={`/reward-campaign-detail/${campaignRejected?.id}`}
                  className="d-flex mb-3"
                  key={index}
                >
                  <div className="align-self-center">
                    <img
                      className="rounded-xl me-3"
                      // src={campaignRejected.campaignPic} //TODO: Pull the correct image from campaign object
                      // data-src={campaignRejected.campaignPic}
                      // width={campaignRejected.campaignPic}
                      // height={campaignRejected.campaignPic}
                      // alt={campaignRejected.name}
                    />
                  </div>
                  <div className="align-self-center">
                    <p className="mb-n2 font-16">
                      {campaignRejected.campaignId}
                    </p>
                    <p className="font-11 opacity-60">
                      {campaignRejected.campaignTaskId}
                    </p>
                  </div>
                  <div className="align-self-center ms-auto text-end">
                    <p className="mb-n2 font-16">
                      {/* TODO: set timestamp */}
                      {/* {campaignRejected.timeStamp} */}
                      23.5.24
                    </p>
                    <p className="font-11 opacity-60">
                      {getStatus(campaignRejected.status)}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <p>You do not have rejected tasks</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalRejected;
