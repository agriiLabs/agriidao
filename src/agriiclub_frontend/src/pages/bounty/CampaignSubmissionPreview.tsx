import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useAuth } from "../../hooks/Context";
import { setCampaignUserRequest } from "../../redux/slices/app";
import { useNavigate } from "react-router-dom";
import { toastSuccess } from "../../utils/Utils";
import { CampaignTask } from "../../../../declarations/bounty/bounty.did";

const CampaignSubmissionPreview = () => {
  const {bountyActor} = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { campaignUserRequest } = useSelector((state: RootState) => state.app);
  const [saving, setSaving] = useState(false);
  const [task, setTask] = useState<CampaignTask | null>(null);
  
  useEffect(() => {
    if(campaignUserRequest){
      getTask()
    };
  }, [campaignUserRequest]) 

  const getTask = async () => {
    if(!campaignUserRequest || !bountyActor){
      console.error("campaign user request not found")
      return;
    }
    try {
      const res = await bountyActor.getLatestCampaignTaskById(campaignUserRequest.campaignTaskId);
      if("ok" in res){
        setTask(res.ok)
      } else {
        console.error(res.err)
      }
    } catch (error) {
      console.error("Error fetching campaign task: ", error)
    }
  }

  const handleSave = async () => {
    if(!campaignUserRequest){
      console.error("campaign user request not found")
      return;
    }
    setSaving(true);
    try {
      await bountyActor?.addCampaignUser(campaignUserRequest);
      setSaving(false);
      dispatch(setCampaignUserRequest(null))
      toastSuccess("Congratulations! Task submitted")
      navigate("/reward-summary")
    } catch (error) {
      setSaving(false);
      console.error("Error saving campaign user request: ", error)
    }
  }; 

  // go back
  const handleBack = () => {
    navigate(`/reward-campaigns`);
  };

  return (
    <>
      <div className="header header-fixed header-logo-center">
        <a className="header-title">Confirm Campaign Entry</a>
        <button
          onClick={handleBack}
          data-back-button
          className="header-icon header-icon-1"
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        {/* <a href="#" data-toggle-theme className="header-icon header-icon-4">
          <i className="fas fa-lightbulb"></i>
        </a> */}
      </div>

      <div className="page-content header-clear-medium">
        <div className="card card-style">
          <div className="content">
            <div className="row mb-0">
              <div className="col-3">
                <p className="font-15">Web Link</p>
              </div>
              <div className="col-9">
                <p className="font-15 text-end">{campaignUserRequest?.url}</p>
              </div>
              <div className="divider divider-margins w-100 mt-2 mb-2"></div>
              <div className="col-3">
                <p className="font-15">Task</p>
              </div>
              <div className="col-9">
                <p className="font-15 text-end">
                  {task?.task}
                </p>
              </div>
              <div className="divider divider-margins w-100 mt-2 mb-2"></div>
              <div className="col-12">
                <button
                  disabled={saving}
                  onClick={handleSave}
                  className="col-12 btn btn-full btn-m bg-blue-dark rounded-sm text-uppercase font-800 mt-3"
                >
                  {saving ?  "Saving..." : "Submit Entry"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CampaignSubmissionPreview;
