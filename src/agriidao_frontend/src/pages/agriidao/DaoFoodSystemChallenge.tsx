import { Link } from "react-router-dom";
import imagePath from "../../assets/images/agriidao-logo.svg";
import imagePath1 from "../../assets/images/bg6.png";
import imagePath2 from "../../assets/images/default-user-profile.png";
import imagePath3 from "../../assets/images/funding-gap.png"
import imagePath4 from "../../assets/images/post-harvest-loss.png";
import imagePath5 from "../../assets/images/nutrient-decline.png";
import ProfileClick from "../profile/component/ProfileClick";

const FoodSystemChallenge = () => {
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
          className="card bg-29"
          style={{
            backgroundImage: `url(${imagePath1})`,
            height: `${cardHeightHero}px`,
          }}
        >
          <div className="card-bottom mx-3 mb-5 pb-3">
            <h1 className="color-white mb-2 font-900">
              Why the African Food
              <br />
              System Needs Transformation.
            </h1>
          </div>
          <div className="card-overlay bg-black opacity-20"></div>
          <div className="card-overlay bg-gradient py-5"></div>
        </div>

        <div className="content color-dark mb-4">
          <p>
            The African food system presents a significant investment
            opportunity, but critical challenges must be addressed to unlock its
            full potential. Here’s why transformation is essential and where the
            investment opportunities lie.
          </p>
        </div>

        <div>
          <div className="card card-style">
            <img src={imagePath3} alt="img" />
            <div className="content">
              <h2 className="font-500">1. Funding Gap</h2>
              <p className="mb-3">
                The African agricultural sector faces a{" "}
                <strong className="font-500">$65 billion annual funding gap, </strong>limiting growth
                and innovation:
              </p>
              <div>
                <ul className="icon-list">
                  <li>
                    <i className="fa fa-square"></i>
                    <strong className="font-500">Unlock Productivity:</strong> Agribusinesses need
                    capital to scale and tap into new local and international
                    markets.
                  </li>
                  <li>
                    <i className="fa fa-square"></i>
                    <strong className="font-500">Expand Markets:</strong> Lack of funding hinders the
                    adoption of modern techniques, keeping agriculture outdated.
                  </li>
                </ul>
              </div>
              <p className="mb-2">
                <strong className="font-500">Investing to close this gap </strong>provides access to
                a fast-growing sector with substantial room for expansion.
              </p>
            </div>
          </div>
        </div>

        <div className="content">
          <div
            className="card card-style"
            style={{
              marginLeft: 0,
              marginRight: 0,
            }}
          >
            <img src={imagePath4} alt="img" />
            <div className="content">
              <h2 className="font-500">2. Post-Harvest Food Loss</h2>
              <p className="mb-3">
                Currently, <strong className="font-500">40% of food </strong>produced in sub-Saharan
                Africa is lost after harvest due to poor infrastructure and
                inefficient processes:
              </p>
              <div>
                <ul className="icon-list">
                  <li>
                    <i className="fa fa-square"></i>
                    <strong className="font-500">Efficiency Gains:</strong> Investing in advanced
                    storage and preservation technologies can drastically reduce
                    food loss.
                  </li>
                  <li>
                    <i className="fa fa-square"></i>
                    <strong className="font-500">Market Growth:</strong> Reducing waste directly
                    increases food availability, driving up supply chain
                    profitability.
                  </li>
                </ul>
              </div>
              <p className="mb-2">
                By reducing post-harvest losses,{" "}
                <strong className="font-500">investors can unlock higher returns </strong>and
                contribute to solving food insecurity.
              </p>
            </div>
          </div>
        </div>

        <div className="content">
          <div
            className="card card-style"
            style={{
              marginLeft: 0,
              marginRight: 0,
            }}
          >
            <img src={imagePath5} alt="img" />
            <div className="content">
              <h2 className="font-500">3. Nutrient Decline</h2>
              <p className="mb-3">
                Up to <strong className="font-500">97% of nutrients </strong>are lost through
                conventional preservation, reducing the market value of produce:
              </p>
              <div>
                <ul className="icon-list">
                  <li>
                    <i className="fa fa-square"></i>
                    <strong className="font-500">Enhanced Product Value: </strong> Investments in
                    freeze-drying and nutrient preservation technology can
                    significantly improve food quality.
                  </li>
                  <li>
                    <i className="fa fa-square"></i>
                    <strong className="font-500">Lucrative Markets: </strong>High-quality,
                    nutrient-rich foods command premium prices in global
                    markets, especially in the health and wellness sectors.
                  </li>
                </ul>
              </div>
              <p className="mb-2">
                Investing in technologies that{" "}
                <strong className="font-500">preserve nutrients </strong>can open doors to premium
                export markets and increase returns.
              </p>
            </div>
          </div>
        </div>

        <div className="card card-style bg-dark">
          <div className="content mb-0 ">
            <h2 className="color-white mb-3 font-500">
              Unlock the Opportunity in African Agriculture
            </h2>
            <p className="color-white mb-4">
              The transformation of the African food system is not just
              essential—it’s an investment opportunity with enormous potential
              for growth. By addressing these challenges, investors can drive
              profitability while making a meaningful impact.
            </p>
            <Link 
              to={`/how-it-works`}
              className="btn btn-sm rounded-sm text-uppercase font-500 border-white color-white bg-theme mb-4"
            >
              Learn More About How it Works
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodSystemChallenge;
