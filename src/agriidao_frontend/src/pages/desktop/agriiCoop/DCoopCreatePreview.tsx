import { useState } from "react";
import { useAuth } from "../../../hooks/Context";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../../../utils/Utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { setCoopRequest } from "../../../redux/slices/app";
import { coopIndexerCanisterId } from "../../../constants/canisters_config";


const DCoopCreatePreview = () => {
    const{ coopIndexerActor } = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [saving, setSaving] = useState(false);
    const { coopRequest } = useSelector((state: RootState) => state.app);

    const handleSave = async () => {
        if (!coopIndexerActor || !coopRequest) {
            console.error("coopIndexerActor or coopRequest not found");
            return;
        }
        setSaving(true);
        try {
            const res = await coopIndexerActor.createCoOpCanister(coopRequest);
            if ("ok" in res) {
                setSaving(false);
                dispatch(setCoopRequest(null));
                toastSuccess("Coop successfully created");
                navigate("/d/coop-list");
            } else {
                setSaving(false);
                console.error("Error saving coop request: ", res.err);
                toastError("Error saving coop request");
            }
        } catch (error) {
            setSaving(false);
            console.error("Error saving coop request: ", error);
            toastError("Error saving coop request");
        }
    };
  return (
    <>
     <div className="d-flex align-items-center justify-content-between">
        <div>
          <h5 className="mb-0">Confirm Co-op Details</h5>
        </div>
      </div>
      <div className="col-xl-12 mt-4">
        <div className="card border-0 p-4">
          
          <dl className="row">
            <dt className="col-sm-4">Co-op Name</dt>
            <dd className="col-sm-8 text-end">{coopRequest?.name}</dd>
            <dt className="col-sm-4">Co-op Code</dt>
            <dd className="col-sm-8 text-end">{coopRequest?.ticker}</dd>
            <dt className="col-sm-6">Max Co-op Units</dt>
            <dd className="col-sm-6 text-end">{coopRequest?.totalUnit}</dd>
            <dt className="col-sm-2">Unit Price</dt>
            <dd className="col-sm-10 text-end">{coopRequest?.unitPrice}</dd>
            <dt className="col-sm-2">Payout Frequency</dt>
            <dd className="col-sm-10 text-end">{coopRequest?.payoutFrequency} Days</dd>
            <dt className="col-sm-2">Minimum Lock Period</dt>
            <dd className="col-sm-10 text-end">{coopRequest?.lockPeriod} Days</dd>
            <dt className="col-sm-2">Management Fee</dt>
            <dd className="col-sm-10 text-end">{coopRequest?.managementFee} Days</dd>
            <dt className="col-sm-2">Summary</dt>
            <dd className="col-sm-10 text-end">
              <div dangerouslySetInnerHTML={{ __html: coopRequest?.summary || "" }} />
            </dd>
            <dt className="col-sm-6">Purpose</dt>
            <dd className="col-sm-6 text-end">
            <div dangerouslySetInnerHTML={{ __html: coopRequest?.description || "" }} />
            </dd>
            <dt className="col-sm-6">Funding Goal</dt>
          </dl>
          <div className="text-end">
            <button
            disabled={saving}
            onClick={handleSave}
            className="btn btn-sm rounded-sm text-uppercase font-900 border-dark color-dark bg-theme mt-2"
          >
            {saving ? "Creating..." : "Create Project"}
          </button>
          </div>
          
        </div>
      </div>
      <div className="d-flex justify-content-between">
          {/* <button onClick={() => setCurrentStep(1)} className="btn btn-outline-dark">
            Back
          </button> */}
          <button
            disabled={saving}
            onClick={handleSave}
            className="col-12 btn btn-sm rounded-sm text-uppercase font-900 border-dark color-dark bg-theme mt-3"
          >
            {saving ? "Creating..." : "Confirm"}
          </button>
      </div>
    </>
   
    
  )
}

export default DCoopCreatePreview