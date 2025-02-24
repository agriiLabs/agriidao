import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/Context";
import ProfileClick from "../profile/component/ProfileClick";
import { useNavigate } from "react-router-dom";
import { CoopRecord } from "../../../../declarations/coop_indexer/coop_indexer.did";
import { Coop } from "../../../../declarations/coop_manager/coop_manager.did";
import imagePath1 from "../../assets/images/bg0.png";
import imagePath2 from "../../assets/images/default-user-profile.png";
import getCoopActor from "./components/CoopActor";

const CoopHome = () => {
  const { coopIndexerActor, identity } = useAuth();
  const navigate = useNavigate();
  const [coops, setCoops] = useState<CoopRecord[]>([]);
  const [coopBalances, setCoopBalances] = useState<Record<string, any>>({});
  const [coopDetails, setCoopDetails] = useState<Record<string, Coop>>({});

  useEffect(() => {
    if (coopIndexerActor) {
      fetchCoops();
    }
  }, [coopIndexerActor]);

  useEffect(() => {
    if (coops.length > 0) {
      fetchCoopDetails();
      fetchCoopBalances();
    }
  }, [coops]);

  const fetchCoops = async () => {
    try {
      const res = await coopIndexerActor?.getDaoCoops();
      if (res) setCoops(res);
    } catch (error) {
      console.error("Error fetching co-ops:", error);
    }
  };

  const fetchCoopDetails = async () => {
    const details: Record<string, Coop> = {};
    await Promise.all(
      coops.map(async (coop) => {
        try {
          const coopActor = await getCoopActor(coop.canisterId.toText());
          const coopDetail = await coopActor.getDetails();
          if (coopDetail) details[coop.canisterId.toText()] = coopDetail;
        } catch (error) {
          console.error(`Error fetching details for ${coop.canisterId.toText()}:`, error);
        }
      })
    );
    setCoopDetails(details);
  };

  const fetchCoopBalances = async () => {
    const balances: Record<string, any> = {};
    const userId = identity?.getPrincipal();
    if (!userId) return;

    await Promise.all(
      coops.map(async (coop) => {
        try {
          const coopActor = await getCoopActor(coop.canisterId.toText());
          const balance = await coopActor.getMemberbyUserId(userId);
          balances[coop.canisterId.toText()] = balance ?? 0;
        } catch (error) {
          console.warn(`Failed to fetch balance for ${coop.canisterId.toText()}:`, error);
          balances[coop.canisterId.toText()] = 0;
        }
      })
    );
    setCoopBalances(balances);
  };

  const totalBalance = () => {
    return Object.keys(coopBalances).reduce((sum, coopId) => {
      const balance = Number(coopBalances[coopId]?.balance) || 0;
      const unitPrice = Number(coopDetails[coopId]?.unitPrice) || 0;
      return sum + balance * unitPrice;
    }, 0).toFixed(2);
  };

  return (
    <>
      <div className="header header-fixed header-logo-center">
        <a href="#" className="header-title">My CO-OPs</a>
        <button onClick={() => window.history.back()} className="header-icon header-icon-1">
          <i className="fas fa-arrow-left"></i>
        </button>
        <ProfileClick />
      </div>

      <div className="content header-clear-medium my-0 mb-4">
        <div className="card card-style">
          <img src={imagePath1} alt="img" />
          <div className="card-center text-center">
            <h1 className="color-white fa-4x">${totalBalance()}</h1>
            <p className="color-white opacity-70 font-16 mt-3 mb-n3">Co-op Balance</p>
          </div>
          <div className="card-overlay bg-black opacity-70"></div>
        </div>
      </div>

      <div className="content mb-0">
        <button onClick={() => navigate(`/coops`)} className="btn btn-sm rounded-sm border-dark color-dark bg-theme mb-4">
          Join a Co-op
        </button>
      </div>

      <div className="card card-style">
        <div className="content mb-0">
          <h4 className="font-700 text-uppercase font-12 opacity-50">My Balances</h4>
          <div className="divider mb-3" />
          {coops.length > 0 ? (
            coops.map((coop) => (
              <div key={coop.canisterId.toText()} className="d-flex mb-3">
                <img className="rounded-xl me-3" src={imagePath2} width="50" height="50" alt="Co-op" />
                <div>
                  <p className="mb-n1 font-18">{coop.name ?? "Unnamed Co-op"}</p>
                </div>
                <div className="ms-auto text-end">
                  <p className="mb-n1 font-18">
                    {Number(coopBalances[coop.canisterId.toText()]?.balance) ?? "0"} {coopDetails[coop.canisterId.toText()]?.ticker}
                  </p>
                  <p className="font-11 opacity-60">
                    ${(
                      (Number(coopBalances[coop.canisterId.toText()]?.balance) ?? 0) *
                      (Number(coopDetails[coop.canisterId.toText()]?.unitPrice) ?? 0)
                    ).toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>Loading co-ops...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default CoopHome;
