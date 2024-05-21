import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/Context";
import { Link, useParams } from "react-router-dom";

const RewardCampaigns = () => {
    const {bounty_commodityActor} = useAuth();
    const {id} = useParams();
    const [campaigns, setCampaigns] = useState<any[]|null>(null);

    let bountyName = "Marketing Bounty";

    useEffect(() => {
        getBountyCampaigns()
    }, [id]);

    const getBountyCampaigns = async () => {
        try {
            const res = await bounty_commodityActor?.getAllLatestBountyCampaignsByName(bountyName);
            setCampaigns(res ?? null);
        } catch (error) {
            console.log("Error fetching bounty campaigns:", error);
            setCampaigns(null);
        } 
        console.log("available campigns", setCampaigns)
    };
    
    return (
        <>
           <div className="header header-fixed header-logo-center">
                <a href="#" className="header-title">Reward Campaigns</a>
                <a href="#" data-back-button className="header-icon header-icon-1"><i className="fas fa-arrow-left"></i></a>
                <a href="#" data-toggle-theme className="header-icon header-icon-4"><i className="fas fa-lightbulb"></i></a>
            </div>
        
            <div className="page-content header-clear-medium">
                <div className="card card-style">
                <div className="content mb-0">
                        {campaigns && campaigns.length > 0 ? (
                            campaigns.map((campaigns, index) => (
                                <a href="#" className="d-flex mb-3" key={index}>
                                    <div className="align-self-center">
                                        <img className="rounded-xl me-3" src={campaigns.campaignPic} data-src={campaigns.campaignPic} width={campaigns.campaignPic}
                                            height={campaigns.campaignPic} alt={campaigns.name}/>
                                    </div>
                                    <div className="align-self-center">
                                        <p className="mb-n2 font-16">{campaigns.name}</p>
                                        <p className="font-11 opacity-60">{campaigns.campaignType}</p>
                                    </div>
                                    <div className="align-self-center ms-auto text-end">
                                        <p className="mb-n2 font-16">
                                            {campaigns.totalValue} AGRII
                                        </p>
                                        <p className="font-11 opacity-60">fiat value</p>
                                    </div>
                                </a>
                            )) 
                        ) : (
                            <p>No Campaigns Listed</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
export default RewardCampaigns;