import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/Context";
import { Link, useNavigate, useParams } from "react-router-dom";
import imagePath1 from "../../assets/images/rewards-banner.png";
import ProfileClick from "../profile/component/ProfileClick";

const RewardCampaigns = () => {
  const { bountyActor } = useAuth();
  const { id } = useParams();
  const [campaigns, setCampaigns] = useState<any[] | null>(null);
  const navigate = useNavigate();
  const cardHeightHero = 200;

  let bountyName = "Marketing Bounty";

  useEffect(() => {
    getBountyCampaigns();
  }, [id]);

  const getBountyCampaigns = async () => {
    try {
      const res = await bountyActor?.getAllLatestBountyCampaignsByName(
        bountyName
      );
      setCampaigns(res ?? null);
    } catch (error) {
      console.error("Error fetching bounty campaigns:", error);
      setCampaigns(null);
    }
  };

  return (
    <>
      <div className="header header-fixed header-logo-center">
        <a href="#" className="header-title">
          Social Rewards
        </a>
        <button
          onClick={() => window.history.back()}
          data-back-button
          className="header-icon header-icon-1"
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        <ProfileClick />
      </div>

      <div className="page-content header-clear">
      {/* <div className="card card-style"> */}
      <div
          className="card preload-img "
          style={{
            backgroundImage: `url(${imagePath1})`,
            height: `${cardHeightHero}px`,
          }}
        >
        </div>
      <div className="card card-style">
          <div className="content">
          
          <Link to={"/rewards-leaderboard"} className="d-flex mb-2">
              <div className="align-self-center">
                <p className="font-15">Where do you rank on the Leaderboard?</p>
              </div>
              <div className="align-self-center ms-auto">
              <p><i className="fas fa-chevron-right" /></p>
              </div>
          </Link>
            
          </div>
        </div>

        <div className="card card-style">
          <div className="content mb-0">
          <h4 className="font-700 text-uppercase font-12 opacity-50">
            Campaigns
          </h4>
          <div className="divider mb-3" />
            {campaigns && campaigns.length > 0 ? (
              campaigns.map((campaigns, index) => (
                <Link
                  to={`/reward-campaign-detail/${campaigns?.id}`}
                  className="d-flex mb-3"
                  key={index}
                >
                  <div className="align-self-center">
                    <img
                      className="rounded-xl me-3"
                      src={campaigns.campaignPic}
                      data-src={campaigns.campaignPic}
                      width="40"
                      height="40"
                      alt={campaigns.name}
                    />
                  </div>
                  <div className="align-self-center">
                    <p className="mb-n2 font-16">{campaigns.name}</p>
                    <p className="font-11 opacity-60">
                      {bountyName}
                    </p>
                  </div>
                  <div className="align-self-center ms-auto text-end">
                    <p className="mb-n2 font-16">
                      {campaigns.totalValue} AGRII
                    </p>
                    {/* <p className="font-11 opacity-60">fiat value</p> */}
                  </div>
                </Link>
              ))
            ) : (
              <p>No Campaigns Listed</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default RewardCampaigns;
