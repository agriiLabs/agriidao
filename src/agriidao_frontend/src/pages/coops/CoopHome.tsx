import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/Context";
import ProfileClick from "../profile/component/ProfileClick";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { CoopRecord } from "../../../../declarations/coop_indexer/coop_indexer.did";
import { Link, useNavigate } from "react-router-dom";
import {
  _SERVICE,
  Coop,
} from "../../../../declarations/coop_manager/coop_manager.did";
import imagePath1 from "../../assets/images/bg0.png";
import imagePath2 from "../../assets/images/default-user-profile.png";
import getCoopActor from "./components/CoopActor";
// import DaoPill from "./components/DaoPill";

const CoopHome = () => {
  const { coopIndexerActor, identity } = useAuth();
  const navigate = useNavigate();
  const [coops, setCoops] = useState<CoopRecord[] | null>(null);
  const [coopBalances, setCoopBalances] = useState<{ [key: string]: any }>({});
  const [coopDetails, setCoopDetails] = useState<any>(null);

  useEffect(() => {
    if (coopIndexerActor) {
      getDaoCoops();
    }
  }, [coopIndexerActor]);

  const getDaoCoops = async () => {
    let res = await coopIndexerActor?.getDaoCoops();
    if (res) {
      setCoops(res);
    }
    console.log("dao coops", res);
  };

  useEffect(() => {
    if (coops && coops.length > 0) {
      getAllCoopBalances();
    }
  }, [coops]);

  useEffect(() => {
    if (coops && coops.length > 0) {
      getCoopDetails();
    }
  }, [coops]);

  let userId = identity?.getPrincipal();

  const getCoopDetails = async () => {
    try {
      if (!coops || coops.length === 0) {
        console.error("Coops list is empty or undefined");
        return;
      }

      const detailsList = [];
      for (const coop of coops) {
        try {
          const coopActor = await getCoopActor(coop.canisterId.toText());
          const coopDetails = await coopActor.getDetails();
 
          if (coopDetails) {
            detailsList.push({
              coopId: coop.canisterId.toText(),
              ...coopDetails,
            });
          }
        } catch (error) {
          console.error(
            `Error fetching details for co-op ${coop.canisterId.toText()}:`,
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

  const getAllCoopBalances = async () => {
    const balances: { [key: string]: any } = {};
  
    for (const coop of coops ?? []) {
      try {
        const coopActor = await getCoopActor(coop.canisterId.toText());
  
        if (userId) {
          const coopBalance = await coopActor.getMemberbyUserId(userId);
          console.log(`Balance for ${coop.canisterId}:`, coopBalance);
  
          balances[coop.canisterId.toText()] = coopBalance !== null && coopBalance !== undefined ? coopBalance : 0;
        }
      } catch (error) {
        console.warn(`Failed to fetch balance for co-op ${coop.canisterId}:`, error);
        
        balances[coop.canisterId.toText()] = 0;
      }
    }
  
    setCoopBalances(balances);
    console.log("All balances:", balances);
  };
  

  const totalBalance = () => {
    if (!coopBalances || !coopDetails) return "0.00";
  
    let totalUsdValue = 0;
  
    for (const coopId in coopBalances) {
      const userBalance = Number(coopBalances[coopId]?.balance) || 0; 
      const coopDetail = coopDetails.find((detail: Coop) => detail.id.toText() === coopId);
  
      const unitPrice = coopDetail ? Number(coopDetail.unitPrice) || 0 : 0; 
  
      totalUsdValue += userBalance * unitPrice; 
    }
  
    return totalUsdValue.toFixed(2); 
  };
  

  const handleClick = () => {
    navigate(`/coops`);
  };

  return (
    <>
      <div className="header header-fixed header-logo-center">
        <a href="#" className="header-title">
          My CO-OPs
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

      <div className="content header-clear-medium my-0 mb-4">
        <div
          className="card card-style "
          style={{
            marginLeft: 0,
            marginRight: 0,
          }}
        >
          <img src={imagePath1} alt="img" />

          <div className="card-center text-center">
            <h1 className="color-white fa-4x">${totalBalance()}</h1>
            <p className="color-white opacity-70 font-16 mt-3 mb-n3">
              Co-op Balance
            </p>
          </div>

          <div className="card-overlay bg-black opacity-70"></div>
        </div>
      </div>

      <div className="content mb-0">
        <div className="row mb-0">
          <div className="col-6 pe-1">
            <button
              onClick={handleClick}
              className="btn btn-sm rounded-sm border-dark color-dark bg-theme mb-4 mx-0"
            >
              <span className="color-theme opacity-80 font-800 font-13 text-center text-uppercase px-3">
                Join a Co-op
              </span>
            </button>
          </div>
          <div className="col-6 pl-1">
            <button className="btn btn-sm rounded-sm border-dark color-dark bg-theme mb-4 mx-0">
              <span className="color-theme opacity-80 text-uppercase font-800 font-13 px-3">
                Start a co-op
              </span>
            </button>
          </div>
        </div>
      </div>
 
      <div className="card card-style">
        <div className="content mb-0">
          <h4 className="font-700 text-uppercase font-12 opacity-50">
            My Balances
          </h4>
          <div className="divider mb-3" />
          {coops && coops.length > 0 ? (
            coops.map((coop) => (
              <Link 
                to={`/coop-portfolio/${coop.canisterId.toText()}`}
                className="d-flex mb-3"
                key={coop.canisterId.toText()}
              >
                <div className="align-self-center">
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
                  <p className="mb-n1 font-18">
                    {coop.name ?? "Unnamed Co-op"}
                  </p>
                  <p className="font-11 opacity-60">
                    {/* {!coop.isCommunity && <DaoPill />} */}
                  </p>
                </div>
                <div className="align-self-center ms-auto text-end">
                  <p className="mb-n1 font-18">
                    {coopBalances[coop.canisterId.toText()]?.balance ?? "0"}{" "}
                    {coopBalances[coop.canisterId.toText()]?.balance !==
                      undefined &&
                      coopDetails.find(
                        (detail: Coop) =>
                          detail.id.toText() === coop.canisterId.toText()
                      )?.ticker}
                  </p>
                  <p className="font-11 opacity-60">
                    {coopBalances[coop.canisterId.toText()]?.balance !==
                      undefined &&
                    coopDetails.find(
                      (detail: Coop) =>
                        detail.id.toText() === coop.canisterId.toText()
                    )?.unitPrice !== undefined
                      ? `$ ${(
                          (coopBalances[coop.canisterId.toText()]?.balance ??
                            0) *
                          (coopDetails.find(
                            (detail: Coop) =>
                              detail.id.toText() === coop.canisterId.toText()
                          )?.unitPrice ?? 0)
                        ).toFixed(2)}`
                      : "$ 0.00"}
                  </p>
                </div>
              </Link>
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
