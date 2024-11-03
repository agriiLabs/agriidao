import { Link } from "react-router-dom";
import imagePath from "../../assets/images/agriidao-logo.svg";
import imagePath1 from "../../assets/images/dao/market/market-bg.png";
import imagePath2 from "../../assets/images/default-user-profile.png";
import imagePath3 from "../../assets/images/dao/market/marketplace.png";
import imagePath4 from "../../assets/images/dao/market/rwa-trading.png";
import imagePath5 from "../../assets/images/dao/market/secure-trans.png";
import ProfileClick from "../profile/component/ProfileClick";

const Market = () => {
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
              agriiMarket: <br/>A Marketplace for<br/> Tokenized Agriculture
            </h1>
          </div>
          
        </div>
        <div className="content color-dark mb-4">
          <p>
            <strong className="font-500">agriiMarket </strong>is a decentralized platform that allows investors and stakeholders to 
            <strong className="font-500">
            trade tokenized agricultural products. 
            </strong>
            From freeze-dried crops to other tokenized assets, agriiMarket creates a seamless experience for
            <strong className="font-500">buying, selling, </strong>and <strong className="font-500">trading </strong>in the agricultural economy.
            
          </p>
        </div>

        <div>
          <div className="card card-style">
            <img src={imagePath3} alt="img" />
            <div className="content">
              <h2 className="mb-4 color-dark font-500">
              A Decentralized Marketplace for Real-World Assets

              </h2>
              <p className="mb-4">
              agriiMarket connects buyers and sellers in a 
                <strong className="font-500">blockchain-powered marketplace </strong> where you can:
              </p>
              <ul className="icon-list">
                <li>
                    <i
                    className="fa fa-arrow-right"
                    style={{ color: "#28A745" }}
                    ></i>
                    <strong className="font-500">Trade tokenized agricultural produce </strong>such as freeze-dried crops.
                </li>
                <li>
                    <i
                    className="fa fa-arrow-right"
                    style={{ color: "#28A745"}}
                    ></i>
                    <strong className="font-500">Access real-time data </strong>to make informed decisions on your trades.
                </li>
                <li>
                    <i
                    className="fa fa-arrow-right"
                    style={{ color: "#28A745"}}
                    ></i>
                    <strong className="font-500">Benefit from secure transactions </strong>using blockchain technology, ensuring transparency and trust for all participants.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <div className="card card-style">
            <img src={imagePath4} alt="img" />
            <div className="content">
              <h2 className="mb-4 color-dark font-500">
              Seamless Trading for Tokenized Crops
              </h2>
              <p>
              agriiMarket offers unique advantages for those looking to participate in the agricultural economy:
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <i
                  className="fa fa-water "
                  style={{ color: "#007BFF", marginRight: "10px" }}
                ></i>
                <h5 className="font-500" style={{ margin: 0 }}>Liquidity</h5>
              </div>
              <p>
              Tokenized crops can be traded easily, offering liquidity to both buyers and sellers.
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <i
                  className="fa fa-globe"
                  style={{ color: "#28A745", marginRight: "10px" }}
                ></i>
                <h5 className="font-500" style={{ margin: 0 }}>Global Access</h5>
              </div>
              <p>
              Connect with buyers and sellers from anywhere, expanding market opportunities.

              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <i
                  className="fa fa-hand-holding-heart"
                  style={{ color: "#FF6347", marginRight: "10px" }}
                ></i>
                <h5 className="font-500"  style={{ margin: 0 }}>Real-World Impact</h5>
              </div>
              <p>
             By trading tokenized crops, you're contributing to a sustainable food system while also benefiting from real-world assets.
              </p>

            </div>
          </div>
        </div>

        <div>
          <div className="card card-style">
            <img src={imagePath5} alt="img" />
            <div className="content">
              <h2 className="mb-4 color-dark font-500">
              Secure and Transparent Transactions
              </h2>
              <p>
              agriiMarket ensures that every transaction is:
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <i
                  className="fa fa-eye "
                  style={{ color: "#FFC107", marginRight: "10px" }}
                ></i>
                <h5 className="font-500" style={{ margin: 0 }}>On-Chain and Transparent</h5>
              </div>
              <p>
              All transactions are verifiable, providing complete transparency.
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <i
                  className="fa fa-shield-alt"
                  style={{ color: "#DC3545", marginRight: "10px" }}
                ></i>
                <h5 className="font-500" style={{ margin: 0 }}>Decentralized and Secure</h5>
              </div>
              <p>
              Your data and assets are safeguarded by blockchain technology, ensuring a secure, fully decentralized trading environment.
              </p>

              <p>
              This combination of <strong className="font-500">decentralization, </strong><strong className="font-500">transparency, </strong>and <strong className="font-500">security </strong>makes agriiMarket the perfect platform for trading tokenized real-world agricultural assets.
              </p>
            </div>
          </div>
        </div>

        <div className="card card-style bg-dark">
          <div className="content mb-0 ">
            <h2 className="color-white mb-3 font-500">Stay Tuned for the Launch of agriiMarket
            </h2>
            <p className="color-white mb-4">
            agriiMarket is coming soon! Sign up to stay updated and be the first to access the 
              <strong className="font-500">revolutionary platform </strong>for trading tokenized agricultural products. Get ready to <strong className="font-500">trade, grow, </strong>
              and <strong className="font-500">connect </strong> in the tokenized food economy.
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

export default Market;
