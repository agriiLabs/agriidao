import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { useAuth } from "../../../../hooks/Context";
import { useNavigate, useParams } from "react-router-dom";
import { toastError, toastSuccess } from "../../../../utils/Utils";
import { setMarketLocationRequest } from "../../../../redux/slices/app";

const AddMarketLocationPreview = ({ setCurrentStep }: { setCurrentStep: (step: number) => void }) => {
  const { agriidaoActor } = useAuth();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { marketLocationRequest } = useSelector((state: RootState) => state.app);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!agriidaoActor) {
      console.error("agriidaoActor is null");
      return;
    }
    setSaving(true);
    try {
      if (!marketLocationRequest) {
        console.error("Market location request is null, cannot proceed.");
        setSaving(false);
        return;
      }
      const res = await agriidaoActor.addMarketLocation(marketLocationRequest);
      if (res && "ok" in res) {
        setSaving(false);
        dispatch(setMarketLocationRequest(null));
        toastSuccess("Market location successfully added");
        navigate(`/d/market-locations/${id}`);
      } else {
        throw new Error("Failed to add market location");
      }
    } catch (error) {
      setSaving(false);
      toastError("Error adding market location");
      console.error("Error adding market location:", error);
    }
  };

  return (
    <div>
      <p>Review market location:</p>
      <p><strong>Name:</strong> {marketLocationRequest?.name}</p>
      <p><strong>Description:</strong> {marketLocationRequest?.countryId}</p>
      <div className="d-flex justify-content-between">
        <button onClick={() => setCurrentStep(1)} className="btn btn-outline-dark">
          Back
        </button>
        <button onClick={handleSave} className="btn btn-success">
          {saving ? "Submitting..." : "Confirm"}
        </button>
      </div>
    </div>
  );
};

export default AddMarketLocationPreview;