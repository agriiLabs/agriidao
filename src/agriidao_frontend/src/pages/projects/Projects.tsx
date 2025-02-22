import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/Context";
import ProfileClick from "../profile/component/ProfileClick";
import {
  Project,
  ProjectOwner,
} from "../../../../declarations/projects/projects.did";
import { Link, NavLink, useNavigate } from "react-router-dom";
import imagePath2 from "../../assets/images/default-user-profile.png";
import { ckUSDCe6s } from "../../constants/canisters_config";

const Projects = () => {
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
        navigate(`/start-project/`);
      } else {
      navigate(`/add-project-owner`);
      }
    } catch (error) {
      console.error("Error fetching project owner:", error);
    }
  };

  return (
    <>
      <div className="header header-fixed header-logo-center">
        <a href="#" className="header-title">
          Projects
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

      <div className="header-clear-medium my-0 mb-4">
        <div className="card card-style">
          <div className="content mb-0">
            <div className="row mb-2 mt-n2">
              <div className="col-6 text-start">
                <button
                  onClick={handleStartProject}
                  id="nav-bottom"
                  className="font-12 color-dark"
                >
                  + Start Project
                </button>
              </div>
              <div className="col-6 text-end">
                <NavLink
                  to="/reward-summary"
                  id="nav-bottom"
                  className="font-12 color-dark"
                >
                  Learn More
                </NavLink>
              </div>
            </div>

            <div className="divider mb-3" />
            {projects &&
              projects.map((project, index) => {
                const funding = parseFloat(
                  (Number(project.fundingGoal) / ckUSDCe6s).toFixed(2)
                );

                return (
                  <Link
                    to={`/coop-detail/${project.id}`}
                    className="d-flex mb-3"
                    key={index}
                  >
                    <div className="align-self-center">
                      <img
                        className="rounded-xl me-3"
                        src={imagePath2}
                        data-src={"#"}
                        width="50"
                        height="50"
                        alt={"Default Co-op Image"}
                      />
                    </div>
                    <div className="align-self-center">
                      <p className="mb-n1 font-18">{project.name}</p>
                    </div>
                    <div className="align-self-center ms-auto text-end">
                      <p className="mb-n1 font-18">${funding}</p>
                      <p className="font-11 opacity-60">
                        Total Contributions $0
                      </p>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
