import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/Context";
import { CampaignTask, CampaignUser, Campaign } from "../../../../../declarations/bounty/bounty.did";
import { useDispatch } from "react-redux";
import CampaignSub from "./CampaignSubs";



const CampaignSummary = () => {
  const { bountyActor } = useAuth(); 
  const { id } = useParams(); 
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [campaignSubs, setCampaignSubs] = useState<CampaignUser[]>([]);

  const [participants, setParticipants] = useState<CampaignUser[] | null>(null);
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
    if (!bountyActor || !id) {
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
    if (!bountyActor || !id) {
      console.error("bountyActor or ID is null");
      return;
    }
    const res = await bountyActor.getCampaignLatest(id);
    
    if ("ok" in res) {
      setCampaign(res.ok);
    } else {
      console.log(res.err);
    }
  };

  // get campaign by bounty id
  const getCampaignUsers = async () => {
    if (!bountyActor || !id) {
      console.error("bountyActor or ID is null");
      return;
    }
    const res = await bountyActor.getCampaignUsersByCampaignId(id);
    setParticipants(res); 
  };

  return (
    <>
    <div className="d-flex align-items-center justify-content-between">
        <div>
          <h5 className="mb-0">Campaign Summary</h5>
        </div>
      </div>

        <div className="row">
        <div className="col-xl-12 mt-4">
          <div className="card rounded shadow border-0 p-4">
            <div className="mt-4">
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
                <div className="mt-3">
                  <Link
                    to={`/rewards/bounty/campaigns/campaign-detail/${campaign?.id}`}
                    type="button"
                    className="btn btn-outline-dark col-sm-12"
                  >
                    Campaign Details
                  </Link>
                  <Link
                    to={`/rewards/bounty/campaigns/campaign-detail/task-allocation/${campaign?.id}`}
                    type="button"
                    className="btn btn-outline-dark col-sm-12"
                  >
                    Task Allocations
                  </Link>
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

                <table className="table table-center bg-white mb-0">
                  <thead>
                    <tr>
                      <th className="border-bottom p-3">
                        User ID
                      </th>
                      <th className="border-bottom p-3">
                        Task
                      </th>
                      <th className="border-bottom p-3">
                        Status
                      </th>
                      <th className="border-bottom p-3">
                        Created At
                      </th>
                      <th className="border-bottom p-3">View</th>
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
    </>
  );
};

export default CampaignSummary; 
