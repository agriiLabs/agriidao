import { useNavigate } from "react-router-dom";

const MarketRedirectButton = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      navigate("/markets");
    } else {
      navigate("/d/markets");
    }
  };

  return (
    <button
      onClick={handleRedirect}
      className="mt-4 text-dark btn bg-white border-dark"
    >
      Check Market Prices
    </button>
  );
};

export default MarketRedirectButton;
