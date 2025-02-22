import imagePath6 from "../assets/images/agriidao-app.png";
import imagePath1 from "../assets/images/ecosystem/coop.png";
import imagePath2 from "../assets/images/ecosystem/price.png";
import imagePath3 from "../assets/images/ecosystem/protocol.png";
import imagePath4 from "../assets/images/ecosystem/ecosystem.png";
import imagePath5 from "../assets/images/ecosystem/agriicoop-icon.svg";
import imagePath8 from "../assets/images/ecosystem/agriimarket-icon.svg";
import imagePath9 from "../assets/images/ecosystem/agriitrace-icon.svg";
import imagePath10 from "../assets/images/ecosystem/agriiclub-icon.svg";
import imagePath7 from "../assets/images/icp-logo.png";
import imagePath11 from "../assets/images/impact.png";
import imagePath12 from "../assets/images/transparency.png";
import imagePath13 from "../assets/images/rewards.png";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const DesktopLandingPage = () => {
  const appHeight = 600;

  return (
    <div>
      <section id="home" className="bg-half d-table w-100 overflow-hidden">
        <div className="container position-relative">
          <div className="row align-items-center">
            <div className="col-lg-7 col-md-7">
              <div className="title-heading">
                <h1 className="heading fw-bold mb-3">
                  Start, Scale & Fund
                  <br />
                  Food Co-ops On-Chain
                </h1>
                <p className="para-desc text-muted">
                  Build decentralized food co-ops, access funding, and trade
                  fairly with agriiDAO.
                  <br />
                </p>
                <div className="row d-flex justify-content-center">
                  <div className="d-flex gap-3">
                    <NavLink
                      to="/d/coops"
                      className="mt-4 text-dark btn bg-white border-dark"
                    >
                      Start a Co-op
                    </NavLink>
                    <NavLink
                      to="/d/coops"
                      className="mt-4 text-dark btn bg-white border-dark"
                    >
                      Fund Co-ops
                    </NavLink>
                  </div>
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
                          <h6 className="mb-0 text-muted">
                            Powered by agriiProtocol on
                          </h6>
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
                          <h6 className="text-dark mb-0">
                            9000+ fresh produce prices
                          </h6>
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
      <section id="overview" className="section bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 text-center">
              <div className="section-title pb-2">
                <h4 className="title mb-4">Build, Grow & Sustain Your Co-op</h4>
              </div>
              <div className="col-12">
                <p
                  className="text-muted font-16 text-center mx-auto"
                  style={{ maxWidth: "600px" }}
                >
                  A co-op is a member-owned group where people pool resources,
                  make decisions, and use tools to ensure fair prices, secure
                  operations, and sustainability.
                </p>
              </div>
            </div>
          </div>

          <div className="row" id="counter">
            <div className="col-md-4 col-12 mt-4 pt-2">
              <div className="counter-box text-center">
                <img src={imagePath1} className="img-fluid rounded" alt="" />
                <h5 className="mb-0 mt-4">Create & Manage Your Co-op</h5>
                <p className="mt-2 font-16 text-gray-600">
                  Start a decentralized food co-op in minutes, no technical
                  experience needed. agriiCOOP provides tools to structure
                  governance, onboard members, and manage funds transparently.
                  Your co-op remains controlled by members, ensuring fair
                  decision-making and efficient operations.
                </p>
                <NavLink
                  to="/d/coops"
                  className="mt-4 text-dark btn bg-white border-dark"
                >
                  Start a Co-op
                </NavLink>
              </div>
            </div>

            <div className="col-md-4 col-12 mt-4 pt-2">
              <div className="counter-box text-center">
                <img src={imagePath2} className="img-fluid rounded" alt="" />
                <h5 className="mb-0 mt-4">Get Fair Pricing</h5>
                <p className="mt-2 font-16 text-gray-600">
                  Access real-time, transparent market prices for your crops.
                  agriiPrice eliminates middlemen by using verified price feeds
                  from multiple sources, helping co-ops make informed selling
                  and buying decisions. Members gain reliable data to plan
                  production and maximize profitability.
                </p>
                <NavLink
                  to="/d/markets"
                  className="mt-4 text-dark btn bg-white border-dark"
                >
                  Check Market Prices
                </NavLink>
              </div>
            </div>

            <div className="col-md-4 col-12 mt-4 pt-2">
              <div className="counter-box text-center">
                <img src={imagePath3} className="img-fluid rounded" alt="" />
                <h5 className="mb-0 mt-4">Secure Your Co-op Data</h5>
                <p className="mt-2 font-16 text-gray-600">
                  Every decision, vote, and transaction is securely recorded
                  on-chain. agriiProtocol ensures tamper-proof records for
                  governance, funding, and trade history. Co-op members can
                  track contributions, oversee operations, and maintain trust in
                  a fully verifiable on-chain system.
                </p>
                <Button className="mt-4 text-dark bg-light border-dark">
                  Explore agriiProtocol
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="section bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 text-center">
              <div className="section-title mb-4 pb-2">
                <h4 className="title mb-4"> Here's How it Could Work...</h4>
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-md-6">
              <img src={imagePath4} className="img-fluid rounded" alt="" />
            </div>

            <div className="col-md-6 mt-4 mt-sm-0 pt-2 pt-sm-0">
              <div className="section-title ml-lg-5">
                <h5 className="title mb-4">
                  Let’s say a group of farmers in Africa wants to create a
                  fair-trade coffee co-op.
                </h5>
                <p className="text-muted font-16 d-flex align-items-center">
                  <img
                    src={imagePath5}
                    className="img-fluid rounded me-3"
                    alt=""
                    style={{ height: "2em", width: "auto" }}
                  ></img>
                  The African coffee farmers use agriiCOOP to create a
                  decentralized cooperative, set governance rules, and onboard
                  members for transparent decision-making.
                </p>
                <p className="text-muted font-16 d-flex align-items-center">
                  <img
                    src={imagePath8}
                    className="img-fluid rounded me-3"
                    alt=""
                    style={{ height: "2em", width: "auto" }}
                  ></img>{" "}
                  They use agriiPrice to access real-time, verified market data,
                  ensuring they sell their coffee at fair and competitive
                  prices.
                </p>
                <p className="text-muted font-16 d-flex align-items-center">
                  <img
                    src={imagePath9}
                    className="img-fluid rounded me-3"
                    alt=""
                    style={{ height: "2em", width: "auto" }}
                  ></img>{" "}
                  By integrating agriiTrace, they record every step of the
                  supply chain on-chain, providing buyers with verifiable proof
                  of ethical sourcing.
                </p>
                <p className="text-muted font-16 d-flex align-items-center">
                  <img
                    src={imagePath10}
                    className="img-fluid rounded me-3"
                    alt=""
                    style={{ height: "2em", width: "auto" }}
                  ></img>{" "}
                  Finally, they list their coffee on agriiMarket, connecting
                  directly with global buyers, increasing profits, and
                  eliminating middlemen.
                </p>

                <Button className="mt-3 text-dark bg-light border-dark">
                  Explore agriiProtocol
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="back-a-coop" className="section bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 text-center">
              <div className="section-title mb-4 pb-2">
                <h4 className="title mb-4">Why Back Food Co-ops?</h4>
              </div>
            </div>
          </div>

          <div className="row mb-3 pb-4 mt-4">
            <div className="col-md-4 col-12">
              <div className="features text-center">
                <div>
                  <img
                    src={imagePath11}
                    className="avatar avatar-small"
                    alt="farming input unit"
                  />
                </div>

                <div className="content mt-4">
                  <h5>Real-World Impact</h5>
                  <p className="text-muted font-16 mb-0">
                    Support decentralized food co-ops that create jobs,
                    strengthen supply chains, and drive economic <br />
                    growth in real communities.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-12 mt-5 mt-sm-0">
              <div className="features text-center">
                <div>
                  <img
                    src={imagePath12}
                    className="avatar avatar-small"
                    alt="off-taker unit"
                  />
                </div>

                <div className="content mt-4">
                  <h5>On-Chain Transparency</h5>
                  <p className="text-muted font-16 mb-0">
                    All funds, trades, and governance decisions are recorded
                    on-chain, allowing investors and co-op members to track
                    financial flows and verify fair pricing in real time.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-12 mt-5 mt-sm-0">
              <div className="features text-center">
                <div>
                  <img
                    src={imagePath13}
                    className="avatar avatar-small"
                    alt="agribusiness women unit"
                  />
                </div>

                <div className="content mt-4">
                  <h5>Real-World Rewards</h5>
                  <p className="text-muted font-16 mb-0">
                    Co-op members receive tokenized real-world assets (RWAs)
                    from the projects they fund, which can be used, traded, or
                    sold on open markets.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-12 text-center">
              <NavLink
                to="/d/coops"
                className="mt-4 text-dark btn bg-white border-dark"
              >
                Fund Co-ops
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default DesktopLandingPage;
