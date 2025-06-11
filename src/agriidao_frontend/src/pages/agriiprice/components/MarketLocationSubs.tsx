import { FC, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/Context";
import {
  MarketLocation,
  MarketLocationAgent,
} from "../../../../../declarations/commodity/commodity.did";

type Props = {
  marketSub: MarketLocationAgent;
};

const MarketLocationSubs: FC<Props> = ({ marketSub }) => {
  const { agriidaoActor } = useAuth();
  const { id } = useParams();
  const [market, setMarket] = useState<MarketLocation | null>(null);
  

  useEffect(() => {
    if (marketSub) {
      getMarket();
    }
  }, [marketSub]);

  const getMarket = async () => {
    console.log("marketSub: ", marketSub);
    if (!marketSub || !agriidaoActor) {
      console.error("market request not found");
      return;
    }
    try {
      const res = await agriidaoActor.getMarketLocationLatest(
        marketSub.marketLocationId
      );
      console.log("market res: ", res);
      if ("ok" in res) {
        setMarket(res.ok);
      } else {
        console.error(res.err);
      }
    } catch (error) {
      console.error("Error fetching market: ", error);
    }
  };

  return (
    <Link
      to={`/commodity-list/${marketSub?.marketLocationId}`}
      className="d-flex mb-3"
    >
      <div className="align-self-center ">
        <p className="font-16">{market?.name}</p>
      </div>

      <i className="fa fa-angle-right ms-auto text-end text-dark mt-2" />
    </Link>
  );
};

export default MarketLocationSubs;
