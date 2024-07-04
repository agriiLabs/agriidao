import React from "react";

function GetStarted() {
  return (
    <>
      <div className="header header-fixed header-transparent header-logo-center">
        <a href="index.html" className="header-title color-theme">agriiclub</a>
        <a href="#" data-back-button className="header-icon color-theme header-icon-1"><i className="fas fa-arrow-left"></i></a>
        <a href="#" data-toggle-theme className="header-icon color-theme header-icon-4"><i className="fas fa-lightbulb"></i></a>
    </div>

        
    <div className="page-content pb-0">
    
        <div className="splide single-slider slider-no-arrows" id="walkthrough-slider">
            <div className="splide__track">
                <div className="splide__list">
                    <div className="splide__slide">
                        <div data-card-height="cover" className="card">
                            <div className="card-center text-center">
                                <div className="content mt-n5">
                                    <img className="mb-3 mx-auto" width="320" src="images/undraw/1.svg"/>
                                    <h1 className="mt-5 mb-0 font-30">StickyMobile 3.0</h1>
                                    <p className="mt-n1 color-highlight font-12">Simply the Best Mobile Webkit on Envato</p>
                                    <p className="boxed-text-xl">
                                        Powered by Boostrap 4.4 with AJAX Transitions providing full
                                        PWA, RTL and Dark Mode integrations!
                                    </p>
                                </div>
                            </div>
                        </div>         
                    </div>
                    <div className="splide__slide">
                        <div data-card-height="cover" className="card">
                            <div className="card-center text-center">
                                <div className="content mt-n5">
                                    <img className="mb-3 mx-auto" width="250" src="images/undraw/2.svg"/>
                                    <h1 className="mt-5 mb-0 font-30">Built for You</h1>
                                    <p className="mt-n1 color-highlight font-12">We listen to all your Feedback</p>
                                    <p className="boxed-text-xl">
                                        Sticky 3.0 is now powered by Bootstrap and is much more powerful than before. 
                                    </p>
                                </div>
                            </div>
                        </div>         
                    </div>
                    <div className="splide__slide">
                        <div data-card-height="cover" className="card">
                            <div className="card-center text-center">
                                <div className="content mt-n5">
                                    <img className="mb-3 mx-auto" width="280" src="images/undraw/3.svg"/>
                                    <h1 className="mt-5 mb-0 font-30">Easy to Use</h1>
                                    <p className="mt-n1 color-highlight font-12">Bootstrap Based Code. For Everyone</p>
                                    <p className="boxed-text-xl">
                                        Documentations written with novice users and developers in mind. We're always here for you! 
                                    </p>
                                </div>
                            </div>
                        </div>         
                    </div>
                    <div className="splide__slide">
                        <div data-card-height="cover" className="card">
                            <div className="card-center text-center">
                                <div className="content mt-n5">
                                    <img className="mb-3 mx-auto" width="270" src="images/undraw/5.svg"/>
                                    <h1 className="mt-5 mb-0 font-28">Performance Monster</h1>
                                    <p className="mt-n1 color-highlight font-12">It's Mobile. So it's super, super fast! Really!</p>
                                    <p className="boxed-text-xl">
                                        Unlike our competitors, we test our products on over 50 live, actual devices. Not emulators. We test in 
                                        real world conditions for maximum performance.
                                    </p>
                                </div>
                            </div>
                        </div>  
                    </div>
                    <div className="splide__slide">
                        <div data-card-height="cover" className="card">
                            <div className="card-center text-center">
                                <div className="content mt-n5">
                                    <img className="mb-3 mx-auto" width="270" src="images/undraw/4.svg"/>
                                    <h1 className="mt-5 mb-0 font-28">Fingertip Features</h1>
                                    <p className="mt-n1 color-highlight font-12">Everything is built for your Mobile</p>
                                    <p className="boxed-text-xl">
                                        Following strict guideliness for your fingertips to enjoy ever second of tapping through
                                        the features StickyMobile has to offer. Pixel perfect built.
                                    </p>
                                </div>
                            </div>
                        </div>   
                    </div>
                    <div className="splide__slide">
                        <div data-card-height="cover" className="card">
                            <div className="card-center text-center">
                                <div className="content mt-n5">
                                    <img className="mb-3 mx-auto" width="285" src="images/undraw/6.svg"/>
                                    <h1 className="mt-5 mb-0 font-28">And much more!</h1>
                                    <p className="mt-n1 color-highlight font-12">All packed together with hundreds of features.</p>
                                    <p className="boxed-text-xl">
                                        Sticky is not just your average template. 
                                        We use Bootstrap to bring you the best product possible.
                                    </p>
                                </div>
                            </div>
                        </div>      
                    </div>
                </div>
            </div>
        </div>
       
        <div className="cover-button-bottom">
            <a href="#" data-back-button className="btn scale-box btn-m mt-5 btn-center-l rounded-l shadow-xl bg-highlight font-800 text-uppercase">Get Started</a>
        </div>
        <a href="#" className="cover-next slider-next color-gray-dark">Next<i className="fa fa-angle-right me-4 ms-3"></i></a>
        <a href="#" className="cover-prev slider-prev color-gray-dark"><i className="fa fa-angle-left me-4 ms-4"></i>Previous</a>

        

    </div>
    </>
  );
}

export default GetStarted;

