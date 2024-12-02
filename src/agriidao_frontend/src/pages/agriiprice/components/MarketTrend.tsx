export interface DataPoint {
    x: string;
    y: number;
    currency: string;
  }

  
  interface MarketTrend {
    firstPrice: number;
    lastPrice: number;
    trend: boolean; // True for positive trend, false for negative
  }
  
  const determineMarketTrend = (data: DataPoint[]): MarketTrend => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      console.error("Data is empty or undefined.");
      return {
        firstPrice: 0,
        lastPrice: 0,
        trend: false, // Default to "neutral"
      };
    }

    // Sort data by timestamp
  data.sort((a, b) => new Date(a.x).getTime() - new Date(b.x).getTime());

  
    if (data.length === 1) {
      console.warn("Only one data point available.");
      return {
        firstPrice: data[0].y,
        lastPrice: data[0].y,
        trend: false, // Default to "neutral"
      };
    }
  
    const firstPrice = data[0].y;
    const lastPrice = data[data.length - 1].y;
  
    console.log(`Sorted Data:`, data);
    console.log(`First Price: ${firstPrice}, Last Price: ${lastPrice}`);
    return {
      firstPrice,
      lastPrice,
      trend: lastPrice > firstPrice, // True for positive trend, false for negative
    };
  };
  
  export default determineMarketTrend;
  
  