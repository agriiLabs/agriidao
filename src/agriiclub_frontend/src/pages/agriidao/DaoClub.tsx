import { Link } from "react-router-dom";
import imagePath from "../../assets/images/agriidao-logo.svg";
import imagePath1 from "../../assets/images/dao/club/club-bg.png";
import imagePath2 from "../../assets/images/default-user-profile.png";
import imagePath3 from "../../assets/images/dao/club/tokenization-process.png";
import imagePath4 from "../../assets/images/dao/club/rwa-investors.png";
import imagePath5 from "../../assets/images/dao/club/zero-waste.png";

const Club = () => {
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
          <div className="card-center content">
            <h1 className="color-white font-900">
              agriiClub: <br/>Your Gateway to<br/>Tokenized Agriculture
            </h1>
          </div>
          {/* <div className="card-overlay bg-black opacity-20"></div>
          <div className="card-overlay bg-gradient py-5"></div> */}
        </div>
        <div className="content color-dark mb-4">
          <p>
            <strong className="font-500">agriiClub </strong>is the platform that
            connects
            <strong className="font-500">
              farmers, investors, and stakeholders{" "}
            </strong>
            in the agriiDAO ecosystem. It offers
            <strong className="font-500">tokenization services, </strong> asset
            management, and opportunities to engage with Africa's growing
            agricultural market.
          </p>
        </div>

        <div>
          <div className="card card-style">
            <img src={imagePath3} alt="img" />
            <div className="content">
              <h2 className="mb-4 color-dark font-500">
                Tokenization in One Simple Process
              </h2>
              <p className="mb-4">
                agriiClub makes it easy for{" "}
                <strong className="font-500">farmers </strong> to sell their
                harvests directly to investors. Here's how it works:
              </p>

              <p className="mb-3">                
                <strong className="font-500">Step 1: </strong> Farmers list
                their crops for sale.
              </p>

              <p className="mb-3">                
                <strong className="font-500">Step 2: </strong>Investors purchase
                the crops, starting the tokenization process.
              </p>

              <p className="mb-3">                
                <strong className="font-500">Step 3: </strong>Crops are
                freeze-dried and{" "}
                <strong className="font-500">tokenized </strong>into{" "}
                <strong className="font-500">real-world assets (RWAs).</strong>
              </p>
              <p>
                This seamless process transforms physical produce into{" "}
                <strong className="font-500">tradable digital assets, </strong>{" "}
                providing benefits to both farmers and investors.
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="card card-style">
            <img src={imagePath4} alt="img" />
            <div className="content">
              <h2 className="mb-4 color-dark font-500">
                Tokenized Real-World Assets for Investors
              </h2>
              <p>
                When you purchase tokenized crops through agriiClub, you’re not
                just buying agricultural produce—you’re investing in{" "}
                <strong className="font-500">tokenized RWAs </strong>that offer
                flexibility and liquidity:
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <i
                  className="fa fa-exchange-alt "
                  style={{ color: "#007BFF", marginRight: "10px" }}
                ></i>
                <h5 className="font-500" style={{ margin: 0 }}>Trade</h5>
              </div>
              <p>
                Tokenized crops can be traded on{" "}
                <strong className="font-500">agriiMarket, </strong>allowing
                real-time transactions.
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <i
                  className="fa fa-warehouse"
                  style={{ color: "#28A745", marginRight: "10px" }}
                ></i>
                <h5 className="font-500" style={{ margin: 0 }}>Store</h5>
              </div>
              <p>
                Securely store your tokenized assets in the{" "}
                <strong className="font-500">agriiDAO Crop Bank, </strong>
                preserving their value for future use.
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <i
                  className="fa fa-box-open"
                  style={{ color: "#FFC107", marginRight: "10px" }}
                ></i>
                <h5 className="font-500" style={{ margin: 0 }}>Redeem</h5>
              </div>
              <p>
                You can redeem your tokens for physical delivery of freeze-dried
                produce, bridging the digital and physical worlds.
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
                <h5 className="font-500" style={{ margin: 0 }}>Donate</h5>
              </div>
              <p>
                Investors can also choose to{" "}
                <strong className="font-500">donate </strong>their tokenized
                crops to support food security initiatives and communities in
                need.
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="card card-style">
            <img src={imagePath5} alt="img" />
            <div className="content">
              <h2 className="mb-4 color-dark font-500">A Zero-Waste Food System</h2>
              <p>
                We’re committed to building a{" "}
                <strong className="font-500">zero-waste food system. </strong>
                By freeze-drying harvested crops and converting them into
                digital assets, we ensure that no produce is wasted. This
                process preserves nutrient-rich food that might otherwise spoil,
                extending its value for both farmers and investors. Our
                zero-waste approach maximizes efficiency across the supply
                chain, contributing to a more sustainable and environmentally
                friendly agricultural system.
              </p>
            </div>
          </div>
        </div>

        <div className="card card-style bg-dark">
          <div className="content mb-0 ">
            <h2 className="color-white mb-3 font-500">Join agriiClub Today</h2>
            <p className="color-white mb-4">
              agriiClub bridges the gap between traditional agriculture and the
              <strong className="font-500">digital economy, </strong> creating
              opportunities for farmers and investors alike. Whether you want to
              support farmers or invest in tokenized RWAs, agriiClub makes it
              easy to <strong className="font-500">connect, trade, </strong>
              and <strong className="font-500">grow.</strong>
            </p>
            <Link
              to={`https://forms.gle/6QwzfvYjTczgDDtXA`}
              className="btn btn-sm rounded-sm text-uppercase font-500 border-white color-white bg-theme mb-4"
            >
              Join Waiting List
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Club;
