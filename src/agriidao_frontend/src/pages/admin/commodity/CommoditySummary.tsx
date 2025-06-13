import { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/Context";
import { Response } from "../../../utils/Types";
import { Country } from "../../../../../declarations/settings/settings.did";
import {
  Commodity,
  MarketLocationCommodity,
} from "../../../../../declarations/agriidao_backend/agriidao_backend.did";
import imagePath2 from "../../../../assets/images/projects-default.png";

const CommoditySummary = () => {
  const { agriidaoActor, settingsActor } = useAuth();
  const { id } = useParams();

  const [commodity, setCommodity] = useState<Commodity | null>(null);
  const [markets, setMarkets] = useState<MarketLocationCommodity[] | null>(
    null
  );
  const [country, setCountry] = useState<Country[] | null>(null);

  useEffect(() => {
    getCommodity();
    getMarketLocations();
  }, []);

  // get commodity by id
  const getCommodity = async () => {
    if (!id) {
      console.error("Commodity ID is undefined");
      return;
    }
    const res = await agriidaoActor?.getCommodityLatest(id);
    if (!res) {
      console.error("Failed to fetch commodity data");
      return;
    }

    if ("ok" in res) {
      setCommodity(res.ok);
    } else {
      console.error(res.err);
    }
  };

  // get market locations by commodity id
  const getMarketLocations = async () => {
    if (!id) {
      console.error("Commodity ID is undefined");
      return;
    }
    const res = await agriidaoActor?.getMarketLocationCommodityByCommodityId(
      id
    );
    console.log("markets:", res);
    setMarkets(res || null);
  };

  return (
    <>
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
            <div className="d-flex">
              <img
                src={imagePath2}
                width="35"
                className="avatar avatar-ex-small rounded"
                alt="Default Co-op Image"
                style={{ marginRight: "15px" }}
              />
              <h5 className="mb-0 mt-1">{commodity?.name}</h5>
            </div>

            <dl className="row">
              <dt className="col-sm-5">Ticker</dt>
              <dd className="col-sm-7 text-end">{commodity?.ticker}</dd>
            </dl>

            <div className="mt-3">
              <NavLink
                to={`/rewards/bounty/campaigns/campaign-detail/${commodity?.id}`}
                className="btn btn-outline-dark col-sm-12"
              >
                Commodity Details
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      <div className="col-xl-8">
        <div className="col-xl-12 mt-4">
          <div className="card rounded shadow border-0 p-4">
            <div className="d-flex justify-content-between mb-4">
              <h5 className="mb-0">Markets</h5>

              <table className="table table-center bg-white mb-0">
                <thead>
                  <tr>
                    <th className="border-bottom p-3">Market</th>
                    <th className="border-bottom p-3">View</th>
                  </tr>
                </thead>
                <tbody>
                  {markets && markets.length > 0 ? (
                    markets?.map((market, index) => (
                      <tr className="even" key={index}>
                        <td>{market.marketLocationId}</td>
                        <td>
                          <Link to={``}>View</Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5}>No Markets Found</td>
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

export default CommoditySummary;
