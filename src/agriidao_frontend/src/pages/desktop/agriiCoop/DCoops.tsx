import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/Context";
import { CoopRecord } from "../../../../../declarations/coop_indexer/coop_indexer.did";
import { Link, NavLink } from "react-router-dom";
import imagePath2 from "../../../assets/images/default-user-profile.png";
import getCoopActor from "../../coops/components/CoopActor";

const DCoops = () => {
  const { coopIndexerActor } = useAuth();
  const [coops, setCoops] = useState<CoopRecord[] | null>(null);
  const [comMembersCount, setComMembersCount] = useState<{
    [key: string]: number;
  }>({});
  const [coopBalances, setCoopBalances] = useState<{
    [key: string]: BigInt;
  } | null>(null);

  useEffect(() => {
    if (coopIndexerActor) {
      getDaoCoops();
      //   getCommunityCoops();
    }
  }, [coopIndexerActor]);

  useEffect(() => {
    if (coops && coops.length > 0) {
      getCoopMembers();
      getCoopBalances();
    }
  }, [coops]);

  const getDaoCoops = async () => {
    let res = await coopIndexerActor?.getCreatedCanisters();
    if (res) {
      setCoops(res);
    }
  };

  const getCoopMembers = async () => {
    let res = await coopIndexerActor?.getAllMemberships();
    if (res) {
      const membershipCounts: { [key: string]: number } = {};
      res.forEach((membership) => {
        const coopId = membership.coopId.toText();
        membershipCounts[coopId] = (membershipCounts[coopId] || 0) + 1;
      });

      setComMembersCount(membershipCounts);
    }
  };

  const getCoopBalances = async () => {
    const balances: { [key: string]: BigInt } = {};

    for (const coop of coops ?? []) {
      try {
        const coopActor = await getCoopActor(coop.canisterId.toText());
        const coopDetails = await coopActor.getDetails();
        const coopBalance =
          (coopDetails.totalUnit - coopDetails.availableUnit) *
          BigInt(coopDetails.unitPrice);
        balances[coop.canisterId.toText()] = coopBalance;
      } catch (error) {
        console.log(
          `Failed to fetch balance for co-op ${coop.canisterId}:`,
          error
        );
        balances[coop.canisterId.toText()] = BigInt(0);
      }
    }

    setCoopBalances(balances);
    console.log("All balances:", balances);
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h5 className="mb-0">Co-ops</h5>
        </div>
        <div className="mb-0 position-relative">
          <NavLink
            to={`/d/start-coop/`}
            className="btn btn-outline-dark col-sm-12"
          >
            Start a Co-op
          </NavLink>
        </div>
      </div>

      <div className="col-xl-12 mt-4">
        <div className="card border-0">
          <div
            className="table-responsive shadow rounded-bottom"
            data-simplebar
            style={{ height: "545px;" }}
          >
            <table className="table table-center bg-white mb-0">
              <thead>
                <tr>
                  <th className="border-bottom p-3" style={{ width: "150px;" }}>
                    Rank
                  </th>
                  <th className="border-bottom p-3" style={{ width: "150px;" }}>
                    Co-op
                  </th>
                  <th className="border-bottom p-3" style={{ width: "150px;" }}>
                    Members
                  </th>
                  <th className="border-bottom p-3" style={{ width: "150px;" }}>
                    Treasury
                  </th>
                </tr>
              </thead>

              <tbody>
                {coops && coops.length > 0 ? (
                  coops.map((coop: CoopRecord, index: number) => (
                    <tr key={index}>
                      <th scope="row" className="p-3">
                        <span className="ms-2">{index + 1}</span>
                      </th>
                      <td align="left" width="40%">
                        <Link
                          to={`/d/coop-detail/${coop.canisterId.toText()}`}
                          className="d-flex align-items-center"
                        >
                          {/* {position.user.profile_pic ? (
                                          <img className="rounded-xl mr-3" src={position.user.profile_pic} alt="Profile" width="25" height="25" />
                                      ) : ( */}
                          <img
                            src={imagePath2}
                            width="35"
                            className="rounded-circle mt- shadow-xl preload-img"
                            alt="Default Co-op Image"
                            style={{ marginRight: "15px" }}
                          />
                          <span>{coop.name}</span>
                        </Link>
                      </td>

                      <td className=" p-4">
                        {comMembersCount[coop.canisterId.toText()] ?? "0"}{" "}
                      </td>
                      <td className=" p-4">
                        {coopBalances
                          ? coopBalances[
                              coop.canisterId.toText()
                            ]?.toString() ?? "0"
                          : "0"}{" "}
                        USDC
                      </td>
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
      </div>
    </>
  );
};

export default DCoops;
