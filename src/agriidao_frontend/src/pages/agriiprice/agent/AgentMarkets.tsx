import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/Context";
import {
  MarketLocationAgent,
  MarketLocationCommodity,
} from "../../../../../declarations/commodity/commodity.did";
import ProfileClick from "../../profile/component/ProfileClick";
import MarketLocationSubs from "../components/MarketLocationSubs";

const AgentMarketList = () => {
  const { commodityActor } = useAuth();
  const { id } = useParams();
  const [markets, setMarkets] = useState<MarketLocationAgent[] | null>(null);
  const [commoditySubs, setCommoditySubs] = useState<MarketLocationCommodity[]>(
    []
  );
  const [mCommodities, setMCommodities] = useState<
    MarketLocationCommodity[] | null
  >(null);

  useEffect(() => {
    getMarket();
  }, [id]);

  // get market by agent id
  const getMarket = async () => {
    if (!id || !commodityActor) {
      console.error("ID or commodityActor is null");
      return;
    }
    const res = await commodityActor.getMarketLocationByAgentId(id);
    console.log("market:", res);
    setMarkets(res);
  };

  return (
    <>
      <div className="header header-fixed header-logo-center">
        <a href="#" className="header-title">
          My Markets
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

      <div className="page-content header-clear-medium">
        <div className="card card-style">
          <div className="content mb-0">
            {markets && markets.length > 0 ? (
              markets?.map((market, index) => (
                <MarketLocationSubs key={index} marketSub={market} />
              ))
            ) : (
              <p>No Commodities Listed</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AgentMarketList;
