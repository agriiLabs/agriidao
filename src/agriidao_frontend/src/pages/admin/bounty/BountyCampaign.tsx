import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/Context";
import { Response } from "../../../utils/Types";
import AddCampaign from "./components/AddCampaign";
import { Bounty, Campaign } from "../../../../../declarations/bounty/bounty.did";

const BountyCampaign = () => {
  const { bountyActor } = useAuth(); //get agriichainBackend from the global context
  const { id } = useParams(); //how to access the url parameter i.e id
  const [bounty, setBounty] = useState<Bounty | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[] | undefined>([]);
  const [openForm, setOpenForm] = useState(false);
  const [campaignSaved, setCampaignSaved] = useState(false);

  useEffect(() => {
    getBounty();
    getCampaigns();
  }, [id]);

  useEffect(() => {
    if (campaignSaved) {
      getCampaigns();
    }
  }, [campaignSaved]);

  const getBounty = async () => {
    if (!id) {
      console.error("Bounty ID is not defined");
      return;
    }
    const res = await bountyActor?.getBountyLatest(id);
    if (!res) {
      console.error("Failed to fetch bounty: undefined response");
      return;
    }
    const response: Response = res;
    
    if ("ok" in res) {
      setBounty(res.ok);
    } else if ("err" in res) {
      console.log(res.err);
    } else {
      console.error("Unexpected response structure:", res);
    }
  };

  const getCampaigns = async () => {
    if (!id) {
      console.error("Bounty ID is not defined");
      return;
    }
    const res = await bountyActor?.getBountyCampaigns(id);
    setCampaigns(res); 
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
              <h4 className="page-title">Bounty Campaigns</h4>
            </div>
          </div>
        </div>

        <div className="row">
        <div className="col-xl-12 mt-4">
          <div className="card rounded shadow border-0 p-4">
            <div className="mt-4">
                <h4 className="text-uppercase">{bounty?.name}</h4>
                <br />
                <dl className="row">
                  <dt className="col-sm-5">Total Value</dt>
                  <dd className="col-sm-7">{bounty?.bountyPool}</dd>
                  <dt className="col-sm-5">Available Pool</dt>
                  <dd className="col-sm-7">{bounty?.availableBal}</dd>
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
