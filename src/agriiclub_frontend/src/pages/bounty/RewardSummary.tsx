import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/Context";


const RewardSummary = () => {
    // const { bounty_commodityActor } = useAuth();
    const { id } = useParams();
    const [campaign, setCampaign] = useState([]);

    // useEffect(() => {
    //     getAllCampaigns();
    // });

    // const getAllCampaigns = async () => {
    //     const res: Response = await bounty_commodityActor?.getAllCampaigns();
    //     console.log(res);
    //     if (res.ok) {
    //         setCampaign(res.ok);
    //         } else {
    //             console.log(res.err);
    //         }
    //     };

        return (
            <>
                {/* header */}
                <div className="header header-fixed header-logo-center">
                    <a className="header-title">Reward Summary</a>
                    <a href="#" data-back-button className="header-icon header-icon-1"><i className="fas fa-arrow-left"></i></a>
                    <a href="#" data-toggle-theme className="header-icon header-icon-4"><i className="fas fa-lightbulb"></i></a>
                </div>
                
                {/* body */}
                <div className="page-content header-clear-medium">

                    <div className="card card-style">
                        <div className="content">
                            <p className="font-700 text-uppercase color-highlight font-12 opacity-70 mb-3 mt-n2">Submission Summary</p>
                            <Link 
                                to={'/total-submissions'} className="d-flex">
                                <div className="align-self-center">
                                    <p className="font-15 mb-n2">Total Submissions</p>
                                </div>
                                <div className="align-self-center ms-auto">
                                    <p className="font-15 mb-n2">10</p>
                                </div>
                            </Link>
                            <div className="divider divider-margins w-100 mt-2 mb-3"></div>
                            <Link 
                                to={'/total-pending'} className="d-flex">
                                <div className="align-self-center">
                                    <p className="font-15 mb-n2">Total Pending</p>
                                </div>
                                <div className="align-self-center ms-auto">
                                    <p className="font-15 mb-0">5</p>
                                </div>
                            </Link>
                            <div className="divider divider-margins w-100 mt-2 mb-3"></div>
                            <Link 
                                to={'/total-accepted'} className="d-flex">
                                <div className="align-self-center">
                                    <p className="font-15 mb-n2">Total Accepted</p>
                                </div>
                                <div className="align-self-center ms-auto">
                                    <p className="font-15 mb-0">5</p>
                                </div>
                            </Link>
                            <div className="divider divider-margins w-100 mt-2 mb-3"></div>
                            <Link 
                                to={'/total-rejected'} className="d-flex">
                                <div className="align-self-center">
                                    <p className="font-15 mb-n2">Total Rejected</p>
                                </div>
                                <div className="align-self-center ms-auto">
                                    <p className="font-15 mb-0">0</p>
                                </div>
                            </Link>            
                                    
                        </div>
                    </div>

                    <div className="card card-style">
                        <div className="content">
                            <p className="font-700 text-uppercase color-highlight font-12 opacity-70 mb-3 mt-n2">Payments Summary</p>
                            <div className="row mb-0">
                                <div className="col-6">
                                    <p className="font-15">Total Payments</p>
                                </div>
                                <div className="col-6">
                                    <p className="font-15 text-end mb-0"> 20 AGRII</p>
                                    <p className="font-12 opacity-50 text-end">10 USD</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    
                    

                    <div className="content"><a href="{% url 'public_user:leaderboard' %}"
                        className="btn btn-full btn-m bg-blue-dark rounded-sm text-uppercase font-800 mt-3">View Leaderboard</a>
                    </div>

                    <div className="content"><Link to={'/reward-campaigns'} 
                        className="btn btn-full btn-m bg-blue-dark rounded-sm text-uppercase font-800 mt-3">View Campaigns</Link>
                    </div>



                </div>
                
            </>
        );
    };
export default RewardSummary;
