import { Link } from "react-router-dom";
import imagePath from "../../assets/images/agriidao-logo.svg";
import imagePath1 from "../../assets/images/bg8.png";
import imagePath2 from "../../assets/images/default-user-profile.png";
import imagePath3 from "../../assets/images/freeze-drying-tokenization.png";
import imagePath4 from "../../assets/images/reducing-waste.png";
import imagePath5 from "../../assets/images/agriculture-future.png";
import imagePath6 from "../../assets/images/investment-impact.png";

const Initiatives = () => {
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
              Learn More About Our Initiatives
            </h1>
          </div>
          <div className="card-overlay bg-black opacity-0"></div>
          <div className="card-overlay bg-gradient py-5"></div>
        </div>
        <div className="content color-dark mb-4">
          <p>
            At <strong className="font-500">agriiDAO,</strong> our initiatives
            are transforming the food system to reduce waste, preserve
            nutrition, and create investment opportunities. Here’s a closer look
            at how we’re making an impact.
          </p>
        </div>

        <div>
          <div className="card card-style">
            <img src={imagePath3} alt="img" />
            <div className="content">
              <h2 className="mb-4 color-dark font-500">
                1. Freeze-Drying and Tokenization
              </h2>

              <div>
                <h5 className="mb-3 font-500">Preserving Quality and Creating Value</h5>
              </div>
              <p>
                We use{" "}
                <strong className="font-500">freeze-drying technology </strong>{" "}
                to preserve up to{" "}
                <strong className="font-500">97% of nutrients </strong>in
                harvested crops. This extends the shelf life and ensures
                high-quality food is available for communities. Once
                freeze-dried, the crops are{" "}
                <strong className="font-500">tokenized, </strong>turning them
                into digital real-world assets (RWAs) that can be bought, sold,
                or donated.
              </p>
              <p>
                <strong className="font-500">Key Benefits: </strong>
                <ul className="icon-list">
                  <li>
                    <i className="fa fa-square"></i>
                    <strong className="font-500">
                      Nutrient-Rich Food:
                    </strong>{" "}
                    Freeze-dried produce retains maximum nutrients, ensuring
                    healthier food options.
                  </li>
                  <li>
                    <i className="fa fa-square"></i>
                    <strong className="font-500">
                      New Investment Opportunities:
                    </strong>{" "}
                    By tokenizing these assets, we create{" "}
                    <strong className="font-500">
                      liquid, tradable tokens{" "}
                    </strong>{" "}
                    that represent valuable agricultural produce, unlocking a
                    unique market for investors.
                  </li>
                </ul>
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="card card-style">
            <img src={imagePath4} alt="img" />
            <div className="content">
              <h2 className="mb-4 color-dark font-500">
                2. Reducing Waste, Maximizing Efficiency
              </h2>

              <div>
                <h5 className="mb-3 font-500">Zero-Waste Supply Chain</h5>
              </div>
              <p>
                Our goal is a{" "}
                <strong className="font-500">zero-waste food system. </strong>By
                optimizing the supply chain with freeze-drying and tokenization,
                we minimize food loss from farm to market. This approach ensures
                that no part of the harvest is wasted, supporting both
                sustainability and profitability.
              </p>
              <div>
                <h5 className="mb-3 font-500">Supply Chain Transparency</h5>
              </div>
              <p>
                With{" "}
                <strong className="font-500">blockchain technology, </strong>
                each tokenized asset is fully traceable. This{" "}
                <strong className="font-500">transparency </strong>helps
                eliminate inefficiencies and enhances accountability from
                production to delivery.
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="card card-style">
            <img src={imagePath5} alt="img" />
            <div className="content">
              <h2 className="mb-4 color-dark font-500">
                3. Our DApps: Building the Future of Agriculture
              </h2>

              <div>
                <h5 className="mb-3 font-500">A Suite of Decentralized Applications</h5>
              </div>
              <p>
                Our ecosystem includes multiple DApps, each contributing to a
                more efficient and transparent food system. Here’s how they
                help:
              </p>
              <p>
                <ul className="icon-list">
                  <li>
                    <i className="fa fa-square"></i>
                    <strong className="font-500">agriiProtocol:</strong> A
                    secure, distributed ledger that ensures{" "}
                    <strong className="font-500">data transparency </strong>and{" "}
                    <strong className="font-500">traceability </strong>
                    throughout the supply chain.
                  </li>
                  <li>
                    <i className="fa fa-square"></i>
                    <strong className="font-500">agriiClub:</strong>{" "}
                    Tokenization and asset management services that provide
                    stakeholders with opportunities to engage with the
                    agricultural value chain.
                  </li>
                  <li>
                    <i className="fa fa-square"></i>
                    <strong className="font-500">agriiMarket:</strong> A{" "}
                    <strong className="font-500">
                      decentralized marketplace{" "}
                    </strong>
                    where tokenized freeze-dried products are traded, providing
                    liquidity and market access.
                  </li>
                  <li>
                    <i className="fa fa-square"></i>
                    <strong className="font-500">agriiPrice:</strong> Access
                    daily agricultural prices to make{" "}
                    <strong className="font-500">informed decisions </strong>
                    about trading and investing.
                  </li>
                  <li>
                    <i className="fa fa-square"></i>
                    <strong className="font-500">agriiTrace:</strong> Ensures
                    complete traceability for every product, from harvest to
                    market, building{" "}
                    <strong className="font-500">trust </strong>and{" "}
                    <strong className="font-500">consumer confidence.</strong>.
                  </li>
                </ul>
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="card card-style">
            <img src={imagePath6} alt="img" />
            <div className="content">
              <h2 className="mb-4 color-dark font-500">
                4. Investment Opportunities and Impact
              </h2>

              <div>
                <h5 className="mb-3 font-500">
                  Creating Value for Investors and Communities
                </h5>
              </div>
              <p>
                Our initiatives provide{" "}
                <strong className="font-500">investors </strong>with access to a
                new asset class while contributing to the sustainability of
                African agriculture. Through{" "}
                <strong className="font-500">tokenized assets, </strong>
                investors can:
              </p>
              <p>
                <ul className="icon-list">
                  <li>
                    <i className="fa fa-square"></i>
                    <strong className="font-500">Trade </strong> on agriiMarket
                    for liquidity.
                  </li>
                  <li>
                    <i className="fa fa-square"></i>
                    <strong className="font-500">Store </strong> value through
                    secure asset management.
                  </li>
                  <li>
                    <i className="fa fa-square"></i>
                    <strong className="font-500">Support Communities </strong>by
                    donating tokens to the agriiDAO food bank, directly
                    impacting food security.
                  </li>
                </ul>
              </p>
              <div>
                <h5 className="mb-3 font-500">Sustainable Growth</h5>
              </div>
              <p>
                By combining technological innovation with a sustainable
                approach, agriiDAO creates opportunities that align with both{" "}
                <strong className="font-500">financial goals </strong>and{" "}
                <strong className="font-500">positive social impact.</strong>
              </p>
            </div>
          </div>
        </div>

        <div className="card card-style bg-dark">
          <div className="content mb-0 ">
            <h2 className="color-white mb-3 font-500">Get Involved</h2>
            <p className="color-white mb-4">
            Join agriiDAO in transforming the African food system through {" "}
              <strong className="font-500">sustainability, transparency, </strong> and{" "}
              <strong className="font-500">real-world asset tokenization.</strong>
            </p>
            <Link
              to={`/ecosystem`}
              className="btn btn-sm rounded-sm text-uppercase font-500 border-white color-white bg-theme mb-4"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Initiatives;
