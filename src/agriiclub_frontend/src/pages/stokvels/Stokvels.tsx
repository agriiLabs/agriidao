import imageFarming from "../../assets/images/stokvels/farming-input.png";
import imageOffTaker from "../../assets/images/stokvels/off-taker.png";
import imageWomen from "../../assets/images/stokvels/agribusiness-women.png";
import imageEnergy from "../../assets/images/stokvels/energy-infrastructure.png";
import imageAgTech from "../../assets/images/stokvels/agtech.png";
import imageHemp from "../../assets/images/stokvels/hemp-cannabis.png";

const Stokvels = () => {
  return (
    <>
      {/* header */}
      <div className="header header-fixed header-logo-center">
        <a className="header-title">Stokvels</a>

        {/* <a href="#" data-toggle-theme className="header-icon header-icon-4">
              <i className="fas fa-lightbulb"></i>
            </a> */}
      </div>

      {/* body */}
      <div className="page-content header-clear-medium">
        <div className="card card-style">
          <div className="content">
            <p className="font-700  color-highlight font-15 opacity-90 mb-3 mt-n2">
              Stokvels: Community-Powered Agricultural Investment
            </p>
            <p className="font-15">
              Experience the future of agricultural investment with agriiClub
              Stokvels, where traditional community savings meet modern
              decentralised finance (DeFi). Our stokvels provide a unique
              opportunity for members to pool resources and invest in various
              agricultural projects, driving sustainable growth and economic
              empowerment in Africa.
            </p>
          </div>
        </div>

        <div className="card card-style">
          <div className="content">
            <p className="font-700  color-highlight font-15 opacity-90 mb-3 mt-n2">
              What Are Stokvels?
            </p>
            <p className="font-15">
              Stokvels, also known as Rotating Savings and Credit Associations
              (ROSCAs), are community-based financial groups where members
              contribute regular amounts of money to a collective fund. This
              fund is then used to support mutual financial goals and provide
              financial assistance to members.
            </p>
          </div>
        </div>

        <div className="card card-style">
          <div className="content">
            <p className="font-700 color-highlight font-15 opacity-90 mb-3 mt-n2">
              How agriiClub Stokvels Work
            </p>
            <p className="font-15">
              At agriiClub, we’ve evolved the traditional stokvel concept by
              integrating it with blockchain technology and DeFi principles:
            </p>
            <p className="font-15">
              <ul>
                <li>
                  <strong>Flexible Contributions:</strong> Unlike traditional
                  stokvels, agriiClub stokvels are not commitment-based. Members
                  can join and participate whenever they choose, without
                  long-term financial commitments.
                </li>
                <li>
                  <strong>Decentralised Governance:</strong> Each stokvel
                  operates autonomously, managed by its members through
                  democratic voting.
                </li>
                <li>
                  <strong>Tokenised Membership:</strong> Members join stokvels
                  using $AGRII tokens, contributing to various agricultural
                  initiatives.
                </li>
                <li>
                  <strong>Annual Royalties Distribution:</strong> Members earn
                  royalties from funded projects, which are distributed annually
                  based on contributions and collective decisions.
                </li>
              </ul>
            </p>
          </div>
        </div>

        <div className="card card-style">
          <div className="content">
            <p className="font-700 color-highlight font-15 opacity-90 mb-3 mt-n2">
              Types of Stokvels
            </p>
            <p className="font-15">
              <img
                src={imageFarming}
                width="30"
                alt="agriiClub icon"
                style={{ marginRight: "10px" }}
              />
              <strong>Farming Stokvel</strong> - Provides access to quality
              inputs like seeds, fertilizers, and machinery.
            </p>
            <p className="font-15">
              <img
                src={imageOffTaker}
                width="30"
                alt="agriiClub icon"
                style={{ marginRight: "10px" }}
              />
              <strong>Off Taker Stokvel</strong> - Aggregates and processes
              crops from smallholder farmers for market resale.
            </p>
            <p className="font-15">
              <img
                src={imageWomen}
                width="30"
                alt="agriiClub icon"
                style={{ marginRight: "10px" }}
              />
              <strong>Women Agribusiness Stokvel</strong> - Supports women in
              agriculture with capital to start and grow their businesses.
            </p>
            <p className="font-15">
              <img
                src={imageEnergy}
                width="30"
                alt="agriiClub icon"
                style={{ marginRight: "10px" }}
              />
              <strong>Energy & Infrastructure Stokvel</strong> - Invests in
              agricultural technology companies to drive innovation.
            </p>
            <p className="font-15">
              <img
                src={imageAgTech}
                width="30"
                alt="agriiClub icon"
                style={{ marginRight: "10px" }}
              />
              <strong>AgTech Stokvel</strong> - Invests in agricultural
              technology companies to drive innovation.
            </p>
            <p className="font-15">
              <img
                src={imageHemp}
                width="30"
                alt="agriiClub icon"
                style={{ marginRight: "10px" }}
              />
              <strong>Hemp & Cannabis Stokvel</strong> - Supports the hemp and
              cannabis value chain with necessary capital.
            </p>
          </div>
        </div>

        <div className="card card-style">
          <div className="content">
            <p className="font-700 color-highlight font-15 opacity-90 mb-3 mt-n2">
              Benefits of Joining a Stokvel
            </p>
            <p className="font-15">
              <ul>
                <li>
                  <strong>Collaborative Investment:</strong> Pool resources with
                  other members to support impactful agricultural projects.
                </li>
                <li>
                  <strong>Financial Empowerment:</strong> Earn annual royalties
                  and returns from successful projects, boosting your financial
                  growth.
                </li>
                <li>
                  <strong>Community Impact:</strong> Contribute to sustainable
                  development and food security in Africa.
                </li>
                <li>
                  <strong>Annual Royalties Distribution:</strong> Members earn
                  royalties from funded projects, which are distributed annually
                  based on contributions and collective decisions.
                </li>
              </ul>
            </p>
            <p className="font-15">
              Ready to make a difference? <strong>Join the agriiClub Stokvels waiting
              list today</strong> and be part of a community-driven approach to
              revolutionizing agriculture and fostering economic growth in
              Africa. Together, we can achieve more!
            </p>
          </div>
        </div>

        <div className="content"></div>
      </div>
    </>
  );
};

export default Stokvels;
