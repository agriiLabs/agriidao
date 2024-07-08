import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useAuth } from "../../hooks/Context";
import { setUserSocialMediaRequest } from "../../redux/slices/app";
import { useNavigate } from "react-router-dom";
import { toastSuccess } from "../../utils/Utils";

const AddUserSocialPreview = () => {
  const { bountyActor } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userSocialMediaRequest } = useSelector(
    (state: RootState) => state.app
  );
  const [saving, setSaving] = useState(false);

   // go back
   const handleBack = () => {
    navigate(`/reward-summary/`);
  };

  const handleSave = async () => {
    if (!userSocialMediaRequest) {
      console.error("user social media request not found");
      return;
    }
    setSaving(true);
    try {
      await bountyActor?.addUserSocialMedia(userSocialMediaRequest);
      setSaving(false);
      dispatch(setUserSocialMediaRequest(null));
      toastSuccess("Social media account successfully added");
      navigate("/reward-summary");
    } catch (error) {
      setSaving(false);
      console.error("Error saving social media username request: ", error);
    }
  };

  return (
    <>
      <div className="header header-fixed header-logo-center">
        <a className="header-title">Confirm social username</a>
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
          <div className="content mb-0">
            <div className="row mb-0">
              <div className="col-4">
                <p className="font-15">Username</p>
              </div>
              <div className="col-8">
                <p className="font-15 text-end">
                  {userSocialMediaRequest?.userName}
                </p>
              </div>
              <div className="divider divider-margins w-100 mt-2 mb-2"></div>
              <div className="col-5">
                <p className="font-15">Social Channel</p>
              </div>
              <div className="col-7">
                <p className="font-15 text-end">
                  {userSocialMediaRequest?.socialMediaId}
                </p>
              </div>
              <div className="divider divider-margins w-100 mt-2 mb-2"></div>
              <div className="col-12">
                <button
                  disabled={saving}
                  onClick={handleSave}
                  className="col-12 btn btn-full btn-m bg-blue-dark rounded-sm text-uppercase font-800 mt-3"
                >
                  {saving ? "Saving..." : "Submit Entry"}
                </button>
              </div>
            </div>

            <br />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUserSocialPreview;
