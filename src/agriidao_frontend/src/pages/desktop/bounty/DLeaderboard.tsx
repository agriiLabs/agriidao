import imagePath from "../../../assets/images/default-user-profile.png";
import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/Context";
import { BountyPoint } from "../../../../../declarations/bounty/bounty.did";
import { useNavigate } from "react-router-dom";

const DMarketPrices = () => {
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
      const sortedRes = res.sort((a, b) => b.balance - a.balance);
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

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h5 className="mb-0">Leaderboard</h5>
        </div>
      </div>

      <div className="col-xl-12 mt-4">
        <div className="card border-0">
          <div
            className="table-responsive shadow rounded-bottom"
            data-simplebar
            style={{ height: "545px" }}
          >
            <table className="table table-center bg-white mb-0">
              <thead>
                <tr>
                  <th className="border-bottom p-3" style={{ width: "220px" }}>
                    Rank
                  </th>
                  <th className="border-bottom p-3" style={{ width: "150px" }}>
                    Member
                  </th>
                  <th className="border-bottom p-3" style={{ width: "150px" }}>
                    Points
                  </th>
                </tr>
              </thead>

              <tbody>
                {bountyPoints && bountyPoints.length > 0 ? (
                  bountyPoints.map(
                    (bountyPoint: BountyPoint, index: number) => (
                      <tr key={index}>
                        <th scope="row" className="p-3">
                          <span className="ms-2">{index + 1}</span>
                        </th>
                        <td align="left" width="65%">
                          {/* {position.user.profile_pic ? (
                                            <img className="rounded-xl mr-3" src={position.user.profile_pic} alt="Profile" width="25" height="25" />
                                        ) : ( */}
                          <img
                            src={imagePath}
                            width="35"
                            className="rounded-circle mt- shadow-xl preload-img"
                            alt="Default Profile"
                            style={{ marginRight: "15px" }}
                          />
                          {/* )} */}
                          {bountyPoint.userId.toString()}
                        </td>
                        <td className=" p-4">{bountyPoint.balance} </td>
                        {/* <td>{position.total}</td> */}
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td colSpan={3}>No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DMarketPrices;
