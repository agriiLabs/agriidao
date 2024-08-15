import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/Context";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Response } from "../../utils/Types";
import CampaignRewards from "./component/CampaignRewards";
import CampaignRules from "./component/CampaignRules";
import {
  Campaign,
  UserSocialMedia,
} from "../../../../declarations/bounty/bounty.did";
import { useDispatch } from "react-redux";
import { setSelectedCampaign, setUserSocialMedia } from "../../redux/slices/app";

const CampaignDetail = () => {
  const navigate = useNavigate();
  const { bountyActor, setTempVal } = useAuth();
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  // const { campaign: initialCampaign } = location.state || { campaign: { rules: '' }};
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [userSocial, setUserSocial] = useState<UserSocialMedia | null>(null);
  const [showRewardsModal, setShowRewardsModal] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [userSocialExists, setUserSocialExists] = useState(false);

  useEffect(() => {
    getCampaignDetail();
  }, [id]);

  const getCampaignDetail = async () => {
    if (!id || !bountyActor) {
      console.error("ID or bountyActor is null");
      return;
    }

    const res: Response = await bountyActor.getCampaignLatest(id);

    if (res.ok) {
      setCampaign(res.ok);
    } else {
      console.error(res.err); //not sure if this is correct
    }
  };

  useEffect(() => {
    if (bountyActor && campaign) {
      getSocialMedia();
    }
  }, [campaign, bountyActor]);

  const getSocialMedia = async () => {
    if (!bountyActor || !campaign) {
      console.error("bountyActor is null");
      return;
    }

    const res = await bountyActor.getUserSocialMediaBySocialMediaId(
      campaign.campaignType
    );

    if ("ok" in res) {
      setUserSocial(res.ok);
    } else {
      console.error(res.err);
    }
  };

  const handleUpdate = () => {
    dispatch(setSelectedCampaign(campaign));
    dispatch(setUserSocialMedia(userSocial));
    navigate(`/update-social-media/`);
  };

  useEffect(() => {
    if (userSocial) {
      setUserSocialExists(true);
    }
  }, [userSocial]);

  const handleParticiapte = async () => {
    if (!campaign || !bountyActor) {
      console.error("campaign or bountyActor is null");
      return;
    }

    const res = await bountyActor.socialMediaCheck(campaign.campaignType);
    setTempVal(campaign.campaignType); //temp store value
    if (res) {
      navigate(`/campaign-submission/${id}`);
      dispatch(setSelectedCampaign(campaign));
    } else {
      navigate("/add-social-media");
      dispatch(setSelectedCampaign(campaign));
    }
  };

  const handleTaskRules = () => {
    setShowRulesModal(true);
  };

  const handleTaskRewards = () => {
    setShowRewardsModal(true);
  };

  // go back
  const handleBack = () => {
    navigate(`/reward-campaigns/`);
  };

  return (
    <>
      {campaign && (
        <>
          <div className="header header-fixed header-logo-center">
            <a className="header-title">Campaign Details</a>
            <button
              onClick={handleBack}
              data-back-button
              className="header-icon header-icon-1"
            >
              <i className="fas fa-arrow-left"></i>
            </button>
            <a href="#" data-toggle-theme className="header-icon header-icon-4">
              <i className="fas fa-lightbulb"></i>
            </a>
          </div>

          <div className="page-content header-clear-medium">
            <div className="card card-style">
              <div className="content">
                <div className="row mb-0">
                  <div className="col-6">
                    <p className="font-15">Campaign</p>
                  </div>
                  <div className="col-6">
                    <p className="font-15 text-end">{campaign?.name}</p>
                  </div>
                  <div className="divider divider-margins w-100 mt-2 mb-2"></div>
                  <div className="col-6">
                    <p className="font-15">My Username</p>
                  </div>
                  <div className="col-6">
                    <p className="font-15 text-end">{userSocial?.userName}</p>
                  </div>
                  <div className="divider divider-margins w-100 mt-2 mb-2"></div>
                  <div className="col-3">
                    <p className="font-15">URL</p>
                  </div>
                  <div className="col-9 text-end">
                    <a
                      className="font-15 "
                      href={campaign?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      {campaign?.url}
                    </a>
                  </div>
                  <div className="divider divider-margins w-100 mt-2 mb-2"></div>
                  <div className="col-6">
                    <p className="font-15 mt-1">Total Reward</p>
                  </div>
                  <div className="col-6">
                    <p className="font-15 text-end mt-1">
                      {campaign?.totalValue} AGRII
                    </p>
                  </div>
                  <div className="divider divider-margins w-100 mt-2 mb-2"></div>
                  <div className="col-12">
                    {campaign && (
                      <p
                        className="font-15"
                        dangerouslySetInnerHTML={{ __html: campaign.notes }}
                      ></p>
                    )}
                    <br />
                  </div>
                  <div className="accordion col-6">
                    <a
                      onClick={handleTaskRules}
                      data-menu="menu-rules"
                      className="btn accordion-btn opacity-70"
                    >
                      Read The Rules
                    </a>
                  </div>
                  <div className="accordion col-6">
                    <button
                      onClick={handleTaskRewards}
                      data-menu="menu-rewards"
                      className="btn accordion-btn opacity-70"
                    >
                      Task Rewards
                    </button>
                  </div>
                  <div className="divider divider-margins w-100 mt-2 mb-2"></div>

                  <div className="col-12">
                    {userSocialExists ? (
                      <>
                        <button
                          onClick={handleParticiapte}
                          type="button"
                          className="col-12 btn btn-full btn-m bg-blue-dark rounded-sm text-uppercase font-800 mt-3"
                        >
                          Participate
                        </button>

                        <button
                          onClick={handleUpdate}
                          className="col-12 btn btn-full btn-m bg-blue-dark rounded-sm text-uppercase font-800 mt-3"
                        >
                          Update Username
                        </button>
                      </>
                    ) : (
                      <button
                          onClick={handleParticiapte}
                          type="button"
                          className="col-12 btn btn-full btn-m bg-blue-dark rounded-sm text-uppercase font-800 mt-3"
                        >
                          Participate
                        </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {showRewardsModal && (
            <CampaignRewards
              {...{ showRewardsModal, setShowRewardsModal, campaign }}
            />
          )}
          {showRulesModal && (
            <CampaignRules
              {...{ showRulesModal, setShowRulesModal, campaign }}
            />
          )}
        </>
      )}
    </>
  );
};

export default CampaignDetail;
