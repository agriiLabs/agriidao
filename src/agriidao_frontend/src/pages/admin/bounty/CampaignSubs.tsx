import React, { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/Context";
import { Response } from "../../../utils/Types";
import { AcCategory } from "../../../../../declarations/settings/settings.did";
import { Campaign, CampaignTask, CampaignUser } from "../../../../../declarations/bounty/bounty.did";
// import { setCampaign_ } from "../../../redux/slices/app";
import { useDispatch } from "react-redux";
import { formatNanoDate } from "../../../utils/Utils";

type Props ={
    campaignSub: CampaignUser;
};

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

const CampaignSub: FC<Props> = ({ campaignSub }) => {
    const { bountyActor } = useAuth(); 
  const { id } = useParams(); 
const [task, setTask] = useState<CampaignTask | null>(null);

  useEffect(() => {
    if(campaignSub){
      getTask()
    };
  }, [campaignSub]); 

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

  return (
    <tr className="even">
        <td>{campaignSub.userId.toString()}</td>
        <td>{task?.task}</td>
        <td>{getStatus(campaignSub.status)}</td>
        <td>{formatNanoDate(Number(campaignSub.timeStamp))}</td>
        <td>
            <Link to={`/campaign-participant-detail/${campaignSub?.id}`}>View</Link>
        </td>
    </tr>
  );
  
};

export default CampaignSub;