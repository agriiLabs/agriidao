import imagePath from "../../assets/images/agriidao-logo.svg";
import imagePath1 from "../../assets/images/busi02.jpg";
import imagePath2 from "../../assets/images/default-user-profile.png";


const Home = () => {
  const cardHeight = 240;
  const cardHeightHero = 2000;

  return (
    <>
      {/* header */}
      <div className="header header-fixed header-logo-center">
        <a className="header-title">
          <img src={imagePath} width="100" alt="Default Profile" />
        </a>

        <a href="#" data-toggle-theme className="header-icon header-icon-4">
          {/* <i className="fas fa-lightbulb"></i> */}
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
        </a>
      </div>

      {/* body */}
      <div className="page-content header-clear-medium">
        <img
        src={imagePath1}
        
        className="preload-img img-fluid rounded-xs entered loaded"
        alt="img"
        data-ll-status="loaded"
      />

        <div className="card">
          <div className="card-bottom mx-4 mb-4">
            <h1 className="color-white mt-2 font-31">Digitizing and Decentralizing African Food Systems.</h1>
            {/* <p className="color-highlight font-12 mt-n1 mb-2">
              The Best Mobile Author on Envato
            </p>
            <p className="color-white opacity-80 mb-0">
              We've builit a reputation. We care about all our customers and we
              give 150% attention to detail for perfect quality.
            </p> */}
          </div>
          {/* <div className="card-overlay-infinite preload-img" data-src="images/pictures/_bg-infinite.jpg"></div> */}
          <div
            data-card-height={cardHeightHero}
            className="card-overlay-infinite preload-img"
            style={{
              backgroundImage: `url(${imagePath1})`,
              height: `${cardHeightHero}px`,

              // backgroundSize: "cover",
              // backgroundPosition: "center",
            }}
          ></div>
        </div>

        <div
          className="card card-style"
          style={{
            marginLeft: 0,
            marginRight: 0,
          }}
        >
          <img src={imagePath1} alt="img" />
          <div className="content">
            <h2>Empowering Farmers, Creating a Zero-Waste Future</h2>
            <p className="mb-2">
              We always strive to give the best possible service to our
              customers. We are always available for support and we are always
              happy to help.
            </p>
            <a
              href="#"
              className="color-highlight text-decoration-underline font-500"
            >
              Find out More
            </a>
          </div>
        </div>

        {/* <div
          data-card-height={cardHeight}
          className="card card-style preload-img"
          style={{
            backgroundImage: `url(${imagePath1})`,
            height: `${cardHeight}px`,
          }}
        >
          <div className="card-center text-center">
            <h1 className="color-white fa-2x">Decentralising Food Systems </h1>
            <br />
            <p className="color-white opacity-70 font-11 mb-n5">Take a tour</p>
          </div>

          <img
            src={imagePath1}
            className="preload-img img-fluid rounded-xs entered loaded"
            alt="img"
            data-ll-status="loaded"
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: -1,
            }}
          />
          <div className="card-overlay bg-black opacity-70"></div>
        </div> */}

        <div
          className="card card-style"
          style={{
            marginLeft: 0,
            marginRight: 0,
          }}
        >
          <img src={imagePath1} alt="img" />
          <div className="content">
            <h2>Nutritional Value – Preserving What's Important</h2>
            <p className="mb-2">
              We always strive to give the best possible service to our
              customers. We are always available for support and we are always
              happy to help.
            </p>
            <a
              href="#"
              className="color-highlight text-decoration-underline font-500"
            >
              Find out More
            </a>
          </div>
        </div>

        <div
          className="card card-style mt-5"
          style={{
            marginLeft: 0,
            marginRight: 0,
          }}
        >
          <div className="content">
            <h3>How agriiDAO works</h3>
            <p>
              We've simplified the process for both farmers and buyers, ensuring
              a seamless journey from farm to market, while preserving
              nutritional value at every step.
            </p>
            <div className="d-flex">
              <div className="align-self-center">
                <h1 className="fa-4x pe-4 color-blue-dark">01</h1>
              </div>
              <div>
                <h3>Empowering Farmers</h3>
                <p className="mb-4">
                  Any great project starts with an idea from where can design
                  the perfect product for you.
                </p>
              </div>
            </div>
            <div className="divider"></div>
            <div className="d-flex mb-4">
              <div className="align-self-center">
                <h1 className="fa-4x pe-4 color-red-dark">02</h1>
              </div>
              <div>
                <h3>Tokenisation of Nutrient-Dense Produce</h3>
                <p>
                  We then take the idea and draw the functional concept, from
                  where we can see how to code it.
                </p>
              </div>
            </div>
            <div className="divider"></div>
            <div className="d-flex">
              <div className="align-self-center">
                <h1 className="fa-4x pe-4 color-green-dark">03</h1>
              </div>
              <div>
                <h3>Flexible Assest Management Options</h3>
                <p>
                  Using the plaform we deem perfect for our job, we code the end
                  product into the beauty you see now.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="card card-style"
          style={{
            marginLeft: 0,
            marginRight: 0,
          }}
        >
          <img src={imagePath1} alt="img" />
          <div className="content">
            <h2>Our Ecosystem</h2>
            <p className="mb-2">
              Our ecosystem is designed to provide transparency, liquidity, and market access througha suite of decentralized applications (DApps) while ensuring the preservation of nutritional value.
            </p>
            <a
              href="#"
              className="color-highlight text-decoration-underline font-500"
            >
              Find out More
            </a>
          </div>
        </div>

        <div className="content"></div>
      </div>
    </>
  );
};

export default Home;
