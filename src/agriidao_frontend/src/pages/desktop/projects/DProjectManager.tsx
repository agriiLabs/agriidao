import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/Context";
import {
  Project,
  ProjectOwner,
} from "../../../../../declarations/projects/projects.did";
import { Link, NavLink, useNavigate } from "react-router-dom";
import imagePath2 from "../../../assets/images/projects-default.png";
import { formatDate } from "../../../utils/Utils";
import { CoopRecord } from "../../../../../declarations/coop_indexer/coop_indexer.did";

const DProjectManager = () => {
  const { projectsActor, coopIndexerActor } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [owner, setOwner] = useState<ProjectOwner | null>(null);
  const [coop, setCoop] = useState<CoopRecord | null>(null);

  useEffect(() => {
    if (projectsActor) {
      getProjectOwner();
    }
  }, [projectsActor]);

  const getProjectOwner = async () => {
    if (!projectsActor) {
      console.error("projectsActor is null");
      return;
    }
    try {
      const res = await projectsActor.getProjectOwner();
      if (res) {
        setOwner(res);
      }
    } catch (error) {
      console.error("Error fetching project owner:", error);
    }
  };

  const getProjects = async () => {
    if (owner?.userId) {
      let res = await projectsActor?.getProjectsByOwner(owner.userId);
      if (res) {
        setProjects(res);
      }
    }
  };

  useEffect(() => {
    if (owner) {
      getProjects();
    }
  }, [owner]);

  useEffect(() => {
    if (projects) {
      getCoop();
    }
  }, [projects]);

  const getCoop = async () => {
    if (!projects) {
      console.error("Project is null");
      return;
    }
    try {
      const res = await coopIndexerActor?.getCoopById(projects[0]?.coop);
      if (res) {
        setCoop(res);
      }
    } catch (error) {
      console.error("Error fetching coop:", error);
    }
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h5 className="mb-0">My Projects</h5>
        </div>
        <div className="mb-0 position-relative">
          <select
            className="form-select form-control"
            id="campaignFilter"
            value=""
          >
            <option value="all">All</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-4">
          <div className="col-xl-12 mt-4">
            <div className="card rounded shadow border-0 p-4">
              <div className="d-flex justify-content-between mb-0 row">
                <h5 className="mb-0 col-sm-6">Project Manager</h5>
                <h5 className="mb-0 col-sm-6 text-end"></h5>
              </div>
              <div className="mt-4">
                <dl className="row">
                  <dt className="col-sm-5">Name</dt>
                  <dd className="col-sm-7 text-end">{owner?.name}</dd>
                  <dt className="col-sm-6">Type</dt>
                  <dd className="col-sm-6 text-end">
                    {owner?.entityType
                      ? Object.keys(owner.entityType)[0]
                      : "Unknown"}
                  </dd>
                  <dt className="col-sm-6">Manager Since</dt>
                  <dd className="col-sm-6 text-end">
                    {" "}
                    {formatDate(Number(owner?.timestamp))
                      ? formatDate(Number(owner?.timestamp))
                      : ""}{" "}
                  </dd>
                  <dt className="col-sm-6">Projects</dt>
                  <dd className="col-sm-6 text-end">0</dd>
                </dl>
              </div>
              <div className="mt-3">
                <NavLink
                  to={`/d/coop-projects/`}
                  className="btn btn-outline-dark col-sm-12"
                >
                  Update Manager Info
                </NavLink>
              </div>
              <div className="mt-2">
                <NavLink
                  to={`/d/coop-projects/`}
                  className="btn btn-outline-dark col-sm-12"
                >
                  Basic Info
                </NavLink>
              </div>
              <div className="mt-2">
                <NavLink
                  to={`/d/coop-projects/`}
                  className="btn btn-outline-dark col-sm-12"
                >
                  Finacial Forecast
                </NavLink>
              </div>
              <div className="mt-2">
                <NavLink
                  to={`/d/coop-projects/`}
                  className="btn btn-outline-dark col-sm-12"
                >
                  Milestones
                </NavLink>
              </div>
              <div className="mt-2">
                <NavLink
                  to={`/d/coop-projects/`}
                  className="btn btn-outline-dark col-sm-12"
                >
                  Proposals
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-8">
          <div className="col-xl-12 mt-4">
            <div className="card rounded shadow border-0 p-4">
              <div className="d-flex justify-content-between mb-4">
                <h5 className="mb-0">My Projects</h5>
              </div>

              <table className="table table-center bg-white mb-0">
                <thead>
                  <tr>
                    <th className="border-bottom p-3">Name</th>
                    <th className="border-bottom p-3">Co-op</th>
                    <th className="border-bottom p-3">Funding Goal</th>
                    <th className="border-bottom p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {projects && projects.length > 0 ? (
                    projects.map((project: Project, index: number) => (
                      <tr key={index}>
                        <td align="left" width="40%">
                          <Link
                            to={`/d/projects/manager/manage/${project.id}`}
                            className="d-flex align-items-center"
                          >
                            {/* {position.user.profile_pic ? (
                                        <img className="rounded-xl mr-3" src={position.user.profile_pic} alt="Profile" width="25" height="25" />
                                    ) : ( */}
                            <img
                              src={imagePath2}
                              width="35"
                              className="avatar avatar-ex-small rounded"
                              alt="Default Co-op Image"
                              style={{ marginRight: "15px" }}
                            />
                            <span>{project.name}</span>
                          </Link>
                        </td>

                        <td className="p-3">{coop?.name}</td>
                        <td className="p-3">
                          {parseFloat(Number(project.fundingGoal).toString())}
                          {} USDC
                        </td>
                        <td className="p-3">
                          {project?.fundingStatus
                            ? Object.keys(project.fundingStatus)[0] 
                            : "Unknown"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3}>No data available</td>
                    </tr>
                  )}
                </tbody>
              </table>
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

export default DProjectManager;
