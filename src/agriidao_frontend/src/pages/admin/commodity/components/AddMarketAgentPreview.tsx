import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { useAuth } from "../../../../hooks/Context";
import { useNavigate, useParams } from "react-router-dom";
import { toastError, toastSuccess } from "../../../../utils/Utils";
import { setMarketLocationAgentRequest } from "../../../../redux/slices/app";

const AddMarketAgentPreview = ({ setCurrentStep }: { setCurrentStep: (step: number) => void }) => {
  const { agriidaoActor } = useAuth();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { marketLocationAgent } = useSelector((state: RootState) => state.app);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!agriidaoActor) {
      console.error("agriidaoActor is null");
      return;
    }
    setSaving(true);
    try {
      if (!marketLocationAgent) {
        console.error("Market agent request is null, cannot proceed.");
        setSaving(false);
        return;
      }
      const res = await agriidaoActor.addMarketLocationAgent(marketLocationAgent);
      console.log("Market agent creation response:", res);
      if (res && "ok" in res) {
        setSaving(false);
        dispatch(setMarketLocationAgentRequest(null));
        toastSuccess("Market agent successfully added");
        navigate(`/d/market-agents/${id}`);
      } else {
        throw new Error("Failed to add market agent");
      }
    } catch (error) {
      setSaving(false);
      toastError("Error adding market agent");
      console.error("Error adding market agent:", error);
    }
  };

  return (
    <div>
      <p>Review market agent:</p>
      <p><strong>User ID:</strong> {marketLocationAgent?.userId}</p>
      <p><strong>Market Location ID:</strong> {marketLocationAgent?.marketLocationId}</p>

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

export default AddMarketAgentPreview;