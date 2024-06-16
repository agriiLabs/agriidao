import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/Context";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Response } from "../../utils/Types";
import { Campaign } from "../../../../declarations/bounty/bounty.did";

const CampaignDetail = () => {
  const navigate = useNavigate()
  const { bountyActor, setTempVal } = useAuth();
  const { id } = useParams();
  const [campaign, setCampaign] = useState<Campaign | null>(null);

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
      console.log(res.err);
    }
  };

  const handleParticiapte = async () => {
    if (!campaign || !bountyActor) {
      console.error("campaign or bountyActor is null");
      return;
    }

    const res = await bountyActor.socialMediaCheck(campaign.campaignType)
    setTempVal(campaign.campaignType) //temp store value
    console.log("response", res)
    if (res) {
      navigate(`/campaign-submission/${id}`)
    } else {
      navigate('/add-social-media')
    }
  };
  
  return (
    <>
      <div className="header header-fixed header-logo-center">
        <a className="header-title">Campaign Details</a>
        <a href="#" data-back-button className="header-icon header-icon-1">
          <i className="fas fa-arrow-left"></i>
        </a>
        <a href="#" data-toggle-theme className="header-icon header-icon-4">
          <i className="fas fa-lightbulb"></i>
        </a>
      </div>

      <div className="page-content header-clear-medium">
        <div className="card card-style">
          <div className="content">
            <div className="row mb-0">
              <div className="col-6">
                <p className="font-15">Name</p>
              </div>
              <div className="col-6">
                <p className="font-15 text-end">{campaign?.name}</p>
              </div>
              <div className="divider divider-margins w-100 mt-2 mb-2"></div>
              <div className="col-3">
                <p className="font-15">URL</p>
              </div>
              <div className="col-9 text-end">
                <a
                  className="font-15 "
                  href="http://{campaign?.url}"
                  target="_blank"
                >
                  {" "}
                  {campaign?.url}
                </a>
              </div>
              <div className="divider divider-margins w-100 mt-2 mb-2"></div>
              <div className="col-6">
                <p className="font-15 mt-1">Total Value</p>
              </div>
              <div className="col-6">
                <p className="font-15 text-end mt-1">
                  {campaign?.totalValue} AGRII
                </p>
              </div>
              <div className="divider divider-margins w-100 mt-2 mb-2"></div>
              <div className="col-12" style={{ marginTop: "-25px" }}>
                <p className="font-15 text-end mt-1">{campaign?.notes}</p>
              </div>
              <div className="accordion col-6">
                <a
                  href="#"
                  data-menu="menu-rules"
                  className="btn accordion-btn opacity-70"
                >
                  Read The Rules
                </a>
              </div>
              <div className="accordion col-6">
                <a
                  href="#"
                  data-menu="menu-rewards"
                  className="btn accordion-btn opacity-70"
                >
                  Task Rewards
                </a>
              </div>
              <div className="divider divider-margins w-100 mt-2 mb-2"></div>

              <div className="col-12">
                
                <button
                    onClick={handleParticiapte}
                    type="button"
                    className="col-12 btn btn-full btn-m bg-blue-dark rounded-sm text-uppercase font-800 mt-3"
                  >
                    Participate
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CampaignDetail;
