import { Link } from "react-router-dom";
import imagePath from "../../assets/images/agriidao-logo.svg";
import imagePath1 from "../../assets/images/dao/trace/trace-bg.png";
import imagePath2 from "../../assets/images/default-user-profile.png";
import imagePath3 from "../../assets/images/dao/trace/traceability.png";
import imagePath4 from "../../assets/images/dao/trace/transparency.png";
import imagePath5 from "../../assets/images/dao/trace/efficient.png";
import ProfileClick from "../profile/component/ProfileClick";

const Trace = () => {
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
              agriiTrace:
              <br />
              Your Solution for
              <br />
              Agricultural Traceability
            </h1>
          </div>
        </div>
        <div className="content color-dark mb-4">
          <p>
            <strong className="font-500">agriiTrace </strong>
            is a cutting-edge platform designed to provide complete traceability
            for agricultural products. Our mission is to ensure transparency
            throughout the supply chain, empowering stakeholders with the
            information they need to make informed decisions.
          </p>
        </div>

        <div>
          <div className="card card-style">
            <img src={imagePath3} alt="img" />
            <div className="content">
              <h2 className="mb-4 color-dark font-500">
                Complete Traceability for Agricultural Products
              </h2>
              <p className="mb-4">
                agriiTrace offers a robust solution for tracking and verifying
                agricultural products from farm to table. Key features include:
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <i
                  className="fa fa-route"
                  style={{ color: "#007BFF", marginRight: "10px" }}
                ></i>
                <h5 className="font-500" style={{ margin: 0 }}>
                  End-to-End Tracking
                </h5>
              </div>
              <p>
                Monitor the journey of crops through every stage of the supply
                chain.
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
                  style={{ color: "#28A745", marginRight: "10px" }}
                ></i>
                <h5 className="font-500" style={{ margin: 0 }}>
                  Data Integrity
                </h5>
              </div>
              <p>
                Use blockchain technology to ensure accurate and tamper-proof
                records.
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <i
                  className="fa fa-mobile-alt"
                  style={{ color: "#FF5733", marginRight: "10px" }}
                ></i>
                <h5 className="font-500" style={{ margin: 0 }}>
                  Easy Access
                </h5>
              </div>
              <p>
                Stakeholders can easily access information regarding the origin,
                handling, and processing of agricultural products.
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="card card-style">
            <img src={imagePath4} alt="img" />
            <div className="content">
              <h2 className="mb-4 color-dark font-500">
                Empowering Transparency in Agriculture
              </h2>
              <p>
                With agriiTrace, you gain a competitive edge by ensuring trust
                and safety in the agricultural market:
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <i
                  className="fa fa-handshake "
                  style={{ color: "#FFC107", marginRight: "10px" }}
                ></i>
                <h5 className="font-500" style={{ margin: 0 }}>
                  Build Consumer Trust
                </h5>
              </div>
              <p>
                Provide consumers with verified information about the products
                they purchase, enhancing confidence in food safety.
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <i
                  className="fa fa-exclamation-triangle"
                  style={{ color: "#DC3545", marginRight: "10px" }}
                ></i>
                <h5 className="font-500" style={{ margin: 0 }}>
                  Mitigate Risks
                </h5>
              </div>
              <p>
                Quickly identify and address issues in the supply chain to
                prevent potential risks to public health.
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
                  style={{ color: "#17A2B8", marginRight: "10px" }}
                ></i>
                <h5 className="font-500" style={{ margin: 0 }}>
                  Compliance
                </h5>
              </div>
              <p>
                Meet regulatory requirements and industry standards for
                traceability, ensuring your operations remain compliant.
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="card card-style">
            <img src={imagePath5} alt="img" />
            <div className="content">
              <h2 className="mb-4 color-dark font-500">Simple and Efficient</h2>
              <p>Using agriiTrace is straightforward:</p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <i
                  className="fa fa-clipboard-list "
                  style={{ color: "#6F42C1", marginRight: "10px" }}
                ></i>
                <h5 className="font-500" style={{ margin: 0 }}>
                  Register Products
                </h5>
              </div>
              <p>
                Producers register their crops and products on the platform.
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <i
                  className="fa fa-truck"
                  style={{ color: "#FF6F61", marginRight: "10px" }}
                ></i>
                <h5 className="font-500" style={{ margin: 0 }}>
                  Track Movement
                </h5>
              </div>
              <p>
                As products move through the supply chain, data is recorded at
                each step.
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <i
                  className="fa fa-info-circle"
                  style={{ color: "#FD7E14", marginRight: "10px" }}
                ></i>
                <h5 className="font-500" style={{ margin: 0 }}>
                  Access Information
                </h5>
              </div>
              <p>
                Stakeholders can retrieve real-time information about product
                origins and history, all through a user-friendly interface.
              </p>
            </div>
          </div>
        </div>

        <div className="card card-style bg-dark">
          <div className="content mb-0 ">
            <h2 className="color-white mb-3 font-500">
              Stay Tuned for agriiTrace
            </h2>
            <p className="color-white mb-4">
              agriiTrace is coming soon! As we continue development, sign up to
              stay updated on our progress and be the first to access the
              platform that will transform agricultural traceability.
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

export default Trace;
