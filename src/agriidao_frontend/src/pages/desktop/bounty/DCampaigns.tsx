import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/Context";
import { Link, useNavigate, useParams } from "react-router-dom";
import imagePath1 from "../../../assets/images/rewards-banner.png";

const DCampaigns = () => {
  const { bountyActor } = useAuth();
  const { id } = useParams();
  const [campaigns, setCampaigns] = useState<any[] | null>(null);
  const navigate = useNavigate();
  const cardHeightHero = 200;

  let bountyName = "Marketing Bounty";

  useEffect(() => {
    getBountyCampaigns();
  }, [id]);

  const getBountyCampaigns = async () => {
    try {
      const res = await bountyActor?.getAllLatestBountyCampaignsByName(
        bountyName
      );
      setCampaigns(res ?? null);
    } catch (error) {
      console.error("Error fetching bounty campaigns:", error);
      setCampaigns(null);
    }
  };
  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h5 className="mb-0">Campaigns</h5>
        </div>

        {/* <div className="mb-0 position-relative">
          <select
            className="form-select form-control"
            id="marketLocation"
            value={selectedMarketLocation?.countryId || ""}
            onChange={handleMarketChange}
          >
            <option value="">Select Market</option>
            {markets.map((market, index) => (
              <option key={index} value={market.countryId}>
                <CountryName id={market.countryId} />
              </option>
            ))}
          </select>
        </div> */}
      </div>

      <div className="row row-cols-md-2 row-cols-lg-3 row-cols-1">
        {campaigns && campaigns.length > 0 ? (
          campaigns.map((campaign, index) => (
            <div className="col mt-4" key={index}>
              <div className="card border-0 work-container work-classic rounded overflow-hidden">
                <div className="card-body p-0">
                  <Link
                    to={`campaign-detail/${campaign?.id}`}
                    className="d-flex flex-column"
                  >
                    <img
                      src={imagePath1}
                      className="img-fluid"
                      alt="work-image"
                    />
                    <div className="content p-3">
                      <div className="d-flex align-items-center">
                        <img
                          className="rounded-xl me-3"
                          src={campaign.campaignPic}
                          width="40"
                          height="40"
                          alt={campaign.name}
                        />
                        <div className="ms-2 w-100">
                          <h6 className="mb-0 text-dark">{campaign.name}</h6>
                          <div className="d-flex justify-content-between">
                            <h6 className="text-muted tag mb-0">
                              {bountyName}
                            </h6>
                            <h6 className="text-muted tag mb-0">
                              {campaign.totalValue} AGRII
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center w-100">No Campaigns Listed</p>
        )}
      </div>
    </>
  );
};

export default DCampaigns;
