import { toast } from "react-toastify";

export const formatDate = (timestamp: string | number): string => {
  const date = new Date(Number(timestamp));
  const options: Intl.DateTimeFormatOptions = {
    
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return date.toLocaleDateString("en-UK", options);
};

export const formatNanoDate = (timestamp: string | number): string => {
  const milliseconds = Math.floor(Number(timestamp) / 1_000_000);
  const date = new Date(milliseconds);

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  return date.toLocaleDateString("en-UK", options);
};

export const toastSuccess = (message: string) => {
  toast.success(message, {
    autoClose: 5000,
    position: "top-center",
    hideProgressBar: true,
  });
}

export const toastError = (message: string) => {
  toast.error(message, {
    autoClose: 5000,
    position: "top-center",
    hideProgressBar: true,
  });
}

export const toastWarning = (message: string) => {
  toast.warning(message, {
    autoClose: 5000,
    position: "top-center",
    hideProgressBar: true,
  });
}
