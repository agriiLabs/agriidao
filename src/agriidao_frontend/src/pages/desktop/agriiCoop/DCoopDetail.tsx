import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Coop } from "../../../../../declarations/coop_manager/coop_manager.did";
import getCoopActor from "../../coops/components/CoopActor";
import { ckUSDCe6s } from "../../../constants/canisters_config";
import DCoopCardProps from "./components/DCoopCard";

const DCoopDetail = () => {
  const { id } = useParams();
  const [coop, setCoop] = useState<Coop | null>(null);
  const [allocatedUnits, setAllocatedUnits] = useState<number>(0);
  const [unitPrice, setUnitPrice] = useState(0);
  const [managementFee, setManagementFee] = useState(0);

  useEffect(() => {
    if (id) {
      getCoopDetails();
    }
  }, [id]);  

  const getCoopDetails = async () => {
    try {
      if (!id) {
        console.error("Coop ID is undefined");
        return;
      }
  
      const coopActor = await getCoopActor(id);
      const coopDetails = await coopActor.getDetails();
      const unitPriceValue = Number(coopDetails.unitPrice) || 0;
      const managementFeeValue = Number(coopDetails.managementFee) || 0;
  
      setUnitPrice(unitPriceValue / ckUSDCe6s);
      setManagementFee(managementFeeValue / 100);
  
      if (!coopDetails) {
        console.error("No details found for this Co-op ID:", id);
        return;
      }
  
      setCoop({ ...coopDetails }); 
    } catch (error) {
      console.error("Error fetching co-op details:", error);
    }
  };
  

  useEffect(() => {
    if (!coop) return;
    const totalUnit = Number(coop.totalUnit) || 0;
    const availableUnit = Number(coop.availableUnit) || 0;
    setAllocatedUnits(totalUnit - availableUnit);
  }, [coop]);

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h5 className="mb-0">Co-op Detail</h5>
        </div>
        <div className="mb-0 position-relative">
          <NavLink
            to={`/d/coop-units/${id}`}
            className="btn btn-outline-dark col-sm-12"
          >
            Get {coop?.ticker} Units
          </NavLink>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-4">
        <DCoopCardProps coop={coop} />
        </div>
        <div className="col-xl-8">
          <div className="col-xl-12 mt-4">
            <div className="card rounded shadow border-0 p-4">
              <div className="d-flex justify-content-between mb-4">
                <h5 className="mb-0">Overview</h5>
              </div>

              <dl className="row">
                <dt className="col-sm-4">Unit Price</dt>
                <dd className="col-sm-8 text-end">
                  {unitPrice.toFixed(2)} USD
                </dd>
                <dt className="col-sm-6">Issued Units</dt>
                <dd className="col-sm-6 text-end">
                  {allocatedUnits} {coop?.ticker}
                </dd>
                <dt className="col-sm-6">Available Units</dt>
                <dd className="col-sm-6 text-end">
                  {coop?.availableUnit?.toString()} {coop?.ticker}
                </dd>
                <dt className="col-sm-6">Total Units</dt>
                <dd className="col-sm-6 text-end">
                  {coop?.totalUnit?.toString()} {coop?.ticker}
                </dd>
                <dt className="col-sm-6">Lock Period</dt>
                <dd className="col-sm-6 text-end">
                  {coop?.lockPeriod?.toString()} days
                </dd>
                <dt className="col-sm-6">Payout Frequency</dt>
                <dd className="col-sm-6 text-end">
                  Every {coop?.payoutFrequency?.toString()} days
                </dd>
                <dt className="col-sm-6">Management Fee</dt>
                <dd className="col-sm-6 text-end">{managementFee}%</dd>
              </dl>
            </div>
          </div>
          <div className="col-xl-12 mt-4">
            <div className="card rounded shadow border-0 p-4">
              <div className="d-flex justify-content-between mb-4">
                <h5 className="mb-0">Description</h5>
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: coop?.description || "" }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-xl-8 mt-4">
        <div className="card border-0"></div>
      </div>
    </>
  );
};

export default DCoopDetail;
