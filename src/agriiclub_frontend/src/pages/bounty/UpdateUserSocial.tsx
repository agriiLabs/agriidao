import { useState } from "react";
import { useAuth } from "../../hooks/Context";
import { useNavigate } from "react-router-dom";
import { UserSocialMedia } from "../../../../declarations/bounty/bounty.did";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toastError, toastSuccess } from "../../utils/Utils";

const UpdateUserSocial = () => {
  const { bountyActor } = useAuth();
  const { userSocialMedia, selectedCampaign } = useSelector((state: RootState) => state.app);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const [userName, setUserName] = useState<string>(
    userSocialMedia && userSocialMedia.userName.length != 0 ? userSocialMedia.userName : ""
  );
  
  const handleSave = async (e: any) => {
    e.preventDefault();
    if (!bountyActor) {
      console.error("bountyActor is null");
      return;
    }
    if (!userSocialMedia) {
      console.error("username is null");
      return;
    }
    if (!checkUserSocialMedia(userName)) {
      toastError("Please enter a valid username");
      return;
    }
    if (userName == "") {
      toastError("Please fill in username");
      return;
    }
    setSaving(true);

    const body: UserSocialMedia = {
      ...userSocialMedia,
      userName: userName,
    };
    try {
      await bountyActor.updateUserSocialMedia(body);
      navigate(`/reward-campaign-detail/${selectedCampaign?.id}`)
      toastSuccess("Social media account successfully updated");
    } catch (error) {
      setSaving(false);
      toastError("Error updating social media account");
      console.error("Error updating social media account", error);
    }
  };

  const checkUserSocialMedia = (userSocialMedia: string) => {
    if (userSocialMedia.length < 3) {
      return false;
    }
    return true;
  };

  // go back
  const handleBack = () => {
    navigate("/campaign-detail/");
  };

  return (
    <>
      <div className="header header-fixed header-logo-center">
        <a className="header-title">Update My Usersname</a>
        <button
          onClick={handleBack}
          data-back-button
          className="header-icon header-icon-1"
        >
          <i className="fas fa-arrow-left"></i>
        </button>
      </div>

      <div className="page-content header-clear-medium">
        <div className="card card-style">
          <div className="content mb-0">
            <form onSubmit={handleSave}>
              <div className="input-style input-style-2 input-required">
                <input
                  placeholder="What is your username?"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="textinput textInput form-control"
                />

                <div className="col-12">
                  <button
                    type="submit"
                    disabled={saving}
                    className="col-12 btn btn-full btn-m bg-blue-dark rounded-sm text-uppercase font-800 mt-3"
                  >
                    {saving ? "Updating..." : "Update"}
                  </button>
                </div>
              </div>
              <br />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateUserSocial;
