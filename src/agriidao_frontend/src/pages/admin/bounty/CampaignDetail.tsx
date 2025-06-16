import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks/Context";
import { Response } from "../../../utils/Types";
import { AcCategory } from "../../../../../declarations/settings/settings.did";
import { toast } from "react-toastify";

const CampaignDetail = () => {
  const { bountyActor } = useAuth(); //get agriichainBackend from the global context
  const { id } = useParams(); //how to access the url parameter i.e id
  const location = useLocation();
  const { campaign: initialCampaign } = location.state || { campaign: { rules: '' }};
  const [campaign, setCampaign] = useState(initialCampaign);
  const [categories, setCategories] = useState<AcCategory[]|null>(null);
  const [saving, setSaving] = useState(false);

  // get campaign by id
  useEffect(() => {
    getCampaignLatest();
  }, [id]);

  // get catetories

  const getCampaignLatest = async () => {
    if (!bountyActor || !id) {
      console.error("bountyActor or ID is null");
      return;
    }
    let res =  await bountyActor.getCampaignLatest(id);
    
    if ("ok" in res) {
      // formatting some fields of campaign, in this case the start & end dates
      setCampaign(res.ok);
    } else if ("err" in res) {
      console.log(res.err);
    }
  };

  const handleDelete = async () => {
    if (!bountyActor) {
      console.error("bountyActor is null");
      return;
    }
    if (!campaign) {
      console.error("campaign is null");
      return;
    }
    setSaving(true);

    try {
      await bountyActor.deleteCampaign(campaign);
      toast.success("Campaign marked as deleted");
    } catch (error) {
      console.error("Error marking campaign as deleted:", error);
      toast.error("Failed to mark campaign as deleted");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
        <div className="d-flex align-items-center justify-content-between">
        <div>
          <h5 className="mb-0">Bounty Summary</h5>
        </div>
      </div>

        <div className="row">
        <div className="col-xl-12 mt-4">
          <div className="card rounded shadow border-0 p-4">
            <div className="mt-4">
                <h4 className="text-uppercase">{campaign?.name}</h4>
                <br />
                <dl className="row">
                  <dt className="col-sm-7">Total Value</dt>
                  <dd className="col-sm-5">{campaign?.totalValue}</dd>
                  <dt className="col-sm-7">Available Balalnce</dt>
                  <dd className="col-sm-5">{campaign?.availBal}</dd>
                  <dt className="col-sm-7">Pic</dt>
                  <dd className="col-sm-5">
                    
                    {campaign && (
                      <img
                        src={
                          campaign.campaignPic === ""
                            ? "/default-image.png"
                            : campaign.campaignPic
                        }
                        alt="campaignPic"
                        width="80"
                        className="img-fluid avatar-xl rounded"
                      />
                    )}
                    
                  </dd>
                </dl>
              </div>

              <br />

              <div className="row">
                <div className="mt-3">
                  <Link
                    to=""
                    type="button"
                    className="btn btn-outline-dark col-sm-12"
                  >
                    Image
                  </Link>
                  <Link
                    to={`/rewards/bounty/${campaign?.id}`}
                    type="button"
                    className="btn btn-outline-dark col-sm-12"
                  >
                    Campaign Details
                  </Link>
                  <Link
                    to={`/campaign-update/${campaign?.id}`}
                    type="button"
                    className="btn btn-outline-dark col-sm-12"
                  >
                    Update
                  </Link>
                  <Link
                    to={`/campaign-detail/task-allocation/${campaign?.id}`}
                    type="button"
                    className="btn btn-outline-dark col-sm-12"
                  >
                    Task Allocations
                  </Link>
                  <button
                    onClick={() => handleDelete()}
                    
                    type="button"
                    className="btn btn-outline-dark col-sm-12"
                    disabled={saving}
                    
                  >
                    {saving ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-8 col-xl-8">
          <div className="col-xl-12 mt-4">
            <div className="card rounded shadow border-0 p-4">
              <div className="d-flex justify-content-between mb-4">
                <h5 className="mb-0">Campaign Details</h5>
              </div>

              <dl className="row">
                <dt className="col-sm-5">URL</dt>
                <dd className="col-sm-7">{campaign?.url}</dd>
                <dt className="col-sm-5">Type</dt>
                <dd className="col-sm-7">{campaign?.campaignType}</dd>
                <dt className="col-sm-5">Total Value</dt>
                <dd className="col-sm-7">{campaign?.totalValue}</dd>
                <dt className="col-sm-5 ">Available Balance</dt>
                <dd className="col-sm-7">{campaign?.availBal}</dd>
                <dt className="col-sm-5">Rules</dt>
                <dd className="col-sm-7" dangerouslySetInnerHTML={{ __html: campaign?.rules }}></dd>
                <dt className="col-sm-5">Notes</dt>
                <dd className="col-sm-7"dangerouslySetInnerHTML={{ __html: campaign?.notes }}></dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CampaignDetail; 