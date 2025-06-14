import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/Context";
import { Response } from "../../utils/Types";
import AddCampaign from "./components/AddCampaign";

const BountyCampaign = () => {
  const { bountyActor } = useAuth(); //get agriichainBackend from the global context
  const { id } = useParams(); //how to access the url parameter i.e id
  const [bounty, setBounty] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [campaignSaved, setCampaignSaved] = useState(false);

  // get bounty by id
  useEffect(() => {
    getBounty();
    getCampaigns();
  }, [id]);

  // get campaign by bounty id
  useEffect(() => {
    if (campaignSaved) {
      //listens for any changes in campaignSaved, if campaignSaved is true, it calls getCampaigns function
      getCampaigns();
    }
  }, [campaignSaved]);

  const getBounty = async () => {
    const res: Response = await bountyActor.getBountyLatest(id);
    
    if (res.ok) {
      // formatting some fields of the bounty, in this case the start & end dates
      setBounty(res.ok);
    } else {
      console.log(res.err);
    }
  };

  // get campaigns by bounty id
  const getCampaigns = async () => {
    const res = await bountyActor.getBountyCampaigns(id);
    setCampaigns(res); //setCampaign is already an array
  };

  return (
    <>
      {openForm && (
        <AddCampaign {...{ setOpenForm, bounty, setCampaignSaved }} />
      )}
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
              <h4 className="page-title">Bounty Campaigns</h4>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4 col-xl-4">
            <div className="card-box text-center">
              <div className="text-left mt-3">
                <h4 className="text-uppercase">{bounty?.name}</h4>
                <br />
                <dl className="row">
                  <dt className="col-sm-5">Total Value</dt>
                  <dd className="col-sm-7">{bounty?.bountyPool}</dd>
                  <dt className="col-sm-5">Available Pool</dt>
                  <dd className="col-sm-7">{bounty?.availBal}</dd>
                  <dt className="col-sm-5">Live</dt>
                  <dd className="col-sm-7">
                    {bounty?.isLive ? "true" : "false"}
                  </dd>
                </dl>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <Link
                    to={`/rewards/bounty/${bounty?.id}`}
                    type="button"
                    className="btn btn-md btn-block btn-blue"
                  >
                    Bounty Summary
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-8 col-xl-8">
            <div className="card-box">
              <h5 className="mb-3 bg-light p-2 row">
                <div className="col-lg-8 text-uppercase">
                  <i className="mdi mdi-earth mr-1"></i> Campaigns
                </div>
                <div className="col-lg-4">
                  <div className="text-lg-right">
                    <button
                      onClick={() => setOpenForm(true)}
                      className="btn-blue btn-xs"
                    >
                      Add Campaign
                    </button>
                  </div>
                </div>
              </h5>

              <div className="table-container table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col" className="orderable">
                        Name
                      </th>
                      <th scope="col" className="orderable">
                        URL
                      </th>
                      <th scope="col" className="orderable">
                        Type
                      </th>
                      <th scope="col" className="orderable">
                        Total Value
                      </th>
                      <th scope="col" className="orderable">
                        Available Balance
                      </th>
                      <th scope="col">View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaigns?.map((campaign, index) => (
                      <tr className="even" key={index}>
                        <td>{campaign.name}</td>
                        <td>{campaign.url}</td>
                        <td>{campaign.campaignType}</td>
                        <td>{Number(campaign.totalValue)}</td>
                        <td>{Number(campaign.availBal)}</td>
                        <td>
                          <Link to={`/rewards/bounty/campaigns/campaign-summary/${campaign.id}`}>View</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BountyCampaign; //whatever the name of the functional component declared above should be used here
