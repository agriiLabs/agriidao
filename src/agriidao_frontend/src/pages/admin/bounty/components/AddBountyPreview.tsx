import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { useAuth } from "../../../../hooks/Context";
import { useNavigate, useParams } from "react-router-dom";
import { toastError, toastSuccess } from "../../../../utils/Utils";
import { setBountyPoints, setBountyRequest } from "../../../../redux/slices/app";

const AddBountyPreview = ({ setCurrentStep } : { setCurrentStep: (step: number) => void }) => {
  const { bountyActor } = useAuth();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bountyRequest } = useSelector((state: RootState) => state.app);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!bountyActor) {
      console.error("bountyActor is null");
      return;
    }
    setSaving(true);
    try {
      if (!bountyRequest) {
        console.error("Bounty is null, cannot proceed.");
        setSaving(false);
        return;
      }
      const res = await bountyActor.addBounty(bountyRequest);
      if (res && "ok" in res) {
        setSaving(false);
        dispatch(setBountyRequest(null));
        toastSuccess("Bounty successfully added");
        navigate(`/d/bounties/${id}`);
      } else {
        throw new Error("Failed to add bounty");
      }
    } catch (error) {
      setSaving(false);
      toastError("Error adding bounty");
      console.error("Error adding bounty:", error);
    }
  };

  return (
    <div>
        <p>Review bounty:</p>
        <p><strong>Name:</strong> {bountyRequest?.name}</p>
        <p><strong>Bounty Pool:</strong> {bountyRequest?.bountyPool}</p>
        <p><strong>Category:</strong> {bountyRequest?.acCategoryId}</p>
        <p><strong>Start Date:</strong> {bountyRequest?.startDate}</p>
        <p><strong>End Date:</strong> {bountyRequest?.endDate}</p>

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
}

export default AddBountyPreview;