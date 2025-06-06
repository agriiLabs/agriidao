import { useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import getCoopActor from "./components/CoopActor";
import { Coop } from "../../../../declarations/coop_manager/coop_manager.did";
import { useState } from "react";
import ProfileClick from "../profile/component/ProfileClick";
import imagePath2 from "../../assets/images/co-ops-default.png";
import { useAuth } from "../../hooks/Context";
import { Principal } from "@dfinity/principal";
import DescriptionModal from "./components/DescriptionModal";
import { ckUSDCe6s } from "../../constants/canisters_config";

const CoopDetail = () => {
  const { coopIndexerActor } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [coop, setCoop] = useState<Coop | null>(null);
  const [allocatedUnits, setAllocatedUnits] = useState<number>(0);
  const [membersCount, setMembersCount] = useState<{ [key: string]: number }>(
    {}
  );
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);

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
  
      if (!coopDetails) {
        console.error("No details found for this Co-op ID:", id);
        return;
      }
  
      console.log("Fetched Co-op Details:", coopDetails);
      setCoop(coopDetails);
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

  useEffect(() => {
      if (!coop) return;
      getCoopMembers();
    }, [coop]);
 
  const getCoopMembers = async () => {
    let res = await coopIndexerActor?.getAllMemberships();
    if (res) {
      const membershipCounts: { [key: string]: number } = {};
      res.forEach((membership) => {
        const coopId = membership.coopId.toText();
        membershipCounts[coopId] = (membershipCounts[coopId] || 0) + 1;
      });

      setMembersCount(membershipCounts);
    }
  };

  const handleDescriptionModal = () => {
    setShowDescriptionModal(!showDescriptionModal);
  };

  const handleCoopParticipation = () => {
   navigate(`/coop-units/${id}`);
  }

  const managementFee = coop?.managementFee ?? 0; 
  const formattedFee = parseFloat((Number(managementFee) / ckUSDCe6s).toFixed(2));
  const unitPrice = coop?.unitPrice ?? 0;
  const formattedUnitPrice = parseFloat((Number(unitPrice) / ckUSDCe6s).toFixed(2));

  return (
    <> 
      <div className="header header-fixed header-logo-center">
        <a href="#" className="header-title">
          CO-OP Details
        </a>
        <button
          onClick={() => window.history.back()}
          data-back-button
          className="header-icon header-icon-1"
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        <ProfileClick />
      </div>

      <div className="page-content header-clear-medium ">
        <img
          className="mx-auto shadow-xl rounded-circle over-card preload-img"
          src={imagePath2}
          data-src={"#"}
          width="80"
          height="80"
          alt={"Default Co-op Image"}
          style={{
            marginBottom: "-62px",
          }}
        />

        <div style={{ paddingTop: "60px" }} className="card card-style">
          <div className="content">
            <p className="text-center font-22">{coop?.name} ({coop?.ticker})</p>
          </div>
        </div> 

        <div className="card card-style">
          <div className="content">
            <div className="row mb-0">
              <div className="col-12 ps-4">
                <div className="d-flex">
                  <div>
                    <p className="font-14">Total Contributions</p>
                  </div>
                  <div className="ms-auto">
                    <p className="font-14">
                      {(allocatedUnits * (Number(coop?.unitPrice)/ckUSDCe6s))} USD
                    </p>
                  </div>
                </div>

                <div className="d-flex">
                  <div>
                    <p className="font-14">Members</p>
                  </div>
                  <div className="ms-auto">
                    <p className="font-14">{membersCount[id ?? ""] ?? 0}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card card-style">
          <div className="content mb-0">
            <p>{coop?.summary}</p>
            <div
              className="accordion"
              onClick={(e) => {
                e.preventDefault();
                handleDescriptionModal();
              }}
            >
              <p
                className="btn accordion-btn opacity-80"
                style={{
                  marginBottom: "0",
                  paddingLeft: "0",
                }}
              >
                <span
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                    marginBottom: "0",
                  }}
                >
                  Read More
                </span>
              </p>
            </div>
          </div>
          
        </div>

        <div className="card card-style">
          <div className="content mb-0">
            <div className="row mb-0">
              <div className="col-6 mb-2">
                <p className="font-14 mt-1">Unit Price</p>
              </div>
              <div className="col-6">
                <p className="font-14 text-end mt-1">{formattedUnitPrice} USD</p>
              </div>
              <div className="col-6 mb-2">
                <p className="font-14 mt-1">Issued Units</p>
              </div>
              <div className="col-6">
                <p className="font-14 text-end mt-1">
                  {allocatedUnits} {coop?.ticker}
                </p>
              </div>
              <div className="col-6 mb-2">
                <p className="font-14 mt-1">Available Units</p>
              </div>
              <div className="col-6">
                <p className="font-14 text-end mt-1">
                  {coop?.availableUnit?.toString()} {coop?.ticker}
                </p>
              </div>
              <div className="col-6 mb-2">
                <p className="font-14 mt-1">Total Units</p>
              </div>
              <div className="col-6">
                <p className="text-end mt-1">
                  {coop?.totalUnit?.toString()} {coop?.ticker}
                </p>
              </div>
              <div className="col-6 mb-2">
                <p className="font-14 mt-1">Lock Period</p>
              </div>
              <div className="col-6">
                <p className="text-end mt-1">
                  {coop?.lockPeriod?.toString()} days
                </p>
              </div>
              <div className="col-6 mb-2">
                <p className="font-14 mt-1">Payout Frequency</p>
              </div>
              <div className="col-6">
                <p className="font-14 text-end mt-1">
                  Every {coop?.payoutFrequency?.toString()} days
                </p>
              </div>
              <div className="col-6 mb-2">
                <p className="font-14 mt-1">Management Fee</p>
              </div>
              <div className="col-6">
                <p className="font-14 text-end mt-1">
                {formattedFee}%
                </p>
              </div>
              <div className="col-12 mb-4">
                <button
                onClick={handleCoopParticipation}
                type="button"
                className="col-12 btn btn-sm rounded-sm text-uppercase font-900 border-dark color-dark bg-theme mt-3"
              >
                Participate
              </button>
              </div>
              
            </div>
          </div>
        </div>
      </div>
      {showDescriptionModal && (
        <DescriptionModal
          {...{ showDescriptionModal, setShowDescriptionModal, coop }}
        />
      )}
    </>
  );
};

export default CoopDetail;
