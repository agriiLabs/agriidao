import { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/Context";
import { Country } from "../../../../../declarations/settings/settings.did";
import CountryName from "../../../components/agriidao/CountryName";
import {
  MarketLocationAgent,
  MarketLocation,
} from "../../../../../declarations/commodity/commodity.did";
import { setCountry } from "../../../redux/slices/app";
import UserSubs from "./components/UserSubs";
import AddMarketAgent from "./components/AddMarketAgent";

const MarketAgents = () => {
  const { agriidaoActor, userActor } = useAuth();
  const { id } = useParams();
  const [market, setMarket] = useState<MarketLocation | null>(null);
  const [userSubs, setUserSubs] = useState<MarketLocationAgent[]>([]);

  const [agents, setAgents] = useState<MarketLocationAgent[] | null>(null);
  const [openForm, setOpenForm] = useState(false);
  const [agentSaved, setAgentSaved] = useState(false);

  useEffect(() => {
    getAllUserSubs();
  }, [userActor]);

  const getAllUserSubs = async () => {
    if (!agriidaoActor || !id) {
      console.error("agriidaoActor or id is null");
      return;
    }

    const res = await agriidaoActor.getAllMarketLocationAgentsByMarketId(id);
    setUserSubs(res);
  };

  useEffect(() => {
    getMarketLatest();
    getMarketAgents();
  }, []);

  // get market by id
  const getMarketLatest = async () => {
    if (!id) {
      console.error("Market ID is undefined");
      return;
    }
    const res = await agriidaoActor?.getMarketLocationLatest(id);
    if (res && "ok" in res) {
      setMarket(res.ok);
    } else if (res) {
      console.error(res.err);
    }
  };

  // get market locations by commodity id
  const getMarketAgents = async () => {
    if (!id) {
      console.error("Market ID is undefined");
      return;
    }
    const res = await agriidaoActor?.getAllMarketLocationAgentsByMarketId(id);
    setAgents(res || null);
  };

  return (
    <>
      {/* {openForm && (
        <AddMarketAgent {...{ setOpenForm, setAgentSaved, market }} />
      )} */}
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h5 className="mb-0">Market Agents</h5>
        </div>

        <div className="mb-0 position-relative">
          <NavLink
            to={`/d/start-coop/`}
            className="btn btn-outline-dark col-sm-12"
          >
            Add Agent
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
                <dd className="col-sm-6 text-end">
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
              <h5 className="mb-0">Agents</h5>
            </div>

            <table className="table table-center bg-white mb-0">
              <thead>
                <tr>
                  <th className="border-bottom p-3">Agent</th>
                  <th className="border-bottom p-3">View</th>
                </tr>
              </thead>
              <tbody>
                {agents && agents.length > 0 ? (
                  agents?.map((user, index) => (
                    <UserSubs key={index} userSub={user} />
                  ))
                ) : (
                  <tr>
                    <td colSpan={5}>No Agents Found</td>
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

export default MarketAgents;
