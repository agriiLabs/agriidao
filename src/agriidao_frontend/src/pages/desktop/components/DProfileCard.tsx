import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../utils/Utils"; 

interface ProfileCardProps {
    user: any; 
    userTypeChips: { [key: string]: string };
    profileExists: boolean; 
  }
  
  const ProfileCard: React.FC<ProfileCardProps> = ({ user, userTypeChips, profileExists }) => {
    const navigate = useNavigate();
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
            <a href="#" className="btn btn-outline-dark col-sm-12">
              Update Profile Pic
            </a>
          </div>
          
        </>
      
    );
  };

export default ProfileCard;
