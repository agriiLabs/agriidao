import { Link } from "react-router-dom";
import imagePath from "../../assets/images/agriidao-logo.svg";
import imagePath1 from "../../assets/images/ecosystem.png";
import imagePath2 from "../../assets/images/default-user-profile.png";
import imagePath3 from "../../assets/images/ecosystem/agriiprotocol-icon.svg";
import imagePath4 from "../../assets/images/ecosystem/agriiclub-icon.svg";
import imagePath5 from "../../assets/images/ecosystem/agriiprice-icon.svg";
import imagePath6 from "../../assets/images/ecosystem/agriimarket-icon.svg";
import imagePath7 from "../../assets/images/ecosystem/agriitrace-icon.svg";

const Ecosystem = () => {
  const cardHeightHero = 250;

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
          <div className="card-center content ">
            <h1 className="color-white font-900">Explore the agriiDAO Ecosystem</h1> 
          </div>
          <div className="card-overlay bg-black opacity-20"></div>
          <div className="card-overlay bg-gradient py-5"></div>
        </div>
        <div className="content color-dark mb-4">
          <p>
          Our ecosystem is built on a suite of <strong className="font-500">decentralized applications (DApps) </strong>designed to enhance <strong className="font-500">transparency, efficiency, </strong> and <strong className="font-500">market access </strong>within the African food system.
          </p>
        </div>

        <div className="card card-style">
            <div className="content">
                <div className="mb-3">
                    <div>
                    <img src={imagePath3} width="50"/>
                    </div>
                    <h1 className="mt-2 font-500 color-dark">agriiProtocol</h1>  
                    <p color-dark>The backbone of our ecosystem, ensuring secure and transparent data management across the value chain.</p>
                </div>
                
                <Link 
                to={`/protocol`}
                className="btn btn-sm rounded-sm text-uppercase font-500 border-dark color-dark bg-theme mb-3"
                >
                    Learn More
                </Link>
            </div>
        </div>
        <div className="card card-style">
            <div className="content">
                <div className="mb-3">
                    <div>
                    <img src={imagePath4} width="50"/>
                    </div>
                    <h1 className="mt-2 font-500 color-dark">agriiClub</h1>  
                    <p>Empowering stakeholders with tokenization and asset management services for African agriculture.</p>
                </div>
                
                <Link 
                to={`/club`}
                className="btn btn-sm rounded-sm text-uppercase font-500 border-dark color-dark bg-theme mb-3"
                >
                    Learn More
                </Link>
            </div>
        </div>
        <div className="card card-style">
            <div className="content">
                <div className="mb-3">
                    <div>
                    <img src={imagePath5} width="50"/>
                    </div>
                    <h1 className="mt-2 font-500 color-dark">agriiPrice</h1>  
                    <p>Access daily agricultural prices across Africa, offering valuable market insights for stakeholders.</p>
                </div>
                
                <Link 
                to={`/price`}
                className="btn btn-sm rounded-sm text-uppercase font-500 border-dark color-dark bg-theme mb-3"
                >
                    Learn More
                </Link>
            </div>
        </div>
        <div className="card card-style">
            <div className="content">
                <div className="mb-3">
                    <div>
                    <img src={imagePath6} width="50"/>
                    </div>
                    <h1 className="mt-2 font-500 color-dark">agriiMarket</h1>  
                    <p>A decentralized marketplace for trading freeze-dried agricultural products, offering liquidity and market access.</p>
                </div>
                
                <Link 
                to={`/market`}
                className="btn btn-sm rounded-sm text-uppercase font-500 border-dark color-dark bg-theme mb-3"
                >
                    Learn More
                </Link>
            </div>
        </div>
        <div className="card card-style">
            <div className="content">
                <div className="mb-3">
                    <div>
                    <img src={imagePath7} width="50"/>
                    </div>
                    <h1 className="mt-2 font-500 color-dark">agriiTrace</h1>  
                    <p>Ensuring full traceability of agricultural produce from farm to market, building trust and transparency throughout the supply chain.</p>
                </div>
                
                <Link 
                to={`/trace`}
                className="btn btn-sm rounded-sm text-uppercase font-500 border-dark color-dark bg-theme mb-3"
                >
                    Learn More
                </Link>
            </div>
        </div>
        

        


      </div>
    </>
  );
};

export default Ecosystem;
