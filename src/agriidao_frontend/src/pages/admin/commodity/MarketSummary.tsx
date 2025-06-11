import { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/Context";
import { Response } from "../../../utils/Types";
import { Country } from "../../../../../declarations/settings/settings.did";
import CountryName from "../../../components/agriidao/CountryName";
import CommoditySubs from "./components/CommoditySubs";
import {
  Commodity,
  MarketLocation,
  MarketLocationCommodity,
} from "../../../../../declarations/commodity/commodity.did";

const MarketSummary = () => {
  const { agriidaoActor } = useAuth();
  const { id } = useParams();
  const [market, setMarket] = useState<MarketLocation | null>(null);
  const [commoditySubs, setCommoditySubs] = useState<MarketLocationCommodity[]>(
    []
  );

  const [mCommodities, setMCommodities] = useState<
    MarketLocationCommodity[] | null
  >(null);
  const [openForm, setOpenForm] = useState(false);
  const [commoditySaved, setCommoditySaved] = useState(false);
  const [country, setCountry] = useState<Country[] | null>(null);

  useEffect(() => {
    getAllCommoditySubs();
  }, [agriidaoActor]);

  const getAllCommoditySubs = async () => {
    if (!agriidaoActor) {
      console.error("agriidaoActor is null");
      return;
    }
    const res = await agriidaoActor.getAllLatestMarketCommoditiesByMarketId(
      id || ""
    );
    setCommoditySubs(res);
  };

  useEffect(() => {
    getMarketLatest();
    getMarketCommodities();
  }, []);

  // get market by id
  const getMarketLatest = async () => {
    if (!id) {
      console.error("Market ID is undefined");
      return;
    }
    const res = await agriidaoActor?.getMarketLocationLatest(id);
    console.log("market:", res);
    if (res && "ok" in res) {
      setMarket(res.ok);
    } else {
      if (res) {
        console.error(res.err);
      } else {
        console.error("Response is undefined");
      }
    }
  };

  // get market commodities by commodity id
  const getMarketCommodities = async () => {
    if (!id) {
      console.error("Market ID is undefined");
      return;
    }
    const res = await agriidaoActor?.getAllLatestMarketCommoditiesByMarketId(
      id
    );
    setMCommodities(res || null);
  };

  return (
    <>
      {/* {openForm && (
        <AddMarketCommodity {...{ setOpenForm, setCommoditySaved, market }} />
      )} */}
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h5 className="mb-0">Market Summary</h5>
        </div>

        <div className="mb-0 position-relative">
          <NavLink
            to={`/d/start-coop/`}
            className="btn btn-outline-dark col-sm-12"
          >
            Add Commodity
          </NavLink>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12 mt-4">
          <div className="card rounded shadow border-0 p-4">
            <div className="mt-4">
              <h4 className="text-uppercase">{market?.name}</h4>
              <br />
              <dl className="row">
                <dt className="col-sm-5">Country</dt>
                <dd className="col-sm-7 text-end">
                  <CountryName id={market?.countryId || ""} />
                </dd>
              </dl>
            </div>

            <div className="mt-3">
              <NavLink
                to={`/market-locations`}
                className="btn btn-outline-dark col-sm-12"
              >
                Markets
              </NavLink>
            </div>
            <div className="mt-3">
              <NavLink
                to={`/market-locations`}
                className="btn btn-outline-dark col-sm-12"
              >
                Market Agents
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      <div className="col-xl-8">
        <div className="col-xl-12 mt-4">
          <div className="card rounded shadow border-0 p-4">
            <div className="d-flex justify-content-between mb-4">
              <h5 className="mb-0">{market?.name} Commodities</h5>

              <table className="table table-center bg-white mb-0">
                <thead>
                  <tr>
                    <th className="border-bottom p-3">Commodity</th>
                    <th className="border-bottom p-3">View</th>
                  </tr>
                </thead>
                <tbody>
                  {mCommodities && mCommodities.length > 0 ? (
                    mCommodities?.map((commodity, index) => (
                      <CommoditySubs key={index} commoditySub={commodity} />
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5}>No Commodities Found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketSummary;
