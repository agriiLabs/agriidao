import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/Context";
import {
  MarketLocation,
  MarketLocationCommodity,
  MarketPrice,
  Commodity,
} from "../../../../declarations/commodity/commodity.did";
import ProfileClick from "../profile/component/ProfileClick";
import MarketPriceSubs from "./components/MarketPriceSubs";
import transformBigIntToString from "./components/BigIntToString";
import CountryName from "../../components/agriidao/CountryName";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setSelectedMarketLocation } from "../../redux/slices/app";

const MarketPrices = () => {
  const dispatch = useDispatch();
  const { commodityActor } = useAuth();
  const [mLCommodity, setMLCommodity] = useState<MarketLocationCommodity[]>([]);
  const {selectedMarketLocation} = useSelector((state: RootState) => state.app);

  const [prices, setPrices] = useState<MarketPrice[]>([]);
  // const [market, setMarket] = useState<MarketLocation | null>(null);
  const [markets, setMarkets] = useState<MarketLocation[]>([]);
  const [selectedCountryId, setSelectedCountryId] = useState("");

  useEffect(() => {
    getAllMarkets();
  }, [commodityActor]);

  const getAllMarkets = async () => {
    if (!commodityActor) {
      console.error("commodityActor is null");
      return;
    }
    const res = await commodityActor.getAllMarketLocationsLatest();
    if (res.length > 0) {
      setMarkets(res);
    }
  };

  useEffect(() => {
    if (selectedCountryId) {
      getMarket(selectedCountryId);
    }
  }, [selectedCountryId]);

  const getMarket = async (countryId: string) => {
    if (!commodityActor) {
      console.error("commodityActor not found");
      return;
    }
    const res = await commodityActor.getMarketLocationByCountryId(countryId);

    if (res.length > 0) {
      dispatch(setSelectedMarketLocation(res[0]));
    } else {
      dispatch(setSelectedMarketLocation(null));
    }
  };

  useEffect(() => {
    if (selectedMarketLocation && commodityActor) {
      fetchMarketData(selectedMarketLocation.id, commodityActor);
    }
  }, [selectedMarketLocation, commodityActor]);

  const fetchMarketData = async (marketId: string, commodityActor: any) => {
    try {
      // Fetch latest market commodities
      const commodityRes =
        await commodityActor.getAllLatestMarketCommoditiesByMarketId(marketId);

      setMLCommodity(commodityRes);

      // Fetch market prices
      const pricesRes = await commodityActor.getLatestMarketPriceByMarketLocationId(
        marketId
      );


      const transformedPrices = transformBigIntToString(pricesRes);
      setPrices(transformedPrices);
    } catch (error) {
      console.error("Error fetching market data:", error);
    }
  };

  interface HandleMarketChangeEvent {
    target: {
      value: string;
    };
  }

  const handleMarketChange = (event: HandleMarketChangeEvent) => {
    const marketId = event.target.value;
    setSelectedCountryId(marketId);
    console.log("Selected market:", marketId);

    // Find the selected market object and update state
    const selectedMarket = markets.find((m) => m.countryId === marketId);
    if (selectedMarket !== selectedMarketLocation) {
      dispatch(setSelectedMarketLocation(selectedMarket || null));
    } 
  };

  return (
    <>
      <div className="header header-fixed header-logo-center">
        <a href="#" className="header-title">
          agriiPrice
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
        <div className="content my-0 mb-4">
        <div className="input-style has-borders no-icon mb-4">
          <select
            id="marketLocation"
            className="select form-control"
            value={selectedMarketLocation?.countryId || ""}
            onChange={handleMarketChange} // Update state on change
          >
            <option value="">Select Market</option>
            {markets.map((market, index) => (
              <option key={index} value={market.countryId}>
                <CountryName id={market.countryId} /> 
              </option>
            ))}
          </select>
          </div>
        </div>
        <div className="card card-style">
          <table
            className="table table-borderless text-left rounded-sm "
            style={{ overflow: "hidden", backgroundColor: "#fff" }}
          >
            <thead>
              <tr>
                <th scope="col" className="opacity-70">
                  Commodity
                </th>
                <th scope="col" className="opacity-70">
                  KG
                </th>
                <th scope="col" className="opacity-70">
                  Price ({prices?.[0]?.currency})
                </th>
                {/* <th scope="col" className="opacity-70">
                  24hr +/-
                </th> */}
              </tr>
            </thead>
            <tbody>
              {prices && prices.length > 0 ? (
                prices.map((price: MarketPrice, index) => (
                  <MarketPriceSubs key={index} marketPriceSub={price} />
                ))
              ) : (
                <tr>
                  <td colSpan={4}>Select Market Above</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MarketPrices;
