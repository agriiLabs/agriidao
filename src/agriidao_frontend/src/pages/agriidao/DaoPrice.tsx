import { Link } from "react-router-dom";
import imagePath from "../../assets/images/agriidao-logo.svg";
import imagePath1 from "../../assets/images/dao/price/price-bg.png";
import imagePath2 from "../../assets/images/default-user-profile.png";
import imagePath3 from "../../assets/images/dao/price/agri-pricing.png";
import imagePath4 from "../../assets/images/dao/price/trading-decisions.png";
import imagePath5 from "../../assets/images/dao/price/user-friendly.png";
import ProfileClick from "../profile/component/ProfileClick";

const Price = () => {
  const cardHeightHero = 200;

  return (
    <>
      {/* header */}
      <div className="header header-fixed header-logo-center">
        <a className="header-title">
          <img src={imagePath} width="100" alt="Default Profile" />
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

      {/* body */}
      <div className="page-content header-clear">
        <div
          className="card preload-img"
          style={{
            backgroundImage: `url(${imagePath1})`,
            height: `${cardHeightHero}px`,
          }}
        >
          <div className="card-center content">
            <h1 className="color-white font-900">
              agriiPrice:
              <br />
              Your Source for
              <br />
              Agricultural Market Data
            </h1>
          </div>
        </div>
        <div className="content color-dark mb-4">
          <p>
            <strong className="font-500">agriiPrice </strong>is your go-to
            platform for accessing real-time pricing data on agricultural
            produce across the continent. Stay informed and make better trading
            decisions with our comprehensive market insights.
          </p>
        </div>

        <div>
          <div className="card card-style">
            <img src={imagePath3} alt="img" />
            <div className="content">
              <h2 className="mb-4 color-dark font-500">
                Real-Time Agricultural Pricing
              </h2>
              <p className="mb-4">
                agriiPrice provides up-to-date information on agricultural
                produce prices, helping you understand market trends and make
                informed decisions. Key features include:
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <i
                  className="fa fa-calendar-alt "
                  style={{ color: "#007BFF", marginRight: "10px" }}
                ></i>
                <h5 className="font-500" style={{ margin: 0 }}>
                  Daily Price Updates
                </h5>
              </div>
              <p>Get the latest prices for a variety of crops and produce.</p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <i
                  className="fa fa-map-marker-alt"
                  style={{ color: "#FF5733", marginRight: "10px" }}
                ></i>
                <h5 className="font-500" style={{ margin: 0 }}>
                  Regional Insights
                </h5>
              </div>
              <p>
                Access pricing data tailored to specific regions, ensuring
                relevant information for your trading needs.
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <i
                  className="fa fa-chart-line"
                  style={{ color: "#FF6F61", marginRight: "10px" }}
                ></i>
                <h5 className="font-500" style={{ margin: 0 }}>
                  Historical Data
                </h5>
              </div>
              <p>
                Analyze past pricing trends to better anticipate future market
                movements.
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="card card-style">
            <img src={imagePath4} alt="img" />
            <div className="content">
              <h2 className="mb-4 color-dark font-500">
                Empowering Your Trading Decisions
              </h2>
              <p>
                With agriiPrice, you gain a competitive edge in the agricultural
                market:
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <i
                  className="fa fa-lightbulb "
                  style={{ color: "#FFC107", marginRight: "10px" }}
                ></i>
                <h5 className="font-500" style={{ margin: 0 }}>
                  Informed Decisions
                </h5>
              </div>
              <p>Make trading choices based on accurate, real-time data.</p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <i
                  className="fa fa-eye"
                  style={{ color: "#17A2B8", marginRight: "10px" }}
                ></i>
                <h5 className="font-500" style={{ margin: 0 }}>
                  Market Awareness
                </h5>
              </div>
              <p>
                Stay updated on price fluctuations and trends, helping you
                strategize effectively.
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <i
                  className="fa fa-dollar-sign"
                  style={{ color: "#28A745", marginRight: "10px" }}
                ></i>
                <h5 className="font-500" style={{ margin: 0 }}>
                  Increased Profits
                </h5>
              </div>
              <p>
                By understanding market dynamics, you can maximize your returns
                on investments.
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="card card-style">
            <img src={imagePath5} alt="img" />
            <div className="content">
              <h2 className="mb-4 color-dark font-500">
                Simple and User-Friendly
              </h2>
              <p>Using agriiPrice is straightforward:</p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <i
                  className="fa fa-search "
                  style={{ color: "#6F42C1", marginRight: "10px" }}
                ></i>
                <h5 className="font-500" style={{ margin: 0 }}>
                  Browse
                </h5>
              </div>
              <p>
                Navigate our intuitive interface to find the crops or produce
                you're interested in.
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <i
                  className="fa fa-tag"
                  style={{ color: "#FD7E14", marginRight: "10px" }}
                ></i>
                <h5 className="font-500" style={{ margin: 0 }}>
                  View Prices
                </h5>
              </div>
              <p>
                Access real-time price data along with historical trends for
                informed analysis.
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <i
                  className="fa fa-bell"
                  style={{ color: "#DC3545", marginRight: "10px" }}
                ></i>
                <h5 className="font-500" style={{ margin: 0 }}>
                  Stay Updated
                </h5>
              </div>
              <p>
                Sign up for alerts on price changes and market news to keep you
                ahead of the curve.
              </p>
            </div>
          </div>
        </div>

        <div className="card card-style bg-dark">
          <div className="content mb-0 ">
            <h2 className="color-white mb-3 font-500">
              Get Ready for agriiPrice
            </h2>
            <p className="color-white mb-4">
              Join the community of farmers, traders and stakeholders who will
              rely on agriiPrice for their agricultural market insights. With
              real-time data at your fingertips, you can trade confidently and
              effectively.
            </p>
            <Link
              to={`https://forms.gle/6QwzfvYjTczgDDtXA`}
              className="btn btn-sm rounded-sm text-uppercase font-500 border-white color-white bg-theme mb-4"
            >
              Sign Up for updates
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Price;
