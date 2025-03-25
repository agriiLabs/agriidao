import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/Context";
import getCoopActor from "../../coops/components/CoopActor";
import imagePath2 from "../../../assets/images/co-ops-default.png";
import { ckUSDCe6s } from "../../../constants/canisters_config";
import { Principal } from "@dfinity/principal";
import { formatNanoDate } from "../../../utils/Utils";

function DPortofolioUnits() {
  const { coopLedgerActor, identity } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [coopUnits, setCoopUnits] = useState<any[]>([]);
  const [member, setMember] = useState<any>();
  const [coop, setCoop] = useState<any>();
  const userId = identity?.getPrincipal();
  const coopId = id ? Principal.fromText(id) : undefined;

  useEffect(() => {
    if (id && userId) {
      getCoopMember();
    }
  }, [id, userId]);

  const getCoopMember = async () => {
    try {
      if (id && userId) {
        const coopActor = await getCoopActor(id);
        const coopMember = await coopActor.getMemberbyUserId(userId);
        const coopDetails = await coopActor.getDetails();
        if (coopMember) {
          setMember(coopMember);
        }
        if (coopDetails) {
          setCoop(coopDetails);
        }
      }
    } catch (error) {
      console.error("Error fetching co-op member:", error);
    }
  };

  useEffect(() => {
    if (coopLedgerActor) {
      getCoopUnits();
    }
  }, [coopLedgerActor]);

  const getCoopUnits = async () => {
    if (userId && coopId) {
      let res = await coopLedgerActor?.getTransactionsByUserIdAndCoopId(
        userId,
        coopId
      );
      if (res) {
        setCoopUnits(res);
      }
    } else {
      console.error("User or Coop ID is undefined");
    }
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h5 className="mb-0">My Portfolio</h5>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-4">
          <div className="col-xl-12 mt-4">
            <div className="card rounded shadow border-0 p-4">
              <div className="d-flex justify-content-between mb-0 row">
              <div className="d-flex">
                <img
                    src={imagePath2}
                    width="35"
                    className="avatar avatar-ex-small rounded"
                    alt="Default Co-op Image"
                    style={{ marginRight: "15px" }}
                />
                <h5 className="mb-0 mt-1">
                  {coop ? coop.name : "Loading..."}
                </h5>
                </div>
              </div>
              <div className="mt-4">
                <dl className="row">
                  <dt className="col-sm-6">Units</dt>
                  <dd className="col-sm-6 text-end">
                    {Number(member?.balance) ? Number(member?.balance) : "Loading..."} 
                  </dd>
                  <dt className="col-sm-6">Code</dt>
                  <dd className="col-sm-6 text-end">
                    {coop ? coop.ticker : "Loading..."}
                  </dd>
                </dl>
              </div>
              <div className="mt-3">
                <NavLink
                  to={`/d/portfolio/`}
                  className="btn btn-outline-dark col-sm-12"
                >
                  Co-op Units
                </NavLink>
              </div>
              <div className="mt-2">
                <NavLink
                  to={`/d/projects/manager/`}
                  className="btn btn-outline-dark col-sm-12"
                >
                  Co-op Futures
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-8">
          <div className="col-xl-12 mt-4">
            <div className="card rounded shadow border-0 p-4">
              <div className="d-flex justify-content-between mb-4">
                <h5 className="mb-0">Activity</h5>
              </div>

              <table className="table table-center bg-white mb-0">
                <thead>
                  <tr>
                    <th className="border-bottom p-3">Type</th>
                    <th className="border-bottom p-3">Amount</th>
                    <th className="border-bottom p-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                {coopUnits && coopUnits.length > 0 ? (
                  coopUnits.map((coop, index) => (
                    <tr key={index}>
                      <td className="p-3">
                        {coop.txType}
                      </td>
                      <td className="p-3">
                        {coop.txType === "mint"
                          ? `${Number(coop.amount)} ${coop.ticker}`
                          : coop.txType === "deposit"
                          ? `${Number(coop.amount)/ckUSDCe6s} ${coop.tokenSymbol}`
                          : Number(coop.amount)/ckUSDCe6s}
                      </td>
                      <td className="p-3">
                        {coop.timestamp ? formatNanoDate(Number(coop.timestamp)) : "Loading..."}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center p-3">
                      No holdings found.
                    </td>
                  </tr>
                )}
              </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DPortofolioUnits;
