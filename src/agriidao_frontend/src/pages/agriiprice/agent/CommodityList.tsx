import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/Context";
import {
  MarketLocationAgent,
  MarketLocationCommodity,
} from "../../../../../declarations/commodity/commodity.did";
import ProfileClick from "../../profile/component/ProfileClick";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store"; // Adjust the import path as necessary
import CommoditySubs from "../components/CommoditySubs";

const CommodityList = () => {
  const { agriidaoActor } = useAuth();
  const { id } = useParams();
  const { marketLocationAgent } = useSelector((state: RootState) => state.app);
  const [market, setMarket] = useState<MarketLocationAgent[] | null>(null);
  const [commoditySubs, setCommoditySubs] = useState<MarketLocationCommodity[]>(
    []
  );
  const [mCommodities, setMCommodities] = useState<
    MarketLocationCommodity[] | null
  >(null);

  useEffect(() => {
    getAllCommoditySubs();
  }, [agriidaoActor]);

  // get all commodity subs
  const getAllCommoditySubs = async () => {
    if (!id || !agriidaoActor) {
      console.error("ID or agriidaoActor is null");
      return;
    }
    const res = await agriidaoActor.getAllLatestMarketCommoditiesByMarketId(
      id
    );
    setCommoditySubs(res);
  };

  useEffect(() => {
    getMarketCommodities();
  }, []);

  // get market commodities
  const getMarketCommodities = async () => {
    if (!id || !agriidaoActor) {
      console.log("id", id);
      console.error("ID or agriidaoActor is null");
      return;
    }
    const res = await agriidaoActor?.getAllLatestMarketCommoditiesByMarketId(
      id
    );
    console.log("commodities:", res);
    setMCommodities(res);
  };

  return (
    <>
      <div className="header header-fixed header-logo-center">
        <a href="#" className="header-title">
          Commodities
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
            
            
            {mCommodities && mCommodities.length > 0 ? (
              mCommodities?.map((commodity, index) => (
                <CommoditySubs key={index} commoditySub={commodity} />
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

export default CommodityList;
