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

const MarketPrices = () => {
  const { commodityActor } = useAuth();
  const [mLCommodity, setMLCommodity] = useState<MarketLocationCommodity[]>([]);

  const [prices, setPrices] = useState<MarketPrice[]>([]);
  const [market, setMarket] = useState<MarketLocation | null>(null);
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
      setMarket(res[0]);
    } else {
      setMarket(null);
    }
  };

  useEffect(() => {
    if (market && commodityActor) {
      fetchMarketData(market.id, commodityActor);
    }
  }, [market, commodityActor]);

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
    // console.log("Selected market:", marketId);

    // Find the selected market object and update state
    const selectedMarket = markets.find((m) => m.id === marketId);
    console.log("Selected market object:", selectedMarket);
    if (selectedMarket !== market) {
      setMarket(selectedMarket || null);
    } //TODO: The selector doesn't after populates once
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
          <select
            id="marketLocation"
            className="select form-control"
            value={selectedCountryId || ""}
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

        {/* {market ? (
        <div>
          <h3>Selected Market:</h3>
          <pre>{JSON.stringify(market, null, 2)}</pre>
        </div>
      ) : (
        <p>No market selected</p>
      )} */}
        <div className="card card-style">
          <table
            className="table table-borderless text-center rounded-sm "
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
                  <td colSpan={4}>No prices found</td>
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
