import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/Context";
import { Response } from "../../../utils/Types";

const BountySummary = () => {
  const { bountyActor } = useAuth(); //get agriichainBackend from the global context
  const { id } = useParams(); //how to access the url parameter i.e id
  interface Bounty {
    startDate: string;
    endDate: string;
    id: string;
    availableBal: number;
    timeStamp: bigint;
    name: string;
    createdBy: string;
    bountyPool: number;
    isLive: boolean;
    acCategoryId: string;
    isDelete: boolean;
  }

  const [bounty, setBounty] = useState<Bounty | null>(null);

  const formatDate = (timestamp: bigint): string => {
    const date = new Date(Number(timestamp));
    const options = { month: "long", day: "numeric", year: "numeric" };
    return date.toLocaleDateString();
  };

  useEffect(() => {
    getBounty();
  }, [id]);

  const getBounty = async () => {
    if (!id) {
      console.error("Bounty ID is not defined");
      return;
    }

    let res = await bountyActor?.getBountyLatest(id);
    if (res && "ok" in res) {
      let formattedBounty = {
        ...res.ok,
        startDate: res.ok.startDate,
        endDate: res.ok.endDate,
      };
      setBounty(formattedBounty);
    } else if (res && "err" in res) {
      console.error(res.err);
    }
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h5 className="mb-0">Bounty Summary</h5>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12 mt-4">
          <div className="card rounded shadow border-0 p-4">
            <div className="mt-4">
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
              <div className="mt-3">
                <Link
                  to={`/rewards/bounty/campaigns/${bounty?.id}`}
                  type="button"
                  className="btn btn-outline-dark col-sm-12"
                >
                  Campaigns
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-8 col-xl-8">
          <div className="col-xl-12 mt-4">
            <div className="card rounded shadow border-0 p-4">
              <div className="d-flex justify-content-between mb-4">
                <h5 className="mb-0">Bounty Details</h5>
              </div>
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
    </>
  );
};

export default BountySummary;
