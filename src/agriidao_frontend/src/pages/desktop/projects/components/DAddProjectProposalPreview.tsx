import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { useAuth } from "../../../../hooks/Context";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../../../../utils/Utils";
import { setProposalRequest } from "../../../../redux/slices/app";

const DAddProjectProposalReview = ({
  setCurrentStep,
}: {
  setCurrentStep: (step: number) => void;
}) => {
  const { proposalsActor } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { proposalRequest, _project } = useSelector((state: RootState) => state.app);
  const [saving, setSaving] = useState(false);
  

  const handleSave = async () => {
    if (!proposalsActor) {
      console.error("proposalsActor is null");
      return;
    }
    setSaving(true);
    try {
      if (!proposalRequest) {
        console.error("Proposal request is null, cannot proceed.");
        setSaving(false);
        return;
      }
      console.log("proposalRequest", proposalRequest);
      const res = await proposalsActor.addProposal(proposalRequest);
      console.log("Proposal creation response:", res);
      if (res && "ok" in res) {
        setSaving(false);
        dispatch(setProposalRequest(null));
        toastSuccess("Proposal successfully added");
        navigate(`/d/projects/manager`);
      } else {
        throw new Error("Failed to add proposal");
      }
    } catch (error) {
      setSaving(false);
      toastError("Error adding proposal");
      console.error("Error adding proposal:", error);
    }
  };
  return (
    <div>
      <p>
        <strong>Project:</strong> {_project?.name}
      </p>
      <p>
        <strong>Description:</strong> {proposalRequest?.description}
      </p>

      <div className="d-flex justify-content-between">
        <button
          onClick={() => setCurrentStep(1)}
          className="btn btn-outline-dark"
        >
          Back
        </button>
        <button onClick={handleSave} className="btn btn-success">
          {saving ? "Submitting..." : "Confirm"}
        </button>
      </div>
    </div>
  );
};
export default DAddProjectProposalReview;
