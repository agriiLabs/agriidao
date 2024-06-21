import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useAuth } from "../../hooks/Context";
import { setCampaignUserRequest } from "../../redux/slices/app";
import { useNavigate } from "react-router-dom";
import { toastSuccess } from "../../utils/Utils";

const CampaignSubmissionPreview = () => {
  const {bountyActor} = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { campaignUserRequest } = useSelector((state: RootState) => state.app);
  const [saving, setSaving] = useState(false);

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
  return (
    <>
      <div className="header header-fixed header-logo-center">
        <a className="header-title">Confirm Campaign Entry</a>
        <a href="#" data-back-button className="header-icon header-icon-1">
          <i className="fas fa-arrow-left"></i>
        </a>
        <a href="#" data-toggle-theme className="header-icon header-icon-4">
          <i className="fas fa-lightbulb"></i>
        </a>
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
                  {campaignUserRequest?.campaignTaskId}
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
