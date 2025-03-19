import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { useAuth } from "../../../../hooks/Context";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../../../../utils/Utils";
import { setMilestoneRequest } from "../../../../redux/slices/app";

const DAddMilestonePreview = ({ setCurrentStep }: { setCurrentStep: (step: number) => void }) => {
    const { projectsActor } = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {milestoneRequest} = useSelector((state: RootState) => state.app);
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        if (!projectsActor) {
            console.error("projectsActor is null");
            return;
        }
        setSaving(true);
        try {
            if (!milestoneRequest) {
                console.error("Milestone request is null, cannot proceed.");
                setSaving(false);
                return;
            }
            const res = await projectsActor.addMilestone(milestoneRequest);
            console.log("Milestone creation response:", res);   
            if (res && "ok" in res) {
                setSaving(false);
                dispatch(setMilestoneRequest(null));
                toastSuccess("Milestone successfully added");
                navigate(`/d/projects/manager`);
            } else {
                throw new Error("Failed to add milestone");
            }
        } catch (error) {
            setSaving(false);
            toastError("Error adding milestone");
            console.error("Error adding milestone:", error);
        }
    };
  return (
    <div>
        <p>Review Milestone:</p>
        <p><strong>Name:</strong> {milestoneRequest?.name}</p>
        <p><strong>Budget:</strong> {Number(milestoneRequest?.budget)}</p>
        <p><strong>Task 1:</strong> {milestoneRequest?.task1}</p>
        <p><strong>Task 2:</strong> {milestoneRequest?.task2 ? milestoneRequest.task2 : "N/A"}</p>
        <p><strong>Task 3:</strong> {milestoneRequest?.task3 ? milestoneRequest.task3 : "N/A"}</p>
        <p><strong>Timeframe: </strong> {Number(milestoneRequest?.timeframe)}</p>
        <p><strong>Description:</strong> {milestoneRequest?.description}</p>
  
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

export default DAddMilestonePreview