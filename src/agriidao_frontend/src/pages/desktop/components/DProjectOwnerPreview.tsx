import { useState } from "react";
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
        return;
      }
      
      setSaving(true);
      try {
        if (!projectOwner) {
          setSaving(false);
          return;
        }
    
        const res = await projectsActor.addProjectOwner(projectOwner);
    
        if (res && "ok" in res) {
          let updatedOwner = null;
          for (let i = 0; i < 5; i++) { // Try 5 times
            updatedOwner = await projectsActor.getProjectOwner();
            if (updatedOwner && "ok" in updatedOwner) {
              break;
            }
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 sec
          }
    
          setSaving(false);
          dispatch(setProjectRequest(null));
          toastSuccess("Project owner successfully added");
    
          if (updatedOwner && "ok" in updatedOwner) {
            navigate(`/d/projects/manager`);
          } else {
            console.warn("Owner not found after save, staying on modal.");
          }
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