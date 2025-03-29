import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useAuth } from "../../hooks/Context";
import {
  setCoopRecord,
  setProjectRequest,
  setCountry,
} from "../../redux/slices/app";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../../utils/Utils";
import ProfileClick from "../profile/component/ProfileClick";

const AddProjectPreview = () => {
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
        throw new Error("Project request is null");
      }
      const res = await projectsActor.addProject(projectRequest);
      if (res && "ok" in res) {
        setSaving(false);
        dispatch(setProjectRequest(null));
        dispatch(setCoopRecord(null));
        dispatch(setCountry(null));
        toastSuccess("Project successfully added");
        navigate(`/projects`);
      } else {
        // throw new Error("Failed to add project");
        console.log("Failed to add project", res);
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
    Number(projectRequest?.unitsGoal).toString()
  );
  return (
    <>
      <div className="header header-fixed header-logo-center">
        <a href="#" className="header-title">
          Start Project
        </a>
        <button
          onClick={() => window.history.back()}
          data-back-button
          className="header-icon header-icon-1"
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        <ProfileClick />
      </div>

      <div className="page-content header-clear-medium">
        <div className="card card-style">
          <div className="content mb-0">
            <div className="row mb-0">
              <div className="col-4">
                <p className="font-15">Project Name</p>
              </div>
              <div className="col-8">
                <p className="font-15 text-end">{projectRequest?.name}</p>
              </div>
              <div className="divider divider-margins w-100 mt-2 mb-2"></div>
              <div className="col-5">
                <p className="font-15">Governing Co-op</p>
              </div>
              <div className="col-7">
                <p className="font-15 text-end">{coopRecord?.[0].name}</p>
              </div>
              <div className="divider divider-margins w-100 mt-2 mb-2"></div>
              <div className="col-5">
                <p className="font-15">Summary</p>
              </div>
              <div className="col-7">
                <p className="font-15 text-end">{projectRequest?.summary}</p>
              </div>
              <div className="divider divider-margins w-100 mt-2 mb-2"></div>
              <div className="col-5">
                <p className="font-15">Description</p>
              </div>
              <div className="col-7">
                <p className="font-15 text-end">
                  {projectRequest?.description}
                </p>
              </div>
              <div className="divider divider-margins w-100 mt-2 mb-2"></div>
              <div className="col-5">
                <p className="font-15">Project Duration</p>
              </div>
              <div className="col-7">
                <p className="font-15 text-end">{formattedDuration}</p>
              </div>
              <div className="divider divider-margins w-100 mt-2 mb-2"></div>
              <div className="col-5">
                <p className="font-15">Funding Goal</p>
              </div>
              <div className="col-7">
                <p className="font-15 text-end">{formattedFundingGoal}</p>
              </div>
              <div className="divider divider-margins w-100 mt-2 mb-2"></div>
              <div className="col-5">
                <p className="font-15">Location</p>
              </div>
              <div className="col-7">
                <p className="font-15 text-end">{country?.name}</p>
              </div>
              <div className="divider divider-margins w-100 mt-2 mb-2"></div>

              <div className="col-12">
                <button
                  disabled={saving}
                  onClick={handleSave}
                  className="col-12 btn btn-sm rounded-sm text-uppercase font-900 border-dark color-dark bg-theme mt-3"
                >
                  {saving ? "Saving..." : "Submit Entry"}
                </button>
              </div>
            </div>

            <br />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProjectPreview;
