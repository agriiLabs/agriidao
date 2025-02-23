import { useState } from "react";
import { useAuth } from "../../../hooks/Context";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../../../utils/Utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { setCoopRequest } from "../../../redux/slices/app";


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
     <div>DCoopCreatePreview</div>
    <div className="d-flex justify-content-between">
          {/* <button onClick={() => setCurrentStep(1)} className="btn btn-outline-dark">
            Back
          </button> */}
          <button
                  disabled={saving}
                  onClick={handleSave}
                  className="col-12 btn btn-sm rounded-sm text-uppercase font-900 border-dark color-dark bg-theme mt-3"
                >
            {saving ? "Submitting..." : "Confirm"}
          </button>
        </div>
    </>
   
    
  )
}

export default DCoopCreatePreview