import imagePath6 from "../assets/images/agriidao-app.png";
import imagePath1 from "../assets/images/ecosystem/coop.png";
import imagePath2 from "../assets/images/ecosystem/price.png";
import imagePath3 from "../assets/images/ecosystem/protocol.png";
import imagePath4 from "../assets/images/agriicoop.jpeg";
import imagePath5 from "../assets/images/ecosystem/agriicoop-icon.svg";
import imagePath8 from "../assets/images/ecosystem/agriimarket-icon.svg";
import imagePath9 from "../assets/images/ecosystem/agriitrace-icon.svg";
import imagePath7 from "../assets/images/icp-logo.png";
import imagePath11 from "../assets/images/impact.png";
import imagePath12 from "../assets/images/transparency.png";
import imagePath13 from "../assets/images/rewards.png";
import { NavLink } from "react-router-dom";
import MarketRedirectButton from "../components/MarketRedirectButton";
import imagePath from "../assets/images/agriidao-logo-white.svg";


const DesktopLandingPage = () => {
  const appHeight = 600;

  return (
    <>
    <div className="mobile-logo-wrapper d-block d-lg-none text-center py-3 bg-dark">
        <img src={imagePath} height="30" alt="agriiDAO" />
      </div>
    <div>
      <section id="home" className="bg-half bg-dark d-table w-100 overflow-hidden">
        <div className="container position-relative">
          <div className="row align-items-center">
            <div className="col-lg-7 col-md-7">
              <div className="title-heading">
                <h1 className="heading text-white fw-bold mb-3">
                  Start, Scale & Fund
                  <br />
                  Food Co-ops On-Chain
                </h1>
                <p className="para-desc text-white">
                  Build decentralized food co-ops, access funding, and trade
                  fairly with agriiDAO.
                  <br />
                </p>
                <div className="row d-flex justify-content-center">
                  <div className="d-flex gap-3">
                    <NavLink
                      to="https://forms.gle/LazxXwDGrSnQ51sE8" target="_blank"
                      className="mt-4 text-white btn bg-dark border-white"
                    >
                      Start a Co-op
                    </NavLink>
                    <NavLink
                      to="https://forms.gle/LazxXwDGrSnQ51sE8" target="_blank"
                      className="mt-4 text-white btn bg-dark border-white"
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
                          Securing Global Food Systems 
                          </h6>
                          <p className="text-muted small mb-0">One Co-op at a Time</p>
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
      <section id="overview" className="section ">
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
                  to="https://forms.gle/LazxXwDGrSnQ51sE8" target="_blank" 
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
                <MarketRedirectButton />
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
                <NavLink 
                  to="https://agriiprotocol.org" 
                  target="_blank"
                  className="mt-4 text-dark btn bg-white border-dark">
                  Explore agriiProtocol
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="section pt-2">
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
              <img src={imagePath4} className="img-fluid mx-auto d-block rounded shadow" alt="agriiCoop detail  page" />
            </div>

            <div className="col-md-6 mt-4 mt-sm-0 pt-2 pt-sm-0">
              <div className="section-title ml-lg-5">
                <h5 className="title mb-4">
                  Let’s say an agribusiness in Africa wants to create a
                  zero-waste food co-op.
                </h5>
                <p className="text-muted font-16 d-flex align-items-center">
                  <img
                    src={imagePath5}
                    className="img-fluid rounded me-3"
                    alt=""
                    style={{ height: "2em", width: "auto" }}
                  ></img>
                  Morena launches a sustainable
                  freeze-dried foods co-op using agriiCOOP.
                </p>
                <p className="text-muted font-16 d-flex align-items-center">
                  <img
                    src={imagePath8}
                    className="img-fluid rounded me-3"
                    alt=""
                    style={{ height: "2em", width: "auto" }}
                  ></img>{" "}
                  Jess funds production in exchange for tokenized RWAs representing future outputs.
                </p>
                <p className="text-muted font-16 d-flex align-items-center">
                  <img
                    src={imagePath9}
                    className="img-fluid rounded me-3"
                    alt=""
                    style={{ height: "2em", width: "auto" }}
                  ></img>{" "}
                  Once production is complete, Jess can take delivery, trade, 
                  store, or donate her portion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="back-a-coop" className="section bg-light pt-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 text-center">
              <div className="section-title mb-4 pb-2">
                <h4 className="title mb-4 text-dark">Why Back Food Co-ops?</h4>
              </div>
            </div>
          </div>

          <div className="row mb-3 pb-4 mt-4">
            <div className="col-md-4 col-12 ">
              <div className="features text-center">
                <div>
                  <img
                    src={imagePath11}
                    className="avatar avatar-small mt-4"
                    alt="farming input unit"
                  />
                </div>

                <div className="content mt-4 pb-5">
                  <h5>Real-World Impact</h5>
                  <p className="text-muted font-16">
                    Support decentralized food co-ops that create jobs,
                    strengthen supply chains, and drive economic <br />
                    growth in real communities.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-12">
              <div className="features text-center">
                <div>
                  <img
                    src={imagePath12}
                    className="avatar avatar-small mt-4"
                    alt="off-taker unit"
                  />
                </div>

                <div className="content mt-4 pb-5">
                  <h5>On-Chain Transparency</h5>
                  <p className="text-muted font-16 mb-0">
                    All funds, trades, and governance decisions are recorded
                    on-chain, allowing co-op members to track financial flows
                    and verify data in real time.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-12 mt-5 mt-sm-0">
              <div className="features text-center">
                <div>
                  <img
                    src={imagePath13}
                    className="avatar avatar-small mt-4"
                    alt="agribusiness women unit"
                  />
                </div>

                <div className="content mt-4 pb-5">
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
                to="https://forms.gle/LazxXwDGrSnQ51sE8" target="_blank"
                className="mt-4 text-dark btn bg-white border-dark"
              >
                Fund Co-ops
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
    
  );
};
export default DesktopLandingPage;
