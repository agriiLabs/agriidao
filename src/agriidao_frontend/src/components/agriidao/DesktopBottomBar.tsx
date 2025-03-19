import React from "react";
import imagePath1 from "../../assets/images/icp-logo.png";
import imagePath from "../../assets/images/agriidao-logo-white.svg";
import imagePath2 from "../../assets/images/twitter.png"
import imagePath3 from "../../assets/images/linkedin.png"
import imagePath4 from "../../assets/images/oc.png"

const DesktopBottomBar = () => {
  return (
    <>
      <section className="bg-dark">
        <div className="container bg-dark pt-5">
          <div className="row mb-0">
            <div className="col-12">
              <div className="footer-py-60">
                <div className="row">
                  <div className="col-lg-4 col-12 mb-0 mb-md-4 pb-0 pb-md-2">
                    <a href="#" className="logo-footer">
                      <img src={imagePath} height="24" alt="" />
                    </a>
                    <p className="mt-4 font-17 text-white">
                      Developing decentralized infrastructure that enables
                      communities to create and operate transparent, efficient,
                      and sustainable food systems.
                    </p>
                    <ul className="list-unstyled social-icon foot-social-icon mb-0 mt-4">
                      <li className="list-inline-item mb-0">
                        <a
                          href="https://twitter.com/agrii_DAO"
                          target="_blank"
                          className="rounded"
                        >
                          <img src={imagePath2} height="30" alt="" />
                        </a>
                      </li>
                      <li className="list-inline-item mb-0">
                        <a
                          href="https://oc.app/community/gnr3a-2aaaa-aaaar-bd37a-cai/channel/1481150702"
                          target="_blank"
                          className="rounded"
                        >
                          <img src={imagePath4} height="30" alt="" />
                        </a>
                      </li>
                      <li className="list-inline-item mb-0">
                        <a
                          href="https://www.linkedin.com/company/agriidao/"
                          target="_blank"
                          className="rounded"
                        >
                          <img src={imagePath3} height="29" alt="" />
                        </a>
                      </li>
                      
                    
                    </ul>
                  </div>

                  <div className="col-lg-4 col-md-4 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0 text-white">
                    <h5 className="footer-head">Useful Links</h5>
                    <ul className="list-unstyled footer-list mt-4">
                      <li>
                        <a
                          href="https://docsend.com/view/2jsbhp2hxinuu83b" target="_blank"
                          className="text-foot text-white"
                        >
                          <i className="mdi mdi-chevron-right me-1"></i> SNS TGE Deck
                        </a>
                      </li>
                      <li>
                        <a
                          href="javascript:void(0)"
                          className="text-foot text-white"
                        >
                          <i className="mdi mdi-chevron-right me-1"></i> Freeze-dried RWAs Deck
                        </a>
                      </li>
                      {/* <li>
                        <a
                          href="javascript:void(0)"
                          className="text-foot text-white"
                        >
                          <i className="mdi mdi-chevron-right me-1"></i>{" "}
                          Documentation
                        </a>
                      </li>
                      <li>
                        <a
                          href="javascript:void(0)"
                          className="text-foot text-white"
                        >
                          <i className="mdi mdi-chevron-right me-1"></i>{" "}
                          Roadmap
                        </a>
                      </li> */}
                    </ul>
                  </div>

                  <div className="col-lg-3 col-md-4 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0 text-white">
                    <h5 className="footer-head">Newsletter</h5>
                    <p className="mt-4 font-17 text-white">
                      Sign up and receive the latest tips via email.
                    </p>
                    <form>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="foot-subscribe mb-3">
                        
                            <div className="form-icon position-relative">
                            <i
                                data-feather="mail"
                                className="mdi mdi-account icons text-dark"
                              ></i>
                              <input
                                type="email"
                                name="email"
                                id="emailsubscribe"
                                className="form-control ps-5 rounded"
                                placeholder="Your email : "
                                required
                                style={{paddingTop:"11px"}}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="foot-subscribe mb-3">
                            <div className="form-icon position-relative">
                              <i
                                data-feather="mail"
                                className="mdi mdi-email icons text-dark"
                              ></i>
                              <input
                                type="email"
                                name="email"
                                id="emailsubscribe"
                                className="form-control ps-5 rounded"
                                placeholder="Your email : "
                                required
                                style={{paddingTop:"11px"}}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="d-grid">
                            <input
                              type="submit"
                              id="submitsubscribe"
                              name="send"
                              className="text-white btn bg-dark border-white"
                              value="Subscribe"
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-dark ">
        <div className="footer-py-30 footer-bar ">
          <div className="container text-center pt-3">
            <div className="row align-items-center">
              <div className="col-sm-6">
                <div className="text-sm-start">
                  <p className="mb-0 text-white font-16">
                    ©{" "}
                    {new Date().getFullYear()} {" "}
                    agriiDAO with <i className="mdi mdi-heart text-danger"></i> by{" "}
                    <a
                      href="https://agriilabs.com/"
                      target="_blank"
                      className="text-reset"
                    >
                      agriiLabs
                    </a>
                  </p>
                </div>
              </div>

              <div className="col-sm-6 mt-4 mt-sm-0 pt-2 pt-sm-0">
                <ul className="list-unstyled text-sm-end mb-0">
                  <a href="https://internetcomputer.org" target="_blank">
                    <img
                      src={imagePath1}
                      className="avatar avatar-ex-sm"
                      title="ICP"
                      alt="ICP logo"
                      height="20"
                    />
                  </a>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default DesktopBottomBar;
