import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/Context";
import { Response } from "../../utils/Types";
import { AcCategory } from "../../../../declarations/settings/settings.did";
import { toast } from "react-toastify";

const CampaignDetail = () => {
  const { bountyActor } = useAuth(); //get agriichainBackend from the global context
  const { id } = useParams(); //how to access the url parameter i.e id
  const location = useLocation();
  const { campaign: initialCampaign } = location.state || { campaign: { rules: '' }};
  const [campaign, setCampaign] = useState(initialCampaign);
  const [categories, setCategories] = useState<AcCategory[]|null>(null);
  const [saving, setSaving] = useState(null);

  // get campaign by id
  useEffect(() => {
    getCampaignLatest();
  }, [id]);

  // get catetories

  const getCampaignLatest = async () => {
    const res: Response = await bountyActor.getCampaignLatest(id);
    
    if (res.ok) {
      // formatting some fields of campaign, in this case the start & end dates
      setCampaign(res.ok);
    } else {
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
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="page-title-box">
              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item">
                    <a href="javascript: void(0);">InventoryClub</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="javascript: void(0);">Bounties</a>
                  </li>
                  <li className="breadcrumb-item active">Bounty Summary</li>
                </ol>
              </div>
              <h4 className="page-title">Campaign</h4>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4 col-xl-4">
            <div className="card-box text-center">
              <div className="text-left mt-3">
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
                <div className="col-md-12">
                  <Link
                    to=""
                    type="button"
                    className="btn btn-md btn-block btn-blue"
                  >
                    Image
                  </Link>
                  <Link
                    to={`/rewards/bounty/${campaign?.id}`}
                    type="button"
                    className="btn btn-md btn-block btn-blue"
                  >
                    Campaign Details
                  </Link>
                  <Link
                    to={`/campaign-update/${campaign?.id}`}
                    type="button"
                    className="btn btn-md btn-block btn-blue"
                  >
                    Update
                  </Link>
                  <Link
                    to={`/campaign-detail/task-allocation/${campaign?.id}`}
                    type="button"
                    className="btn btn-md btn-block btn-blue"
                  >
                    Task Allocations
                  </Link>
                  <button
                    onClick={() => handleDelete()}
                    
                    type="button"
                    className="btn btn-md btn-block btn-blue"
                    disabled={saving}
                    
                  >
                    {saving ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-8 col-xl-8">
            <div className="card-box">
              <h5 className="mb-3 bg-light p-2 row">
                <div className="col-lg-8 text-uppercase">
                  <i className="mdi mdi-earth mr-1"></i> Campaign Details
                </div>
              </h5>

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