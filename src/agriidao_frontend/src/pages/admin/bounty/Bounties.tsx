import React, { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/Context";
import { NavLink, Link, useParams } from "react-router-dom";
import { Bounty } from "../../../../../declarations/bounty/bounty.did";
import AddBounty from "./components/AddBounty";
import CategoryName from "../../../components/CategoryName";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const Bounties = () => {
  const { agriidaoActor, bountyActor } = useAuth(); 
  const { id } = useParams(); 
  const [bounties, setBounties] = useState<Bounty[]>([]); 
  

  useEffect(() => {
      getAllBounties();
  });

  const getAllBounties = async () => {
    let res = await bountyActor?.getAllBounties(); // calls the backend and fetches the bounties
    setBounties(res || []); // set the bounties to the bounties array or an empty array if undefined
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
              <div>
                <h5 className="mb-0">Commodities</h5>
              </div>
      
              <div className="mb-0 position-relative">
                <NavLink
                  to={`/d/start-coop/`}
                  className="btn btn-outline-dark col-sm-12"
                >
                  Add Bounty
                </NavLink>
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
                      <th className="border-bottom p-3" style={{ width: "150px" }}>
                        Name
                      </th>
                      <th className="border-bottom p-3" style={{ width: "150px" }}>
                        Type
                      </th>
                      <th className="border-bottom p-3" style={{ width: "150px" }}>
                        Bounty Pool
                      </th>
                      <th className="border-bottom p-3" style={{ width: "150px" }}>
                        View
                        </th>
                    </tr>
                  </thead>
                  <tbody>
                    {bounties.map((bounty, index) => (
                      <tr className="even" key={index}>
                        <td className="p-3">{bounty.name}</td>
                        <td className="p-3">
                          <CategoryName id={bounty.acCategoryId} />
                        </td>
                        <td className="p-3">{Number(bounty.bountyPool)}</td>
                        <td className="p-3">
                          <Link to={`/rewards/bounty/${bounty.id}`}>View</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
    </>
  );
};

export default Bounties;
