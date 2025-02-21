import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/Context";
import ProfileClick from "../profile/component/ProfileClick";
import { CoopRecord } from "../../../../declarations/coop_indexer/coop_indexer.did";
import { Link, NavLink } from "react-router-dom";
import imagePath2 from "../../assets/images/default-user-profile.png";
import getCoopActor from "./components/CoopActor";
// import DAOPill from "./components/DaoPill";

const Coops = () => {
  const { coopIndexerActor } = useAuth();
  const [coops, setCoops] = useState<CoopRecord[] | null>(null);
  const [comCoops, setComCoops] = useState<CoopRecord[] | null>(null);
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
    console.log("dao coops", res);
  };

//   const getCommunityCoops = async () => {
//     let res = await coopIndexerActor?.getCommunityCoops();
//     if (res) {
//       setComCoops(res);
//     }
//     console.log("community coops", res);
//   };

  const getCoopMembers = async () => {
    let res = await coopIndexerActor?.getAllMemberships();
    if (res) {
      console.log("coop members", res);
      const membershipCounts: { [key: string]: number } = {};
      res.forEach((membership) => {
        const coopId = membership.coopId.toText();
        membershipCounts[coopId] = (membershipCounts[coopId] || 0) + 1;
      });

      setComMembersCount(membershipCounts);
      console.log("coop members count", membershipCounts);
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
      <div className="header header-fixed header-logo-center">
        <a href="#" className="header-title">
          CO-OPs
        </a>
        <button
          onClick={() => window.history.back()}
          data-back-button
          className="header-icon header-icon-1"
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        <ProfileClick />
      </div>

      <div className="header-clear-medium my-0 mb-4">
        <div className="card card-style">
          <div className="content mb-0">
            <div className="row mb-2 mt-n2">
                <div className="col-6 text-start">
                  <h4 className="font-700 text-uppercase font-12 opacity-50">
                  Co-ops
                  </h4>
                </div>
                <div className="col-6 text-end">
                  <NavLink
                    to="/reward-summary"
                    id="nav-bottom"
                    className="font-12 color-dark"
                  >
                    Learn More
                  </NavLink>
                </div>
              </div>
            
            <div className="divider mb-3" />
            {coops &&
              coops.map((coop, index) => (
                <Link
                  to={`/coop-detail/${coop.canisterId.toText()}`}
                  className="d-flex mb-3"
                  key={index}
                >
                  <div className="align-self-center">
                    {/* <img src={coop} alt={coop.name} style={{ width: "50px", height: "50px" }} /> */}
                    <img
                      className="rounded-xl me-3"
                      src={imagePath2}
                      data-src={"#"}
                      width="50"
                      height="50"
                      alt={"Default Co-op Image"}
                    />
                  </div>
                  <div className="align-self-center">
                    <p className="mb-n1 font-18">{coop.name}</p>
                    {/* <p className="font-11 opacity-60">{!coop.isCommunity && <DAOPill />}</p> */}
                  </div>
                  <div className="align-self-center ms-auto text-end">
                    <p className="mb-n1 font-18">
                      Members {comMembersCount[coop.canisterId.toText()] ?? "0"}
                    </p>
                    <p className="font-11 opacity-60">
                      Total Contributions $
                      {coopBalances
                        ? coopBalances[coop.canisterId.toText()]?.toString() ??
                          "0"
                        : "0"}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>

      
    </>
  );
};

export default Coops;
