import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/Context";
import {
  MarketLocation,
  MarketPrice,
  Commodity,
} from "../../../../../declarations/commodity/commodity.did";
import CountryName from "../../../components/agriidao/CountryName";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { setSelectedMarketLocation } from "../../../redux/slices/app";
import { formatNanoDate } from "../../../utils/Utils";

const DMarketPrices = () => {
  const dispatch = useDispatch();
  const { commodityActor } = useAuth();
  const { selectedMarketLocation } = useSelector(
    (state: RootState) => state.app
  );
  const [prices, setPrices] = useState<EnrichedPrice[]>([]);
  const [markets, setMarkets] = useState<MarketLocation[]>([]);
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);


  interface EnrichedPrice extends MarketPrice {
      commodity?: Commodity;
    }

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

  // const fetchMarketData = async (marketId: string, commodityActor: any) => {
  //   try {
  //     const commodityRes =
  //       await commodityActor.getAllLatestMarketCommoditiesByMarketId(marketId);

  //     setMLCommodity(commodityRes);

  //     const pricesRes =
  //       await commodityActor.getLatestMarketPriceByMarketLocationId(marketId);

  //     const transformedPrices = transformBigIntToString(pricesRes);
  //     setPrices(transformedPrices);
  //   } catch (error) {
  //     console.error("Error fetching market data:", error);
  //   }
  // };

  const fetchMarketData = async (marketId: string, commodityActor: any) => {
    console.log("Fetching market data for marketId:", marketId);
    try {
      setLoading(true);
      const pricesRes: MarketPrice[] =
        await commodityActor.getLatestMarketPriceByMarketLocationId(marketId);

      const latestMap = new Map<string, MarketPrice>();

      pricesRes.forEach((price: MarketPrice) => {
        const key = price.marketLocationCommodityId;
        const existing = latestMap.get(key);

        if (!existing || Number(price.timeStamp) > Number(existing.timeStamp)) {
          latestMap.set(key, price);
        }
      });

      const enrichedPrices = await Promise.all(
        Array.from(latestMap.values()).map(
          async (price): Promise<EnrichedPrice> => {
            const locRes = await commodityActor.getMarketLocationCommodityById(
              price.marketLocationCommodityId
            );
            if ("ok" in locRes) {
              const commRes = await commodityActor.getCommodityLatest(
                locRes.ok.commodityId
              );
              if ("ok" in commRes) {
                return { ...price, commodity: commRes.ok };
              }
            }
            return price;
          }
        )
      );

      enrichedPrices.sort((a, b) => {
        const nameA = a.commodity?.name?.toLowerCase() || "";
        const nameB = b.commodity?.name?.toLowerCase() || "";
        return nameA.localeCompare(nameB);
      });

      setPrices(enrichedPrices);
    } catch (error) {
      console.error("Error fetching market data:", error);
    } finally {
      setLoading(false);
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

    const selectedMarket = markets.find((m) => m.countryId === marketId);
    if (selectedMarket !== selectedMarketLocation) {
      dispatch(setSelectedMarketLocation(selectedMarket || null));
    }
  }; 

   useEffect(() => {
      if (prices.length > 0) {
        setLastUpdated(formatNanoDate(Number(prices[0].timeStamp)));
      }
    }, [prices]);

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h5 className="mb-0">Markets</h5>
        </div>

        <div className="mb-0 position-relative">
          <select
            className="form-select form-control"
            id="marketLocation"
            value={selectedMarketLocation?.countryId || ""}
            onChange={handleMarketChange}
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

      <div className="col-xl-12 mt-4">
        <div className="card border-0">
          <div
            className="table-responsive shadow rounded-bottom"
            data-simplebar
            style={{ height: "545px" }}
          >
            <table className="table table-center bg-white mb-0">
              <thead>
                <tr>
                  <th className="border-bottom p-3" style={{ width: "220px" }}>
                    Commodity
                  </th>
                  <th className="text-center border-bottom p-3">KG</th>
                  <th
                    className="text-center border-bottom p-3"
                    style={{ width: "150px" }}
                  >
                    Price 
                  </th>
                  <th
                    className="text-center border-bottom p-3"
                    style={{ width: "150px" }}
                  >
                    Currency 
                  </th>
                  
                  <th
                    className="text-center border-bottom p-3"
                    style={{ width: "150px" }}
                  >
                    Updated
                  </th>
                  {/* <th className="text-end border-bottom p-3">View</th> */}
                </tr>
              </thead>
              
              <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center">
                    Loading...
                  </td>
                </tr>
              ) : prices && prices.length > 0 ? (
                prices.map((price, index) => (
                  <tr>
                  <td className="p-3">
                    <span className="ms-2">{price?.commodity?.name}</span>
                  </td>
                  <td className="text-center p-3">1</td>
                  <td className="text-center p-3">
                    {price.pricePerKg ? price.pricePerKg.toFixed(2) : "-"}
                  </td>
                  <td className="text-center p-3">{price?.currency}</td>
                  <td className="text-center p-3">{formatNanoDate(Number(price.timeStamp))}</td>
                </tr>
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
      </div>
    </>
  );
};

export default DMarketPrices;