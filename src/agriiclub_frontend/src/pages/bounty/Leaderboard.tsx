import imagePath from "../../assets/images/default-user-profile.png";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/Context";
import { BountyPoint } from "../../../../declarations/bounty/bounty.did";
import { useNavigate } from "react-router-dom";

const Leaderboard = () => {
  const { bountyActor } = useAuth();
  const [bountyPoints, setBountyPoints] = useState<BountyPoint[]>([]);
  const navigate = useNavigate();
  
  const getAllLatestBountyPoints = async () => {
    if (!bountyActor) {
      console.error("caller or bountyActor is null");
      return;
    }
    try {
      const res = await bountyActor.getAllLatestBountyPointUsers();

      const sortedRes = res.sort((a, b) => b.balance -a.balance);
      setBountyPoints(sortedRes);
    } catch (error) {
      console.error("Error in getting all latest bounty points: ", error);
    }
  };
  
  useEffect(() => {
    if (bountyActor) {
      getAllLatestBountyPoints();
    }
  }, [bountyActor]);

  // go back
  const handleBack = () => {
    navigate(`/reward-summary/`);
  };

  return (
    <>
      <div className="header header-fixed header-logo-center">
        <a href="#" className="header-title">
          Rewards Leaderboard
        </a>
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

      <div className="header-clear-medium">
        <div className="mb-2">
          <table
            className="table table-borderless text-center rounded-sm shadow-l"
            style={{ overflow: "hidden", backgroundColor: "#fff" }}
          >
            <thead>
              <tr className="bg-blue-dark">
                <th scope="col" className="color-white">
                  Rank
                </th>
                <th scope="col" className="color-white">
                  Member
                </th>
                <th scope="col" className="color-white">
                  Points
                </th>
                {/* <th scope="col" className="color-white">Submissions</th> */}
              </tr>
            </thead>
            <tbody>
              {bountyPoints && bountyPoints.length > 0 ? (
                bountyPoints.map((bountyPoint: BountyPoint, index: number) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td align="left" width="65%">
                      {/* {position.user.profile_pic ? (
                                            <img className="rounded-xl mr-3" src={position.user.profile_pic} alt="Profile" width="25" height="25" />
                                        ) : ( */}
                      <img
                        src={imagePath}
                        width="25"
                        className="rounded-circle mt- shadow-xl preload-img"
                        alt="Default Profile"
                        style={{ marginRight: '10px' }}
                      />
                      {/* )} */}
                        {bountyPoint.userId.toString()}
                    </td>
                    <td>{bountyPoint.balance} </td>
                    {/* <td>{position.total}</td> */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3}>No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
