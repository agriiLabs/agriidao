export const formatDate = (timestamp: string | number): string => {
  const date = new Date(Number(timestamp));
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};
