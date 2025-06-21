import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/Context";
import {
  MarketLocation,
  MarketPrice,
  Commodity,
  MarketPriceRecordsPaginated,
} from "../../../../declarations/agriidao_backend/agriidao_backend.did";
import ProfileClick from "../profile/component/ProfileClick";
import CountryName from "../../components/agriidao/CountryName";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setSelectedMarketLocation } from "../../redux/slices/app";
import { Link } from "react-router-dom";

const MarketPrices = () => {
  const dispatch = useDispatch();
  const { agriidaoActor } = useAuth();
  const { selectedMarketLocation } = useSelector(
    (state: RootState) => state.app
  );
  const [markets, setMarkets] = useState<MarketLocation[]>([]);
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [loading, setLoading] = useState(false);
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
        await agriidaoActor.getLatestMarketPriceByMarketLocationIdPaginated(marketId, ({ page: BigInt(page), size: BigInt(size) }));
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
                  Price ({paginatedRecords?.records?.[0]?.market_price.currency})
                </th>
                {/* <th scope="col" className="opacity-70">
                  24hr +/-
                </th> */}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="text-center">
                    Loading...
                  </td>
                </tr>
              ) : paginatedRecords?.records && paginatedRecords?.records.length > 0 ? (
                paginatedRecords?.records.map((price, index) => (
                  <tr key={index}>
                    <Link
                      to={`/market-price/${price?.market_price.marketLocationCommodityId}`}
                    >
                      <td className="text-left">{price.commodity[0]?.name}</td>
                    </Link>
                    <td className="mb-1" style={{ paddingTop: 0 }}>
                      1
                    </td>
                    <td className="mb-1" style={{ paddingTop: 0 }}>
                      {price.market_price.pricePerKg}
                    </td>
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
    </>
  );
};

export default MarketPrices;
