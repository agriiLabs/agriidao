import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/Context";
import {
  BountyPoint,
  CampaignUser,
} from "../../../../../declarations/bounty/bounty.did";
import Count from "../../bounty/count/Count";
import CountPending from "../../bounty/count/CountPending";
import CountRejected from "../../bounty/count/CountRejected";
import CountAccepted from "../../bounty/count/CountAccepted";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import imagePath2 from "../../assets/images/default-user-profile.png";
import DCampaignSub from "../components/DCampaignSub";

const MyRewards = () => {
  const { bountyActor } = useAuth();
  const { user } = useSelector((state: RootState) => state.app);
  const navigate = useNavigate();
  const [campaignSubs, setCampaignSubs] = useState<CampaignUser[]>([]);
  const [campaignPending, setCampaignPending] = useState<CampaignUser[]>([]);
  const [campaignRejected, setCampaignRejected] = useState<CampaignUser[]>([]);
  const [campaignAccepted, setCampaignAccepted] = useState<CampaignUser[]>([]);
  const [bountyPoint, setBountyPoint] = useState<BountyPoint | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  useEffect(() => {
    if (bountyActor) {
      getAllCampaignSubs();
      getPendingCampaignSubs();
      getRejectedCampaignSubs();
      getAcceptedCampaignSubs();
      getBountyPoints();
    }
  }, [bountyActor]);

  const getFilteredData = () => {
    switch (selectedStatus) {
      case "Accepted":
        return campaignAccepted;
      case "Rejected":
        return campaignRejected;
      case "Pending":
        return campaignPending;
      default:
        return campaignSubs; // "All" shows everything
    }
  };

  const getAllCampaignSubs = async () => {
    if (!bountyActor) {
      console.error("caller or bountyActor is null");
      return;
    }
    const res = await bountyActor.getUserCampaignsByUserId();
    setCampaignSubs(res);
  };

  const getPendingCampaignSubs = async () => {
    if (!bountyActor) {
      console.error("caller or bountyActor is null");
      return;
    }
    const res = await bountyActor.getUserCampaignsPending();
    setCampaignPending(res);
  };

  const getRejectedCampaignSubs = async () => {
    if (!bountyActor) {
      console.error("caller or bountyActor is null");
      return;
    }
    const res = await bountyActor.getUserCampaignsRejected();
    setCampaignRejected(res);
  };

  const getAcceptedCampaignSubs = async () => {
    if (!bountyActor) {
      console.error("caller or bountyActor is null");
      return;
    }
    const res = await bountyActor.getUserCampaignsAccepted();
    setCampaignAccepted(res);
  };

  const getBountyPoints = async () => {
    if (!bountyActor) {
      console.error("caller or bountyActor is null");
      return;
    }
    const res = await bountyActor.getBountyPointByUserId();
    if ("ok" in res) {
      setBountyPoint(res.ok);
    } else {
      console.error("Error retrieving bounty points");
    }
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h5 className="mb-0">My Rewards</h5>
        </div>
        <div className="mb-0 position-relative">
          <select
            className="form-select form-control"
            id="campaignFilter"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-4">
          <div className="col-xl-12 mt-4">
            <div className="card rounded shadow border-0 p-4">
              <div className="d-flex justify-content-between ">
                <h5 className="mb-0">Rewards Summary</h5>
              </div>
              <div className="mt-4">
                <dl className="row">
                  <dt className="col-sm-5">Total Points</dt>
                  <dd className="col-sm-7 text-end">{bountyPoint?.balance}</dd>
                  <dt className="col-sm-6">All Submissions</dt>
                  <dd className="col-sm-6 text-end">
                    <Count {...{ campaignSubs }} />
                  </dd>
                  <dt className="col-sm-5">Pending</dt>
                  <dd className="col-sm-7 text-end">
                    <CountPending {...{ campaignPending }} />
                  </dd>
                  <dt className="col-sm-5">Accepted</dt>
                  <dd className="col-sm-7 text-end">
                    <CountAccepted {...{ campaignAccepted }} />
                  </dd>
                  <dt className="col-sm-5">Rejected</dt>
                  <dd className="col-sm-7 text-end">
                    <CountRejected {...{ campaignRejected }} />
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-8">
          <div className="col-xl-12 mt-4">
            <div className="card rounded shadow border-0 p-4">
              <div className="d-flex justify-content-between mb-4">
                <h5 className="mb-0">Activity</h5>
              </div>

              <table className="table table-center bg-white mb-0">
                <thead>
                  <tr>
                    <th className="border-bottom p-3">Task</th>
                    <th className="border-bottom p-3">Status</th>
                    <th className="border-bottom p-3">Date</th>
                  </tr>
                </thead>

                <tbody>
                  {getFilteredData().length > 0 ? (
                    getFilteredData().map((campaignSub, index) => (
                      <DCampaignSub key={index} campaignSub={campaignSub} />
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center p-4 text-muted">
                        {selectedStatus === "Accepted" &&
                          "No tasks have been accepted yet"}
                        {selectedStatus === "Rejected" &&
                          "No tasks have been rejected yet"}
                        {selectedStatus === "Pending" &&
                          "No tasks are pending review"}
                        {selectedStatus === "all" &&
                          "You have not submitted any tasks yet"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="col-xl-8 mt-4">
        <div className="card border-0"></div>
      </div>
    </>
  );
};

export default MyRewards;
