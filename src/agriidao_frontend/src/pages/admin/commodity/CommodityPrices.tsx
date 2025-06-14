import { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/Context";
import { Commodity, MarketLocation, MarketLocationCommodity, MarketPrice } from "../../../../../declarations/agriidao_backend/agriidao_backend.did";

function CommodityPrices() {
  const { agriidaoActor } = useAuth();
  const { id } = useParams();
  const [mLCommodity, setMLCommodity] = useState<MarketLocationCommodity | null>(null);
  const [commoditySubs, setCommoditySubs] = useState<MarketLocationCommodity | null>(null);
  const [prices, setPrices] = useState<MarketPrice[] | null>(null);
  const [market, setMarket] = useState<MarketLocation | null>(null);
    const [commodity, setCommodity] = useState<Commodity | null>(null);


  useEffect(() => {
    getMLCommodity();
  }, [id]);

  const getMLCommodity = async () => {
    if (!id || !agriidaoActor) {
      console.error("ID or agriidaoActor is null");
      return;
    }

    const res = await agriidaoActor.getMarketLocationCommodityById(id);
    if ("ok" in res) {
      setMLCommodity(res.ok);
      setCommoditySubs(res.ok);
    } else {
      console.error(res.err);
    }
  };

  useEffect(() => {
    getCommodity();
    }, [mLCommodity]);

    const getCommodity = async () => {
        if (!mLCommodity || !agriidaoActor) {
            console.error("mlCommodity or agriidaoActor not found");
            return;
        }
        const res = await agriidaoActor.getCommodityLatest(mLCommodity.commodityId);
        console.log("commodity", res);
        if ("ok" in res) {
            setCommodity(res.ok);
        }
        else {
            console.error(res.err);
        }
    };

  useEffect(() => {
    getMarketLocation();
    }, [mLCommodity]);

    const getMarketLocation = async () => {
    if (!mLCommodity || !agriidaoActor) {
        console.error("mlCommodity or agriidaoActor not found");
        return;
    }
    const res = await agriidaoActor.getMarketLocationLatest(mLCommodity.marketLocationId);
    console.log("market location", res);
    if ("ok" in res) {
        setMarket(res.ok);
    }
    else {
        console.error(res.err);
    }
};


  useEffect(() => {
    getPrices();
  }, [mLCommodity]);

  const getPrices = async () => {
    if (!mLCommodity || !agriidaoActor) {
      console.error("mlCommodity or agriidaoActor not found");
      return;
    }
    const res = await agriidaoActor.getMarketPriceByMarketCommodityId(
      mLCommodity.id
    );
    setPrices(res);
    
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
              <div>
                <h5 className="mb-0">Commodity Price</h5>
              </div>
            </div>

            <div className="row">
        <div className="col-xl-12 mt-4">
          <div className="card rounded shadow border-0 p-4">
            <div className="mt-4">
            <h4 className="text-uppercase">{commodity?.name}</h4>
              <br />
              <dl className="row">
                  <dt className="col-sm-5">Market</dt>
                  <dd className="col-sm-7">{market?.name}</dd>
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
              <h5 className="mb-3 bg-light p-2 row">
                 Daily Market Prices
              </h5>

                <table className="table table-center bg-white mb-0">
                  <thead>
                    <tr>
                      <th className="border-bottom p-3">
                        Price Per KG
                      </th>
                      <th className="border-bottom p-3">
                        Date
                      </th>
                      <th className="border-bottom p-3">View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prices && prices.length > 0 ? (
                      prices?.map((price, index) => (
                        <tr className="even" key={index}>
                          <td>{price.pricePerKg}</td>
                          {/* <td>{price.unit}</td> */}
                          <td>{price.timeStamp}</td>
                          <td>
                            <Link to={`/market-summary/${price.id}`}>View</Link>
                          </td>
                        </tr>
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
}

export default CommodityPrices;
