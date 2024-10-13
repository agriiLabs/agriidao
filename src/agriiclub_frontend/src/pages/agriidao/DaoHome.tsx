import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import QRCode from "react-qr-code";
import imagePath from "../../assets/images/agriidao-logo.svg";
import imagePath1 from "../../assets/images/bg.png";
import imagePath2 from "../../assets/images/default-user-profile.png";
import imagePath3 from "../../assets/images/bg3.png";
import imagePath4 from "../../assets/images/bg4.png";
import imagePath5 from "../../assets/images/bg5.png";
import imagePath6 from "../../assets/images/landing/bg.png";

const LandingPage = () => {
  

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Detect if the user is on a desktop device
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /android|iphone|ipad|mobile|ipod/.test(userAgent);
    setIsDesktop(!isMobile);

    // Dynamically load the corresponding CSS file
    if (!isMobile) {
      import('../../assets/landing/styles/style.min.css').then(() => {
        console.log("Desktop CSS loaded");
      });
    } else {
      import('../../assets/styles/style.css').then(() => {
        console.log("Mobile CSS loaded");
      });
    }
  }, []);

  return (
    <div>
      {isDesktop ? (
        <DesktopLandingPage />
      ) : (
        <Home />
      )}
    </div>
  );
};

// Desktop-specific landing page component
const DesktopLandingPage = () => {
  const cardHeightHero = 650;
  const qrHeight = 100;

  return (
    <div>
      <section
        className="bg-half-260  d-table w-100 align-items-center"
        style={{ backgroundImage: `url(${imagePath6})`, 
        height: `${cardHeightHero}px`,
      }}
      >
        <div className="container">
            <div className="col-lg-12 text-center">
              <div className="mb4">
                <img src={imagePath} width="180" alt="Default Profile" />
              </div>
            
              <div className="title-heading">
                <h1 className="heading title-dark mb-4 mt-4">
                This DApp is Mobile-Only
                </h1>
                <p className="font-20">To view and interact with this DApp, please use your mobile device. <br/>Scan the QR code below to get started.</p>
              </div>
              <QRCode style={{height: `${qrHeight}px`}} value="https://agriidao.org" />              
            </div>

            
        </div>
      </section>

      
    </div>
  );
};

const Home = () => {
  const cardHeight = 240;
  const cardHeightHero = 350;
  const cardHeightStats = 90;

  return (
    <>
      {/* header */}
      <div className="header header-fixed header-logo-center">
        <a className="header-title">
          <img src={imagePath} width="100" alt="Default Profile" />
        </a>

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
          className="card"
          
          style={{
            backgroundImage: `url(${imagePath1})`,
            height: `${cardHeightHero}px`,
          }}
        >
          <div className="card-bottom mx-3 mb-5 pb-3">
            <h1 className="color-white mb-2 font-900">
              Zero Waste.
              <br /> Maximum Nutrition.
            </h1>
            <p className="color-white opacity-80 mb-0">
              Transforming African food systems with freeze-drying and
              tokenization, delivering nutrient-rich food sustainably.
            </p>
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
        </div>
        <div className="content color-dark mb-4 ">
          <h3 className="font-500">The Challenges Facing African Food Systems</h3>
        </div>

        <div className="content mt-n2">
          <div className="row mb-n3">
            <div className="col-4 pe-2">
              <div
                className="card card-style mx-0 mb-3 bg-1"
                style={{
                  height: `${cardHeightStats}px`,
                }}
              >
                <div className="card-center p-3">
                  <h4 className="font-500 text-uppercase color-white font-12 mb-n1">
                    Funding Gap
                  </h4>
                  <h1 className="font-500 font-26 color-white mb-0">$65B</h1>
                </div>
                <div className="card-overlay bg-dark"></div>
              </div>
            </div>
            <div className="col-4 ps-2 pe-2">
              <div
                className="card card-style mx-0 mb-3 bg-2"
                style={{
                  height: `${cardHeightStats}px`,
                }}
              >
                <div className="card-center p-3">
                  <h4 className="font-500 text-uppercase color-white font-12 mb-n1">
                    Nutrient Loss
                  </h4>
                  <h1 className="font-500 font-26 color-white mb-0">97%</h1>
                </div>
                <div className="card-overlay bg-dark"></div>
              </div>
            </div>
            <div className="col-4 ps-2">
              <div
                className="card card-style mx-0 mb-3 bg-3"
                style={{
                  height: `${cardHeightStats}px`,
                }}
              >
                <div className="card-center p-3">
                  <p className="font-500 text-uppercase color-white font-12 mb-n1">
                    Food Loss
                  </p>
                  <h1 className="font-500 font-26 color-white mb-0">40%</h1>
                </div>
                <div className="card-overlay bg-dark"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="card card-style bg-dark">
          <div className="content mb-0 ">
            <h2 className="color-white mb-3 font-500">Why We Need Change</h2>
            <p className="color-white mb-4">
              The African food system faces major challenges, from funding
              shortages and post-harvest losses to nutrient decline.
            </p>
            <Link 
              to={`/african-food-systems-challenges`}
              className="btn btn-sm rounded-sm text-uppercase font-500 border-white color-white bg-theme mb-4"
            >
              Find Out More
            </Link>
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
              <h2 className="font-500">How agriiDAO Works</h2>
              <p className="mb-2">
                We’ve streamlined the process to transform agricultural produce
                into investable assets, ensuring a seamless journey from farm to
                market while preserving maximum nutritional value.
              </p>
              <Link 
              to={`/how-it-works`}
              className="btn btn-sm rounded-sm text-uppercase font-500 border-dark color-dark bg-theme bg-theme"
            >
              Find Out More
            </Link>
              
            </div>
          </div>
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

        <div className="content color-dark mb-4">
          <h3 className="mb-4 font-500">
            Why Tokenizing Real-World Assets (RWAs) Matters
          </h3>
          <h5 className="font-500">1. Unlocking Agricultural Value</h5> 
          <p>
            Tokenizing freeze-dried food transforms perishable goods into{" "}
            <strong className="font-500">high-value, investable assets. </strong>Investors can now be part of the agricultural economy without direct farming involvement.
          </p>
          <h5 className="font-500">2. Enhanced Liquidity</h5> 
          <p>
            Tokenizing freeze-dried goods
            creates a <strong className="font-500">new asset class </strong> with liquidity in an undercapitalized industry. Through{" "}
            <strong className="font-500">agriiMarket, </strong>these assets can be traded seamlessly, providing real-time opportunities.
          </p>
          <h5 className="font-500">3. Supply Chain Efficiency</h5>
          <p>
            agriiDAO builds a <strong className="font-500">transparent supply chain </strong>where every tokenized crop is traceable. This reduces food waste and ensures maximum market value through
            <strong className="font-500"> decentralized finance.</strong>
          </p>
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
              <h2 className="font-500">Environmental, Social, and Governance (ESG) Metrics</h2>
              <p className="mb-2">
                We are committed to integrating Environmental, Social, and
                Governance (ESG) factors into every aspect of our operations to
                ensure sustainable growth, ethical practices, and long-term
                community benefits.
              </p>
              <Link 
                to={`/esg`}
                className="btn btn-sm rounded-sm text-uppercase font-500 border-dark color-dark bg-theme mb-3"
              >
                Find out more
              </Link>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
