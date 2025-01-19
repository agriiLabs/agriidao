import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faFire, faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

interface TransactionIconProps {
  txType: string;
}

const TransactionIcon: React.FC<TransactionIconProps> = ({ txType }) => {
  const icon =
    txType.toLowerCase() === "mint"
      ? faPlusCircle 
      : txType.toLowerCase() === "burn"
      ? faFire 
      : txType.toLowerCase() === "deposit"
      ? faArrowUp 
      : faArrowDown; 

  // Determine color based on transaction type
  const color =
    txType.toLowerCase() === "mint"
      ? "#ffc107" 
      : txType.toLowerCase() === "burn"
      ? "#fd7e14" 
      : txType.toLowerCase() === "deposit"
      ? "#28a745" 
      : "#007bff"; 

  return (
    <FontAwesomeIcon
      icon={icon}
      style={{ color, fontSize: "25px", marginRight: "15px" }}
    />
  );
};

export default TransactionIcon;
