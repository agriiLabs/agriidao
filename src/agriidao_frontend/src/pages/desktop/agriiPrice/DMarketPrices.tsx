import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/Context";
import {
  MarketLocation,
  MarketPrice,
  Commodity,
  MarketPriceRecordsPaginated,
} from "../../../../../declarations/agriidao_backend/agriidao_backend.did";
import CountryName from "../../../components/agriidao/CountryName";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { setSelectedMarketLocation } from "../../../redux/slices/app";
import { formatNanoDate } from "../../../utils/Utils";

const DMarketPrices = () => {
  const dispatch = useDispatch();
  const { agriidaoActor } = useAuth();
  const { selectedMarketLocation } = useSelector(
    (state: RootState) => state.app
  );

  const [markets, setMarkets] = useState<MarketLocation[]>([]);
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
      const [paginatedRecords, setPaginatedRecords] = useState<MarketPriceRecordsPaginated | null>(null);
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(50);
    const [pageInput, setPageInput] = useState<string>('');


  interface EnrichedPrice extends MarketPrice {
      commodity?: Commodity;
    }

  useEffect(() => {
    getAllMarkets();
  }, [agriidaoActor]);

  const getAllMarkets = async () => {
    if (!agriidaoActor) {
      console.error("agriidaoActor is null");
      return;
    }
    const res = await agriidaoActor.getAllMarketLocationsLatest();
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
    if (!agriidaoActor) {
      console.error("agriidaoActor not found");
      return;
    }
    const res = await agriidaoActor.getMarketLocationByCountryId(countryId);

    if (res.length > 0) {
      dispatch(setSelectedMarketLocation(res[0]));
    } else {
      dispatch(setSelectedMarketLocation(null));
    }
  };

  useEffect(() => {
    if (selectedMarketLocation && agriidaoActor) {
      fetchMarketData(selectedMarketLocation.id);
    }
  }, [selectedMarketLocation, agriidaoActor]);

  const fetchMarketData = async (marketId: string) => {
  if (!agriidaoActor) {
    console.error("agriidaoActor not found");
    return;
  }
    try {
      setLoading(true);

      const pricesRes =
        await agriidaoActor.getLatestMarketPriceByMarketLocationIdPaginated(marketId,({ page: BigInt(page), size: BigInt(size) }));
      setPaginatedRecords(pricesRes);
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
      if (paginatedRecords?.records.length > 0) {
        setLastUpdated(formatNanoDate(Number(paginatedRecords?.records[0].timeStamp)));
      }
    }, [paginatedRecords?.records]);

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
              ) : paginatedRecords?.records && paginatedRecords?.records.length > 0 ? (
                paginatedRecords?.records.map((price, index) => (
                  <tr>
                  <td className="p-3">
                    <span className="ms-2">{price.commodity[0]?.name}</span>
                  </td>
                  <td className="text-center p-3">1</td>
                  <td className="text-center p-3">
                    {price.market_price.pricePerKg}
                  </td>
                  <td className="text-center p-3">{price.market_price.currency}</td>
                  <td className="text-center p-3">{formatNanoDate(Number(price.market_price.timeStamp))}</td>
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