import React, { useEffect, useState } from "react";

const TotalRejected = () => {

    return (
        <>
            <div className="header header-fixed header-logo-center">
                <a href="#" className="header-title">Pending Rejected</a>
                <a href="#" data-back-button className="header-icon header-icon-1"><i className="fas fa-arrow-left"></i></a>
                <a href="#" data-toggle-theme className="header-icon header-icon-4"><i className="fas fa-lightbulb"></i></a>
            </div>

            <div className="page-content header-clear-medium">

                <div className="card card-style">
                    <div className="content mb-0">                      
                        <p>You have not completed any tasks yet</p>                        
                    </div>
                </div>

            </div>
        </>
    );
};

export default TotalRejected;