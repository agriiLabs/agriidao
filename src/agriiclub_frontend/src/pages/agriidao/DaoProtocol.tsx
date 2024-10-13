import { Link } from "react-router-dom";
import imagePath from "../../assets/images/agriidao-logo.svg";
import imagePath1 from "../../assets/images/dao/protocol/protocol-bg.png";
import imagePath2 from "../../assets/images/default-user-profile.png";
import imagePath3 from "../../assets/images/dao/protocol/secure-data.png";
import imagePath4 from "../../assets/images/dao/protocol/traceability.png";
import imagePath5 from "../../assets/images/dao/protocol/transparency.png";
import imagePath6 from "../../assets/images/dao/protocol/rwa-tokenization.png";

const Protocol = () => {
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
            agriiProtocol: <br/>The Backbone of agriiDAO's Ecosystem
            </h1>
          </div>
          {/* <div className="card-overlay bg-black opacity-20"></div>
          <div className="card-overlay bg-gradient py-5"></div> */}
        </div>
        <div className="content color-dark mb-4">
          <p>
          <strong className="font-500">agriiProtocol </strong>is the core infrastructure that powers the agriiDAO ecosystem. It ensures 
            <strong className="font-500">transparency, security, </strong>and {" "}
            <strong className="font-500">traceability, </strong> of all activities, from  <strong className="font-500">tokenizing crops  </strong>
            to managing data and transactions. Here’s how agriiProtocol helps build a trustworthy and efficient agricultural ecosystem.
          </p>
        </div>

        <div>
          <div className="card card-style">
            <img src={imagePath3} alt="img" />
            <div className="content">
              <h2 className="mb-4 color-dark font-500">1. Secure Data Management
              </h2>
              <p>
              All activities within agriiDAO are recorded on <strong className="font-500">agriiProtocol’s data distributed ledger. </strong> This guarantees that every step, from <strong className="font-500">harvest to tokenization,  </strong> is:
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <i
                  className="fa fa-lock"
                  style={{ color: "#007BFF", marginRight: "10px" }}
                ></i>
                <h5 className="font-500" style={{ margin: 0 }}>Immutable</h5>
              </div>
              <p>
              Once data is recorded, it cannot be altered, ensuring <strong className="font-500">trust.</strong>
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <i
                  className="fa fa-unlock-alt"
                  style={{ color: "#28A745", marginRight: "10px" }}
                ></i>
                <h5 className="font-500" style={{ margin: 0 }}>Accessible</h5>
              </div>
              <p>
              Anyone can access the blockchain records, ensuring complete 
                <strong className="font-500">transparency </strong>for all participants.
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="card card-style">
            <img src={imagePath4} alt="img" />
            <div className="content">
              <h2 className="mb-4 color-dark font-500">2. Full Traceability</h2>
              <p>
              With agriiProtocol, every crop’s journey is tracked and recorded—from <strong className="font-500">farms to freeze-drying, tokenization, and final distribution. </strong>This <strong className="font-500">full traceability </strong>guarantees that:
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <i
                  className="fa fa-check-circle"
                  style={{ color: "#FFC107", marginRight: "10px" }}
                ></i>
                <h5 className="font-500" style={{ margin: 0 }}>Quality Standards</h5>
              </div>
              <p>
              Every crop meets quality standards throughout the supply chain.
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <i
                  className="fa fa-boxes"
                  style={{ color: "#6C757D", marginRight: "10px" }}
                ></i>
                <h5 className="font-500" style={{ margin: 0 }}>Supply Chain Integrity</h5>
              </div>
              <p>
                Each tokenized asset can be traced back to its source, which builds 
                <strong className="font-500">consumer trust </strong> <strong className="font-500">market confidence.</strong>
                
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="card card-style">
            <img src={imagePath5} alt="img" />
            <div className="content">
              <h2 className="mb-4 color-dark font-500">3. Enhanced Transparency</h2>
              <p>
              By leveraging blockchain technology, agriiProtocol ensures that:
              </p>
             
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
                <h5 className="font-500" style={{ margin: 0 }}>Transactions are Visible</h5>
              </div>
              <p>
              Every transaction is publicly verifiable, giving all stakeholders confidence in the system.
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <i
                  className="fa fa-users-cog"
                  style={{ color: "#7952B3", marginRight: "10px" }}
                ></i>
                <h5 className="font-500" style={{ margin: 0 }}>Decentralized Governance</h5>
              </div>
              <p>
              agriiProtocol enables the <strong className="font-500">agriiDAO community </strong>{" "}
              to participate in decision-making, ensuring a fair and inclusive governance structure.
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="card card-style">
            <img src={imagePath6} alt="img" />
            <div className="content">
              <h2 className="mb-4 color-dark font-500">4. Powering Real-World Asset Tokenization</h2>
              <p>
              agriiProtocol is key to transforming <strong className="font-500">freeze-dried agricultural produce </strong> into <strong className="font-500">real-world assets (RWAs). </strong>It ensures that:
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
                <h5 className="font-500" style={{ margin: 0 }}>Secure Tokenization</h5>
              </div>
              <p>
              Crops are tokenized on a secure platform, backed by blockchain integrity.
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <i
                  className="fa fa-link"
                  style={{ color: "#FF6347", marginRight: "10px" }}
                ></i>
                <h5 className="font-500" style={{ margin: 0 }}>Digital and Physical Connection</h5>
              </div>
              <p>
              Every token is linked to physical produce, creating a bridge between traditional agriculture and <strong className="font-500">digital assets.</strong>
              </p>
            </div>
          </div>
        </div>

        <div className="card card-style bg-dark">
          <div className="content mb-0 ">
            <h2 className="color-white mb-3 font-500">Why agriiProtocol Matters
            </h2>
            <p className="color-white mb-4">
            agriiProtocol is at the heart of everything agriiDAO does. By providing 
              <strong className="font-500">security, transparency, </strong> and{" "}
              <strong className="font-500">traceability, </strong> it empowers the agricultural community to operate efficiently while building trust with investors and consumers alike.
            </p>
            <Link
              to={`/ecosystem`}
              className="btn btn-sm rounded-sm text-uppercase font-500 border-white color-white bg-theme mb-4"
            >
              Learn More About about our DApps
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Protocol;
