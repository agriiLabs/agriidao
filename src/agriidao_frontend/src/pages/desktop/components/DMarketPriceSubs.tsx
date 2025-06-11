import { FC, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/Context";
import {
  Commodity,
  MarketLocationCommodity,
  MarketPrice,
} from "../../../../../declarations/commodity/commodity.did";
import { formatDate } from "../../../utils/Utils";

type Props = {
  marketPriceSub: MarketPrice;
};

const MarketPriceSubs: FC<Props> = ({ marketPriceSub }) => {
  const { agriidaoActor } = useAuth();
  const [commodity, setCommodity] = useState<Commodity | null>(null);
  const [prices, setPrices] = useState<MarketPrice[]>([]);
  const [mLCommodity, setMLCommodity] =
    useState<MarketLocationCommodity | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    if (marketPriceSub) {
      getMLCommodity();
    }
  }, [marketPriceSub]);

  const getMLCommodity = async () => {
    if (!marketPriceSub || !agriidaoActor) {
      console.error("marketPriceSub not found");
      return;
    }
    const res = await agriidaoActor.getMarketLocationCommodityById(
      marketPriceSub.marketLocationCommodityId
    );
    if ("ok" in res) {
      setMLCommodity(res.ok);
    } else {
      console.error(res.err);
    }
  };

  useEffect(() => {
    getCommodity();
  }, [mLCommodity]);

  const getCommodity = async () => {
    if (!mLCommodity || !agriidaoActor) {
      console.error("commodity request not found");
      return;
    }
    try {
      const res = await agriidaoActor.getCommodityLatest(
        mLCommodity.commodityId
      );
      if ("ok" in res) {
        setCommodity(res.ok);
      } else {
        console.error(res.err);
      }
    } catch (error) {
      console.error("Error fetching commodity: ", error);
    }
  };

  useEffect(() => {
    setLastUpdated(formatDate(Number(marketPriceSub.timeStamp)));
  }, [marketPriceSub]);

  return (
    <tr>
      <td className="p-3">
        <span className="ms-2">{commodity?.name}</span>
      </td>
      <td className="text-center p-3">1</td>
      <td className="text-center p-3">
        {marketPriceSub.pricePerKg ? marketPriceSub.pricePerKg.toFixed(2) : "-"}
      </td>
      <td className="text-center p-3">{marketPriceSub?.currency}</td>
      <td className="text-center p-3">{lastUpdated}</td>
    </tr>
  );
};

export default MarketPriceSubs;
