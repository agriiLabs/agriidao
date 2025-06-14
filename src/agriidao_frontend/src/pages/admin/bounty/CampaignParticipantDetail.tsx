import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/Context";
import { Response } from "../../utils/Types";
import { CampaignUser, UserSocialMedia } from "../../../../declarations/bounty/bounty.did";
import { formatNanoDate, toastSuccess } from "../../utils/Utils";
import { CampaignTask } from "../../../../declarations/bounty/bounty.did";

const ParticipantDetail = () => {
  const { bountyActor } = useAuth(); //get agriichainBackend from the global context
  const { id } = useParams(); //how to access the url parameter i.e id
  const [participant, setParticipant] = useState<CampaignUser | null>(null);
  const [socialMedia, setSocialMedia] = useState<UserSocialMedia | null>(null);
  const [task, setTask] = useState<CampaignTask | null>(null);
  const [exceededTask, setExceededTask] = useState<boolean>(false)

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

  // get campaign user campaign id
  useEffect(() => {
    getCampaignUser();
  }, [id]);


  const getCampaignUser = async () => {
    const res = await bountyActor.getCampaignUser(id);
    if ("ok" in res) {
      setParticipant(res.ok);
    } else {
      console.log(res.err);
    }
  };



  // get task by id

  useEffect(() => {
    if (participant) {
      getTask();
    };
  }, [participant, bountyActor]);

  

  const getTask = async () => {
    if(!participant || !bountyActor){
      console.error("campaign user request not found")
      return;
    }
    try {
      const res = await bountyActor.getLatestCampaignTaskById(participant.campaignTaskId);
      if("ok" in res){
        setTask(res.ok)
      } else {
        console.error(res.err)
      }
    } catch (error) {
      console.error("Error fetching campaign task: ", error)
    }
  }

  // check if user exceeded submissions
  useEffect(() => {
    if (task && (task.task == "Post" || task.task == "Repost")) {
      checkSubmission()
    }
  }, [task])

  const checkSubmission = async () => {
    if (!task || !participant || !bountyActor) {
      console.error("campaign user request not found");
      return;
    }
    const res = await bountyActor.checkCampaignSubmission(participant.campaignId, participant.userId, participant.campaignTaskId );
    
    if (res.length > 2){
      setExceededTask(true)
    }
  };
  console.log("task: ", task, participant)


  // get user social media by id
  useEffect(() => {
    if (participant) {
      getUserSocialMedia();
    };
  }, [participant, bountyActor]);


  const getUserSocialMedia = async () => {
    if (!bountyActor || !participant) {
      console.error("bountyActor or participant not found");
      return;
    }
    const res = await bountyActor.getUserSocialMediaLatestById(participant.userId.toString());
    if ("ok" in res) {
      setSocialMedia(res.ok);
      
    } else {
      console.log(res.err);
    }
    
  }



  // moderate task submission
  const handleUpdate = async (value: string) => {
    if (exceededTask){
      toastSuccess("User has exceeded the maximum number of submissions")
      return;
    }
    try {
      if (value === "Reject") {
        await bountyActor.rejectCampaignUserSubmission(participant);
      } else if (value === "Accept") {
        const res = await bountyActor.acceptCampaignUserSubmission(participant);
      }
      toastSuccess("Submission updated");
      getCampaignUser();
    } catch (error) {
      console.error("Error getting campaign participant", error);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box">
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a href="javascript: void(0);">InventoryClub</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="javascript: void(0);">Agents</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="javascript: void(0);">Agent Summary</a>
                </li>
                <li className="breadcrumb-item active">
                  Price Discovery Detail
                </li>
              </ol>
            </div>
            <h4 className="page-title">Campaign Participant Detail</h4>
          </div>
        </div>
      </div>

      {participant && (
        <div className="row">
          <div className="col-lg-4 col-xl-4">
            <div className="card-box text-center">
              <div className="text-left mt-3">
                <h4 className="text-uppercase">
                  {participant.userId.toString()}
                </h4>
                <br />
                <dl className="row">
                  <dt className="col-sm-5">Social Handle</dt>
                  <dd className="col-sm-7">{socialMedia?.userName}</dd>
                  <dt className="col-sm-5">Campaign</dt>
                  <dd className="col-sm-7">{participant.campaignId}</dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="col-lg-8 col-xl-8">
            <div className="card-box">
              <h5 className="mb-3 text-uppercase bg-light p-2">
                <i className="mdi mdi-earth mr-1"></i> Entry Details
              </h5>
              <dl className="row">
                <dt className="col-sm-5">Task</dt>
                <dd className="col-sm-7">{task?.task}</dd>
                <dt className="col-sm-5">URL</dt>
                <dd className="col-sm-7">{participant.url}</dd>
                <dt className="col-sm-5">Status</dt>
                <dd className="col-sm-7">{getStatus(participant.status)}</dd>
                <dt className="col-sm-5">Paid</dt>
                <dd className="col-sm-7">
                  {participant.isPaid ? "Yes" : "No"}
                </dd>
                <dt className="col-sm-5">Created</dt>
                <dd className="col-sm-7">
                  {formatNanoDate(Number(participant.timeStamp))}
                </dd>
              </dl>
              {exceededTask && getStatus(participant.status) !== "Accepted" &&  <div><p>User has exceeded 24hr {task?.task} limit</p></div>}
              {/* button will only show if the status is pending */}
              {getStatus(participant.status) === "Pending" && (
                <div className="row">
                  <div>
                    <div className="col-md-12">
                      <button
                        onClick={() => handleUpdate("Reject")}
                        className="btn btn-xs btn-block btn-danger"
                      >
                        Reject
                      </button>
                    </div>
                    {!exceededTask && <div className="col-md-12">
                      <button
                        onClick={() => handleUpdate("Accept")}
                        className="btn btn-xs btn-block btn-success"
                      >
                        Accept
                      </button>
                    </div>}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ParticipantDetail;
