import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { useAuth } from "../../../../hooks/Context";
import { setProjectIncomeRequest } from "../../../../redux/slices/app";
import { useNavigate, useParams } from "react-router-dom";
import { toastError, toastSuccess } from "../../../../utils/Utils";

const DAddIncomePreview = ({ setCurrentStep }: { setCurrentStep: (step: number) => void }) => {
    const { projectsActor } = useAuth();
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { projectIncomeRequest } = useSelector((state: RootState) => state.app);
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        if (!projectsActor) {
            console.error("projectsActor is null");
            return;
        }
        setSaving(true);
        try {
            if (!projectIncomeRequest) {
                console.error("Project income request is null, cannot proceed.");
                setSaving(false);
                return;
            }
            const res = await projectsActor.addProjectionIncome(projectIncomeRequest);
            console.log("Project income creation response:", res);
            if (res && "ok" in res) {
                setSaving(false);
                dispatch(setProjectIncomeRequest(null));
                toastSuccess("Project income successfully added");
                navigate(`/d/projects/manager/forecast/${id}`);
            } else {
                throw new Error("Failed to add project income");
            }
        } catch (error) {
            setSaving(false);
            toastError("Error adding project income");
            console.error("Error adding project income:", error);
        }
    };

  return (
    <div>
        <p>Review income:</p>
        <p><strong>Name:</strong> {projectIncomeRequest?.item}</p>
        <p><strong>Cost</strong> {Number(projectIncomeRequest?.amount ?? 0)}</p>
        <p><strong>Quantity</strong> {Number(projectIncomeRequest?.quantity ?? 0)}</p>
        <p><strong>Total</strong> {Number(projectIncomeRequest?.amount ?? 0) * Number(projectIncomeRequest?.quantity ?? 0)}</p>
  
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

export default DAddIncomePreview