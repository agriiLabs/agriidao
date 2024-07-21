import imagePath from "../assets/images/agriiclub-logo.svg";

const Home = () => {
  
  return (
    <>
      {/* header */}
      <div className="header header-fixed header-logo-center">
        <a className="header-title">
          <img src={imagePath} width="100" alt="Default Profile" />
        </a>
      
        {/* <a href="#" data-toggle-theme className="header-icon header-icon-4">
          <i className="fas fa-lightbulb"></i>
        </a> */}
      </div>

      {/* body */}
      <div className="page-content header-clear-medium">
        <div className="card card-style">
          <div className="content">
            <p className="font-700  color-highlight font-15 opacity-90 mb-3 mt-n2">
            Welcome to agriiClub!
            </p>
            <p className="font-15">
              Thank you for joining agriiClub, the
              revolutionary platform transforming the African agricultural
              landscape. Engage with our vibrant community, earn social rewards,
              and soon explore innovative DeFi and asset tokenisation
              opportunities. Together, we're enhancing food security, empowering
              farmers, and driving sustainable growth across Africa. Dive in and
              be part of the change!
            </p>
          </div>
        </div>

        <div className="card card-style">
          <div className="content">
            <p className="font-700 color-highlight font-15 opacity-90 mb-3 mt-n2">
            Why agriiClub?
            </p>
            <p className="font-15">
            <ul>
                <li><strong>Social Rewards:</strong> Earn rewards for your interactions and contributions within the community.</li>
                <li><strong>DeFi Opportunities:</strong>   Participate in stokvels and royalty financing to support and invest in agricultural projects, including real-world agricultural assets (RWA).</li>
                <li><strong>Asset Tokenisation:</strong> Turn freeze-dried agricultural produce into tradable digital assets, opening up global markets and investment opportunities.</li>
                <li><strong>Decentralised Food Security:</strong> Contribute to a transparent, sustainable, and decentralised global food security system by supporting African agriculture and reducing food wastage.</li>
            </ul>
            </p>
          </div>
        </div>

        <div className="card card-style">
          <div className="content">
            <p className="font-700 color-highlight font-15 opacity-90 mb-3 mt-n2">
              Our Roadmap
            </p>
            <p className="font-15">
              <ul>
              <li><strong>Phase 1: Social Rewards (Now Live)</strong> - Earn rewards for engaging with the community.</li>
              <li><strong>Phase 2: DeFi Integration</strong> - Unlock financial tools to support agricultural projects, including RWA investments.</li>
              <li><strong>Phase 3: Asset Tokenisation</strong> - Transform freeze-dried agricultural produce into digital assets, enabling global trade and investment.</li>
              </ul>
              </p>
          </div>
        </div>

        <div className="content"></div>
      </div>
    </>
  );
};

export default Home;
