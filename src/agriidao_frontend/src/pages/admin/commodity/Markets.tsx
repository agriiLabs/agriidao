import React, { useEffect, useState } from "react";
import AddMarketLocation from "./components/AddMarketLocation";
import { Link, NavLink, useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/Context";
import { MarketLocation } from "../../../../../declarations/commodity/commodity.did";
import CountryName from "../../../components/agriidao/CountryName";

const Markets = () => {
  const { commodityActor } = useAuth(); //get agriichainBackend from the global context
  const { id } = useParams(); //how to access the url parameter i.e id
  const [markets, setMarkets] = useState<MarketLocation[]>([]); //state for holding the data of types
  const [openForm, setOpenForm] = useState(false);
  const [marketSaved, setMarketSaved] = useState(false);

  // get latest markets
  useEffect(() => {
    getAllLatestMarkets();
  });

  useEffect(() => {
    if (marketSaved) {
      getAllLatestMarkets();
    }
  }, [marketSaved]);

  // get markets
  const getAllLatestMarkets = async () => {
    let res = await commodityActor?.getAllMarketLocationsLatest();
    if (res) {
      setMarkets(res);
    }
  };

  return (
    <>
      {/* {openForm && (
        <AddMarketLocation {...{ setOpenForm, setMarketSaved }} />
      )} */}
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h5 className="mb-0">Markets</h5>
        </div>

        <div className="mb-0 position-relative">
          <NavLink
            to={`/d/start-coop/`}
            className="btn btn-outline-dark col-sm-12"
          >
            Add Market
          </NavLink>
        </div>
      </div>

      <div className="col-xl-12 mt-4">
        <div className="card border-0">
          <div
            className="table table-center bg-white mb-0"
            data-simplebar
            style={{ height: "545px" }}
          >
            <table className="table">
              <thead>
                <tr>
                  <th className="border-bottom p-3" style={{ width: "150px" }}>
                    Market Name
                  </th>
                  <th className="border-bottom p-3" style={{ width: "150px" }}>
                    Country
                  </th>
                  <th className="border-bottom p-3" style={{ width: "150px" }}>
                    View
                  </th>
                </tr>
              </thead>
              <tbody>
                {markets && markets.length > 0 ? (
                  markets.map((market, index) => (
                    <tr className="even" key={index}>
                      <td className="p-3">
                      <span className="ms-2">{market.name}</span>
                      </td>
                      <td className="p-3">
                        <CountryName id={market.countryId} />
                      </td>

                      <td className="p-3">
                        <Link to={`/market-summary/${market.id}`}>View</Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center">
                      No markets available
                    </td>
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

export default Markets;
