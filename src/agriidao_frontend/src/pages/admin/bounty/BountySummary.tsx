import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/Context";
import { Response } from "../../utils/Types";


const BountySummary = () => {

  const { bountyActor } = useAuth(); //get agriichainBackend from the global context
  const { id } = useParams(); //how to access the url parameter i.e id
  const [bounty, setBounty] = useState(null);

  //formatting the date
  const formatDate = (timestamp: bigint): string => {
    const date = new Date(Number(timestamp));
    const options = { month: "long", day: "numeric", year: "numeric" };
    return date.toLocaleDateString();
  };

  //runs the function inside the body when the state of a given parameter changes.
  // in this case will run when it receives the id, in another case it could run as the page loads or if the state changes in another function as long
  useEffect(() => {
    getBounty();
  }, [id]);


  
  const getBounty = async () => {
    const res: Response = await bountyActor.getBountyLatest(id);

    if (res.ok) {
      // formatting some fields of the bounty, in this case the start & end dates
      let formattedBounty = {
        ...res.ok, // using a spread operator (...) to represent the other field that are not being formatted
        startDate: res.ok.startDate,
        endDate: res.ok.endDate,
      };
      setBounty(formattedBounty);
    } else {
      console.log(res.err);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="page-title-box">
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a href="javascript: void(0);">InventoryClub</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="javascript: void(0);">Bounties</a>
                </li>
                <li className="breadcrumb-item active">Bounty Summary</li>
              </ol>
            </div>
            <h4 className="page-title">Bounty Summary</h4>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-4 col-xl-4">
          <div className="card-box text-center">
            <div className="text-left mt-3">
              <h4 className="text-uppercase">{bounty?.name}</h4>
              <br />
              <dl className="row">
                <dt className="col-sm-5">Total Value</dt>
                <dd className="col-sm-7">{bounty?.bountyPool}</dd>
                <dt className="col-sm-5">Live</dt>
                <dd className="col-sm-7">
                  {bounty?.isLive ? "true" : "false"}
                </dd>
              </dl>
            </div>

            <div className="row">
              <div className="col-md-12">
                <Link
                  to={`/rewards/bounty/campaigns/${bounty?.id}`}
                  type="button"
                  className="btn btn-md btn-block btn-blue"
                >
                  Campaigns
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-8 col-xl-8">
          <div className="card-box">
            <h5 className="mb-3 text-uppercase bg-light p-2">
              <i className="mdi mdi-earth mr-1"></i> Bounty Details
            </h5>
            <dl className="row">
              <dt className="col-sm-5">Total Tokens</dt>
              <dd className="col-sm-7">{bounty?.bountyPool}</dd>
              <dt className="col-sm-5">Available Balance</dt>
              <dd className="col-sm-7">{bounty?.bountyPool}</dd>
              <dt className="col-sm-5">Bounty Type</dt>
              <dd className="col-sm-7">{bounty?.acCategoryId}</dd>
              <dt className="col-sm-5 ">Start Date</dt>
              <dd className="col-sm-7">{bounty?.startDate}</dd>
              <dt className="col-sm-5">End Date</dt>
              <dd className="col-sm-7">{bounty?.endDate}</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BountySummary;
