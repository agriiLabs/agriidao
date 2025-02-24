import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import imagePath2 from "../../../assets/images/default-user-profile.png";

const DProfileClick: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.app);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (!user) {
      navigate("/d/login");
    } else if (!user?.username) {
      navigate("/d/update-username");
    } else {
      navigate("/d/profile");
    }
  };

  return (
    <button
      onClick={handleProfileClick}
      className="btn btn-soft-light p-0"
      data-bs-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      <div>
        <img
          className="avatar avatar-ex-small rounded"
          src={imagePath2}
          data-src={"#"}
          width="15"
          height="15"
          alt={"Default user profile pic"}
        />
      </div>
    </button>
  );
};

export default DProfileClick;
