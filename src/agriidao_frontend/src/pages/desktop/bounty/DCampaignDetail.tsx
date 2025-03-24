import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/Context";
import { useParams } from "react-router-dom";
import { Response } from "../../../utils/Types";
import {
  Campaign,
  CampaignTask,
  UserSocialMedia,
} from "../../../../../declarations/bounty/bounty.did";
import { useDispatch } from "react-redux";
import {
  setSelectedCampaign,
  setUserSocialMedia,
} from "../../../redux/slices/app";
import DCampaignSubmission from "../components/DCampaignModal";
import DUserSocial from "../components/DUserSocial";

const DCampaignDetail = () => {
  const { bountyActor, setTempVal } = useAuth();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [userSocial, setUserSocial] = useState<UserSocialMedia | null>(null);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [showUserSocialModal, setShowUserSocialModal] = useState(false);
  const [userSocialExists, setUserSocialExists] = useState(false);
  const [tasks, setTasks] = useState<CampaignTask[] | null>(null);

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
      console.error(res.err);
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

  useEffect(() => {
    if (userSocial) {
      setUserSocialExists(true);
    }
  }, [userSocial]);

  useEffect(() => {
    if (bountyActor) {
      getCampaignTasks();
    }
  }, [campaign, bountyActor]);

  const getCampaignTasks = async () => {
    try {
      if (bountyActor && campaign) {
        const tasks = await bountyActor.getCampaignCampaignTasks(campaign.id);
        setTasks(tasks);
      }
    } catch (error) {
      console.error("Error fetching tasks: ", error);
    }
  };

  const handleTaskRewards = () => {
    setShowRewardModal(true);
  };

  const handleUserSocial = () => {
    setShowUserSocialModal(true);
    if (campaign) {
      setTempVal(campaign.campaignType);
    }
    dispatch(setSelectedCampaign(campaign));
    dispatch(setUserSocialMedia(userSocial));
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h5 className="mb-0">Campaign Detail</h5>
        </div>
        <div className="mb-0 position-relative">
        {userSocialExists ? (
          <>
            <a
              onClick={(e) => {
                e.preventDefault();
                handleTaskRewards();
              }}
              className="btn btn-outline-dark col-sm-12"
            >
              Claim Reward
            </a>
          </>
        ) : (
          <>
            <a
              onClick={(e) => {
                e.preventDefault();
                handleUserSocial();
              }}
              className="btn btn-outline-dark col-sm-12"
            >
              Claim Reward
            </a>
          </>
        )}
        </div>
      </div>

      <div className="row">
        <div className="col-xl-4">
          <div className="col-xl-12 mt-4">
            <div className="card rounded shadow border-0 p-4">
              <div className="d-flex justify-content-between ">
                <h5 className="mb-0">Campaign Summary</h5>
              </div>
              <div className="mt-4">
                <dl className="row">
                  <dt className="col-sm-4">Campaign</dt>
                  <dd className="col-sm-8 text-end">
                    {campaign?.name ? campaign?.name : "-"}
                  </dd>
                  <dt className="col-sm-5">My Username</dt>
                  <dd className="col-sm-7 text-end">
                    {userSocial?.userName ? userSocial?.userName : "-"}
                  </dd>
                  <dt className="col-sm-3">URL</dt>
                  <dd className="col-sm-9 text-end">
                    {campaign?.url ? campaign?.url : "-"}
                  </dd>
                  <dt className="col-sm-7">Available Rewards</dt>
                  <dd className="col-sm-5 text-end">
                    {campaign?.availBal ? campaign?.availBal : "-"} AGRII
                  </dd>
                </dl>
                <div className="mt-4">
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      handleUserSocial();
                    }}
                    className="btn btn-outline-dark col-sm-12"
                  >
                    Update Username
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-12 mt-4">
            <div className="card rounded shadow border-0 p-4">
              <div className="d-flex justify-content-between mb-4">
                <h5 className="mb-0">Rewards</h5>
              </div>

              <table className="table table-center bg-white mb-0">
                <thead>
                  <tr>
                    <th className="border-bottom">Task</th>
                    <th className="text-center border-bottom">Reward</th>
                  </tr>
                </thead>

                <tbody>
                  {tasks?.map((tasks, index) => (
                    <tr>
                      <td>{tasks.task}</td>
                      <td className="text-center">{tasks.allocation} points</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-xl-8">
          <div className="col-xl-12 mt-4">
            <div className="card rounded shadow border-0 p-4">
              <div className="d-flex justify-content-between mb-4">
                <h5 className="mb-0">Overview</h5>
              </div>
              <div dangerouslySetInnerHTML={{ __html: campaign?.notes || "" }}></div>
            </div>
          </div>
          <div className="col-xl-12 mt-4">
            <div className="card rounded shadow border-0 p-4">
              <div className="d-flex justify-content-between mb-4">
                <h5 className="mb-0">Rules</h5>
              </div>
              < div dangerouslySetInnerHTML={{ __html: campaign?.rules || ""}}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-xl-8 mt-4">
        <div className="card border-0"></div>
      </div>
      {showRewardModal && (
        <DCampaignSubmission
          {...{ showRewardModal, setShowRewardModal, campaign }}
        />
      )}
      {showUserSocialModal && (
        <DUserSocial
          {...{ showUserSocialModal, setShowUserSocialModal, userSocial }}
        />
      )}
    </>
  );
};

export default DCampaignDetail;
