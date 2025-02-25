import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useAuth } from "../../../hooks/Context";
import { setProjectRequest } from "../../../redux/slices/app";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../../../utils/Utils";

const DProjectOwnwePreview = ({ setCurrentStep }: { setCurrentStep: (step: number) => void }) => {
    const { projectsActor } = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {projectOwner} = useSelector((state: RootState) => state.app);
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        if (!projectsActor) {
            console.error("projectsActor is null");
            return;
        }
        setSaving(true);
        try {
            if (!projectOwner) {
                console.error("Project owner is null, cannot proceed.");
                setSaving(false);
                return;
            }
            const res = await projectsActor.addProjectOwner(projectOwner);
            console.log("Project owner creation response:", res);   
            if (res && "ok" in res) {
                setSaving(false);
                dispatch(setProjectRequest(null));
                toastSuccess("Project owner successfully added");
                navigate(`/d/projects/manager`);
            } else {
                throw new Error("Failed to add project owner");
            }
        } catch (error) {
            setSaving(false);
            toastError("Error adding project owner");
            console.error("Error adding project owner:", error);
        }
    };
    
  return (
    <div>
        <p>Review your username  or organisation:</p>
        <p><strong>Name:</strong> {projectOwner?.name}</p>
        <p><strong>Entity Type:</strong> {projectOwner?.entityType ? Object.keys(projectOwner.entityType)[0] : "N/A"}</p>
  
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

export default DProjectOwnwePreview