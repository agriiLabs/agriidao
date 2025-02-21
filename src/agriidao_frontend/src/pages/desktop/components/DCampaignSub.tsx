import { FC, useEffect, useState } from "react";
import {
  Campaign,
  CampaignUser,
  CampaignTask,
} from "../../../../../declarations/bounty/bounty.did";
import { useAuth } from "../../../hooks/Context";
import { formatNanoDate } from "../../../utils/Utils";

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

const DCampaignSub: FC<Props> = ({ campaignSub }) => {
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
    <tr>
      <td className="p-3">
        <span className="ms-2">{task?.task}</span>
      </td>
      <td className="text-center p-3">{getStatus(campaignSub.status)}</td>
      <td className="text-center p-3">
        {formatNanoDate(Number(campaignSub.timeStamp))}
      </td>
    </tr>
  )
}

export default DCampaignSub