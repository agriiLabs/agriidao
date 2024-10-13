import { Link } from "react-router-dom";
import imagePath from "../../assets/images/agriidao-logo.svg";
import imagePath1 from "../../assets/images/bg7.png";
import imagePath2 from "../../assets/images/default-user-profile.png";
import imagePath3 from "../../assets/images/environmental.png";
import imagePath4 from "../../assets/images/social.png";
import imagePath5 from "../../assets/images/governance.png";

const Esg = () => {
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
              Environmental, Social, and Governance (ESG) Metrics
            </h1>
          </div>
          <div className="card-overlay bg-black opacity-20"></div>
          <div className="card-overlay bg-gradient py-5"></div>
        </div>
        <div className="content color-dark mb-4">
          <p>
            agriiDAO is committed to making a positive, measurable impact on the{" "}
            <strong className="font-500">environment,</strong> supporting{" "}
            <strong className="font-500">communities, </strong> and ensuring
            responsible <strong className="font-500">governance. </strong>Here’s
            how we incorporate <strong className="font-500">ESG </strong>{" "}
            principles into everything we do:
          </p>
        </div>

        <div>
          <div className="card card-style">
            <img src={imagePath3} alt="img" />
            <div className="content">
              <h2 className="mb-4 color-dark font-500">Environmental Impact</h2>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <i
                  className="fa fa-leaf"
                  style={{ color: "#28a745", marginRight: "10px" }}
                ></i>
                <h5 className="font-500" style={{ margin: 0 }}>Carbon Emissions Reduction</h5>
              </div>
              <p>
                We’re lowering{" "}
                <strong className="font-500">CO2 emissions </strong> by
                optimizing the freeze-drying process and cutting down on food
                waste. This reduces the environmental footprint of agriculture.
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <i
                  className="fa fa-tint"
                  style={{ color: "#007BFF", marginRight: "10px" }}
                ></i>
                <h5 className="font-500" style={{ margin: 0 }}>Water Efficiency</h5>
              </div>
              <p>
                Our use of{" "}
                <strong className="font-500">freeze-drying technology </strong>{" "}
                conserves water, minimizing the amount needed for food
                preservation while maintaining quality.
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <i
                  className="fa fa-recycle"
                  style={{ color: "#FFCC00", marginRight: "10px" }}
                ></i>
                <h5 className="font-500" style={{ margin: 0 }}>Zero-Waste Initiative</h5>
              </div>
              <p>
                By creating a{" "}
                <strong className="font-500">zero-waste supply chain </strong>{" "}
                through freeze-drying and tokenization, we reduce waste from
                farm to market, making food systems more efficient and
                sustainable.
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="card card-style">
            <img src={imagePath4} alt="img" />
            <div className="content">
              <h2 className="mb-4 color-dark font-500">Social Impact</h2>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <i
                  className="fa fa-hand-holding-heart"
                  style={{ color: "#FF6F61", marginRight: "10px" }}
                ></i>
                <h5 className="font-500" style={{ margin: 0 }}>Community Food Security</h5>
              </div>
              <p>
                We provide nutrient-dense, freeze-dried foods to vulnerable
                communities, enhancing food security and nutritional health.
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <i
                  className="fa fa-briefcase"
                  style={{ color: "#6C757D", marginRight: "10px" }}
                ></i>
                <h5 className="font-500" style={{ margin: 0 }}>Employment Opportunities</h5>
              </div>
              <p>
                Our decentralized ecosystem creates{" "}
                <strong className="font-500">job opportunities </strong> in
                agriculture, food processing, and technology, supporting local
                economies.
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <i
                  className="fa fa-apple-alt"
                  style={{ color: "#FF6347", marginRight: "10px" }}
                ></i>
                <h5 className="font-500" style={{ margin: 0 }}>Nutritional Health</h5>
              </div>
              <p>
                Freeze-dried produce retains up to{" "}
                <strong className="font-500">97% of nutrients, </strong>{" "}
                ensuring that communities have access to high-quality,
                nutritious food.
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="card card-style">
            <img src={imagePath5} alt="img" />
            <div className="content">
              <h2 className="mb-4 color-dark font-500">Governance Impact</h2>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <i
                  className="fa fa-shield-alt"
                  style={{ color: "#17A2B8", marginRight: "10px" }}
                ></i>
                <h5 className="font-500" style={{ margin: 0 }}>Transparent Tokenization</h5>
              </div>
              <p>
                We use blockchain technology to ensure{" "}
                <strong className="font-500">transparency </strong> in all
                transactions, from farm to tokenized assets. Every step is
                recorded for{" "}
                <strong className="font-500">trust and accountability.</strong>
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <i
                  className="fa fa-users"
                  style={{ color: "#7952B3", marginRight: "10px" }}
                ></i>
                <h5 className="font-500" style={{ margin: 0 }}>Community-Led Governance</h5>
              </div>
              <p>
                Our decentralized structure allows stakeholders to have a{" "}
                <strong className="font-500">voice in decision-making, </strong>{" "}
                ensuring fair participation and ownership across the platform.
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <i
                  className="fa fa-balance-scale"
                  style={{ color: "#F8C471", marginRight: "10px" }}
                ></i>
                <h5 className="font-500" style={{ margin: 0 }}>Ethical Supply Chain</h5>
              </div>
              <p>
                We uphold{" "}
                <strong className="font-500">ethical practices </strong>{" "}
                throughout the supply chain, ensuring that every step—from
                farming to distribution—is aligned with international standards.
              </p>
            </div>
          </div>
        </div>

        <div className="card card-style bg-dark">
          <div className="content mb-0 ">
            <h2 className="color-white mb-3 font-500">Why Our ESG Commitment Matters</h2>
            <p className="color-white mb-4">
              By integrating ESG metrics, we ensure that our impact on the{" "}
              <strong className="font-500">environment, society, </strong> and{" "}
              <strong className="font-500">governance </strong> is both positive
              and measurable. This approach helps us create a{" "}
              <strong className="font-500">sustainable, inclusive, </strong> and{" "}
              <strong className="font-500">responsible </strong> agricultural
              value chain.
            </p>
            <Link
              to={`/initiatives`}
              className="btn btn-sm rounded-sm text-uppercase font-500 border-white color-white bg-theme mb-4"
            >
              Learn More About about our Initiatives
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Esg;
