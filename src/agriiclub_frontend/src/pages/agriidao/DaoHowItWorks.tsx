import { Link } from "react-router-dom";
import imagePath from "../../assets/images/agriidao-logo.svg";
import imagePath1 from "../../assets/images/how-agriidao-works-bg.png";
import imagePath2 from "../../assets/images/default-user-profile.png";

const HowItWorks = () => {
  const cardHeight = 100;
  const cardHeightHero = 250;
  const cardHeightStats = 90;

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

        {/* <Link to={"/profile/profile"} className="header-icon header-icon-4">
          <div>
            <img
              className="rounded-xl me-3"
              src={imagePath2}
              data-src={"#"}
              width="25"
              height="25"
              alt={"Default user profile pic"}
            />
          </div>
        </Link> */}
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
            <h1 className="color-white font-900">How agriiDAO Works</h1>
            <h4 className="color-white opacity-90 mb-0">
              From Crops to Tokenized Real-World Assets
            </h4>
          </div>
          <div className="card-overlay bg-black opacity-20"></div>
          <div className="card-overlay bg-gradient py-5"></div>
        </div>
        <div className="content color-dark mb-4">
          <p>
            At agriiDAO, we transform agricultural produce into valuable,
            tokenized assets through a streamlined process that ensures nutrient
            preservation, reduced waste, and financial accessibility.
          </p>
        </div>
        <div
          className="timeline-body timeline-body-center"
          style={{ marginTop: "0" }}
        >
          <div className="timeline-deco"></div>
          <div className="timeline-item">
            <i className="fa fa-seedling bg-yellow-dark shadow-l timeline-icon"></i>
            <div className="timeline-item-content rounded-s shadow-l">
              <h5 className="font-500 ">
                1. Crop Preservation through Freeze-Drying
              </h5>
              <p>
                Our process begins by freeze-drying produce to retain up to 97%
                of nutrients, ensuring high-quality, long-lasting food that can
                reach more communities and markets efficiently.
              </p>
            </div>
          </div>
          <div className="timeline-item">
            <i className="fa fa-coins bg-yellow-dark shadow-l timeline-icon"></i>
            <div className="timeline-item-content rounded-s shadow-l">
              <h5 className="font-500 ">
                2. Tokenization: Creating Digital Assets
              </h5>
              <p>
                After freeze-drying, the produce is tokenized, turning it into
                real-world assets (RWAs) backed by blockchain technology. These
                digital tokens represent physical produce, creating
                opportunities for global trading, storage, and investment.
              </p>
            </div>
          </div>
          <div className="timeline-item">
            <i className="fa fa-exchange-alt bg-yellow-dark shadow-l timeline-icon"></i>
            <div className="timeline-item-content rounded-s shadow-l">
              <h5 className="font-500 ">3. Flexible Use of Tokenized Assets</h5>
              <p>
                Token holders have various options:
                <ul className="icon-list">
                  <li>
                    <i className="fa fa-square"></i>
                    <strong className="font-500">Trade on agriiMarket </strong> for liquidity.
                  </li>
                  <li>
                    <i className="fa fa-square"></i>
                    <strong className="font-500">Store within agriiClub </strong> to preserve value.
                  </li>
                  <li>
                    <i className="fa fa-square"></i>
                    <strong className="font-500">Receive physical delivery </strong> of the produce.
                  </li>
                  <li>
                    <i className="fa fa-square"></i>
                    <strong className="font-500">Donate </strong> to support community nutrition
                    efforts.
                  </li>
                </ul>
              </p>
            </div>
          </div>
        </div>
        <div className="card card-style bg-dark">
          <div className="content mb-0 ">
            <h2 className="color-white mb-3 font-500">Explore the Ecosystem</h2>
            <p className="color-white mb-4">
              Want to see how all components interact to create a sustainable
              and transparent food system?
            </p>
            <Link 
              to={`/ecosystem`}
              className="btn btn-sm rounded-sm text-uppercase font-500 border-white color-white bg-theme mb-3"
            >
              Explore our ecosystem
            </Link>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
