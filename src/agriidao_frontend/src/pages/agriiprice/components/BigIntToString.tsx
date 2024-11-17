const transformBigIntToString = (data: any): any => {
  if (data === null || data === undefined) return data;

  if (typeof data === "bigint") {
    // console.log("Transforming BigInt:", data);
    return data.toString(); // Convert BigInt to string
  }

  if (Array.isArray(data)) {
    return data.map(transformBigIntToString); 
  }

  if (typeof data === "object") {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        transformBigIntToString(value),
      ])
    ); 
  }

  return data; 
};

export default transformBigIntToString;
