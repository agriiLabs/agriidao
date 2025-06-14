import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/Context";
import { CampaignTask, CampaignUser } from "../../../../declarations/bounty/bounty.did";
import { useDispatch } from "react-redux";
import CampaignSub from "./CampaignSubs";



const CampaignSummary = () => {
  const { bountyActor } = useAuth(); 
  const { id } = useParams(); 
  const [campaign, setCampaign] = useState(null);
  const [campaignSubs, setCampaignSubs] = useState<CampaignUser[]>([]);

  const [participants, setParticipants] = useState(null);
  const [campaignTasks, setCampaignTasks] = useState<CampaignTask[] | null>(null);
  const [task, setTask] = useState<CampaignTask | null>(null);
  // const [campaign_, setCampaign_] = useState(null);

  type Status = { pending: null } | { rejected: null } | { accepted: null };

  const getStatus = (status: Status): string => {
    if ('pending' in status) {
      return 'Pending';
    } else if ('rejected' in status) {
      return 'Rejected';
    } else if ('accepted' in status) {
      return 'Accepted';
    } else {
      return 'Unknown Status';
    }
  };

  useEffect(() => {
    getAllCampaignSubs();
  }, [bountyActor]);

  const getAllCampaignSubs = async () => {
    if (!bountyActor) {
      console.error("caller or bountyActor is null");
      return;
    }
    const res = await bountyActor.getCampaignUsersByCampaignId(id);
    setCampaignSubs(res);
  };


  // get campaign by id
  useEffect(() => {
    getCampaignLatest();
    getCampaignUsers();
    getCampaignCampaignTasks();
  }, []);
  
  // get task names
  const getCampaignCampaignTasks = async () => {
    if (!id || !bountyActor) {
      console.error("ID or bountyActor is null");
      return;
    }

    const res = await bountyActor.getCampaignCampaignTasks(id);
    setCampaignTasks(res);
  };


  const getCampaignLatest = async () => {
    const res = await bountyActor.getCampaignLatest(id);
    
    if ("ok" in res) {
      setCampaign(res.ok);
    } else {
      console.log(res.err);
    }
  };

  // get campaign by bounty id
  const getCampaignUsers = async () => {
    const res = await bountyActor.getCampaignUsersByCampaignId(id);
    setParticipants(res); 
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
              <h4 className="page-title">Campaign Summary</h4>
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
                  <dt className="col-sm-5">URL</dt>
                  <dd className="col-sm-7">{campaign?.url}</dd>
                  <dt className="col-sm-5">Type</dt>
                  <dd className="col-sm-7">{campaign?.campaignType}</dd>
                  <dt className="col-sm-5">Total Value</dt>
                  <dd className="col-sm-7">{campaign?.totalValue}</dd>
                  <dt className="col-sm-5">Available Bal</dt>
                  <dd className="col-sm-7">{campaign?.availBal}</dd>
                  
                </dl>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <Link
                    to={`/rewards/bounty/campaigns/campaign-detail/${campaign?.id}`}
                    type="button"
                    className="btn btn-md btn-block btn-blue"
                  >
                    Campaign Details
                  </Link>
                  <Link
                    to={`/rewards/bounty/campaigns/campaign-detail/task-allocation/${campaign?.id}`}
                    type="button"
                    className="btn btn-md btn-block btn-blue"
                  >
                    Task Allocations
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-8 col-xl-8">
            <div className="card-box">
              <h5 className="mb-3 bg-light p-2 row">
                <div className="col-lg-8 text-uppercase">
                  <i className="mdi mdi-earth mr-1"></i> Campaign Participants
                </div>
              </h5>

              <div className="table-container table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col" className="orderable">
                        User ID
                      </th>
                      <th scope="col" className="orderable">
                        Task
                      </th>
                      <th scope="col" className="orderable">
                        Status
                      </th>
                      {/* <th scope="col" className="orderable">
                        Paid
                      </th> */}
                      <th scope="col" className="orderable">
                        Created At
                      </th>
                      <th scope="col">View</th>
                    </tr>
                  </thead>
                  <tbody>
                    
                    {participants && participants.length > 0 ? (
                      participants.map((participant, index) => (
                        <CampaignSub key={index} campaignSub={participant} />
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5}>No Participants Found</td>
                      </tr>
                    )}
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

export default CampaignSummary; 
