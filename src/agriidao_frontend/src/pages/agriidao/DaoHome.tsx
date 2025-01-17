import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import imagePath from "../../assets/images/agriidao-logo.svg";
import imagePath1 from "../../assets/images/bg0.png";
import imagePath3 from "../../assets/images/rewards-home.png";
import imagePath4 from "../../assets/images/markets-home.png";
import imagePath5 from "../../assets/images/bg5.png";
import imagePath6 from "../../assets/images/agriidao-app.png";
import imagePath7 from "../../assets/images/icp-logo.png";
import { User } from "../../../../declarations/user/user.did";
import ProfileClick from "../profile/component/ProfileClick";

// Extend the User type to include isLoggedIn property
interface ExtendedUser extends User {
  isLoggedIn: boolean;
}

const LandingPage = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Detect if the user is on a desktop device
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /android|iphone|ipad|mobile|ipod/.test(userAgent);
    setIsDesktop(!isMobile);

    // Dynamically load the corresponding CSS file
    if (!isMobile) {
      import("../../assets/landing/styles/style.min.css").then(() => {
        console.log("Desktop CSS loaded");
      });
    } else {
      import("../../assets/styles/style.css").then(() => {
        console.log("Mobile CSS loaded");
      });
    }
  }, []);

  return <div>{isDesktop ? <DesktopLandingPage /> : <Home />}</div>;
};

// Desktop-specific landing page component
const DesktopLandingPage = () => {
  const cardHeightHero = 650;
  const qrHeight = 100;
  const appHeight = 600;

  return (
    <div>
      <section className="bg-half  d-table w-100 overflow-hidden">
        <div className="container position-relative">
          <div className="row align-items-center">
            <div className="col-lg-7 col-md-7">
              <div className="title-heading">
                <h1 className="heading fw-bold mb-3">
                  Digitizing Food Systems <br /> for Global Impact.
                </h1>
                <p className="para-desc text-muted">
                  Join the movement to transform agriculture into a sustainable,<br/>
                  zero-waste future powered by innovation and collaboration.
                </p>
                <div className="mt-4">
                  <QRCode
                    className="mb-1"
                    style={{ height: `${qrHeight}px` }}
                    value="https://agriidao.org"
                  />
                  <p className="para-desc text-muted mt-4">
                    Scan the QR code to access the agriiDAO ecosystem.
                    <br />
                    Alternatively visit <strong>agriidao.org</strong> from your
                    smartphone.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-5 col-md-5 mt-4 pt-2 mt-sm-0 pt-sm-0">
              <div className="modern-app-bg-shape position-relative">
                <img
                  src={imagePath6}
                  className="img-fluid mover mx-auto d-block"
                  alt=""
                  style={{
                    height: `${appHeight}px`,
                  }}
                />

                <div className="modern-app-absolute-left">
                  <div className="card">
                    <div className="features  d-flex justify-content-between align-items-center rounded shadow p-3">
                      <div className="d-flex align-items-center">
                        <div className="icon  text-center ">
                        <img
                          src={imagePath7}
                          className="avatar avatar-small avatar-ex-sm"
                          alt=""
                        />
                        </div>
                        <div className="flex-1 ms-3">
                          <h6 className="mb-0 text-muted">Powered by agriiProtocol on</h6>
                          <p className="fs-5 text-dark  mb-0">
                            The World Computer 
                            
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modern-app-absolute-right">
                  <div className="card rounded shadow">
                    <div className="p-3">
                      <div className="d-flex align-items-center">
                        
                        <div className="flex-1 ms-2">
                          <h6 className="text-dark mb-0">9000+ fresh produce prices</h6>
                          <p className="text-muted small mb-0">agriiPrice</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                
              </div>
            </div>
          </div>
        </div>
        
      </section>
    </div>
  );
};

const Home = () => {
  const cardHeightHero = 250;

  return (
    <>
      {/* header */}
      <div className="header header-fixed header-logo-center">
        <a className="header-title">
          <img src={imagePath} width="100" alt="Default Profile" />
        </a>
        <ProfileClick />
      </div>

      {/* body */}
      <div className="page-content header-clear">
        <div
          className="card"
          style={{
            backgroundImage: `url(${imagePath1})`,
            height: `${cardHeightHero}px`,
          }}
        >
          <div className="card-bottom mx-3 mb-5 pb-3">
            <h1 className="color-white mb-2 font-900">
              Because Food
              <br />
              Is Not A Weapon.
            </h1>
            
          </div>
          <div className="card-overlay bg-black opacity-20"></div>
          <div className="card-overlay bg-gradient py-5"></div>
        </div>

        <div className="content color-dark mb-4">
          <p>
            agriiDAO is revolutionizing the African food system by creating a
            zero-waste, nutrient-preserving supply chain. Through freeze-drying
            technology and blockchain tokenization, we are transforming
            agricultural produce into valuable real-world assets (RWAs),
            unlocking financial opportunities in the decentralized economy.
          </p>
          <Link
            to={`/how-it-works`}
            className="btn btn-sm rounded-sm text-uppercase font-500 border-dark color-dark bg-theme bg-theme"
          >
            Find Out More
          </Link>
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
              <h2 className="font-500">agriiPrice: Daily Market Insights</h2>
              <p className="mb-2">
                agriiPrice delivers real-time agricultural market data across
                Africa. Access daily price updates for crops, uncover market
                trends, and make informed decisions to maximize your trading
                potential.
              </p>
              <Link
                to={`/markets`}
                className="btn btn-sm rounded-sm text-uppercase font-500 border-dark color-dark bg-theme bg-theme"
              >
                View Market Prices
              </Link>
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
            <img src={imagePath3} alt="img" />
            <div className="content">
              <h2 className="font-500">Social Rewards: Earn by Engaging</h2>
              <p className="mb-2">
                The Social Rewards Program offers token rewards for supporting
                the agriiDAO mission. Complete tasks, share content, and earn
                tokens through airdrops as you contribute.
              </p>
              <Link
                to={`/reward-campaigns`}
                className="btn btn-sm rounded-sm text-uppercase font-500 border-dark color-dark bg-theme bg-theme"
              >
                Start Earning Now
              </Link>
            </div>
          </div>
        </div>

        <div className="content color-dark mb-4">
          <h3 className="mb-4 font-500">
            Why Tokenizing Real-World Assets (RWAs) Matters
          </h3>
          <h5 className="font-500">1. Unlocking Agricultural Value</h5>
          <p>
            Tokenizing freeze-dried food transforms perishable goods into{" "}
            <strong className="font-500">
              high-value, investable assets.{" "}
            </strong>
            Investors can now be part of the agricultural economy without direct
            farming involvement.
          </p>
          <h5 className="font-500">2. Enhanced Liquidity</h5>
          <p>
            Tokenizing freeze-dried goods creates a{" "}
            <strong className="font-500">new asset className </strong> with
            liquidity in an undercapitalized industry. Through{" "}
            <strong className="font-500">agriiMarket, </strong>these assets can
            be traded seamlessly, providing real-time opportunities.
          </p>
          <h5 className="font-500">3. Supply Chain Efficiency</h5>
          <p>
            agriiDAO builds a{" "}
            <strong className="font-500">transparent supply chain </strong>where
            every tokenized crop is traceable. This reduces food waste and
            ensures maximum market value through
            <strong className="font-500"> decentralized finance.</strong>
          </p>
        </div>

        <div
          className="card card-style bg-29"
          style={{
            backgroundImage: `url(${imagePath5})`,
            height: `${cardHeightHero}px`,
          }}
        >
          <div className="card-center px-3">
            <h2 className="color-white font-500 mb-3">Our Ecosystem</h2>
            <p className="color-white mb-4">
              Our ecosystem features several decentralized applications (DApps)
              to make investing in the African food system seamless,
              transparent, and efficient:
            </p>
            <Link
              to={`/ecosystem`}
              className="btn btn-sm rounded-sm text-uppercase font-500 border-white color-white bg-theme mb-3"
            >
              Explore our ecosystem
            </Link>
          </div>
          <div className="card-overlay "></div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
