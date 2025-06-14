import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { useAuth } from "../../../../hooks/Context";
import { useNavigate, useParams } from "react-router-dom";
import { toastError, toastSuccess } from "../../../../utils/Utils";
import { setCommodityRequest } from "../../../../redux/slices/app";

const AddCommodityPreview = ({ setCurrentStep }: { setCurrentStep: (step: number) => void }) => {
    const { agriidaoActor } = useAuth();
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { commodityRequest } = useSelector((state: RootState) => state.app);
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        if (!agriidaoActor) {
            console.error("agriidaoActor is null");
            return;
        }
        setSaving(true);
        try {
            if (!commodityRequest) {
                console.error("Commodity request is null, cannot proceed.");
                setSaving(false);
                return;
            }
            const res = await agriidaoActor.addCommodity(commodityRequest);
            console.log("Commodity creation response:", res);
            if (res && "ok" in res) {
                setSaving(false);
                dispatch(setCommodityRequest(null));
                toastSuccess("Commodity successfully added");
                navigate(`/d/commodities/${id}`);
            } else {
                throw new Error("Failed to add commodity");
            }
        } catch (error) {
            setSaving(false);
            toastError("Error adding commodity");
            console.error("Error adding commodity:", error);
        }
    };

  return (
    <div>
        <p>Review commodity:</p>
        <p><strong>Name:</strong> {commodityRequest?.name}</p>
        <p><strong>Ticker:</strong> {commodityRequest?.ticker}</p>
        <p><strong>Category:</strong> {commodityRequest?.acCategoryId}</p>
    
        <div className="d-flex justify-content-between">
          <button onClick={() => setCurrentStep(1)} className="btn btn-outline-dark">
            Back
          </button>
          <button onClick={handleSave} className="btn btn-success">
            {saving ? "Submitting..." : "Confirm"}
          </button>
        </div>
    </div>
  )
}

export default AddCommodityPreview;