import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getCoopActor from "./components/CoopActor";
import {
  Coop,
  CoopMember,
} from "../../../../declarations/coop_manager/coop_manager.did";
import ProfileClick from "../profile/component/ProfileClick";
import CoopDetail from "./CoopDetail";

type FormData = {
  units: string;
};

const CoopUnits = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [coop, setCoop] = useState<Coop | null>(null);
  const [units, setUnits] = useState(0);

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

      if (coopDetails) {
        setCoop(coopDetails);
        console.log("Fetched Co-op Details:", coopDetails);
      }
    } catch (error) {
      console.error("Error fetching co-op details:", error);
    }
  };

  const handlePreview = () => {
    if (units > 0) {
      navigate(`/coop-units-preview/${coop?.id}`, {
        state: { units },
      });
    }
  };

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

      <div className="header-clear-medium my-0 mb-4">
        <div className="card card-style">
          <div className="content mb-0">
            {/* <p>Unit Price: $</p> */}
            <p>How many {coop?.name} Co-op Units do you want?</p>
            <div className="input-style input-style-2 input-required">
              <input
                type="number"
                min="1"
                value={units}
                onChange={(e) => setUnits(Number(e.target.value))}
                placeholder="Enter number of units"
              />

              <div className="col-12">
                <button
                  onClick={handlePreview}
                  className="col-12 btn btn-sm rounded-sm text-uppercase font-900 border-dark color-dark bg-theme mt-3"
                >
                  Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoopUnits;
