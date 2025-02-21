import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useNavigate } from 'react-router-dom';
import imagePath2 from "../../../assets/images/default-user-profile.png";


const ProfileClick : React.FC = () => {
    const { user } = useSelector((state: RootState) => state.app);
    const navigate = useNavigate();

    const handleProfileClick = () => {
    
          if (!user){
            navigate("/login");
          } else if (!user?.username) {
            navigate("/update-username");
          } else {
            navigate("/profile");
          }
        };

        return (
            <button onClick={handleProfileClick} className="header-icon header-icon-4">
                  <div>
                    <img
                      className="rounded-xl me-3"
                      src={imagePath2}
                      data-src={"#"}
                      width="25"
                      height="25"
                      alt={"Default user profile pic"}
                    />
                  </div>
                </button>
        );
        
};



export default ProfileClick;