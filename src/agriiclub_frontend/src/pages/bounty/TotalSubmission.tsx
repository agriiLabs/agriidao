import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/Context";
import { CampaignUser } from "../../../../declarations/bounty/bounty.did";

const TotalSubmission = () => {
  const { bountyActor } = useAuth();
  const [campaignSubs, setCampaignSubs] = useState<CampaignUser[]>([]);

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

  const getAllCampaignSubs = async () => {
    if (!bountyActor) {
      console.error("caller or bountyActor is null");
      return;
    }
    const res = await bountyActor.getAllLatestCampaignUsers();
    setCampaignSubs(res);
  };

  useEffect(() => {
    getAllCampaignSubs();
  }, [bountyActor]);

  return (
    <>
      <div className="header header-fixed header-logo-center">
        <a href="#" className="header-title">
          All Submissions
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
            {campaignSubs && campaignSubs.length > 0 ? (
              campaignSubs.map((campaignSubs, index) => (
                <Link
                  to={`/reward-campaign-detail/${campaignSubs?.id}`}
                  className="d-flex mb-3"
                  key={index}
                >
                  <div className="align-self-center">
                    <img
                      className="rounded-xl me-3"
                      // src={campaignSubs.campaignPic} //TODO: Pull the correct image from campaign object
                      // data-src={campaignSubs.campaignPic}
                      // width={campaignSubs.campaignPic}
                      // height={campaignSubs.campaignPic}
                      // alt={campaignSubs.name}
                    />
                  </div>
                  <div className="align-self-center">
                    <p className="mb-n2 font-16">{campaignSubs.campaignId}</p>
                    <p className="font-11 opacity-60">
                      {campaignSubs.campaignTaskId}
                    </p>
                  </div>
                  <div className="align-self-center ms-auto text-end">
                    <p className="mb-n2 font-16">
                      {/* TODO: set timestamp */}
                      {/* {campaignSubs.timeStamp} */}
                      23.5.24
                    </p>
                    <p className="font-11 opacity-60">
                      {getStatus(campaignSubs.status)}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <p>You have not submitted any tasks yet</p>
            )}
            ;
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalSubmission;
