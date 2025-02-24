import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/Context";
import {
  CoopRecord,
  MembershipRecord,
} from "../../../../declarations/coop_indexer/coop_indexer.did";
import {
  _SERVICE,
  Coop,
} from "../../../../declarations/coop_manager/coop_manager.did";
import getCoopActor from "../coops/components/CoopActor";

const Dashboard = () => {
  const { coopIndexerActor, identity } = useAuth();
  const navigate = useNavigate();
  const [memberCoops, setMemberCoops] = useState<MembershipRecord[] | null>(
    null
  );
  const [coopBalances, setCoopBalances] = useState<{ [key: string]: any }>({});
  const [coopDetails, setCoopDetails] = useState<Coop[] | null>(null);

  useEffect(() => {
    if (coopIndexerActor) {
      getCoopMembership();
    }
  }, [coopIndexerActor]);

  const getCoopMembership = async () => {
    let res = await coopIndexerActor?.getMembershipByCaller();
    if (res) {
      setMemberCoops(res);
    }
    console.log("member coops", res);
  };

  useEffect(() => {
    if (memberCoops && memberCoops.length > 0) {
      getCoopDetails();
    }
  }, [memberCoops]);

  const getCoopDetails = async () => {
    try {
      if (!memberCoops || memberCoops.length === 0) {
        console.error("Coops list is empty or undefined");
        return;
      }

      const detailsList = [];
      for (const coop of memberCoops) {
        try {
          const coopActor = await getCoopActor(coop.coopId.toText());
          const coopDetails = await coopActor.getDetails();

          if (coopDetails) {
            detailsList.push({
              coopId: coop.coopId.toText(),
              ...coopDetails,
            });
          }
        } catch (error) {
          console.error(
            `Error fetching details for co-op ${coop.coopId.toText()}:`,
            error
          );
        }
      }

      console.log("Fetched Co-op Details:", detailsList);
      setCoopDetails(detailsList);
    } catch (error) {
      console.error("Error fetching co-op details:", error);
    }
  };

  useEffect(() => {
    if (memberCoops && memberCoops.length > 0) {
      getCoopMemberDetails();
    }
  }, [memberCoops]);

  let userId = identity?.getPrincipal();

  const getCoopMemberDetails = async () => {
    const balances: { [key: string]: number } = {};

    for (const coop of memberCoops ?? []) {
      try {
        const coopActor = await getCoopActor(coop.coopId.toText());

        if (userId) {
          const coopBalance = await coopActor.getMemberbyUserId(userId);
          console.log(`Balance for ${coop.coopId}:`, coopBalance);

          balances[coop.coopId.toText()] = coopBalance
            ? Number(coopBalance)
            : 0;
        }
      } catch (error) {
        console.warn(
          `Failed to fetch balance for co-op ${coop.coopId}:`,
          error
        );
        balances[coop.coopId.toText()] = 0;
      }
    }

    setCoopBalances(balances);
  };

  const totalBalance = useMemo(() => {
    if (!coopBalances || Object.keys(coopBalances).length === 0) return "0";

    let totalUsdValue = 0;

    for (const coopId in coopBalances) {
      const userBalance = coopBalances[coopId] || 0;
      const coopDetail = coopDetails?.find(
        (detail: Coop) => detail.id.toText() === coopId
      );

      const unitPrice = coopDetail ? Number(coopDetail.unitPrice) || 0 : 0;

      totalUsdValue += userBalance * unitPrice;
    }

    return totalUsdValue.toFixed(2);
  }, [coopBalances, coopDetails]);

  useEffect(() => {
    if (memberCoops && memberCoops.length > 0) {
      getCoopMemberDetails();
    }
  }, [memberCoops]);
  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h5 className="mb-0">My Portfolio</h5>
        </div>
        <div className="mb-0 position-relative">
          <select
            className="form-select form-control"
            id="campaignFilter"
            value=""
          >
            <option value="all">All</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-4">
          <div className="col-xl-12 mt-4">
            <div className="card rounded shadow border-0 p-4">
              <div className="d-flex justify-content-between mb-0 row">
                <h5 className="mb-0 col-sm-6">My Balance</h5>
                <h5 className="mb-0 col-sm-6 text-end">{totalBalance}</h5>
              </div>
              <div className="mt-4">
                <dl className="row">
                  <dt className="col-sm-5">Available Units</dt>
                  <dd className="col-sm-7 text-end">0</dd>
                  <dt className="col-sm-6">Allocated</dt>
                  <dd className="col-sm-6 text-end">0</dd>
                  <dt className="col-sm-6">Co-ops</dt>
                  <dd className="col-sm-6 text-end">0</dd>
                  <dt className="col-sm-6">Projects</dt>
                  <dd className="col-sm-6 text-end">0</dd>
                </dl>
              </div>
              <div className="mt-3">
                <NavLink
                  to={`/d/coop-projects/`}
                  className="btn btn-outline-dark col-sm-12"
                >
                  Co-op Manager
                </NavLink>
              </div>
              <div className="mt-2">
                <NavLink
                  to={`/d/coop-projects/`}
                  className="btn btn-outline-dark col-sm-12"
                >
                  Project Manager
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-8">
          <div className="col-xl-12 mt-4">
            <div className="card rounded shadow border-0 p-4">
              <div className="d-flex justify-content-between mb-4">
                <h5 className="mb-0">My Holdings</h5>
              </div>

              <table className="table table-center bg-white mb-0">
                <thead>
                  <tr>
                    <th className="border-bottom p-3">Co-op</th>
                    <th className="border-bottom p-3">Units</th>
                    <th className="border-bottom p-3">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {memberCoops && memberCoops.length > 0 ? (
                    memberCoops.map((coop) => {
                      const coopDetail = coopDetails
                        ? coopDetails.find(
                            (detail) =>
                              detail.id.toText() === coop.coopId.toText()
                          )
                        : null;

                      return (
                        <tr key={coop.coopId.toText()}>
                          <td className="p-3">
                            {coopDetail?.name ?? "Unknown Co-op"}
                          </td>
                          <td className="p-3">
                            {coopBalances[coop.coopId.toText()] ?? "0"}
                          </td>
                          <td className="p-3">
                            {(
                              Number(coopBalances[coop.coopId.toText()] ?? 0) *
                              Number(coopDetail?.unitPrice ?? 0)
                            ).toFixed(2)}{" "}
                            USDC
                          </td>
                        </tr>
                      );
                    })
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

      <div className="col-xl-8 mt-4">
        <div className="card border-0"></div>
      </div>
    </>
  );
};

export default Dashboard;
