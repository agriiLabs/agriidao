import React, { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Campaign,
  CampaignUser,
  CampaignTask,
} from "../../../../declarations/bounty/bounty.did";
import { useAuth } from "../../hooks/Context";
import { formatNanoDate } from "../../utils/Utils";

type Props = {
  campaignSub: CampaignUser;
};

type Status = { pending: null } | { rejected: null } | { accepted: null };

const getStatus = (status: Status): string => {
  if ("pending" in status) {
    return "Pending";
  } else if ("rejected" in status) {
    return "Rejected";
  } else if ("accepted" in status) {
    return "Accepted";
  } else {
    return "Unknown Status";
  }
};

const CampaignSub: FC<Props> = ({ campaignSub }) => {
  const { bountyActor } = useAuth();
  const [campaign, setCampiagn] = useState<Campaign | null>(null);
  const [task, setTask] = useState<CampaignTask | null>(null);

  useEffect(() => {
    if(campaignSub){
      getTask()
    };
  }, [campaignSub]); 

  useEffect(() => {
    getCampaign();
  }, [bountyActor]);

  const getTask = async () => {
    if(!campaignSub || !bountyActor){
      console.error("campaign user request not found")
      return;
    }
    try {
      const res = await bountyActor.getLatestCampaignTaskById(campaignSub.campaignTaskId);
      if("ok" in res){
        setTask(res.ok)
      } else {
        console.error(res.err)
      }
    } catch (error) {
      console.error("Error fetching campaign task: ", error)
    }
  };

  const getCampaign = async () => {
    if (!bountyActor) {
      console.error("caller or bountyActor is null");
      return;
    }
    try {
        const res = await bountyActor.getCampaignLatest(campaignSub.campaignId);
    if ("ok" in res) {
      setCampiagn(res.ok);
    } else {
      console.error(res.err);
    }
    } catch (error) {
        console.error("Error fetching campaign: ", error)
    }
  };

  return (
    <Link
      to={`/reward-campaign-detail/${campaignSub?.id}`}
      className="d-flex mb-3"
    >
      <div className="align-self-center">
        <img
          className="rounded-xl me-3"
          src={campaign?.campaignPic} 
          data-src={campaign?.campaignPic}
          width="40"
          height="40"
          alt={campaign?.name}
        />
      </div>
      <div className="align-self-center">
        <p className="mb-n2 font-16">{campaign?.name}</p>
        <p className="font-11 opacity-60">{task?.task}</p>
      </div>
      <div className="align-self-center ms-auto text-end">
        <p className="mb-n2 font-16">
          {formatNanoDate(Number(campaignSub.timeStamp))}
        </p>
        <p className="font-11 opacity-60">{getStatus(campaignSub.status)}</p>
      </div>
    </Link>
  );
};

export default CampaignSub;
