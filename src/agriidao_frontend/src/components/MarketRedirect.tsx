import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MarketRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = window.location.pathname;
  
    if (currentPath === "/markets" || currentPath === "/d/markets") {
      return;
    }
  
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
  
    const loadMobileStyle = async () => {
      if (isMobile) {
        await import("../assets/styles/style.css");
      }
    };
  
    loadMobileStyle();
  
    if (currentPath === "/market-entry") {
      const destination = isMobile ? "/markets" : "/d/markets";
      navigate(destination, { replace: true });
    }
  }, [navigate]);
  

  return null; 
};

export default MarketRedirect;
