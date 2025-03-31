import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/Context";
import {
  MembershipRecord,
} from "../../../../../declarations/coop_indexer/coop_indexer.did";
import {
  _SERVICE,
  Coop,
} from "../../../../../declarations/coop_manager/coop_manager.did";
import getCoopActor from "../../coops/components/CoopActor";
import imagePath2 from "../../../assets/images/co-ops-default.png";
import { ckUSDCe6s } from "../../../constants/canisters_config";

type CoopBalance = {
  coop: {
    id: string;
    name: string;
  }
  balance: number;
};

const DPortfolio = () => {
  const { coopIndexerActor, identity } = useAuth();
  const navigate = useNavigate();
  const [memberCoops, setMemberCoops] = useState<MembershipRecord[] | null>(
    null
  );
  const [coopBalances, setCoopBalances] = useState<CoopBalance[]>([]);
  const [coopDetails, setCoopDetails] = useState<Record<string, Coop>>({});

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

      const detailsList: Record<string, Coop> = {};
      for (const coop of memberCoops) {
        try {
          const coopActor = await getCoopActor(coop.coopId.toText());
          const coopDetails = await coopActor.getDetails();

          if (coopDetails) {
            detailsList[coop.coopId.toText()] = coopDetails;
          }
        } catch (error) {
          console.error(
            `Error fetching details for co-op ${coop.coopId.toText()}:`,
            error
          );
        }
      }
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
    let balances : CoopBalance[] = [];

    for (const coop of memberCoops ?? []) {
      try {
        const coopActor = await getCoopActor(coop.coopId.toText());

        if (userId) {
          const coopBalance = await coopActor.getMemberbyUserId(userId);

          balances.push({
            coop: {
              id: coop.coopId.toText(),
              name: coopDetails[coop.coopId.toText()]?.name ?? "Unknown Co-op",
            },
            balance: "ok" in coopBalance ? Number(coopBalance.ok.balance) : 0,
          });
        }
      } catch (error) {
        console.warn(
          `Failed to fetch balance for co-op ${coop.coopId}:`,
          error
        );
        balances.push({
          coop: {
            id: coop.coopId.toText(),
            name: coopDetails[coop.coopId.toText()]?.name ?? "Unknown Co-op",
          },
          balance: 0,
        });
      }
    }
    setCoopBalances(balances);
  };

  useEffect(() => {
    if (memberCoops && memberCoops.length > 0) {
      getCoopMemberDetails();
    }
  }, [memberCoops]);

  const totalBalance = () => {
    const total = coopBalances.reduce((sum, coopBalance) => {
      const coopDetail = coopDetails[coopBalance.coop.id];
      const balance = BigInt(coopBalance.balance);
      const unitPrice = BigInt(coopDetail?.unitPrice ?? 0);
      return sum + balance * unitPrice;
    }, BigInt(0));
  
    const formatted = Number(total) / Number(ckUSDCe6s);
    return formatted.toLocaleString(undefined);
  };

  const unitBalance = () => {
    const total = coopBalances.reduce((sum, coopBalance) => {
      const coopDetail = coopDetails[coopBalance.coop.id];
      const balance = BigInt(coopBalance.balance);
      const unitPrice = BigInt(coopDetail?.unitPrice ?? 0);
      return sum + balance * unitPrice;
    }, BigInt(0));
  
    const formatted = Number(total) / Number(ckUSDCe6s);
    return formatted.toLocaleString(undefined);
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
                <h5 className="mb-0 col-sm-6">My Balance</h5>
                <h5 className="mb-0 col-sm-6 text-end">{totalBalance()}</h5>
              </div>
              <div className="mt-4">
                <dl className="row">
                  <dt className="col-sm-6">Co-op Units</dt>
                  <dd className="col-sm-6 text-end">{unitBalance()}</dd>
                  <dt className="col-sm-6">Co-op Futures</dt>
                  <dd className="col-sm-6 text-end">0</dd> 
                  {/* TODO: Implement Co-op Futures */}
                </dl>
              </div>
              <div className="mt-3">
                <NavLink
                  to={`/d/coop-projects/`}
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
                <h5 className="mb-0">My Units</h5>
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
                      const coopDetail = coopDetails?.[coop.coopId.toText()];
                      const balance = BigInt(
                        coopBalances.find(
                          (coopBalance) => coopBalance.coop.id === coop.coopId.toText()
                        )?.balance ?? 0
                      );
                      const unitPrice = BigInt(coopDetail?.unitPrice ?? 0);
                      const total = Number(balance * unitPrice) / ckUSDCe6s

                      return (
                        <tr key={coop.coopId.toText()}>
                          <td className="d-flex align-items-center p-3">
                            <Link
                              to={`/d/portfolio/units/${coop.coopId.toText()}`}
                              className="d-flex align-items-center"
                            >
                              <img
                            src={imagePath2}
                            width="35"
                            className="avatar avatar-ex-small rounded"
                            alt="Default Co-op Image"
                            style={{ marginRight: "15px" }}
                          />
                            {coopDetail?.name ?? "Unknown Co-op"}
                            </Link>
                          
                          </td>
                          <td className="p-3">{balance.toString()}</td>
                          <td className="p-3">{total.toString()} USDC</td>
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
    </>
  );
};

export default DPortfolio;
