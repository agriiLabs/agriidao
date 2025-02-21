import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useAuth } from "../../../hooks/Context";
import { setUserSocialMediaRequest } from "../../../redux/slices/app";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../../../utils/Utils";
import { AcCategory } from "../../../../../declarations/settings/settings.did";

const DUserSocialPreview = ({ setCurrentStep }: { setCurrentStep: (step: number) => void }) => {
    const { bountyActor, settingsActor } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userSocialMediaRequest, selectedCampaign } = useSelector((state: RootState) => state.app);
  const [saving, setSaving] = useState(false);
  const [socialMedia, setSocialMedia] = useState<AcCategory | null>(null);

  useEffect(() => {
    getSocialMedia();
  }, [userSocialMediaRequest?.socialMediaId]);

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

  let socialName = socialMedia?.name; 

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
        navigate(`/d/reward-campaign-detail/${selectedCampaign?.id}`);
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
    <div>
        <p>Review your username:</p>
        <p><strong>Username:</strong> {userSocialMediaRequest?.userName}</p>
        <p><strong>Social Channel:</strong> {socialMedia?.name}</p>
  
        <div className="d-flex justify-content-between">
          <button onClick={() => setCurrentStep(1)} className="btn btn-outline-dark">
            Back
          </button>
          <button onClick={handleSave} className="btn btn-success">
            {saving ? "Submitting..." : "Confirm"}
          </button>
        </div>
      </div>
  )
}

export default DUserSocialPreview