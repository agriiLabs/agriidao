import { FC, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/Context";
import {
  Commodity,
  MarketLocationCommodity,
  MarketPrice,
} from "../../../../../declarations/agriidao_backend/agriidao_backend.did";

type Props = {
  marketPriceSub: MarketPrice;
};

const MarketPriceSubs: FC<Props> = ({ marketPriceSub }) => {
  const { agriidaoActor } = useAuth();
  const [commodity, setCommodity] = useState<Commodity | null>(null);
  const [prices, setPrices] = useState<MarketPrice[]>([]);
  const [mLCommodity, setMLCommodity] =
    useState<MarketLocationCommodity | null>(null);

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

  // useEffect(() => {
  //   priceDifference();
  // });

  // const priceDifference = () => {
  //   const pricesx = prices.filter((price) => price.marketLocationCommodityId === marketPriceSub.marketLocationCommodityId);
  //   console.log("pricesx: ", pricesx);
  //   if (prices.length >= 2) {
  //     const lastPrice = prices[prices.length - 1];
  //     const secondLastPrice = prices[prices.length - 2];
  //     const difference = ((lastPrice.price - secondLastPrice.price) / secondLastPrice.price) * 100;
  //     return difference;
  //   };
  // };
  //   const difference = priceDifference();
  //   console.log("difference: ", difference);

  //   const calculateAllPriceDifferences = () => {
  //     // Group prices by commodity id
  //     const groupedPrices = prices.reduce<Record<string, MarketPrice[]>>((acc, price) => {
  //       if (!acc[price.marketLocationCommodityId]) {
  //         acc[price.marketLocationCommodityId] = [];
  //       }
  //       acc[price.marketLocationCommodityId].push(price);
  //       return acc;
  //     }, {});

  //     // Calculate percentage difference for each commodity
  //     const priceDifferences = Object.keys(groupedPrices).map((marketLocationCommodityId) => {
  //       const productPrices = groupedPrices[marketLocationCommodityId];
  //       // Sort prices by time or sequence if necessary to ensure correct order
  //       productPrices.sort((a, b) => Number(a.timeStamp) - Number(b.timeStamp));

  //       if (productPrices.length >= 2) {
  //         const lastPrice = productPrices[productPrices.length - 1].price;
  //         const secondLastPrice = productPrices[productPrices.length - 2].price;
  //         const difference = ((lastPrice - secondLastPrice) / secondLastPrice) * 100;
  //         return { marketLocationCommodityId, difference: difference.toFixed(2) };  // Save product ID and difference
  //       } else {
  //         return { marketLocationCommodityId, difference: null }; // Not enough data
  //       }

  //     });

  //     console.log("Price differences for each commodity: ", priceDifferences);
  //     return priceDifferences;
  //   };

  //   // Usage
  //   calculateAllPriceDifferences();

  return (
    <tr>
      {commodity ? (
        <Link to={`/market-price/${marketPriceSub?.marketLocationCommodityId}`}>
          <td className="text-left text-dark">{commodity?.name}</td>
        </Link>
      ) : (
        "Loading..."
      )}
      <td className="mb-1" style={{ paddingTop: 0 }}>
        1
      </td>
      <td className="mb-1" style={{ paddingTop: 0 }}>
        {marketPriceSub.pricePerKg
          ? marketPriceSub.pricePerKg.toFixed(2)
          : "N/A"}
      </td>
      {/* <td>{difference}</td> */}
    </tr>
  );
};

export default MarketPriceSubs;
