import { useNavigate } from "react-router-dom";
import { formatDate, toastError, toastSuccess } from "../../../utils/Utils";
import { ProfilePicModal } from "../../profile/component/UpdateProfile";
import imagePath2 from "../../../assets/images/default-profile-pic.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useAuth } from "../../../hooks/Context";
import { deleteAsset, uploadFile } from "../../../hooks/storage-config/functions";
import { Profile } from "../../../../../declarations/user/user.did";
import { setProfile } from "../../../redux/slices/app";

interface ProfileCardProps {
  user: any;
  userTypeChips: { [key: string]: string };
  profileExists: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user, userTypeChips, profileExists }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { profile } = useSelector((state: RootState) => state.app);
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, userActor, storageActor, bountyActor } = useAuth();

  const uploadAsset = async (file: File) => {
    if (!storageActor) return;
    const file_path = location.pathname;
    try {
      const assetUrl = await uploadFile(file, file_path, storageActor);
      return assetUrl;
    } catch (error) {
      console.error("Error uploading file:", file.name, error);
    }
  };

  const handleImageUpdate = async (file: File) => {
    try {
      if (!storageActor || !profile) {
        console.error("storageActor or profile is null");
        return;
      }
      setUpdatingProfile(true);
      const oldImage = profile.profilePic[0];
      if (oldImage) {
        await deleteAsset(oldImage, storageActor);
      }
      const imageUrl = await uploadAsset(file);
      if (imageUrl) {
        let updatedProfile: Profile = {
          ...profile,
          profilePic: [imageUrl],
        }
        await userActor?.updateProfile(updatedProfile);
        dispatch(setProfile(updatedProfile));
        toastSuccess("Profile pic updated successfully");
      }
    } catch (error) {
      console.error("Error updating profile pic", error);
      toastError("Error updating profile pic");
    } finally {
      setUpdatingProfile(false);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <h5 className="mb-0">{user?.username}</h5>
      </div>
      <div className="mt-4">
        <dl className="row">
          <dt className="col-sm-5">Joined</dt>
          <dd className="col-sm-7 text-end">
            {user?.timeStamp ? formatDate(Number(user.timeStamp)) : ""}
          </dd>
        </dl>

        {user?.userType &&
          Object.entries(user.userType).map(([key, value]) => {
            return value && userTypeChips[key] ? (
              <div key={key} className="chip chip-small bg-gray-light">
                <span
                  className="color-dark text-center w-100 d-block"
                  style={{ marginLeft: "7px" }}
                >
                  {userTypeChips[key]}
                </span>
              </div>
            ) : null;
          })}
      </div>

      <div className="mt-4">

        {profileExists ? (
          <button
            onClick={() =>
              navigate("/d/profile-detail")}
            className="btn btn-outline-dark col-sm-12"
          >
            Personal Details
          </button>
        ) : (
          <button
            onClick={() => navigate("/d/profile-create")}
            className="btn btn-outline-dark col-sm-12"
          >
            Complete Personal Details
          </button>
        )}
      </div>
      <div className="mt-2">
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-outline-dark col-sm-12">
          Update Profile Pic
        </button>
      </div>
      {isModalOpen && <ProfilePicModal
        imagePath={imagePath2}
        onClose={() => setIsModalOpen(false)}
        loading={updatingProfile}
        onImageUpdate={handleImageUpdate}
      />
      }
    </>

  );
};

export default ProfileCard;
