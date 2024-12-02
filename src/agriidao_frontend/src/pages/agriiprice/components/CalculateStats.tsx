interface ChartData {
  x: number | string;
  y: number;
}

const calculateStats = (data: ChartData[]) => {
    if (!data || data.length === 0) {
      console.error("Data is empty or undefined.");
      return {
        highestPrice: null,
        lowestPrice: null,
        percentageChange: null,
        lastUpdated: null,
        timeGapNotice: null,
      };
    }
  
    const prices = data.map((item) => item.y);
    const highestPrice = Math.max(...prices); // All-time highest price
    const lowestPrice = Math.min(...prices); // All-time lowest price
  
    let percentageChange: string | null = null;
    let timeGapNotice: string | null = null;
  
    if (data.length > 1) {
      const lastPrice = data[data.length - 1];
      const secondToLastPrice = data[data.length - 2];
  
      // Calculate time difference in hours
      const timeDiff = Math.abs(
        new Date(lastPrice.x).getTime() - new Date(secondToLastPrice.x).getTime()
      ) / (1000 * 60 * 60); // Convert milliseconds to hours
  
      // Calculate raw percentage change
      const rawChange =
        ((lastPrice.y - secondToLastPrice.y) / secondToLastPrice.y) * 100;
  
      // If time gap exceeds 24 hours and no change
      if (rawChange === 0 && timeDiff > 24) {
        timeGapNotice = "No significant change over the weekend.";
      }
  
      // Format percentage change with +/-
      percentageChange = rawChange > 0
        ? `+${rawChange.toFixed(0)}`
        : rawChange.toFixed(0);
    }
  
    const lastUpdated = data[data.length - 1]?.x || null; // Last updated date
  
    return {
      highestPrice,
      lowestPrice,
      percentageChange,
      lastUpdated: lastUpdated ? new Date(lastUpdated).toLocaleDateString() : null,
      timeGapNotice,
    };
  };
  

export default calculateStats;
