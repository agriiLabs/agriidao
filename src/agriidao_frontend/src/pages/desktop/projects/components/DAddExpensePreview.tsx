import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { useAuth } from "../../../../hooks/Context";
import { useNavigate, useParams } from "react-router-dom";
import { toastError, toastSuccess } from "../../../../utils/Utils";
import { setProjectExpenseRequest } from "../../../../redux/slices/app";

const DAddExpensePreview = ({ setCurrentStep }: { setCurrentStep: (step: number) => void }) => {
    const { projectsActor } = useAuth();
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { projectExpenseRequest } = useSelector((state: RootState) => state.app);
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        if (!projectsActor) {
            console.error("projectsActor is null");
            return;
        }
        setSaving(true);
        try {
            if (!projectExpenseRequest) {
                console.error("Project expense request is null, cannot proceed.");
                setSaving(false);
                return;
            }
            const res = await projectsActor.addProjectionExpense(projectExpenseRequest);
            console.log("Project expense creation response:", res);
            if (res && "ok" in res) {
                setSaving(false);
                dispatch(setProjectExpenseRequest(null));
                toastSuccess("Project expense successfully added");
                navigate(`/d/projects/manager/forecast/${id}`);
            } else {
                throw new Error("Failed to add project expense");
            }
        } catch (error) {
            setSaving(false);
            toastError("Error adding project expense");
            console.error("Error adding project expense:", error);
        }
    };

  return (
    <div>
        <p>Review expense:</p>
        <p><strong>Name:</strong> {projectExpenseRequest?.item}</p>
        <p><strong>Cost</strong> {Number(projectExpenseRequest?.amount ?? 0)}</p>
        <p><strong>Quantity</strong> {Number(projectExpenseRequest?.quantity ?? 0)}</p>
        <p><strong>Total</strong> {Number(projectExpenseRequest?.amount ?? 0) * Number(projectExpenseRequest?.quantity ?? 0)}</p>
  
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

export default DAddExpensePreview