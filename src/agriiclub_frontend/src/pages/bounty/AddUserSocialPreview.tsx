import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useAuth } from "../../hooks/Context";
import { setUserSocialMediaRequest } from "../../redux/slices/app";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../../utils/Utils";
import { AcCategory } from "../../../../declarations/settings/settings.did";

const AddUserSocialPreview = () => {
  const { bountyActor, settingsActor } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userSocialMediaRequest, selectedCampaign } = useSelector((state: RootState) => state.app);
  const [saving, setSaving] = useState(false);
  const [socialMedia, setSocialMedia] = useState<AcCategory | null>(null);

   // go back
   const handleBack = () => {
    navigate(`/reward-summary/`);
  };

  useEffect(() => {
    getSocialMedia();
  }, [userSocialMediaRequest?.socialMediaId]);

  //get social Media name
  const getSocialMedia = async () => {
    if (!settingsActor) {
      console.error("settingsActor is null");
      return;
    }
    try {
      const res = await settingsActor.getAcCategoryLatest(userSocialMediaRequest?.socialMediaId || "");
      if ("ok" in res) {
        setSocialMedia(res.ok);
      } else {
        console.error("Error getting social media name: ", res.err);
      }
    } catch (error) {
      console.error("Error getting social media name: ", error);
    }
  };

  let socialName = socialMedia?.name; // set social media name

  const handleSave = async () => {
    if (!userSocialMediaRequest || !bountyActor) {
      console.error("user social media request not found");
      return;
    }
    setSaving(true);
    try {
      const res = await bountyActor.addUserSocialMedia(userSocialMediaRequest);
      if ("ok" in res){
        setSaving(false);
        dispatch(setUserSocialMediaRequest(null));
        toastSuccess("Social media account successfully added");
        navigate(`/reward-campaign-detail/${selectedCampaign?.id}`);
      } else {
        setSaving(false);
        console.error("Error saving social media username request: ", res.err);
        toastError("Username already exists");
      }
      
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
                  {socialMedia?.name}
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
