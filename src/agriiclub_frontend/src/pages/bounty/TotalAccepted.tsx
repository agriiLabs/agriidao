import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/Context";
import { CampaignUser } from "../../../../declarations/bounty/bounty.did";
import CampaignSub from "./CampaignSub";


const TotalAccepted = () => {
  const { bountyActor } = useAuth();
  const [campaignSubs, setCampaignSubs] = useState<CampaignUser[]>([]);

  const getAcceptedCampaignSubs = async () => {
    if (!bountyActor) {
      console.error("caller or bountyActor is null");
      return;
    }
    const res = await bountyActor.getAllLatestCampaignUsersAccepted();
    setCampaignSubs(res);
  };

  useEffect(() => {
    getAcceptedCampaignSubs();
  }, [bountyActor]);

  return (
    <>
      <div className="header header-fixed header-logo-center">
        <a href="#" className="header-title">
          Accepted Submissions
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
              campaignSubs.map((campaignSub, index) => (
                <CampaignSub key={index} {...{ campaignSub }} />
              ))
            ) : (
              <p>You do not have any accepted tasks yet</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalAccepted;
