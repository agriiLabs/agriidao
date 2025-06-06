import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/Context";
import {
  Project,
  ProjectOwner,
  ProjectProjections,
} from "../../../../../declarations/projects/projects.did";
import { Link, useNavigate } from "react-router-dom";
import imagePath2 from "../../../assets/images/projects-default.png";
import DProjectOwner from "../components/DProjectOwner";
import { useDispatch } from "react-redux";
import { setProjectOwner } from "../../../redux/slices/app";


const DProjects = () => {
  const { projectsActor } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [owner, setOwner] = useState<ProjectOwner | null>(null);
  const [ownerExists, setOwnerExists] = useState(false);
  const [projectProjections, setProjectProjections] = useState<{
    [key: string]: ProjectProjections[];
  } | null>(null);
  const [showProjectOwnerModal, setShowProjectOwnerModal] = useState(false);

  useEffect(() => {
    if (projectsActor) {
      getProjects();
      getProjectOwner();
    }
  }, [projectsActor]);

  const getProjects = async () => {
    let res = await projectsActor?.getAllProjects();
    console.log("projects", res);
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
      if (res) {
        setOwner(res);
        dispatch(setProjectOwner(res));
      }
    } catch (error) {
      console.error("Error fetching project owner:", error);
    }
  };

  useEffect(() => {
    if (projects) {
      getProjectProjections();
    }
  }, [projects]);

  const getProjectProjections = async () => {
    if (!projects || projects.length === 0) {
      console.error("No projects available");
      return;
    }

    try {
      const projectionsMap: { [key: string]: ProjectProjections[] } = {};

      for (const project of projects) {
        const res = await projectsActor?.getProjectProjectionsByProjectId(
          project.id
        );
        if (res) {
          projectionsMap[project.id] = Array.isArray(res) ? res : [res];
        }
      }

      setProjectProjections(projectionsMap);
    } catch (error) {
      console.error("Error fetching project projections:", error);
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
      if (owner) {
        navigate(`/d/start-project/`);
      } else {
        setShowProjectOwnerModal(true);
      }
    } catch (error) {
      console.error("Error fetching project owner:", error);
    }
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h5 className="mb-0">Projects</h5>
        </div>
        <div className="mb-0 position-relative">
          <button
            onClick={handleStartProject}
            id="nav-bottom"
            className="btn btn-outline-dark col-sm-12"
          >
            Start Project
          </button>
        </div>
      </div>

      <div className="col-xl-12 mt-4">
        <div className="card border-0">
          <div
            className="table-responsive shadow rounded-bottom"
            data-simplebar
            style={{ height: "545px" }}
          >
            <table className="table table-center bg-white mb-0">
              <thead>
                <tr>
                  <th className="border-bottom p-3" style={{ width: "150px" }}>
                    Rank
                  </th>
                  <th className="border-bottom p-3" style={{ width: "150px" }}>
                    Project
                  </th>
                  <th className="border-bottom p-3" style={{ width: "150px" }}>
                    Funding Goal
                  </th>
                  <th className="border-bottom p-3" style={{ width: "150px" }}>
                    Funding Status
                  </th>
                  <th className="border-bottom p-3" style={{ width: "150px" }}>
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
                          to={`/d/projects/overview/${project.id}`}
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

                      <td className=" p-4">
                        {parseFloat(Number(project.unitsGoal).toString())}
                        {} USDC
                      </td>
                      <td className=" p-4">
                        {project?.fundingStatus
                          ? Object.keys(project.fundingStatus)[0] // Extract the status key
                          : "Unknown"}
                      </td>
                      <td className=" p-4">
                        {Number(
                          projectProjections &&
                            projectProjections[project.id]?.[0]?.royaltySplit
                        ).toString()}
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
      {showProjectOwnerModal && (
        <DProjectOwner {
          ...{
            showProjectOwnerModal,
            setShowProjectOwnerModal,
          }
        }
        />
      )}
    </>
  );
};

export default DProjects;
