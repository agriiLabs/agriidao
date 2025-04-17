import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/Context";
import { useParams } from "react-router-dom";

import {
  MarketLocation,
  MarketLocationCommodity,
  MarketPrice,
  Commodity,
} from "../../../../declarations/commodity/commodity.did";
import ProfileClick from "../profile/component/ProfileClick";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";
import ReactApexChart from "react-apexcharts";
import determineMarketTrend, { DataPoint } from "./components/MarketTrend";
import { ApexOptions } from "apexcharts";
import calculateStats from "./components/CalculateStats";

type ApexSeries = {
  name: string;
  data: { x: string | number; y: number }[];
}[];

interface ChartData {
  x: string; // ISO date
  y: number; // Price
  currency: string; // Currency
}

interface FirstPrice {
  currency: string;
  value: number;
}

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

const CommodityDetail = ({ data }: { data: DataPoint[] }) => {
  const { commodityActor } = useAuth();
  const { id } = useParams();
  const [chartData, setChartData] = useState<ApexSeries | null>(null);
  const [options, setOptions] = useState<ApexOptions | null>(null);
  const [mLCommodity, setMLCommodity] = useState<MarketLocationCommodity[]>([]);
  const [commodity, setCommodity] = useState<Commodity | null>(null);
  const [prices, setPrices] = useState<MarketPrice[]>([]);
  const formatNanoDate = (nano: number): number => Math.floor(nano / 1e6);
  const [firstPrice, setFirstPrice] = useState<FirstPrice | null>(null);
  const [isPositive, setIsPositive] = useState<boolean>(false);
  const [highestPrice, setHighestPrice] = useState<number | null>(null);
  const [lowestPrice, setLowestPrice] = useState<number | null>(null);
  const [percentageChange, setPercentageChange] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const timeGapNotice = ""; // Define the variable with an appropriate initial value

  useEffect(() => {
    getCommodityPrices();
  }, [commodityActor]);

  useEffect(() => {
    getMLCommodity();
  }, [prices]);

  const getMLCommodity = async () => {
    if (!id || !commodityActor) {
      console.error("ID or commodityActor is null");
      return;
    }

    const res = await commodityActor.getMarketLocationCommodityById(id);

    if ("ok" in res) {
      setMLCommodity([res.ok]);
    } else if ("err" in res) {
      console.error("Failed to fetch MarketLocationCommodity:", res.err);
    } else {
      console.error("Unexpected response structure");
    }
  };

  useEffect(() => {
    getCommodity();
  }, [mLCommodity]);

  const getCommodity = async () => {
    if (!mLCommodity || !commodityActor) {
      console.error("MarketLocationCommodity is null or empty");
      return;
    }
    const res = await commodityActor.getCommodityLatest(
      mLCommodity[0].commodityId
    );
    if ("ok" in res) {
      setCommodity(res.ok);
    } else if ("err" in res) {
      console.error("Failed to fetch Commodity:", res.err);
    } else {
      console.error("Unexpected response structure");
    }
  };

  const getCommodityPrices = async () => {
    if (!id || !commodityActor) {
      console.error("ID or commodityActor is null");
      return;
    }

    const res = await commodityActor.getMarketPriceByMarketCommodityId(id);
    setPrices(res);

    const data: ChartData[] = res.map((item) => ({
      x: new Date(formatNanoDate(Number(item.timeStamp))).toISOString(), // Convert to milliseconds
      y: item.pricePerKg,
      currency: item.currency,
    }));

    if (data.length > 0) {
      setFirstPrice({ currency: data[0].currency, value: data[0].y });
      const { trend } = determineMarketTrend(data || []);
      setIsPositive(trend);

      const { highestPrice, lowestPrice, percentageChange, lastUpdated } = calculateStats(data);
      setHighestPrice(highestPrice);
      setLowestPrice(lowestPrice);
      setPercentageChange(percentageChange !== null ? percentageChange : "0");

      setLastUpdated(lastUpdated ? lastUpdated.toString() : null);
    
      const lineColor = trend ? "#00E396" : "#FF4560"; 
      setOptions({
        chart: {
          type: "line",
          zoom: { enabled: false },
          toolbar: { show: false },
        },
        stroke: {
          curve: "smooth",
          width: 1,
        },
        xaxis: {
          type: "datetime",
        },
        yaxis: {
          axisBorder: { show: false },
          axisTicks: { show: false },
          labels: { show: true },
        },
        dataLabels: {
          enabled: false,
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.9,
            opacityTo: 0,
            stops: [0, 90, 100],
          },
        },
        colors: [lineColor],
      });
    }

    setChartData([
      {
        name: "Price",
        data,
      },
    ]);
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
        <div className="card ">
          <div className="content">
            <div>
              <p className="text-center font-900">
                {commodity ? commodity.name : "Loading..."}
              </p>
              {chartData && options ? (
                <ReactApexChart
                  options={options}
                  series={chartData}
                  type="area"
                  height={200}
                />
              ) : (
                <p>Loading chart...</p>
              )}
            </div>
          </div>
        </div>
        <div className="card card-style">
          <div className="content mb-0">
            <div className="row mb-0">
              <div className="col-6">
                <p className="font-15 mb-3">Todays Price</p>
              </div>
              <div className="col-6">
                <p className="font-15 text-end mb-3">
                  {firstPrice ? firstPrice.value : "N/A"}
                </p>
              </div>
              <div className="divider mb-3" />
            </div>
            <div className="row mb-0">
              <div className="col-6">
                <p className="font-15 mb-3">Currency</p>
              </div>
              <div className="col-6">
                <p className="font-15 text-end mb-3">
                  {firstPrice ? firstPrice.currency : "N/A"}
                </p>
              </div>
              <div className="divider mb-3" />
            </div>
            <div className="row mb-0">
              <div className="col-6">
                <p className="font-15 mb-3">All Time High</p>
              </div>
              <div className="col-6">
                <p className="font-15 text-end mb-3">
                  {highestPrice ? highestPrice : "N/A"}
                </p>
              </div>
              <div className="divider mb-3" />
            </div>
            <div className="row mb-0">
              <div className="col-6">
                <p className="font-15 mb-3">All Time Low</p>
              </div>
              <div className="col-6">
                <p className="font-15 text-end mb-3">
                  {lowestPrice ? lowestPrice : "N/A"}
                </p>
              </div>
              <div className="divider mb-3" />
            </div>
            <div className="row mb-0">
              <div className="col-6">
                <p className="font-15 mb-3">24H +/-</p>
              </div>
              <div className="col-6">
                <p className="font-15 text-end mb-3">
                  {percentageChange !== null
                    ? `${percentageChange}%`
                    : "Loading..."}
                </p>
                {timeGapNotice && <p>{timeGapNotice}</p>}
              </div>
              <div className="divider mb-3" />
            </div>
            <div className="row mb-0">
              <div className="col-6">
                <p className="font-15 mb-3">Last Updated</p>
              </div>
              <div className="col-6">
                <p className="font-15 text-end mb-3">
                  {lastUpdated ? lastUpdated : "Loading..."}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <p>These are benchmark prices and may vary</p>
        </div>
      </div>
    </>
  );
};

export default CommodityDetail;
