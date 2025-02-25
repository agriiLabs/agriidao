import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useAuth } from "../../../hooks/Context";
import {
  setCoopRecord,
  setProjectRequest,
  setCountry,
} from "../../../redux/slices/app";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../../../utils/Utils";

const DProjectCreatePreview = () => {
  const { projectsActor } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projectRequest, coopRecord, country } = useSelector(
    (state: RootState) => state.app
  );
  const [saving, setSaving] = useState(false);

  console.log("projectRequest", projectRequest);
  console.log("coopRecord", coopRecord);
  console.log("country", country);

  const handleSave = async () => {
    if (!projectsActor) {
      console.error("projectsActor is null");
      return;
    }
    setSaving(true);
    try {
      if (!projectRequest) {
        console.error("Project request is null, cannot proceed.");
        setSaving(false);
        return;
      }
      const res = await projectsActor.addProject(projectRequest);
      console.log("Project creation response:", res);

      if (res && "ok" in res) {
        setSaving(false);
        dispatch(setProjectRequest(null));
        dispatch(setCoopRecord(null));
        dispatch(setCountry(null));
        toastSuccess("Project successfully added");
        navigate(`/d/projects`);
      } else {
        throw new Error("Failed to add project");
      }
    } catch (error) {
      setSaving(false);
      toastError("Error adding project");
      console.error("Error adding project:", error);
    }
  };

  const formattedDuration = parseFloat(
    Number(projectRequest?.duration).toString()
  );
  const formattedFundingGoal = parseFloat(
    Number(projectRequest?.fundingGoal).toString()
  );

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h5 className="mb-0">Confirm Project Details</h5>
        </div>
      </div>

      <div className="col-xl-12 mt-4">
        <div className="card border-0 p-4">
          
          <dl className="row">
            <dt className="col-sm-4">Project Name</dt>
            <dd className="col-sm-8 text-end">{projectRequest?.name}</dd>
            <dt className="col-sm-6">Governing Co-op</dt>
            <dd className="col-sm-6 text-end">{coopRecord?.[0].name}</dd>
            <dt className="col-sm-2">Summary</dt>
            <dd className="col-sm-10 text-end">{projectRequest?.summary}</dd>
            <dt className="col-sm-2">Description</dt>
            <dd className="col-sm-10 text-end">
              <div dangerouslySetInnerHTML={{ __html: projectRequest?.description || "" }} />
            </dd>
            <dt className="col-sm-6">Funding Goal</dt>
            <dd className="col-sm-6 text-end">{formattedFundingGoal} USDC</dd>
            <dt className="col-sm-6">Project Duration</dt>
            <dd className="col-sm-6 text-end">{formattedDuration} Months</dd>
            <dt className="col-sm-6">Location</dt>
            <dd className="col-sm-6 text-end">{country?.name}</dd>
          </dl>
          <div className="text-end">
            <button
            disabled={saving}
            onClick={handleSave}
            className="btn btn-sm rounded-sm text-uppercase font-900 border-dark color-dark bg-theme mt-2"
          >
            {saving ? "Creating..." : "Create Project"}
          </button>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default DProjectCreatePreview;
