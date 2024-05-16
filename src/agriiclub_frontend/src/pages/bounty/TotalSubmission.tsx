import React, { useEffect, useState } from "react";

const TotalSubmission = () => {

    return (
        <>
            <div className="header header-fixed header-logo-center">
                <a href="#" className="header-title">All Submissions</a>
                <a href="#" data-back-button className="header-icon header-icon-1"><i className="fas fa-arrow-left"></i></a>
                <a href="#" data-toggle-theme className="header-icon header-icon-4"><i className="fas fa-lightbulb"></i></a>
            </div>

            <div className="page-content header-clear-medium">

                <div className="card card-style">
                    <div className="content mb-0">

                       
                        <a href="#" data-menu="menu-submission-{{forloop.counter}}" className="d-flex mb-3">
                            <div className="align-self-center">
                                
                                <img className="rounded-xl me-3" src="{{ im.url }}" data-src="{{im.ur}}" width="{{ im.width }}"
                                    height="{{ im.height }}"/>
                                
                            </div>
                            <div className="align-self-center">
                                <p className="mb-n2 font-16">X</p>
                                <p className="font-11 opacity-60">Follow</p>
                            </div>
                            <div className="align-self-center ms-auto text-end">
                                <p className="mb-n2 font-16">
                                    May. 13, 2024
                                </p>
                                <p className="font-11 opacity-60">Complete</p>
                            </div>
                        </a>
                        

                    </div>
                </div>

            </div>
        </>
    );
};

export default TotalSubmission;