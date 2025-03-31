import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/Context";
import {
  Project,
  ProjectProjections,
} from "../../../../../declarations/projects/projects.did";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import DPManagementCardProps from "./components/DProjectManagementCard";

const DProjectDetail = () => {
  const { projectsActor, coopIndexerActor } = useAuth();
  const { id } = useParams();
  const { projectOwner } = useSelector((state: RootState) => state.app);
  const [project, setProject] = useState<Project | null>(null);
  const [projectProjections, setProjectProjections] =
    useState<ProjectProjections | null>(null);
  const [coop, setCoop] = useState<string | null>(null);
  const [isOwner, setIsOwner] = useState(false);


  useEffect(() => {
    if (projectOwner) {
      setIsOwner(true);
    }
  }, [projectOwner]);

  console.log("owner", isOwner);
  console.log(projectOwner);

  useEffect(() => {
    if (id) {
      getProjectDetails();
    }
  }, [id]);

  const getProjectDetails = async () => {
    try {
      if (!id) {
        console.error("Project ID is undefined");
        return;
      }
      const res = await projectsActor?.getProjectById(id);
      if (res) {
        setProject(res);
      }
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  };

  useEffect(() => {
    if (project) {
      getCoop();
    }
  }, [project]);

  const getCoop = async () => {
    if (!project) {
      console.error("Project is null");
      return;
    }
    try {
      const res = await coopIndexerActor?.getCoopById(project.coop);
      if (res && 'ok' in res) {
        setCoop(res.ok.name);
      }
    } catch (error) {
      console.error("Error fetching coop:", error);
    }
  };

  useEffect(() => {
    if (project) {
      getProjectProjections();
    }
  }, [project]);

  const getProjectProjections = async () => {
    if (!project) {
      console.error("Project is null");
      return;
    }
    try {
      const res = await projectsActor?.getProjectProjectionsByProjectId(
        project.id
      );
      if (res) {
        setProjectProjections(res);
      }
    } catch (error) {
      console.error("Error fetching project projections:", error);
    }
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h5 className="mb-0">Overview</h5>
        </div>
        <div className="mb-0 position-relative">
          {isOwner ? (
            <div className="d-flex ms-auto gap-2">
              <NavLink
              to={`/d/coop-units/${id}`}
              className="btn btn-outline-dark"
            >
              Manage
            </NavLink>
            <NavLink
            to={`/d/coop-units/${id}`}
            className="btn btn-outline-dark col-sm-6 me-4"
          >
            Fund
          </NavLink>
          </div>
          ) : (
            <NavLink
              to={`/d/coop-units/${id}`}
              className="btn btn-outline-dark col-sm-12"
            >
              Fund
            </NavLink>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col-xl-4">
        <DPManagementCardProps project={project} />
        </div>
        <div className="col-xl-8">
          <div className="col-xl-12 mt-4">
            <div className="card rounded shadow border-0 p-4">
              <div className="d-flex justify-content-between mb-4">
                <h5 className="mb-0">Financial Forecast</h5>
              </div>

              <dl className="row">
                <dt className="col-sm-4">Income</dt>
                <dd className="col-sm-8 text-end">
                  {Number(projectProjections?.income)} USDC
                </dd>
                <dt className="col-sm-6">Expenditure</dt>
                <dd className="col-sm-6 text-end">
                  {Number(projectProjections?.expenses)} USDC
                </dd>
                <dt className="col-sm-6">Surplus</dt>
                <dd className="col-sm-6 text-end">
                  {Number(projectProjections?.profit)} USDC
                </dd>
                <dt className="col-sm-6">Royalty Split</dt>
                <dd className="col-sm-6 text-end">
                  {Number(projectProjections?.royaltyPercentage)}%
                </dd>
                <dt className="col-sm-6">Member Benefits</dt>
                <dd className="col-sm-6 text-end">
                  {Number(projectProjections?.royaltySplit)} USDC
                </dd>
              </dl>
            </div>
          </div>
          <div className="col-xl-12 mt-4">
            <div className="card rounded shadow border-0 p-4">
              <div className="d-flex justify-content-between mb-4">
                <h5 className="mb-0">Description</h5>
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: project?.description || "" }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-xl-8 mt-4">
        <div className="card border-0"></div>
      </div>
    </>
  );
};

export default DProjectDetail;
