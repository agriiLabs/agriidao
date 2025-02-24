import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/Context";
import {
  Project,
  ProjectOwner,
} from "../../../../../declarations/projects/projects.did";
import { Link, NavLink, useNavigate } from "react-router-dom";
import imagePath2 from "../../../assets/images/default-user-profile.png";
import { ckUSDCe6s } from "../../../constants/canisters_config";

const DProjects = () => {
  const { projectsActor } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [owner, setOwner] = useState<ProjectOwner | null>(null);
  const [ownerExists, setOwnerExists] = useState(false);

  useEffect(() => {
    if (projectsActor) {
      getProjects();
      getProjectOwner();
    }
  }, [projectsActor]);

  const getProjects = async () => {
    let res = await projectsActor?.getAllProjects();
    if (res) {
      setProjects(res);
    }
  };

  const getProjectOwner = async () => {
    if (!projectsActor) {
      console.error("projectsActor is null");
      return;
    }
    try {
      const res = await projectsActor.getProjectOwner();
      if ("ok" in res) {
        setOwner(res.ok as ProjectOwner);
      }
    } catch (error) {
      console.error("Error fetching project owner:", error);
    }
  };

  useEffect(() => {
    if (owner) {
      setOwnerExists(true);
    }
  }, [owner]);

  const handleStartProject = async () => {
    if (!projectsActor) {
      console.error("projectsActor is null");
      return;
    }

    try {
      const res = await projectsActor.projectOwnerCheck();
      if (res) {
        navigate(`/d/start-project/`);
      } else {
        navigate(`/d/add-project-owner`);
      }
    } catch (error) {
      console.error("Error fetching project owner:", error);
    }
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h5 className="mb-0">Co-ops</h5>
        </div>
        <div className="mb-0 position-relative">
          <NavLink
            to={`/d/start-project/`}
            className="btn btn-outline-dark col-sm-12"
          >
            Start a Project
          </NavLink>
        </div>
      </div>

      <div className="col-xl-12 mt-4">
        <div className="card border-0">
          <div
            className="table-responsive shadow rounded-bottom"
            data-simplebar
            style={{ height: "545px;" }}
          >
            <table className="table table-center bg-white mb-0">
              <thead>
                <tr>
                  <th className="border-bottom p-3" style={{ width: "150px;" }}>
                    Rank
                  </th>
                  <th className="border-bottom p-3" style={{ width: "150px;" }}>
                    Project
                  </th>
                  <th className="border-bottom p-3" style={{ width: "150px;" }}>
                    Funding Goal
                  </th>
                  <th className="border-bottom p-3" style={{ width: "150px;" }}>
                    Funding Status
                  </th>
                  <th className="border-bottom p-3" style={{ width: "150px;" }}>
                    Projected Benefits
                  </th>
                  
                </tr>
              </thead>

              <tbody>
                {projects && projects.length > 0 ? (
                  projects.map((project: Project, index: number) => (
                    <tr key={index}>
                      <th scope="row" className="p-3">
                        <span className="ms-2">{index + 1}</span>
                      </th>
                      <td align="left" width="40%">
                        <Link
                          to={`/d/project-detail/${project.id}`}
                          className="d-flex align-items-center"
                        >
                          {/* {position.user.profile_pic ? (
                                        <img className="rounded-xl mr-3" src={position.user.profile_pic} alt="Profile" width="25" height="25" />
                                    ) : ( */}
                          <img
                            src={imagePath2}
                            width="35"
                            className="rounded-circle mt- shadow-xl preload-img"
                            alt="Default Co-op Image"
                            style={{ marginRight: "15px" }}
                          />
                          <span>{project.name}</span>
                        </Link>
                      </td>

                      <td className=" p-4">
                        {parseFloat(Number(project.fundingGoal).toString())}
                        {} USDC
                      </td>
                      <td className=" p-4">
                        {project?.fundingStatus
                          ? Object.keys(project.fundingStatus)[0] // Extract the status key
                          : "Unknown"}
                      </td>
                      <td className=" p-4">
                        {parseFloat(Number(project).toString())}
                        {} USDC
                      </td>
                      
                      {/* <td className=" p-4">
                      {coopBalances
                        ? coopBalances[
                            coop.canisterId.toText()
                          ]?.toString() ?? "0"
                        : "0"}{" "}
                      USDC
                    </td> */}
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
    </>
  );
};

export default DProjects;
